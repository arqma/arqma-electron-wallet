import child_process from "child_process"
const http = require("http")
const fs = require("fs")
const path = require("path")
const zmq = require("zeromq")
const { fromEvent } = require("rxjs")
const fetch = require("node-fetch")

export class Daemon {
    constructor (backend) {
        this.backend = backend
        this.heartbeat = null
        this.heartbeat_slow = null
        this.id = 0
        this.testnet = false
        this.local = false // do we have a local daemon ?

        this.daemon_info = {}
        this.dealer = {}
        this.agent = new http.Agent({ keepAlive: true, maxSockets: 1 })
        this.zmq_enabled = false
    }

    checkVersion () {
        return new Promise((resolve, reject) => {
            if (process.platform === "win32") {
                let arqmad_path = path.join(__arqma_bin, "arqmad.exe")
                let arqmad_version_cmd = `"${arqmad_path}" --version`
                if (!fs.existsSync(arqmad_path)) { resolve(false) }
                child_process.exec(arqmad_version_cmd, (error, stdout, stderr) => {
                    if (error) { resolve(false) }
                    resolve(stdout)
                })
            } else {
                let arqmad_path = path.join(__arqma_bin, "arqmad")
                let arqmad_version_cmd = `"${arqmad_path}" --version`
                if (!fs.existsSync(arqmad_path)) { resolve(false) }
                child_process.exec(arqmad_version_cmd, { detached: true }, (error, stdout, stderr) => {
                    if (error) { resolve(false) }
                    resolve(stdout)
                })
            }
        })
    }

    checkRemoteHeight () {
        let url = "https://explorer.arqma.com/api/networkinfo"
        if (this.testnet) {
            url = "https://stageblocks.arqma.com/api/networkinfo"
        }
        request(url).then(response => {
            try {
                const json = JSON.parse(response)
                if (json === null || typeof json !== "object" || !json.hasOwnProperty("data")) {
                    return
                }
                if (json.data.hasOwnProperty("height") && this.blocks.current != null) {
                    this.remote_height = json.data.height
                }
                this.remote_height = 0
            } catch (error) {
                this.remote_height = 0
            }
        })
    }

    checkRemoteDaemon (options) {
        if (options.daemon.type === "local") {
            return new Promise((resolve, reject) => {
                resolve({
                    result: {
                        mainnet: !options.app.testnet,
                        testnet: options.app.testnet
                    }
                })
            })
        } else {
            let uri = `http://${options.daemon.remote_host}:${options.daemon.remote_port}/json_rpc`
            return new Promise(async(resolve, reject) => {
                await this.sendRPC("get_info", {}, uri)
                resolve(data)
            })
        }
    }

    start (options) {
        if (options.daemon.type === "remote") {
            this.local = false

            // save this info for later RPC calls
            this.protocol = "http://"
            this.hostname = options.daemon.remote_host
            this.port = options.daemon.remote_port

            return new Promise(async(resolve, reject) => {
                const getInfoData = await this.sendRPC("get_info")
                if (!getInfoData.hasOwnProperty("error")) {
                    this.startHeartbeat()
                    resolve()
                } else {
                    reject()
                }
            })
        }
        return new Promise((resolve, reject) => {
            this.local = true

            const args = [
                "--data-dir", options.app.data_dir,
                "--out-peers", options.daemon.out_peers,
                "--in-peers", options.daemon.in_peers,
                "--limit-rate-up", options.daemon.limit_rate_up,
                "--limit-rate-down", options.daemon.limit_rate_down,
                "--log-level", options.daemon.log_level,
                "--rpc-bind-ip", options.daemon.rpc_bind_ip,
                "--rpc-bind-port", options.daemon.rpc_bind_port
            ]

            if (options.daemon.type === "local_zmq") {
                args.push("--zmq-enabled",
                    "--zmq-max_clients", 5,
                    "--zmq-bind-port",
                    options.daemon.zmq_bind_port)
            }

            this.zmq_enabled = options.daemon.type === "local_zmq"

            if (options.daemon.enhanced_ip_privacy) {
                args.push(
                    "--p2p-bind-ip", "127.0.0.1",
                    "--p2p-bind-port", options.daemon.p2p_bind_port,
                    "--no-igd",
                    "--hide-my-port"
                )
            } else {
                args.push(
                    "--p2p-bind-ip", options.daemon.p2p_bind_ip,
                    "--p2p-bind-port", options.daemon.p2p_bind_port
                )
            }

            if (options.app.testnet) {
                this.testnet = true
                args.push("--testnet")
                args.push("--log-file", path.join(options.app.data_dir, "testnet", "logs", "arqmad.log"))
                // args.push("--add-peer", "45.77.68.151:13310")
            } else {
                args.push("--log-file", path.join(options.app.data_dir, "logs", "arqmad.log"))
            }

            if (options.daemon.rpc_bind_ip !== "127.0.0.1") { args.push("--confirm-external-bind") }

            if (options.daemon.type === "local_remote" && !options.app.testnet) {
                args.push(
                    "--bootstrap-daemon-address",
                    `${options.daemon.remote_host}:${options.daemon.remote_port}`
                )
            }

            if (process.platform === "win32") {
                this.daemonProcess = child_process.spawn(path.join(__arqma_bin, "arqmad.exe"), args)
            } else {
                this.daemonProcess = child_process.spawn(path.join(__arqma_bin, "arqmad"), args, {
                    detached: true
                })
            }

            // save this info for later RPC calls
            this.protocol = "http://"
            this.hostname = options.daemon.rpc_bind_ip
            this.port = options.daemon.rpc_bind_port

            this.daemonProcess.on("error", err => process.stderr.write(`Daemon: ${err}\n`))
            this.daemonProcess.on("close", code => process.stderr.write(`Daemon: exited with code ${code}\n`))

            if (options.daemon.type !== "local_zmq") {
                this.daemonProcess.stdout.on("data", data => process.stdout.write(`Daemon: ${data}`))

                // To let caller know when the daemon is ready
                let intrvl = setInterval(async() => {
                    const getInfoData = await this.sendRPC("get_info")
                    if (!getInfoData.hasOwnProperty("error")) {
                        clearInterval(intrvl)
                        this.startHeartbeat()
                        resolve()
                    } else {
                        if (getInfoData.error.cause &&
                            getInfoData.error.cause === "ECONNREFUSED") {
                            // Ignore
                        } else {
                            clearInterval(intrvl)
                            reject(error)
                        }
                    }
                }, 2000)
            } else {
                this.checkRemoteHeight()
                this.startZMQ(options)
                let getinfo = { "jsonrpc": "2.0",
                    "id": "1",
                    "method": "get_info",
                    "params": {} }
                this.dealer.send(["", JSON.stringify(getinfo)])
                resolve()
            }
        })
    }

    randomBetween (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    randomString () {
        var source = "abcdefghijklmnopqrstuvwxyz"
        var target = []
        for (var i = 0; i < 20; i++) {
            target.push(source[this.randomBetween(0, source.length)])
        }
        return target.join("")
    }

    startZMQ (options) {
        this.dealer = zmq.socket("dealer")
        this.dealer.identity = this.randomString()
        this.dealer.connect(`tcp://${options.daemon.rpc_bind_ip}:${options.daemon.zmq_bind_port}`)
        console.log(`Daemon Dealer connected to port ${options.daemon.rpc_bind_ip}:${options.daemon.zmq_bind_port}`)
        const zmqDirector = fromEvent(this.dealer, "message")
        zmqDirector.subscribe(x => {
            let daemon_info = {
            }
            let json = JSON.parse(x.toString())
            json.result.info.isDaemonSyncd = false
            daemon_info.info = json.result.info
            this.daemon_info = daemon_info
            if (json.result.info.height === json.result.info.target_height && json.result.info.height >= this.remote_height) {
                json.result.info.isDaemonSyncd = true
            }

            this.sendGateway("set_daemon_data", daemon_info)
        })
    }

    handle (data) {
        let params = data.data
        switch (data.method) {
        case "ban_peer":
            this.banPeer(params.host, params.seconds)
            break
        case "get_peers":
            clearInterval(this.heartbeat_slow)
            if (params.enabled) {
                this.heartbeat_slow = setInterval(() => {
                    this.heartbeatSlowAction()
                }, 10 * 1000) // 30 seconds
                this.heartbeatSlowAction()
            }
            break
        default:
        }
    }

    async banPeer (host, seconds = 3600) {
        if (!seconds) { seconds = 3600 }

        let params = {
            bans: [{
                host,
                seconds,
                ban: true
            }]
        }

        const setBansData = await this.sendRPC("set_bans", params)
        if (setBansData.hasOwnProperty("error") || !setBansData.hasOwnProperty("result")) {
            this.sendGateway("show_notification", { type: "negative", message: "Error banning peer", timeout: 2000 })
            return
        }

        let end_time = new Date(Date.now() + seconds * 1000).toLocaleString()
        this.sendGateway("show_notification", { message: "Banned " + host + " until " + end_time, timeout: 2000 })

        // Send updated peer and ban list
        this.heartbeatSlowAction()
    }

    timestampToHeight (timestamp, pivot = null, recursion_limit = null) {
        return new Promise(async(resolve, reject) => {
            if (timestamp > 999999999999) {
                // We have got a JS ms timestamp, convert
                timestamp = Math.floor(timestamp / 1000)
            }

            pivot = pivot || [137500, 1528073506]
            recursion_limit = recursion_limit || 0

            let diff = Math.floor((timestamp - pivot[1]) / 120)
            let estimated_height = pivot[0] + diff

            if (estimated_height <= 0) {
                return resolve(0)
            }

            if (recursion_limit > 10) {
                return resolve(pivot[0])
            }

            const blockHeaderByHeightData = await this.sendRPC("get_block_header_by_height", { height: estimated_height })
            if (blockHeaderByHeightData.hasOwnProperty("error") || !blockHeaderByHeightData.hasOwnProperty("result")) {
                if (blockHeaderByHeightData.error.code === -2) { // Too big height
                    const getLastBlockHeaderData = await this.sendRPC("get_last_block_header")
                    if (getLastBlockHeaderData.hasOwnProperty("error") || !getLastBlockHeaderData.hasOwnProperty("result")) {
                        return reject()
                    }

                    let new_pivot = [data.result.block_header.height, data.result.block_header.timestamp]

                    // If we are within an hour that is good enough
                    // If for some reason there is a > 1h gap between blocks
                    // the recursion limit will take care of infinite loop
                    if (Math.abs(timestamp - new_pivot[1]) < 3600) {
                        return resolve(new_pivot[0])
                    }

                    // Continue recursion with new pivot
                    resolve(new_pivot)
                    return
                } else {
                    return reject()
                }
            }

            let new_pivot = [data.result.block_header.height, data.result.block_header.timestamp]

            // If we are within an hour that is good enough
            // If for some reason there is a > 1h gap between blocks
            // the recursion limit will take care of infinite loop
            if (Math.abs(timestamp - new_pivot[1]) < 3600) {
                return resolve(new_pivot[0])
            }

            // Continue recursion with new pivot
            resolve(new_pivot)

        }).then((pivot_or_height) => {
            return Array.isArray(pivot_or_height)
                ? this.timestampToHeight(timestamp, pivot_or_height, recursion_limit + 1)
                : pivot_or_height
        }).catch(error => {
            return false
        })
    }

    async startHeartbeat () {
        clearInterval(this.heartbeat)
        this.heartbeat = setInterval(async() => {
            await this.heartbeatAction()
        }, this.local ? 5 * 1000 : 30 * 1000) // 5 seconds for local daemon, 30 seconds for remote
        await this.heartbeatAction()
    }

    async heartbeatAction () {
        let data = []

        // No difference between local and remote heartbeat action for now
        if (this.local) {
            data = [
                await this.sendRPC("get_info")
            ]
        } else {
            data = [
                await this.sendRPC("get_info")
            ]
        }


        let daemon_info = {
        }
        for (let n of data) {
            if (n === undefined || !n.hasOwnProperty("result") || n.result === undefined) { continue }
            if (n.method === "get_info") {
                daemon_info.info = n.result
                this.daemon_info = n.result
            }
        }
        this.sendGateway("set_daemon_data", daemon_info)
    }

    async heartbeatSlowAction (daemon_info = {}) {
        let data = []
        if (this.local) {
            data = [
                await this.sendRPC("get_connections"),
                await this.sendRPC("get_bans")
            ]
        } else {
            data = []
        }

        if (data.length === 0) return

        for (let n of data) {
            if (n === undefined || !n.hasOwnProperty("result") || n.result === undefined) { continue }
            if (n.method === "get_connections" && n.result.hasOwnProperty("connections")) {
                daemon_info.connections = n.result.connections
            } else if (n.method === "get_bans" && n.result.hasOwnProperty("bans")) {
                daemon_info.bans = n.result.bans
            } else if (n.method === "get_txpool_backlog" && n.result.hasOwnProperty("backlog")) {
                daemon_info.tx_pool_backlog = n.result.backlog
            }
        }
        this.sendGateway("set_daemon_data", daemon_info)
    }

    sendGateway (method, data) {
        this.backend.send(method, data)
    }

    async sendRPC (method, params = {}, uri = false) {
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

        options.body = JSON.stringify(body)
        try {
            let response = await fetch(url, options)
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

    quit () {
        // TODO force close after few seconds!
        clearInterval(this.heartbeat)
        if (this.zmq_enabled) {
            this.dealer.send(["", "EVICT"])
            this.dealer.close()
            this.dealer = null
        }

        return new Promise((resolve, reject) => {
            if (this.daemonProcess) {
                this.daemonProcess.on("close", code => {
                    this.agent.destroy()
                    resolve()
                })
                this.daemonProcess.kill()
            } else {
                resolve()
            }
        })
    }
}
