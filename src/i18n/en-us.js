export default {
    buttons: {
        // All button text is uppercased in the gui
        advanced: "ADVANCED",
        addressBook: "ADDRESS BOOK",
        all: "ALL",
        back: "BACK",
        browse: "BROWSE",
        cancel: "CANCEL",
        change: "CHANGE",
        check: "CHECK",
        clear: "CLEAR",
        close: "CLOSE",
        contacts: "CONTACTS",
        copyAddress: "COPY ADDRESS",
        copySignature: "COPY SIGNATURE",
        createWallet: "CREATE WALLET",
        delete: "DELETE",
        edit: "EDIT",
        export: "EXPORT",
        generate: "GENERATE",
        import: "IMPORT",
        importWallet: "IMPORT WALLET | IMPORT WALLETS",
        next: "NEXT",
        openWallet: "OPEN WALLET",
        receive: "RECEIVE",
        registerServiceNode: "REGISTER SERVICE NODE",
        rescan: "RESCAN",
        restoreWallet: "RESTORE WALLET",
        save: "SAVE",
        saveTxNotes: "SAVE TX NOTES",
        selectLocation: "SELECT LOCATION",
        selectWalletFile: "SELECT WALLET FILE",
        send: "SEND",
        sendCoins: "SEND COINS",
        serviceNode: "SERVICE NODE",
        settings: "SETTINGS",
        showQRCode: "SHOW QR CODE",
        showTxDetails: "SHOW TX DETAILS",
        stake: "STAKE",
        sweepAll: "SWEEP ALL",
        txHistory: "TX HISTORY",
        unlock: "UNLOCK",
        viewOnExplorer: "VIEW ON EXPLORER",
        wallet: "WALLET"
    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "OK",
            cancel: "CANCEL",
            open: "OPEN"
        },
        // Dialogs
        banPeer: {
            title: "Ban peer",
            peerDetailsTitle: "Peer details",
            message: "Enter length to ban peer in seconds.\nDefault 3600 = 1 hour.",
            ok: "Ban peer"
        },
        copyAddress: {
            title: "Copy address",
            message: "There is a payment id associated with this address.\nBe sure to copy the payment id separately."
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "Copy {type}",
            message: "Be careful who you send your private keys to as they control your funds.",
            seedWords: "Seed Words",
            viewKey: "View Key",
            spendKey: "Spend Key"
        },
        deleteWallet: {
            title: "Delete wallet",
            message: "Are you absolutely sure you want to delete your wallet?\nMake sure you have your private keys backed up.\nTHIS PROCESS IS NOT REVERSIBLE!",
            ok: "DELETE"
        },
        exit: {
            title: "Exit",
            message: "Are you sure you want to exit?",
            ok: "EXIT"
        },
        keyImages: {
            title: "{type} key images",
            message: "Do you want to {type} key images?",
            export: "Export",
            import: "Import"
        },
        noPassword: {
            title: "No password set",
            message: "Are you sure you want to create a wallet with no password?",
            ok: "YES"
        },
        password: {
            title: "Password",
            message: "Enter wallet password to continue."
        },
        registerServiceNode: {
            title: "Register service node",
            message: "Do you want to register the service node?",
            ok: "REGISTER"
        },
        rescan: {
            title: "Rescan wallet",
            message: "Warning: Some information about previous transactions\nsuch as the recipient's address will be lost.",
            ok: "RESCAN"
        },
        restart: {
            title: "Restart",
            message: "Changes require restart. Would you like to restart now?",
            ok: "RESTART"
        },
        showPrivateKeys: {
            title: "Show private keys",
            message: "Do you want to view your private keys?",
            ok: "SHOW"
        },
        stake: {
            title: "Stake",
            message: "Do you want to stake?",
            ok: "STAKE"
        },
        sweepAll: {
            title: "Sweep all",
            message: "Do you want to sweep all?",
            ok: "SWEEP ALL"
        },
        sweepAllWarning: {
            title: "Sweep all warning",
            message: "You are about to combine all of your unspent funds by sending a transaction to yourself, your wallet may show a balance of 0 temporarily, after 18 blocks your funds will unlock and you may stake normally.",
            ok: "CONTINUE"
        },
        switchWallet: {
            title: "Switch wallet",
            closeMessage: "Are you sure you want to close the current wallet?",
            restartMessage: "The wallet RPC is currently syncing. \nIf you wish to switch wallets then you must restart the application. \nYou will lose your syncing progress and have to rescan the blockchain again."
        },
        transactionDetails: {
            title: "Transaction details",
            ok: "CLOSE"
        },
        transfer: {
            title: "Transfer",
            message: "Do you want to send the transaction?",
            ok: "SEND"
        },
        unlockConfirm: {
            title: "Confirm unlock",
            ok: "UNLOCK"
        },
        unlockServiceNode: {
            title: "Unlock service node",
            confirmTitle: "Confirm unlock",
            message: "Do you want to unlock the service node?",
            ok: "UNLOCK"
        },
        unlockServiceNodeWarning: {
            title: "Unlock service node warning",
            message: "Unlocking a partial stake in a node will also unstake for any other participants, if staking in a shared node its best to let the operator and other participants know you are unstaking.",
            ok: "CONTINUE"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "ADDRESS",
        amount: "AMOUNT",
        confirmPassword: "CONFIRM PASSWORD",
        daemonLogLevel: "DAEMON LOG LEVEL",
        daemonP2pPort: "DAEMON P2P PORT",
        daemonZMQIP: "ZMQ DAEMON IP",
        daemonZMQPort: "ZMQ DAEMON PORT",
        dataStoragePath: "DATA STORAGE PATH",
        filter: "FILTER",
        filterTransactionType: "FILTER BY TRANSACTION TYPE",
        internalWalletPort: "INTERNAL WALLET PORT",
        keyImages: {
            exportDirectory: "KEY IMAGE EXPORT DIRECTORY",
            importFile: "KEY IMAGE IMPORT FILE"
        },
        limitDownloadRate: "LIMIT DOWNLOAD RATE",
        limitUploadRate: "LIMIT UPLOAD RATE",
        localDaemonIP: "LOCAL DAEMON IP",
        localDaemonPort: "LOCAL DAEMON PORT (RPC)",
        maxIncomingPeers: "MAX INCOMING PEERS",
        maxOutgoingPeers: "MAX OUTGOING PEERS",
        message: "MESSAGE",
        mnemonicSeed: "MNEMONIC SEED",
        name: "NAME",
        newWalletName: "NEW WALLET NAME",
        notes: "NOTES",
        optional: "OPTIONAL",
        password: "PASSWORD",
        paymentId: "PAYMENT ID",
        priority: "PRIORITY",
        remoteNodeHost: "REMOTE NODE HOST",
        remoteNodePort: "REMOTE NODE PORT",
        restoreFromBlockHeight: "RESTORE FROM BLOCK HEIGHT",
        restoreFromDate: "RESTORE FROM DATE",
        seedLanguage: "SEED LANGUAGE",
        serviceNodeCommand: "SERVICE NODE COMMAND",
        serviceNodeKey: "SERVICE NODE KEY",
        signature: "SIGNATURE",
        transactionId: "TRANSACTION ID",
        wallet247: "DO YOU PLAN TO KEEP THE WALLET TURNED ON 24/7?",
        walletFile: "WALLET FILE",
        walletLogLevel: "WALLET LOG LEVEL",
        walletName: "WALLET NAME",
        walletRPCPort: "WALLET RPC PORT",
        walletStoragePath: "WALLET STORAGE PATH",
        protocol: "PROTOCOL",
        hostname: "HOSTNAME",
        endpoint: "ENDPOINT",
        port: "PORT",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "Confirm New Password",
        newPassword: "New Password",
        oldPassword: "Old Password",
        rescanFullBlockchain: "Rescan full blockchain",
        rescanSpentOutputs: "Rescan spent outputs",
        transactionNotes: "Transaction Notes",
        network: "Network",
        testnet: "Testnet"
    },
    footer: {
        ready: "READY",
        scanning: "SCANNING",
        status: "Status",
        syncing: "SYNCING",
        remote: "Remote",
        wallet: "Wallet"
    },
    menuItems: {
        about: "About",
        changePassword: "Change Password",
        copyAddress: "Copy address",
        copyQR: "Copy QR code",
        copySeedWords: "Copy seed words",
        copySpendKey: "Copy spend key",
        copyServiceNodeKey: "Copy service node key",
        copyTransactionId: "Copy transaction ID",
        copyViewKey: "Copy view key",
        createNewWallet: "Create new wallet",
        deleteWallet: "Delete Wallet",
        exportTransactions: "Export Transactions",
        exportWallet: "Export Wallet",
        exit: "Exit Arqma GUI Wallet",
        importOldGUIWallet: "Import wallets from old GUI",
        manageKeyImages: "Manage Key Images",
        openWallet: "Open wallet",
        rescanWallet: "Rescan Wallet",
        restoreWalletFile: "Restore wallet from file",
        restoreWalletSeed: "Restore wallet from seed",
        saveIdenticon: "Save identicon to file",
        saveQR: "Save QR code to file",
        sendToThisAddress: "Send to this address",
        settings: "Settings",
        showDetails: "Show details",
        showPrivateKeys: "Show Private Keys",
        showQRCode: "Show QR Code",
        soloMining: "Solo Mining",
        switchWallet: "Switch Wallet",
        viewOnExplorer: "View on explorer"
    },
    notification: {
        positive: {
            addressCopied: "Address copied to clipboard",
            bannedPeer: "Banned {host} until {time}",
            copied: "{item} copied to clipboard",
            itemSaved: "{item} saved to {filename}",
            keyImages: {
                exported: "Key images exported to {filename}",
                imported: "Key images imported"
            },
            passwordUpdated: "Password updated",
            qrCopied: "QR code copied to clipboard",
            registerServiceNodeSuccess: "Successfully registered service node",
            sendSuccess: "Transaction successfully sent",
            signatureCopied: "Signature copied to clipboard",
            stakeSuccess: "Successfully staked",
            transactionNotesSaved: "Transaction notes saved"
        },
        errors: {
            banningPeer: "Error banning peer",
            cannotAccessRemoteNode: "Could not access remote node, please try another remote node",
            changingPassword: "Error changing password",
            copyWalletFail: "Failed to copy wallet",
            copyingPrivateKeys: "Error copying private keys",
            dataPathNotFound: "Data storage path not found",
            differentNetType: "Remote node is using a different nettype",
            enterSeedWords: "Enter seed words",
            enterTransactionId: "Enter transaction ID",
            enterTransactionProof: "Enter transaction proof",
            enterWalletName: "Enter a wallet name",
            errorSavingItem: "Error saving {item}",
            failedServiceNodeUnlock: "Failed to unlock service node",
            failedToSetLanguage: "Failed to set language: {lang}",
            failedWalletImport: "Failed to import wallet",
            failedWalletOpen: "Failed to open wallet. Please try again.",
            internalError: "Internal error",
            invalidAddress: "Address not valid",
            invalidAmount: "Amount not valid",
            invalidOldPassword: "Invalid old password",
            invalidPassword: "Invalid password",
            invalidPaymentId: "Payment id not valid",
            invalidPrivateViewKey: "Invalid private viewkey",
            invalidPublicAddress: "Invalid public address",
            invalidRestoreDate: "Invalid restore date",
            invalidRestoreHeight: "Invalid restore height",
            invalidSeedLength: "Invalid seed word length",
            invalidServiceNodeCommand: "Please enter the service node registration command",
            invalidServiceNodeKey: "Service node key not valid",
            invalidWalletPath: "Invalid wallet path",
            keyImages: {
                exporting: "Error exporting key images",
                reading: "Error reading key images",
                importing: "Error importing key images"
            },
            negativeAmount: "Amount cannot be negative",
            newPasswordNoMatch: "New passwords do not match",
            newPasswordSame: "New password must be different",
            notEnoughBalance: "Not enough unlocked balance",
            passwordNoMatch: "Passwords do not match",
            remoteCannotBeReached: "Remote daemon cannot be reached",
            selectWalletFile: "Select a wallet file",
            unknownError: "An unknown error occurred",
            walletAlreadyExists: "Wallet with name already exists",
            walletPathNotFound: "Wallet data storage path not found",
            zeroAmount: "Amount must be greater than zero"
        },
        warnings: {
            noKeyImageExport: "No key images found to export",
            usingLocalNode: "Could not access remote node, switching to local only",
            usingRemoteNode: "arqmad not found, using remote node"
        }
    },
    placeholders: {
        additionalNotes: "Additional notes",
        addressBookName: "Name that belongs to this address",
        filterTx: "Enter an ID, name, address or amount",
        hexCharacters: "{count} hexadecimal characters",
        mnemonicSeed: "25 (or 24) word mnemonic seed",
        pasteTransactionId: "Paste transaction ID",
        pasteTransactionProof: "Paste transaction proof",
        proveOptionalMessage: "Optional message against which the signature is signed",
        recipientWalletAddress: "Recipient's wallet address",
        selectAFile: "Please select a file",
        transactionNotes: "Additional notes to attach to the transaction",
        walletName: "A name for your wallet",
        walletPassword: "An optional password for the wallet",
        operations: "Wallet actions",
        walletOperations: "Show"
    },
    strings: {
        addAddressBookEntry: "Add address book entry",
        addressBookDetails: "Address book details",
        addressBookIsEmpty: "Address book is empty",
        addresses: {
            myPrimaryAddress: "My primary address",
            myUnusedAddresses: "My unused addresses",
            myUsedAddresses: "My used addresses",
            primaryAddress: "Primary address",
            subAddress: "Sub-address",
            subAddressIndex: "Index {index}"
        },
        advancedOptions: "Advanced Options",
        bannedPeers: {
            title: "Banned peers (bans will cleared if wallet is restarted)",
            bannedUntil: "Banned until {time}"
        },
        backupSeedWord: "Backup your seed words in a secure location! This is the only way to access your funds if you switch devices.",
        blockHeight: "Height",
        confirmWords: "Confirm your mnemonic seed words",
        enter7words: "Enter the first seven words of your mnemonic seed in the correct order:",
        usingEmptyPass: "Using an empty password will leave your wallet unencrypted on your file system!",
        usingInsecurePass: "Using an insecure password could allow attackers to brute-force your wallet!",
        checkTransaction: {
            description: "Verify that funds were paid to an address by supplying the transaction ID, the recipient address, the message used for signing and the signature.\nFor a 'Spend Proof' you dont need to provide the recipient address.",
            infoTitles: {
                confirmations: "Confirmations",
                inPool: "In pool",
                validTransaction: "Valid transaction",
                received: "Received amount"
            },
            validTransaction: {
                no: "NO",
                yes: "YES"
            }
        },
        closing: "Closing",
        connectingToBackend: "Connecting to backend",
        contribution: "Contribution",
        daemon: {
            local: {
                title: "Local Daemon Only",
                description: "Full security, wallet will download the full blockchain. You will not be able to transact until sync is completed."
            },
            localRemote: {
                title: "Local + Remote Daemon",
                description: "Get started quickly with this default option. Wallet will download the full blockchain, but use a remote node while syncing."
            },
            remote: {
                title: "Remote Daemon Only",
                description: "Less security, wallet will connect to a remote node to make all transactions."
            },
            zmq: {
                title: "ZMQ Daemon Only"
            }
        },
        destinationUnknown: "Destination Unknown",
        editAddressBookEntry: "Edit address book entry",
        enhancedOptions: {
            privateNetworkMode: "No - private network mode",
            interconnectedNetworkMode: "Yes - interconnected network mode"
        },
        getStarted: "To get started, select one of the options below:",
        loading: "Loading...",
        loadingSettings: "Loading settings",
        arqmaBalance: "Balance",
        arqmaExchangeBalance: "Balance",
        arqmaUnlockedBalance: "Unlocked balance",
        arqmaUnlockedShort: "Unlocked",
        noTransactionsFound: "No transactions found",
        notes: "Notes",
        numberOfUnspentOutputs: "Number of unspent outputs",
        paymentID: "Payment ID",
        passwordStrength: "Password strength",
        peerList: "Peer list",
        priorityOptions: {
            automatic: "Automatic",
            slow: "Slow",
            normal: "Normal",
            fast: "Fast",
            fastest: "Fastest"
        },
        proveTransactionDescription: "Generate a proof of your incoming/outgoing payment by supplying the transaction ID, the recipient address and an optional message.\nFor the case of outgoing payments, you can get a 'Spend Proof' that proves the authorship of a transaction. In this case, you don't need to specify the recipient address.",
        readingWalletList: "Reading wallet list",
        recentIncomingTransactionsToAddress: "Recent incoming transactions to this address",
        recentTransactionsWithAddress: "Recent transactions with this address",
        rescanModalDescription: "Select full rescan or rescan of spent outputs only.",
        saveSeedWarning: "Please copy and save these in a secure location!",
        saveToAddressBook: "Save to address book",
        seedWords: "Seed words",
        selectLanguage: "Select language",
        serviceNodeRegistrationDescription: "Enter the {registerCommand} command produced by the daemon that is registering to become a Service Node using the \"{prepareCommand}\" command",
        spendKey: "Spend key",
        startingDaemon: "Starting daemon",
        startingWallet: "Starting wallet",
        switchToDateSelect: "Switch to date select",
        switchToHeightSelect: "Switch to height select",
        syncingDaemon: "Syncing Daemon",
        transactionID: "Transaction ID",
        transactionConfirmed: "confirmed",
        transactions: {
            amount: "Amount",
            description: "{type} transaction",
            fee: "Fee",
            paidBySender: "paid by sender",
            received: "Received",
            sent: "Sent",
            sentTo: "{type} transaction sent to",
            timestamp: "Timestamp",
            types: {
                all: "All",
                incoming: "Incoming",
                outgoing: "Outgoing",
                pending: "Pending",
                pendingIncoming: "Pending incoming",
                pendingOutgoing: "Pending outgoing",
                miner: "Miner",
                serviceNode: "Service Node",
                governance: "Governance",
                stake: "Stake",
                failed: "Failed"
            }
        },
        unspentOutputs: "Unspent outputs",
        userNotUsedAddress: "You have not used this address",
        userUsedAddress: "You have used this address",
        viewKey: "View key",
        viewOnlyMode: "View only mode. Please load full wallet in order to send coins."
    },
    titles: {
        addressBook: "Address book",
        addressDetails: "Address details",
        advanced: {
            checkTransaction: "CHECK TRANSACTION",
            prove: "PROVE"
        },
        changePassword: "Change password",
        configure: "Configure",
        currentlyStakedNodes: "Currently staked nodes",
        privateKeys: "Private keys",
        rescanWallet: "Rescan wallet",
        serviceNode: {
            registration: "REGISTRATION",
            staking: "STAKING"
        },
        settings: {
            title: "Settings",
            tabs: {
                general: "General",
                language: "Language",
                peers: "Peers",
                exchange: "Exchange"
            }
        },
        transactionDetails: "Transaction details",
        transactions: "Transactions",
        wallet: {
            createNew: "Create new wallet",
            mcreateNew: "Create multisig new wallet",
            createdOrRestored: "Wallet created/restored",
            importFromFile: "Import wallet from file",
            importFromLegacyGUI: "Import wallet from legacy GUI",
            importFromOldGUI: "Import wallet from old GUI",
            restoreFromSeed: "Restore wallet from seed",
            restoreViewOnly: "Restore view-only wallet"
        },
        versionDaemon: "Daemon Version",
        versionWallet: "Wallet Version",
        welcome: "Welcome",
        welcomeNoWallet: "Welcome to Arqma Electron Wallet",
        yourWallets: "Your Wallets"
    },
    headers: {
        address: "Address",
        amount: "Amount",
        confirmations: "Confirmations",
        double_spend_seen: "Double Spend Seen",
        fee: "Fee",
        height: "Height",
        note: "Note",
        paymentid: "PaymentID",
        suggestedConfirmationsThreshold: "Suggested Confirmations Threshold",
        timestamp: "Time Stamp",
        txid: "TxID",
        type: "Type",
        unlockTime: "Unlock Time"
    }
}
