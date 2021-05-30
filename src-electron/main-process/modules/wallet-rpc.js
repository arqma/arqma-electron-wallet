import child_process from "child_process"
const http = require("http")
const os = require("os")
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const DigestFetch = require("digest-fetch")

export class WalletRPC {
    constructor (backend) {
        this.backend = backend
        this.data_dir = null
        this.wallet_dir = null
        this.auth = []
        this.id = 0
        this.testnet = false
        this.heartbeat = null
        this.wallet_state = {
            open: false,
            name: "",
            password_hash: null,
            balance: null,
            unlocked_balance: null
        }
        this.wallet_info = {
            height: 0
        }

        this.wallet_list = []

        this.last_height_send_time = Date.now()

        this.height_regex1 = /Processed block: <([a-f0-9]+)>, height (\d+)/
        this.height_regex2 = /Skipped block by height: (\d+)/
        this.height_regex3 = /Skipped block by timestamp, height: (\d+)/

        this.agent = new http.Agent({ keepAlive: true, maxSockets: 1 })
    }

    // this function will take an options object for testnet, data-dir, etc
    start (options) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>start<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        return new Promise((resolve, reject) => {
            let daemon_address = `${options.daemon.rpc_bind_ip}:${options.daemon.rpc_bind_port}`
            if (options.daemon.type === "remote") {
                daemon_address = `${options.daemon.remote_host}:${options.daemon.remote_port}`
            }

            crypto.randomBytes(64 + 64 + 32, (err, buffer) => {
                if (err) throw err

                let auth = buffer.toString("hex")

                this.auth = [
                    auth.substr(0, 64), // rpc username
                    auth.substr(64, 64), // rpc password
                    auth.substr(128, 32) // password salt
                ]
                const args = [
                    "--rpc-login", this.auth[0] + ":" + this.auth[1],
                    "--rpc-bind-port", options.wallet.rpc_bind_port,
                    "--daemon-address", daemon_address,
                    // "--log-level", options.wallet.log_level,
                    "--log-level", "*:WARNING,net*:FATAL,net.http:DEBUG,global:INFO,verify:FATAL,stacktrace:INFO"
                ]

                let log_file

                this.data_dir = options.app.data_dir

                if (options.app.testnet) {
                    this.testnet = true
                    this.wallet_dir = path.join(options.app.data_dir, "testnet", "wallets")
                    log_file = path.join(options.app.data_dir, "testnet", "logs", "wallet-rpc.log")
                    args.push("--testnet")
                    args.push("--log-file", log_file)
                    args.push("--wallet-dir", this.wallet_dir)
                } else {
                    this.wallet_dir = path.join(options.app.data_dir, "wallets")
                    log_file = path.join(options.app.data_dir, "logs", "wallet-rpc.log")
                    args.push("--log-file", log_file)
                    args.push("--wallet-dir", this.wallet_dir)
                }

                if (fs.existsSync(log_file)) { fs.truncateSync(log_file, 0) }

                if (process.platform === "win32") {
                    this.walletRPCProcess = child_process.spawn(path.join(__arqma_bin, "arqma-wallet-rpc.exe"), args)
                } else {
                    this.walletRPCProcess = child_process.spawn(path.join(__arqma_bin, "arqma-wallet-rpc"), args, {
                        detached: true
                    })
                }

                // save this info for later RPC calls
                this.protocol = "http://"
                this.hostname = "127.0.0.1"
                this.port = options.wallet.rpc_bind_port

                this.walletRPCProcess.stdout.on("data", (data) => {
                    process.stdout.write(`Wallet: ${data}`)

                    let lines = data.toString().split("\n")
                    let match, height = null
                    lines.forEach((line) => {
                        match = line.match(this.height_regex1)
                        if (match) {
                            height = match[2]
                        } else {
                            match = line.match(this.height_regex2)
                            if (match) {
                                height = match[1]
                            } else {
                                match = line.match(this.height_regex3)
                                if (match) {
                                    height = match[1]
                                }
                            }
                        }
                    })
                    if (height && Date.now() - this.last_height_send_time > 1000) {
                        this.last_height_send_time = Date.now()
                        this.sendGateway("set_wallet_data", {
                            info: {
                                height
                            }
                        })
                    }
                })
                this.walletRPCProcess.on("error", err => process.stderr.write(`Wallet: ${err}\n`))
                this.walletRPCProcess.on("close", code => process.stderr.write(`Wallet: exited with code ${code}\n`))

                // To let caller know when the wallet is ready
                let intrvl = setInterval(async() => {
                    const getLanguagesData = await this.sendRPC("get_languages")
                    if (!getLanguagesData.hasOwnProperty("error")) {
                        clearInterval(intrvl)
                        resolve()
                    } else {
                        if (getLanguagesData.error.cause &&
                            getLanguagesData.error.cause === "ECONNREFUSED") {
                            // Ignore
                        } else {
                            clearInterval(intrvl)
                            reject(getLanguagesData.error)
                        }
                    }
                }, 1000)
            })
        })
    }

    async handle (data) {
        let params = data.data

        console.log(`>>>>>>>>>>>>>>>>>>>>>>${data.method}<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)

        switch (data.method) {
        case "validate_address":
            await this.validateAddress(params.address)
            break

        case "has_password":
            this.hasPassword()
            break

        case "list_wallets":
            this.listWallets()
            break

        case "create_wallet":
            await this.createWallet(params.name, params.password, params.language, params.type)
            break

        case "restore_wallet":
            await this.restoreWallet(params.name, params.password, params.seed,
                params.refresh_type, params.refresh_type === "date" ? params.refresh_start_date : params.refresh_start_height)
            break

        case "restore_view_wallet":
            await this.restoreViewWallet(params.name, params.password, params.address, params.viewkey,
                params.refresh_type, params.refresh_type === "date" ? params.refresh_start_date : params.refresh_start_height)
            break

        case "import_wallet":
            await this.importWallet(params.name, params.password, params.path)
            break

        case "open_wallet":
            await this.openWallet(params.name, params.password)
            break

        case "close_wallet":
            this.closeWallet()
            break

        case "transfer":
            this.transfer(params.password, params.amount, params.address, params.payment_id, params.ringsize, params.priority, params.address_book)
            break

        case "prove_transaction":
            await this.proveTransaction(params.txid, params.address, params.message)
            break

        case "check_transaction":
            await this.checkTransactionProof(params.signature, params.txid, params.address, params.message)
            break

        case "add_address_book":
            await this.addAddressBook(params.address, params.payment_id,
                params.description, params.name, params.starred,
                params.hasOwnProperty("index") ? params.index : false
            )
            break

        case "delete_address_book":
            await this.deleteAddressBook(params.hasOwnProperty("index") ? params.index : false)
            break

        case "save_tx_notes":
            await this.saveTxNotes(params.txid, params.note)
            break

        case "rescan_blockchain":
            await this.rescanBlockchain()
            break
        case "rescan_spent":
            this.rescanSpent()
            break
        case "get_private_keys":
            this.getPrivateKeys(params.password)
            break
        case "export_key_images":
            this.exportKeyImages(params.password, params.path)
            break
        case "import_key_images":
            this.importKeyImages(params.password, params.path)
            break

        case "change_wallet_password":
            this.changeWalletPassword(params.old_password, params.new_password)
            break

        case "delete_wallet":
            this.deleteWallet(params.password)
            break

        case "export_transactions":
            this.exportTransactions(params)
            break

        default:
        }
    }

    async createWallet (filename, password, language, type) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>createWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        let short_address = type === "kurz"

        const createWalletData = this.sendRPC("create_wallet", {
            filename,
            password,
            language,
            short_address
        })
        if (createWalletData.hasOwnProperty("error")) {
            this.sendGateway("set_wallet_error", { status: createWalletData.error })
            return
        }

        // store hash of the password so we can check against it later when requesting private keys, or for sending txs
        this.wallet_state.password_hash = crypto.pbkdf2Sync(password, this.auth[2], 1000, 64, "sha512").toString("hex")
        this.wallet_state.name = filename
        this.wallet_state.open = true

        this.finalizeNewWallet(filename, true)
    }

    hasPassword () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>hasPassword<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        if (this.wallet_state.password_hash === null) {
            this.sendGateway("set_has_password", false)
            return
        }

        crypto.pbkdf2("", this.auth[2], 1000, 64, "sha512", (err, password_hash) => {
            if (err) {
                this.sendGateway("set_has_password", false)
                return
            }

            // If the pass hash doesn't match empty string then we don't have a password
            this.sendGateway("set_has_password", this.wallet_state.password_hash !== password_hash.toString("hex"))
        })
    }

    async validateAddress (address) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>validateAddress<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        let validateAddressData = await this.sendRPC("validate_address", {address})
        if (validateAddressData.hasOwnProperty("error")) {
            this.sendGateway("set_valid_address", {
                address,
                valid: false
            })
            return
        }

        const { valid, nettype } = validateAddressData.result
        const netMatches = this.net_type === nettype
        const isValid = valid && netMatches
        this.sendGateway("set_valid_address", {
            address,
            valid: isValid,
            nettype
        })
    }

    async restoreWallet (filename, password, seed, refresh_type, refresh_start_timestamp_or_height) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>restoreWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        if (refresh_type === "date") {
            // Convert timestamp to 00:00 and move back a day
            // Core code also moved back some amount of blocks
            let timestamp = refresh_start_timestamp_or_height
            timestamp = timestamp - (timestamp % 86400000) - 86400000

            this.sendGateway("reset_wallet_error")
            this.backend.daemon.timestampToHeight(timestamp).then((height) => {
                if (height === false) {
                    this.sendGateway("set_wallet_error", { status: { code: -1, i18n: "notification.errors.invalidRestoreDate" } })
                } else {
                    this.restoreWallet(filename, password, seed, "height", height)
                }
            })
            return
        }

        let restore_height = refresh_start_timestamp_or_height

        if (!Number.isInteger(restore_height)) {
            restore_height = 0
        }
        seed = seed.trim().replace(/\s{2,}/g, " ")

        this.sendGateway("reset_wallet_error")
        let restorDeterministicWalletData = await this.sendRPC("restore_deterministic_wallet", {
            filename,
            password,
            seed,
            restore_height
        })
        if (restorDeterministicWalletData.hasOwnProperty("error")) {
            this.sendGateway("set_wallet_error", { status: restorDeterministicWalletData.error })
            return
        }

        // store hash of the password so we can check against it later when requesting private keys, or for sending txs
        this.wallet_state.password_hash = crypto.pbkdf2Sync(password, this.auth[2], 1000, 64, "sha512").toString("hex")
        this.wallet_state.name = filename
        this.wallet_state.open = true

        this.finalizeNewWallet(filename)
    }

    async restoreViewWallet (filename, password, address, viewkey, refresh_type, refresh_start_timestamp_or_height) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>restoreViewWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        if (refresh_type === "date") {
            // Convert timestamp to 00:00 and move back a day
            // Core code also moved back some amount of blocks
            let timestamp = refresh_start_timestamp_or_height
            timestamp = timestamp - (timestamp % 86400000) - 86400000

            this.backend.daemon.timestampToHeight(timestamp).then((height) => {
                if (height === false) { this.sendGateway("set_wallet_error", { status: { code: -1, message: "Invalid restore date" } }) } else { this.restoreViewWallet(filename, password, address, viewkey, "height", height) }
            })
            return
        }

        let refresh_start_height = refresh_start_timestamp_or_height

        if (!Number.isInteger(refresh_start_height)) {
            refresh_start_height = 0
        }

        let restoreViewWalletData = await this.sendRPC("restore_view_wallet", {
            filename,
            password,
            address,
            viewkey,
            refresh_start_height
        })
        if (restoreViewWalletData.hasOwnProperty("error")) {
            this.sendGateway("set_wallet_error", { status: restoreViewWalletData.error })
            return
        }

        // store hash of the password so we can check against it later when requesting private keys, or for sending txs
        this.wallet_state.password_hash = crypto.pbkdf2Sync(password, this.auth[2], 1000, 64, "sha512").toString("hex")
        this.wallet_state.name = filename
        this.wallet_state.open = true

        this.finalizeNewWallet(filename)
    }

    async importWallet (filename, password, import_path) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>importWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        // trim off suffix if exists
        if (import_path.endsWith(".keys")) {
            import_path = import_path.substring(0, import_path.length - ".keys".length)
        } else if (import_path.endsWith(".address.txt")) {
            import_path = import_path.substring(0, import_path.length - ".address.txt".length)
        }

        if (!fs.existsSync(import_path)) {
            this.sendGateway("set_wallet_error", { status: { code: -1, message: "Invalid wallet path" } })
        } else {
            let destination = path.join(this.wallet_dir, filename)

            if (fs.existsSync(destination) || fs.existsSync(destination + ".keys")) {
                this.sendGateway("set_wallet_error", { status: { code: -1, message: "Wallet with name already exists" } })
                return
            }

            fs.copyFileSync(import_path, destination, fs.constants.COPYFILE_EXCL)

            if (fs.existsSync(import_path + ".keys")) {
                fs.copyFileSync(import_path + ".keys", destination + ".keys", fs.constants.COPYFILE_EXCL)
            }

            let openWalletData = await this.sendRPC("open_wallet", {
                filename,
                password
            })
            if (openWalletData.hasOwnProperty("error")) {
                fs.unlinkSync(destination)
                fs.unlinkSync(destination + ".keys")

                this.sendGateway("set_wallet_error", { status: openWalletData.error })
                return
            }

            // store hash of the password so we can check against it later when requesting private keys, or for sending txs
            this.wallet_state.password_hash = crypto.pbkdf2Sync(password, this.auth[2], 1000, 64, "sha512").toString("hex")
            this.wallet_state.name = filename
            this.wallet_state.open = true

            this.finalizeNewWallet(filename)
        }
    }

    async finalizeNewWallet (filename, newly_created = false) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>finalizeNewWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        let data = []
        data.push(await this.sendRPC("get_address"))
        data.push(await this.sendRPC("getheight"))
        data.push(await this.sendRPC("getbalance", { account_index: 0 }))
        data.push(await this.sendRPC("query_key", { key_type: "mnemonic" }))
        data.push(await this.sendRPC("query_key", { key_type: "spend_key" }))
        data.push(await this.sendRPC("query_key", { key_type: "view_key" }))
        let wallet = {
            info: {
                name: filename,
                address: "",
                balance: 0,
                unlocked_balance: 0,
                height: 0,
                view_only: false,
                newly_created
            },
            secret: {
                mnemonic: "",
                spend_key: "",
                view_key: ""
            }
        }
        for (let n of data) {
            if (n.hasOwnProperty("error") || !n.hasOwnProperty("result")) {
                continue
            }
            if (n.method === "get_address") {
                wallet.info.address = n.result.address
            } else if (n.method === "getheight") {
                wallet.info.height = n.result.height
            } else if (n.method === "getbalance") {
                wallet.info.balance = n.result.balance
                wallet.info.unlocked_balance = n.result.unlocked_balance
            } else if (n.method === "query_key") {
                wallet.secret[n.params.key_type] = n.result.key
                if (n.params.key_type === "spend_key") {
                    if (/^0*$/.test(n.result.key)) {
                        wallet.info.view_only = true
                    }
                }
            }
        }

        await this.saveWallet()
        let address_txt_path = path.join(this.wallet_dir, filename + ".address.txt")
        if (!fs.existsSync(address_txt_path)) {
            fs.writeFile(address_txt_path, wallet.info.address, "utf8", () => {
                this.listWallets()
            })
        } else {
            this.listWallets()
        }

        this.sendGateway("set_wallet_data", wallet)

        this.startHeartbeat()
    }

    async openWallet (filename, password) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>openWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        let openWalletData = await this.sendRPC("open_wallet", {filename, password})
        if (openWalletData.hasOwnProperty("error")) {
            this.sendGateway("set_wallet_error", { status: openWalletData.error })
            return
        }

        let address_txt_path = path.join(this.wallet_dir, filename + ".address.txt")
        if (!fs.existsSync(address_txt_path)) {
            try {
                let getAddressData = await this.sendRPC("get_address", { account_index: 0 })
                if (getAddressData.hasOwnProperty("error") || !getAddressData.hasOwnProperty("result")) {
                    return
                }
                fs.writeFile(address_txt_path, getAddressData.result.address, "utf8", () => {
                    this.listWallets()
                })
            } catch(error) {
                return
            }
        }

        // store hash of the password so we can check against it later when requesting private keys, or for sending txs
        this.wallet_state.password_hash = crypto.pbkdf2Sync(password, this.auth[2], 1000, 64, "sha512").toString("hex")
        this.wallet_state.name = filename
        this.wallet_state.open = true

        this.startHeartbeat()

        // Check if we have a view only wallet by querying the spend key
        let queryKeyData = await this.sendRPC("query_key", { key_type: "spend_key" })
        if (queryKeyData.hasOwnProperty("error") || !queryKeyData.hasOwnProperty("result")) {
            return
        }
        console.log('before test ', queryKeyData.result.key)
        if (/^0*$/.test(queryKeyData.result.key)) {
            console.log('after test ', queryKeyData.result.key)
            this.sendGateway("set_wallet_data", {
                info: {
                    view_only: true
                }
            })
        }
    }

    startHeartbeat () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>startHeartbeat<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        clearInterval(this.heartbeat)
        this.heartbeat = setInterval(() => {
            this.heartbeatAction()
        }, 5000)
        this.heartbeatAction(true)
    }

    async heartbeatAction (extended = false) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>heartbeatAction<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        let data = []
        data.push(await this.sendRPC("get_address", { account_index: 0 }, 5000))
        data.push(await this.sendRPC("getheight", {}, 5000))
        data.push(await this.sendRPC("getbalance", { account_index: 0 }, 5000))

        let didError = false
        let wallet = {
            status: {
                code: 0,
                message: "OK"
            },
            info: {
                name: this.wallet_state.name
            },
            transactions: {
                tx_list: []
            },
            address_list: {
                primary: [],
                used: [],
                unused: [],
                address_book: [],
                address_book_starred: []
            }
        }

        for (let n of data) {
            if (n.hasOwnProperty("error") || !n.hasOwnProperty("result")) {
                // Maybe we also need to look into the other error codes it could give us
                // Error -13: No wallet file - This occurs when you call open wallet while another wallet is still syncing
                if (extended && n.error && n.error.code === -13) {
                    didError = true
                }
                continue
            }

            if (n.method === "getheight") {
                wallet.info.height = n.result.height
                this.sendGateway("set_wallet_data", {
                    info: {
                        height: n.result.height
                    }
                })
            } else if (n.method === "get_address") {
                wallet.info.address = n.result.address
                this.sendGateway("set_wallet_data", {
                    info: {
                        address: n.result.address
                    }
                })
            } else if (n.method === "getbalance") {
                if (this.wallet_state.balance === n.result.balance &&
                    this.wallet_state.unlocked_balance === n.result.unlocked_balance) {
                    // continue
                }

                this.wallet_state.balance = wallet.info.balance = n.result.balance
                this.wallet_state.unlocked_balance = wallet.info.unlocked_balance = n.result.unlocked_balance
                this.sendGateway("set_wallet_data", {
                    info: wallet.info
                })

                // if balance has recently changed, get updated list of transactions and used addresses
                let actions = [
                    this.getTransactions(),
                    this.getAddressList()
                ]
                if (true || extended) {
                    actions.push(this.getAddressBook())
                }
                Promise.all(actions).then((data) => {
                    for (let n of data) {
                        Object.keys(n).map(key => {
                            wallet[key] = Object.assign(wallet[key], n[key])
                        })
                    }
                    this.sendGateway("set_wallet_data", wallet)
                })
            }
        }

        // Set the wallet state on initial heartbeat
        if (extended) {
            if (!didError) {
                this.sendGateway("set_wallet_data", wallet)
            } else {
                this.closeWallet().then(() => {
                    this.sendGateway("set_wallet_error", { status: { code: -1, i18n: "notification.errors.failedWalletOpen" } })
                })
            }
        }
    }

    transfer (password, amount, address, payment_id, priority, note, address_book = {}) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>transfer<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        console.log(password, amount, address, payment_id, priority, note, address_book)
        crypto.pbkdf2(password, this.auth[2], 1000, 64, "sha512", async (err, password_hash) => {
            if (err) {
                console.log("error")
                this.sendGateway("set_tx_status", {
                    code: -1,
                    i18n: "notification.errors.internalError",
                    sending: false
                })
                return
            }
            // if (!this.isValidPasswordHash(password_hash)) {
            if (this.wallet_state.password_hash !== password_hash.toString("hex")) {
                console.log("invalidHash")
                this.sendGateway("set_tx_status", {
                    code: -1,
                    i18n: "notification.errors.invalidPassword",
                    sending: false
                })
                return
            }

            amount = (parseFloat(amount) * 1e9).toFixed(0)

            let sweep_all = amount === this.wallet_state.unlocked_balance

            const rpc_endpoint = sweep_all ? "sweep_all" : "transfer_split"
            const params = sweep_all ? {
                "address": address,
                "account_index": 0,
                "priority": priority,
                "mixin": 10 // Always force a ring size of 10 (ringsize = mixin + 1)
            } : {
                "destinations": [{ "amount": amount, "address": address }],
                "priority": priority,
                "mixin": 10
            }

            if (payment_id) {
                params.payment_id = payment_id
            }

            const transferData = await this.sendRPC(rpc_endpoint, params)
            if (transferData.hasOwnProperty("error")) {
                let error = transferData.error.message.charAt(0).toUpperCase() + transferData.error.message.slice(1)
                this.sendGateway("set_tx_status", {
                    code: -1,
                    message: error,
                    sending: false
                })
                return
            }
            this.sendGateway("set_tx_status", {
                code: 0,
                i18n: "notification.positive.sendSuccess",
                sending: false
            })

            if (transferData.result) {
                const hash_list = transferData.result.tx_hash_list || []
                // Save notes
                if (note && note !== "") {
                    hash_list.forEach(txid => this.saveTxNotes(txid, note))
                }
            }

            if (address_book.hasOwnProperty("save") && address_book.save) { this.addAddressBook(address, payment_id, address_book.description, address_book.name) }
        })
    }

    async proveTransaction (txid, address, message) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>proveTransaction<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        const _address = address.trim() === "" ? null : address
        const _message = message.trim() === "" ? null : message

        const rpc_endpoint = _address ? "get_tx_proof" : "get_spend_proof"
        const params = {
            txid,
            address: _address,
            message: _message
        }

        this.sendGateway("set_prove_transaction_status", {
            code: 1,
            message: ""
        })

        let proveTransactionData = await this.sendRPC(rpc_endpoint, params)
        if (proveTransactionData.hasOwnProperty("error")) {
            let error = proveTransactionData.error.message.charAt(0).toUpperCase() + proveTransactionData.error.message.slice(1)
            this.sendGateway("set_prove_transaction_status", {
                code: -1,
                message: error,
                state: {}
            })
            return
        }

        this.sendGateway("set_prove_transaction_status", {
            code: 0,
            message: "",
            state: {
                txid,
                ...(proveTransactionData.result || {})
            }
        })
    }

    async checkTransactionProof (signature, txid, address, message) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>checkTransactionProof<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        const _address = address.trim() === "" ? null : address
        const _message = message.trim() === "" ? null : message

        const rpc_endpoint = _address ? "check_tx_proof" : "check_spend_proof"
        const params = {
            txid,
            signature,
            address: _address,
            message: _message
        }

        this.sendGateway("set_check_transaction_status", {
            code: 1,
            message: ""
        })

        let checkTransactionProofData = await this.sendRPC(rpc_endpoint, params)
        if (checkTransactionProofData.hasOwnProperty("error")) {
            let error = checkTransactionProofData.error.message.charAt(0).toUpperCase() + checkTransactionProofData.error.message.slice(1)
            this.sendGateway("set_check_transaction_status", {
                code: -1,
                message: error,
                state: {}
            })
            return
        }

        this.sendGateway("set_check_transaction_status", {
            code: 0,
            message: "",
            state: {
                txid,
                ...(checkTransactionProofData.result || {})
            }
        })
    }
    async rescanBlockchain () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>rescanBlockchain<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        await this.sendRPC("rescan_blockchain")
    }

    async rescanSpent () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>rescanSpent<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        await this.sendRPC("rescan_spent")
    }

    getPrivateKeys (password) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>getPrivateKeys<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        crypto.pbkdf2(password, this.auth[2], 1000, 64, "sha512", async (err, password_hash) => {
            if (err) {
                this.sendGateway("set_wallet_data", {
                    secret: {
                        mnemonic: "Internal error",
                        spend_key: -1,
                        view_key: -1
                    }
                })
                return
            }
            if (this.wallet_state.password_hash !== password_hash.toString("hex")) {
                this.sendGateway("set_wallet_data", {
                    secret: {
                        mnemonic: "Invalid password",
                        spend_key: -1,
                        view_key: -1
                    }
                })
                return
            }
            let wallet = {
                    secret: {
                        mnemonic: "",
                        spend_key: "",
                        view_key: ""
                    }
                }
            const mnemonicData = await this.sendRPC("query_key", { key_type: "mnemonic" })
            if (!mnemonicData.hasOwnProperty("error") && mnemonicData.hasOwnProperty("result")) {
                wallet.secret[mnemonicData.params.key_type] = mnemonicData.result.key
            }

            const queryKeyData = await this.sendRPC("query_key", { key_type: "spend_key" })
            if (!queryKeyData.hasOwnProperty("error") && queryKeyData.hasOwnProperty("result")) {
                wallet.secret[queryKeyData.params.key_type] = queryKeyData.result.key
            }

            const spendKeyData = await this.sendRPC("query_key", { key_type: "view_key" })
            if (!spendKeyData.hasOwnProperty("error") && spendKeyData.hasOwnProperty("result")) {
                wallet.secret[spendKeyData.params.key_type] = spendKeyData.result.key
            }
            this.sendGateway("set_wallet_data", wallet)
        })
    }

    getAddressList () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>getAddressList<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        return new Promise(async(resolve, reject) => {

            const getAddressData = await this.sendRPC("get_address", { account_index: 0 })
            if (getAddressData.hasOwnProperty("error") || !getAddressData.hasOwnProperty("result")) {
                resolve({})
                return
            }
            const getBalanceData = await this.sendRPC("getbalance", { account_index: 0 })
            if (getBalanceData.hasOwnProperty("error") || !getBalanceData.hasOwnProperty("result")) {
                resolve({})
                return
            }
            let num_unused_addresses = 10
            let wallet = {
                info: {
                    address: getAddressData.result.address,
                    balance: getBalanceData.result.balance,
                    unlocked_balance: getBalanceData.result.unlocked_balance
                    // num_unspent_outputs: getBalanceData.result.num_unspent_outputs
                },
                address_list: {
                    primary: [],
                    used: [],
                    unused: []
                }
            }

            for (let address of getAddressData.result.addresses) {
                address.balance = null
                address.unlocked_balance = null
                address.num_unspent_outputs = null

                if (getBalanceData.result.hasOwnProperty("per_subaddress")) {
                    for (let address_balance of getBalanceData.result.per_subaddress) {
                        if (address_balance.address_index === address.address_index) {
                            address.balance = address_balance.balance
                            address.unlocked_balance = address_balance.unlocked_balance
                            address.num_unspent_outputs = address_balance.num_unspent_outputs
                            break
                        }
                    }
                }

                if (address.address_index === 0) {
                    wallet.address_list.primary.push(address)
                } else if (address.used) {
                    wallet.address_list.used.push(address)
                } else {
                    wallet.address_list.unused.push(address)
                }
            }

            // limit to 10 unused addresses
            wallet.address_list.unused = wallet.address_list.unused.slice(0, 10)

            if (wallet.address_list.unused.length < num_unused_addresses &&
                !wallet.address_list.primary[0].address.startsWith("ar") &&
                !wallet.address_list.primary[0].address.startsWith("aRi")) {
                for (let n = wallet.address_list.unused.length; n < num_unused_addresses; n++) {
                    let createAddressData = await this.sendRPC("create_address", { account_index: 0 })
                    wallet.address_list.unused.push(createAddressData.result)
                    if (wallet.address_list.unused.length == num_unused_addresses) {
                        // should sort them here
                        resolve(wallet)
                    }
                }
            } else {
                resolve(wallet)
            }
        })
    }

    getTransactions () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>getTransactions<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        return new Promise(async (resolve, reject) => {
            let getTransfersData = await this.sendRPC("get_transfers", { in: true, out: true, pending: true, failed: true, pool: true })
            if (getTransfersData.hasOwnProperty("error") || !getTransfersData.hasOwnProperty("result")) {
                resolve({})
                return
            }
            let wallet = {
                transactions: {
                    tx_list: []
                }
            }

            if (getTransfersData.result.hasOwnProperty("in")) { 
                wallet.transactions.tx_list = wallet.transactions.tx_list.concat(getTransfersData.result.in) 
            }
            if (getTransfersData.result.hasOwnProperty("out")) { 
                wallet.transactions.tx_list = wallet.transactions.tx_list.concat(getTransfersData.result.out) 
            }
            if (getTransfersData.result.hasOwnProperty("pending")) { 
                wallet.transactions.tx_list = wallet.transactions.tx_list.concat(getTransfersData.result.pending) 
            }
            if (getTransfersData.result.hasOwnProperty("failed")) { 
                wallet.transactions.tx_list = wallet.transactions.tx_list.concat(getTransfersData.result.failed) 
            }
            if (getTransfersData.result.hasOwnProperty("pool")) { 
                wallet.transactions.tx_list = wallet.transactions.tx_list.concat(getTransfersData.result.pool) 
            }

            for (let i = 0; i < wallet.transactions.tx_list.length; i++) {
                if (/^0*$/.test(wallet.transactions.tx_list[i].payment_id)) {
                    wallet.transactions.tx_list[i].payment_id = ""
                } else if (/^0*$/.test(wallet.transactions.tx_list[i].payment_id.substring(16))) {
                    wallet.transactions.tx_list[i].payment_id = wallet.transactions.tx_list[i].payment_id.substring(0, 16)
                }
            }

            wallet.transactions.tx_list.sort(function (a, b) {
                if (a.timestamp < b.timestamp) return 1
                if (a.timestamp > b.timestamp) return -1
                return 0
            })

            resolve(wallet)
        })
    }

    getAddressBook () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>getAddressBook<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        return new Promise(async (resolve, reject) => {
            const getAddressBookData = await this.sendRPC("get_address_book")
            if (getAddressBookData.hasOwnProperty("error") || !getAddressBookData.hasOwnProperty("result")) {
                resolve({})
                return
            }
            let wallet = {
                address_list: {
                    address_book: [],
                    address_book_starred: []
                }
            }

            if (getAddressBookData.result.entries) {
                let i
                for (i = 0; i < getAddressBookData.result.entries.length; i++) {
                    let entry = getAddressBookData.result.entries[i]
                    let desc = entry.description.split("::")
                    if (desc.length === 3) {
                        entry.starred = desc[0] === "starred"
                        entry.name = desc[1]
                        entry.description = desc[2]
                    } else if (desc.length === 2) {
                        entry.starred = false
                        entry.name = desc[0]
                        entry.description = desc[1]
                    } else {
                        entry.starred = false
                        entry.name = entry.description
                        entry.description = ""
                    }

                    if (/^0*$/.test(entry.payment_id)) {
                        entry.payment_id = ""
                    } else if (/^0*$/.test(entry.payment_id.substring(16))) {
                        entry.payment_id = entry.payment_id.substring(0, 16)
                    }

                    if (entry.starred) { wallet.address_list.address_book_starred.push(entry) } else { wallet.address_list.address_book.push(entry) }
                }
            }

            resolve(wallet)
        })
    }

    async deleteAddressBook (index = false) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>deleteAddressBook<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        if (index !== false) {
            await this.sendRPC("delete_address_book", { index: index })
            await this.saveWallet()
            const getAddressBookData = await this.getAddressBook()
            this.sendGateway("set_wallet_data", getAddressBookData)
        }
    }

    async addAddressBook (address, payment_id = null, description = "", name = "", starred = false, index = false) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>addAddressBook<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        if (index !== false) {
            await this.sendRPC("delete_address_book", { index: index })
            await this.addAddressBook(address, payment_id, description, name, starred)
            return
        }

        let params = {
            address
        }
        if (payment_id != null) { params.payment_id = payment_id }

        let desc = [
        ]
        if (starred) {
            desc.push("starred")
        }
        desc.push(name, description)

        params.description = desc.join("::")

        await this.sendRPC("add_address_book", params)
        await this.saveWallet()
        const getAddressBookData = await this.getAddressBook()
        this.sendGateway("set_wallet_data", getAddressBookData)
    }

    async saveTxNotes (txid, note) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>saveTxNotes<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        await this.sendRPC("set_tx_notes", { txids: [txid], notes: [note] })
        const walletData = await this.getTransactions()
        this.sendGateway("set_wallet_data", walletData)
    }

    exportKeyImages (password, filename = null) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>exportKeyImages<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        crypto.pbkdf2(password, this.auth[2], 1000, 64, "sha512", async(err, password_hash) => {
            if (err) {
                this.sendGateway("show_notification", { type: "negative", message: "Internal error", timeout: 2000 })
                return
            }
            if (this.wallet_state.password_hash !== password_hash.toString("hex")) {
                this.sendGateway("show_notification", { type: "negative", message: "Invalid password", timeout: 2000 })
                return
            }

            if (filename == null) { filename = path.join(this.data_dir, "gui", "key_image_export") } else { filename = path.join(filename, "key_image_export") }

            const exportKeyImagesData = await this.sendRPC("export_key_images", { filename })
            if (exportKeyImagesData.hasOwnProperty("error") || !exportKeyImagesData.hasOwnProperty("result")) {
                this.sendGateway("show_notification", { type: "negative", message: "Error exporting key images", timeout: 2000 })
                return
            }

            this.sendGateway("show_notification", { message: "Key images exported to " + filename, timeout: 2000 })
        })
    }

    importKeyImages (password, filename = null) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>importKeyImages<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        crypto.pbkdf2(password, this.auth[2], 1000, 64, "sha512", async (err, password_hash) => {
            if (err) {
                this.sendGateway("show_notification", { type: "negative", message: "Internal error", timeout: 2000 })
                return
            }
            if (this.wallet_state.password_hash !== password_hash.toString("hex")) {
                this.sendGateway("show_notification", { type: "negative", message: "Invalid password", timeout: 2000 })
                return
            }

            if (filename == null) { filename = path.join(this.data_dir, "gui", "key_image_export") }

            const importKeyImagesData = await this.sendRPC("import_key_images", { filename })
            if (importKeyImagesData.hasOwnProperty("error") || !importKeyImagesData.hasOwnProperty("result")) {
                this.sendGateway("show_notification", { type: "negative", message: "Error importing key images", timeout: 2000 })
                return
            }

            this.sendGateway("show_notification", { message: "Key images imported", timeout: 2000 })
        })
    }

    listWallets (legacy = false) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>listWallets<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        let wallets = {
            list: []
        }

        fs.readdirSync(this.wallet_dir).forEach(filename => {
            if (filename.endsWith(".keys") ||
               filename.endsWith(".meta.json") ||
               filename.endsWith(".address.txt") ||
               filename.endsWith(".bkp-old") ||
               filename.endsWith(".unportable")) { return }

            switch (filename) {
            case ".DS_Store":
            case ".DS_Store?":
            case "._.DS_Store":
            case ".Spotlight-V100":
            case ".Trashes":
            case "ehthumbs.db":
            case "Thumbs.db":
                return
            }

            let wallet_data = {
                name: filename,
                address: null,
                password_protected: null
            }

            if (fs.existsSync(path.join(this.wallet_dir, filename + ".meta.json"))) {
                let meta = fs.readFileSync(path.join(this.wallet_dir, filename + ".meta.json"), "utf8")
                if (meta) {
                    meta = JSON.parse(meta)
                    wallet_data.address = meta.address
                    wallet_data.password_protected = meta.password_protected
                }
            } else if (fs.existsSync(path.join(this.wallet_dir, filename + ".address.txt"))) {
                let address = fs.readFileSync(path.join(this.wallet_dir, filename + ".address.txt"), "utf8")
                if (address) {
                    wallet_data.address = address
                }
            }

            wallets.list.push(wallet_data)
        })

        // Check for legacy wallet files
        if (legacy) {
            wallets.legacy = []
            let legacy_paths = []
            if (os.platform() === "win32") {
                legacy_paths = ["C:\\ProgramData\\arqma"]
            } else {
                legacy_paths = [path.join(os.homedir(), "Arqma")]
            }
            for (var i = 0; i < legacy_paths.length; i++) {
                let legacy_config_path = path.join(legacy_paths[i], "config", "wallet_info.json")
                if (this.testnet) { legacy_config_path = path.join(legacy_paths[i], "testnet", "config", "wallet_info.json") }
                if (!fs.existsSync(legacy_config_path)) { continue }
                let legacy_config = JSON.parse(fs.readFileSync(legacy_config_path, "utf8"))
                let legacy_wallet_path = legacy_config.wallet_filepath
                if (!fs.existsSync(legacy_wallet_path)) { continue }
                let legacy_address = ""
                if (fs.existsSync(legacy_wallet_path + ".address.txt")) {
                    legacy_address = fs.readFileSync(legacy_wallet_path + ".address.txt", "utf8")
                }
                wallets.legacy.push({ path: legacy_wallet_path, address: legacy_address })
            }
        }

        this.wallet_list = wallets.list

        this.sendGateway("wallet_list", wallets)
    }

    changeWalletPassword (old_password, new_password) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>changeWalletPassword<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        crypto.pbkdf2(old_password, this.auth[2], 1000, 64, "sha512", async (err, password_hash) => {
            if (err) {
                this.sendGateway("show_notification", { type: "negative", message: "Internal error", timeout: 2000 })
                return
            }
            if (this.wallet_state.password_hash !== password_hash.toString("hex")) {
                this.sendGateway("show_notification", { type: "negative", message: "Invalid old password", timeout: 2000 })
                return
            }

            const changeWalletPasswordData = await this.sendRPC("change_wallet_password", { old_password, new_password })
            if (changeWalletPasswordData.hasOwnProperty("error") || !changeWalletPasswordData.hasOwnProperty("result")) {
                this.sendGateway("show_notification", { type: "negative", message: "Error changing password", timeout: 2000 })
                return
            }

            // store hash of the password so we can check against it later when requesting private keys, or for sending txs
            this.wallet_state.password_hash = crypto.pbkdf2Sync(new_password, this.auth[2], 1000, 64, "sha512").toString("hex")

            this.sendGateway("show_notification", { message: "Password updated", timeout: 2000 })
        })
    }

    deleteWallet (password) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>deleteWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        crypto.pbkdf2(password, this.auth[2], 1000, 64, "sha512", async (err, password_hash) => {
            if (err) {
                this.sendGateway("show_notification", { type: "negative", message: "Internal error", timeout: 2000 })
                return
            }
            if (this.wallet_state.password_hash !== password_hash.toString("hex")) {
                this.sendGateway("show_notification", { type: "negative", message: "Invalid password", timeout: 2000 })
                return
            }

            let wallet_path = path.join(this.wallet_dir, this.wallet_state.name)
            await this.closeWallet()
            fs.unlinkSync(wallet_path)
            fs.unlinkSync(wallet_path + ".keys")
            fs.unlinkSync(wallet_path + ".address.txt")
            this.listWallets()
            this.sendGateway("return_to_wallet_select")
        })
    }

    saveWallet () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>saveWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        return new Promise(async (resolve, reject) => {
            await this.sendRPC("store")
            resolve()
        })
    }

    closeWallet () {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>closeWallet<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        return new Promise(async (resolve, reject) => {
            clearInterval(this.heartbeat)
            this.wallet_state = {
                open: false,
                name: "",
                password_hash: null,
                balance: null,
                unlocked_balance: null
            }
            this.wallet_info = {
                height: 0
            }

            await this.saveWallet()
            await this.sendRPC("close_wallet")
            resolve()
        })
    }

    sendGateway (method, data) {
        // if wallet is closed, do not send any wallet data to gateway
        // this is for the case that we close the wallet at the same
        // after another action has started, but before it has finished
        if (!this.wallet_state.open && method === "set_wallet_data") { return }
        this.backend.send(method, data)
    }

    async sendRPC (method, params = {}, timeout = 0) {
        let id = this.id++
        let url = `${this.protocol}${this.hostname}:${this.port}/json_rpc`
        let body = {
            jsonrpc: "2.0",
            id: id,
            method: method,
        }
        let options = {
            method: "POST",
            agent: this.agent
        }
        if (Object.keys(params).length !== 0) {
            body.params = params
        }
        if (timeout) {
            options.timeout = timeout
        }

        options.body = JSON.stringify(body)

        try {
            const client = new DigestFetch(this.auth[0], this.auth[1], {algorithm: 'MD5'})

            let response = await client.fetch(url, options)
            let data = await response.json()
            return {
                method: method,
                params: params,
                result: data.result
            }
        }catch(error) {
            return {
                method: method,
                params: params,
                error: {
                    code: -1,
                    message: "Cannot connect to wallet-rpc",
                    cause: error.errno
                }
            }
        }
    }

    getRPC (parameter, params = {}) {
        return this.sendRPC(`get_${parameter}`, params)
    }

    quit () {
        return new Promise((resolve, reject) => {
            if (this.walletRPCProcess) {
                this.closeWallet().then(() => {
                    // normally we would exit wallet after this promise
                    // however if the wallet is not responsive to RPC
                    // requests then we must forcefully close it below
                })
                setTimeout(() => {
                    this.walletRPCProcess.on("close", code => {
                        this.agent.destroy()
                        clearTimeout(this.forceKill)
                        resolve()
                    })

                    // Force kill after 20 seconds
                    this.forceKill = setTimeout(() => {
                        this.walletRPCProcess.kill("SIGKILL")
                    }, 20000)

                    // Force kill if the rpc is syncing
                    const signal = this.isRPCSyncing ? "SIGKILL" : "SIGTERM"
                    this.walletRPCProcess.kill(signal)
                }, 2500)
            } else {
                resolve()
            }
        })
    }

    exportTransactions (params) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>exportTransactions<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        return new Promise((resolve, reject) => {
            if (params.hasOwnProperty("export_path")) {
                if (!fs.existsSync(params.export_path)) 
                { 
                    fs.mkdirSync(params.export_path) 
                }
                this.getTransactions(params.options)
                    .then(data => {
                        let filename = `transactions-${new Date().toISOString()}.csv`
                        filename = filename.replace(/:\s*/g, ".")
                        let csv = fs.createWriteStream(path.join(params.export_path, filename), { encoding: "utf8", flags: "wx" })
                        if (params.header) { csv.write(params.headers) }
                        for (const [key, transaction] of Object.entries(data.transactions.tx_list)) {
                            csv.write(`${transaction.address},${transaction.amount / 1e9},${transaction.confirmations},${transaction.double_spend_seen},${transaction.fee / 1e9},${transaction.height},${transaction.note},${transaction.payment_id},${transaction.suggested_confirmations_threshold},${new Date(transaction.timestamp * 1000).toISOString()},${transaction.txid},${transaction.type},${transaction.unlock_time}\n`)
                        }
                        csv.end()
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                var reason = new Error("No export_path provided!")
                reject(reason)
            }
        })
    }
}
