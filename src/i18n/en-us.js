export default {
    buttons: {
        // All button text is uppercased in the gui
        advanced: "پیشرفته",
        addressBook: "دفترچه آدرس ها",
        all: "همه",
        back: "بازگشت",
        browse: "جستجو",
        cancel: "کنسل",
        change: "تغییرات",
        check: "چک کردن",
        clear: "پاک کردن",
        close: "بستن",
        contacts: "تماس ها",
        copyAddress: "کپی آدرس",
        copySignature: "کپی امضا",
        createWallet: "ساخت کیف پول",
        delete: "حذف",
        edit: "ویرایش",
        export: "خروجی",
        generate: "ساختن",
        import: "وارد شده",
        importWallet: "کیف پول واردشده | کیف پول های وارد شده",
        next: "بعدی",
        openWallet: "ایجاد کیف پول",
        receive: "دریافت",
        registerServiceNode: "فهرست خدمات نود",
        rescan: "بازبینی مجدد",
        restoreWallet: "بازگرداندن کیف پول",
        save: "ذخیره",
        saveTxNotes: "دخیره یادداشت های متنی",
        selectLocation: "انتخاب موقعیت مکانی",
        selectWalletFile: "انتخاب پوشه کیف پول",
        send: "ارسال",
        sendCoins: "ارسال ارزها",
        serviceNode: "خدمات نود",
        settings: "تنظیمات",
        showQRCode: "نمایش بارکد",
        showTxDetails: "نمایش جزئیات متن",
        stake: "وثیقه ارزی",
        sweepAll: "از بین بردن همه",
        txHistory: "تاریخچه تراکنش ها",
        unlock: "فاقد قفل",
        viewOnExplorer: "مشاهده جستجوگر",
        wallet: "کیف پول"
    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "تایید",
            cancel: "کنسل",
            open: "باز کردن"
        },

        // Dialogs
        banPeer: {
            title: "مسدود کردن اتصالات",
            peerDetailsTitle: "جزئیات اتصالات",
            message: "کد را جهت مسدود کردن اتصالات در چند ثانیه واردکنید.\پیشفرض 3600 = 1 ساعت.",
            ok: "مسدود کردن اتصالات"
        },
        copyAddress: {
            title: "کپی آدرس",
            message: "شناسه پرداختی به آین آدرس مرتبط است.\nمطمئن شوید که شناسه پرداخت را جداگانه کپی کنید."
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "کپی {در حال تایپ کردن}",
            message: "مراقب باشید افرادی که کلیدهای خصوصی شما را داشته باشند به دارایی شما دسترسی خواهند داشت.",
            seedWords: "کلمات هسته",
            viewKey: "کلید نمایش",
            spendKey: "کلید گذرا "
        },
        deleteWallet: {
            title: "حذف کیف پول",
            message: "آیا کاملا جهت حذف کیف پول اطمینان دارید?\nمطمین شوید که از کلیدهای خصوصی خود نسخه پشتبان تهیه میکنید.\nاین فرایند قابل بازگشت نیست!",
            ok: "حذف"
        },
        exit: {
            title: "Exit",
            message: "Are you sure you want to exit?",
            ok: "EXIT"
        },
        keyImages: {
            title: "{درحال تایپ کردن} تصاویر کلیدی",
            message: "آیا شما {در حال تایپ} تصاویر کلیدی را میخواهید?",
            export: "خروج",
            import: "ورود"
        },
        noPassword: {
            title: "فاقد رمز عبور",
            message: "آیا از ساخت کیف پول بدون پسورد مطمئن هستید؟",
            ok: "بله"
        },
        password: {
            title: "رمز عبور",
            message: "رمز عبور کیف پول را جهت ادامه وارد نمایید."
        },
        registerServiceNode: {
            title: "لیست خدمات نود",
            message: "آیا میخواهید خدمات نود را ثبت نمایید؟",
            ok: "ثبت"
        },
        rescan: {
            title: "اسکن مجدد کیف پول",
            message: "هشدار:برخی از اطلاعات مربوط به معاملات قبلی\nمانند ادرس گیرنده از دست میرود.",
            ok: "اسکن مجدد"
        },
        restart: {
            title: "راه اندازی مجدد",
            message: "تغییرات نیاز به راه اندازی مجدد دارند. آیا میخواهید اکنون دوباره راه اندازی نمایید؟",
            ok: "راه اندازی مجدد"
        },
        showPrivateKeys: {
            title: "نمایش کلیدهای خصوصی",
            message: "آیا میخواهید کلید های خصوصی خود را مشاهده نمایید؟",
            ok: "مشاهده"
        },
        stake: {
            title: "تعهد",
            message: "آیا میخواهید متعهد شوید؟",
            ok: "تعهد"
        },
        sweepAll: {
            title: "حذف همه",
            message: "آیا میخواهید همه را حذف نمایید؟",
            ok: "حذف همه"
        },
        sweepAllWarning: {
            title: "حذف همه هشدار ها",
            message: "شما میخواهیدبا ارسال یک تراکنش به خود تمام وجوه مصرف نشده را ادغام نمایید،امکان دارد کیف پول به شما موجودی 0 را به طور موقت نشان دهد،پس از 18 تایید تراکنش دارایی شما دردسترس و به حالت عادی باز میگردد..",
            ok: "ادامه"
        },
        switchWallet: {
            title: "تغییرکیف پول",
            closeMessage: "آیا مطمین هستید میخواهیدکیف پول فعلی راببندید؟",
            restartMessage: "فرایند همگام سازی ازراه دور اطلاعات کیف پول در حال انجام است. \nاگر میخواهید کیف پول را عوض کنید ،باید مجدد برنامه را راه اندازی نمایید. \nشما فرایند همگام سازی خود را از دست خواهید داد وباید مجدد دامنه اطلاعات بلاکچین را اسکن نمایید."
        },
        transactionDetails: {
            title: "جزئیات تراکنش ها",
            ok: "بستن"
        },
        transfer: {
            title: "منتقل کردن",
            message: "آیا میخواهید تراکنش را ارسال نمایید؟",
            ok: "ارسال"
        },
        unlockConfirm: {
            title: "تایید بازکردن",
            ok: "بازکردن"
        },
        unlockServiceNode: {
            title: "بازکردن خدمات نود",
            confirmTitle: "تایید بازکردن",
            message: "آیا میخواهید خدمات سرویس نود را باز کنید؟",
            ok: "بازکردن"
        },
        unlockServiceNodeWarning: {
            title: "بازکردن هشدار خدمات نود",
            message: "آزادسازی جزئی از وثیقه در یک نود باعث بدون وثیقه شدن سایر شرکت کنندگان میگردد ،اگر وثیقه های  نود های مشترک استفاده مینمایید بهترین کار این است به اپراتور و سایر شرکت کنندگان بفهمانید که بدون وثیقه هستید .",
            ok: "ادامه"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "آدرس",
        amount: "مقدار",
        confirmPassword: "تایید رمزعبور",
        daemonLogLevel: "سطح ورود به  شبکه",
        daemonP2pPort: "درگاه شبگه p2p",
        daemonZMQPort: "درگاه شبکه zmq",
        dataStoragePath: "مسیر ذخیره اطلاعات",
        filter: "فیلتر",
        filterTransactionType: "فیلترکردن با نوع تراکنش",
        internalWalletPort: "درگاه داخلی کیف پول",
        keyImages: {
            exportDirectory: "تصویر خروجی از فهرست کلید ها",
            importFile: "تصویر ورودی کلیدها از یک پوشه"
        },
        limitDownloadRate: "نرخ محدودیت دانلود",
        limitUploadRate: "نرخ آپلود محدود",
        localDaemonIP: "آی پی محلی شبکه",
        localDaemonPort: "درگاه شبکه محلی",
        maxIncomingPeers: "حداکثر ورود افراد",
        maxOutgoingPeers: "حداکثر خروج افراد",
        message: "پیام",
        mnemonicSeed: "هسته حافظه",
        name: "نام",
        newWalletName: "نام کیف پول جدید",
        notes: "یادداشت",
        optional: "اختیاری",
        password: "رمزعبور",
        paymentId: "آی دی پرداخت",
        priority: "اولویت",
        remoteNodeHost: "کنترل پشتیبان نود",
        remoteNodePort: "کنترل درگاه نود",
        restoreFromBlockHeight: "بازیابی از شبکه گسترده",
        restoreFromDate: "بازیابی از تاریخ",
        seedLanguage: "زبان هسته",
        serviceNodeCommand: "دستورالعمل خدمات نود",
        serviceNodeKey: "خدمات کلید نود",
        signature: "امضا",
        transactionId: "آیدی تراکنش",
        walletFile: "پوشه کیف پول",
        walletLogLevel: "سطح ورود به کیف پول",
        walletName: "نام کیف پول",
        walletRPCPort: "درگاه کنترل از دور کیف پول",
        walletStoragePath: "مسیر ذخیره سازی کیف پول",
        protocol: "پیوند نامه",
        hostname: "نام پشتیبان",
        endpoint: "نقطه پایان",
        port: "درگاه",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "تایید رمز عبور جدید",
        newPassword: "رمزعبور جدید",
        oldPassword: "رمزعبور قدیم",
        rescanFullBlockchain: "بازبینی مجدد کل شبکه",
        rescanSpentOutputs: "اسکن خروجی های رهاشده",
        transactionNotes: "یادداشت تراکنش ها",
        chooseNetwork: "انتخاب شبکه ارتباطی",
        network: "شبکه"
    },
    footer: {
        ready: "آماده",
        scanning: "درحال بازبینی",
        status: "وضعیت",
        syncing: "درحال همگام سازی",
        remote: "کنترل",
        wallet: "کیف پول"
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
        saveQR: "Save QR code to file",
        sendToThisAddress: "Send to this address",
        settings: "Settings",
        showDetails: "Show details",
        showPrivateKeys: "Show Private Keys",
        showQRCode: "Show QR Code",
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
            }
        },
        destinationUnknown: "Destination Unknown",
        editAddressBookEntry: "Edit address book entry",
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
        welcome: "Welcome",
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
