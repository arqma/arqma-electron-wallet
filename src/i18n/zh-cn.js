export default {
    buttons: {
        // All button text is uppercased in the gui
        advanced: "高级",
        addressBook: "地址簿",
        all: "所有",
        back: "背部",
        browse: "浏览",
        cancel: "取消",
        change: "更改",
        check: "校验",
        clear: "明确",
        close: "关",
        contacts: "联系",
        copyAddress: "复制地址",
        copySignature: "复制签名",
        createWallet: "创建钱包",
        delete: "删除",
        edit: "编辑",
        export: "出口",
        generate: "生成",
        import: "进口",
        importWallet: "进口钱包 | 进口钱包",
        next: "下一个",
        openWallet: "打开钱包",
        receive: "接收",
        registerServiceNode: "注册服务节点",
        rescan: "重新扫描",
        restoreWallet: "恢复钱包",
        save: "保存",
        saveTxNotes: "保存TX注意事项",
        selectLocation: "选择位置",
        selectWalletFile: "选择钱包文件",
        send: "发送",
        sendCoins: "发送硬币",
        serviceNode: "服务节点",
        settings: "设置",
        showQRCode: "显示QR码",
        showTxDetails: "显示TX详细信息",
        stake: "赌注",
        sweepAll: "扫一扫",
        txHistory: "tx历史",
        unlock: "开锁",
        viewOnExplorer: "查看探索者",
        wallet: "钱包"
    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "行",
            cancel: "取消",
            open: "打开"
        },

        // Dialogs
        banPeer: {
            title: "同行董事会",
            peerDetailsTitle: "同行细节",
            message: "输入长度以在几秒钟内禁止对等。\n默认3600 = 1小时.",
            ok: "同行董事会"
        },
        copyAddress: {
            title: "复制地址",
            message: "有一个与此地址关联的付款ID\n 确保单独复制付款ID。"
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "复制 {type}",
            message: "在发送私钥时要小心，因为他们控制了您的资金.",
            seedWords: "种子词",
            viewKey: "查看密钥",
            spendKey: "花钱"
        },
        deleteWallet: {
            title: "删除钱包",
            message: "你绝对确定要删除你的钱包吗？\n确保备份了私钥.\n这个过程是不可逆转的!",
            ok: "删除"
        },
        exit: {
            title: "放弃",
            message: "你确定要离开？",
            ok: "放弃"
        },
        keyImages: {
            title: "{type} 关键图像",
            message: "你想要_____吗 {type} 关键图像?",
            export: "出口",
            import: "进口"
        },
        noPassword: {
            title: "没有设置密码",
            message: "您确定要创建没有密码的钱包吗？?",
            ok: "是"
        },
        password: {
            title: "密码",
            message: "输入钱包密码以继续."
        },
        registerServiceNode: {
            title: "注册服务节点",
            message: "是否要注册服务节点？?",
            ok: "寄存器"
        },
        rescan: {
            title: "重新扫描钱包",
            message: "警告：有关以前交易的一些信息\n如收件人的地址将丢失.",
            ok: "重新扫描"
        },
        restart: {
            title: "重新开始",
            message: "更改需要重启。 你想现在重新启动吗?",
            ok: "重新开始"
        },
        showPrivateKeys: {
            title: "显示私钥",
            message: "您要查看私钥吗?",
            ok: "显示"
        },
        stake: {
            title: "赌注",
            message: "你想要赌注吗?",
            ok: "赌注"
        },
        sweepAll: {
            title: "扫一扫",
            message: "你想扫一扫吗?",
            ok: "扫一扫"
        },
        sweepAllWarning: {
            title: "扫一扫警告",
            message: "您即将通过向自己发送交易来合并所有未花费的资金，您的钱包可能会暂时显示余额为0，在18个区块之后您的资金将解锁并且您可能正常投注.",
            ok: "继续"
        },
        switchWallet: {
            title: "切换钱包",
            closeMessage: "您确定要关闭当前的钱包吗?",
            restartMessage: "钱包RPC当前正在同步。 \n如果您想切换钱包，则必须重新启动应用程序。 \n您将失去同步进度，并且必须重新扫描区块链。"
        },
        transactionDetails: {
            title: "交易明细",
            ok: "出口"
        },
        transfer: {
            title: "传递",
            message: "您要发送交易吗？",
            ok: "发送"
        },
        unlockConfirm: {
            title: "确认解锁",
            ok: "开锁"
        },
        unlockServiceNode: {
            title: "解锁服务节点",
            confirmTitle: "确认解锁",
            message: "是否要解锁服务节点？",
            ok: "开锁"
        },
        unlockServiceNodeWarning: {
            title: "解锁服务节点警告",
            message: "解锁节点中的部分股份也将为任何其他参与者取消参与，如果在共享节点中放置最好让操作员和其他参与者知道您正在解开.",
            ok: "继续"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "地址",
        amount: "量",
        confirmPassword: "确认密码",
        daemonLogLevel: "守护程序日志级别",
        daemonP2pPort: "守护进程P2P端口",
        daemonZMQPort: "守护进程ZMQ端口",
        dataStoragePath: "数据存储路径",
        filter: "筛选",
        filterTransactionType: "按交易类型过滤",
        internalWalletPort: "内部钱包港口",
        keyImages: {
            exportDirectory: "关键图像出口目录",
            importFile: "关键图像导入文件"
        },
        limitDownloadRate: "限制下载率",
        limitUploadRate: "限制上传率",
        localDaemonIP: "本地守护进程ip",
        localDaemonPort: "本地守护进程端口",
        maxIncomingPeers: "最大的收入",
        maxOutgoingPeers: "最大传出同行",
        message: "信息",
        mnemonicSeed: "记忆种子",
        name: "名称",
        newWalletName: "新钱包名称",
        notes: "笔记",
        optional: "可选的",
        password: "密码",
        paymentId: "付款ID",
        priority: "优先",
        remoteNodeHost: "远程节点主机",
        remoteNodePort: "远程节点端口",
        restoreFromBlockHeight: "从块高处恢复",
        restoreFromDate: "从日期恢复",
        seedLanguage: "种子语言",
        serviceNodeCommand: "服务节点命令",
        serviceNodeKey: "服务节点密钥",
        signature: "签名",
        transactionId: "交易ID",
        walletFile: "钱包文件",
        walletLogLevel: "钱包日志水平",
        walletName: "钱包名称",
        walletRPCPort: "钱包RPC端口",
        walletStoragePath: "钱包存储路径",
        protocol: "協議",
        hostname: "主機名",
        endpoint: "端點",
        port: "港口",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "确认新密码",
        newPassword: "新密码",
        oldPassword: "旧密码",
        rescanFullBlockchain: "重新扫描完整的区块链",
        rescanSpentOutputs: "重新扫描花费的输出",
        transactionNotes: "交易笔记",
        chooseNetwork: "选择一个网络",
        network: "网络"
    },
    footer: {
        ready: "准备",
        scanning: "扫描",
        status: "状态",
        syncing: "同步",
        remote: "远程",
        wallet: "钱包"
    },
    menuItems: {
        about: "关于",
        changePassword: "更改密码",
        copyAddress: "复制地址",
        copyQR: "复制二维码",
        copySeedWords: "复制种子词",
        copySpendKey: "复制支出密钥",
        copyServiceNodeKey: "复制服务节点密钥",
        copyTransactionId: "复制交易ID",
        copyViewKey: "复制视图键",
        createNewWallet: "创造新的钱包",
        deleteWallet: "删除电子钱包",
        exportTransactions: "出口交易",
        exportWallet: "出口錢包",
        exit: "出口 Arqma GUI Wallet",
        importOldGUIWallet: "从旧的进口钱包 GUI",
        manageKeyImages: "管理关键图像",
        openWallet: "打开钱包",
        rescanWallet: "重新装修钱包",
        restoreWalletFile: "从文件中恢复钱包",
        restoreWalletSeed: "从种子恢复钱包",
        saveQR: "将QR码保存到文件中",
        sendToThisAddress: "发送到这个地址",
        settings: "设置",
        showDetails: "显示详细资料",
        showPrivateKeys: "显示私钥",
        showQRCode: "显示二维码",
        switchWallet: "切换钱包",
        viewOnExplorer: "在资源管理器上查看"
    },
    notification: {
        positive: {
            addressCopied: "地址复制到剪贴板",
            bannedPeer: "Banned {host} until {time}",
            copied: "{item} 复制到剪贴板",
            itemSaved: "{item} 保存到 {filename}",
            keyImages: {
                exported: "导出的关键图像 {filename}",
                imported: "导入的关键图像"
            },
            passwordUpdated: "密码已更新",
            qrCopied: "QR码复制到剪贴板",
            registerServiceNodeSuccess: "成功注册服务节点",
            sendSuccess: "交易成功发送",
            signatureCopied: "签名复制到剪贴板",
            stakeSuccess: "成功赌注",
            transactionNotesSaved: "已保存交易记录"
        },
        errors: {
            banningPeer: "禁止小便的错误r",
            cannotAccessRemoteNode: "无法访问远程节点，请尝试另一个远程节点",
            changingPassword: "更改密码时出错",
            copyWalletFail: "无法复制钱包",
            copyingPrivateKeys: "复制私钥时出错",
            dataPathNotFound: "找不到数据存储路径",
            differentNetType: "远程节点使用不同的网络类型",
            enterSeedWords: "输入种子词",
            enterTransactionId: "输入交易ID",
            enterTransactionProof: "输入交易证明",
            enterWalletName: "输入钱包名称",
            errorSavingItem: "保存时出错 {item}",
            failedServiceNodeUnlock: "无法解锁服务节点",
            failedToSetLanguage: "设置语言失败： {lang}",
            failedWalletImport: "无法导入钱包",
            failedWalletOpen: "无法打开钱包。 请再试一次.",
            internalError: "内部错误",
            invalidAddress: "地址无效",
            invalidAmount: "金额无效",
            invalidOldPassword: "旧密码无效",
            invalidPassword: "无效的密码",
            invalidPaymentId: "付款ID无效",
            invalidPrivateViewKey: "私有视图密钥无效",
            invalidPublicAddress: "公共地址无效",
            invalidRestoreDate: "恢复日期无效",
            invalidRestoreHeight: "恢复高度无效",
            invalidSeedLength: "种子字长无效",
            invalidServiceNodeCommand: "请输入服务节点注册命令",
            invalidServiceNodeKey: "服务节点密钥无效",
            invalidWalletPath: "钱包路径无效",
            keyImages: {
                exporting: "导出关键图像时出错",
                reading: "读取关键图像时出错",
                importing: "导入关键图像时出错"
            },
            negativeAmount: "金额不能为负数",
            newPasswordNoMatch: "新密码不匹配",
            newPasswordSame: "新密码必须不同",
            notEnoughBalance: "没有足够的解锁余额",
            passwordNoMatch: "密码不匹配",
            remoteCannotBeReached: "无法访问远程守护程序",
            selectWalletFile: "选择一个钱包文件",
            unknownError: "出现未知错误",
            walletAlreadyExists: "名称的钱包已存在",
            walletPathNotFound: "未找到电子钱包数据存储路径",
            zeroAmount: "金额必须大于零"
        },
        warnings: {
            noKeyImageExport: "没有找到要导出的关键图像",
            usingLocalNode: "无法访问远程节点，仅切换到本地",
            usingRemoteNode: "arqmad 找不到，使用远程节点"
        }
    },
    placeholders: {
        additionalNotes: "补充说明",
        addressBookName: "属于此地址的名称",
        filterTx: "输入ID，名称，地址或金额",
        hexCharacters: "{count} 十六进制字符",
        mnemonicSeed: "25 (or 24) 单词助记符种子",
        pasteTransactionId: "粘贴交易ID",
        pasteTransactionProof: "粘贴交易证明",
        proveOptionalMessage: "签名签名的可选消息",
        recipientWalletAddress: "收件人的钱包地址",
        selectAFile: "请选择一个文件",
        transactionNotes: "附加到交易的附加说明",
        walletName: "钱包的名称",
        walletPassword: "钱包的可选密码",
        operations: "钱包行动",
        walletOperations: "查看"
    },
    strings: {
        addAddressBookEntry: "添加地址簿条目",
        addressBookDetails: "地址簿详细信息",
        addressBookIsEmpty: "地址簿是空的",
        addresses: {
            myPrimaryAddress: "我的主要地址",
            myUnusedAddresses: "我未使用的地址",
            myUsedAddresses: "我用过的地址",
            primaryAddress: "主要地址",
            subAddress: "子地址",
            subAddressIndex: "指数 {index}"
        },
        advancedOptions: "高级选项",
        bannedPeers: {
            title: "被禁止的同伴（如果重新启动钱包，禁令将被清除）",
            bannedUntil: "禁止直到 {time}"
        },
        backupSeedWord: "将您的种子词备份到安全的位置！ 如果您更换设备，这是获取资金的唯一方式。",
        blockHeight: "高度",
        confirmWords: "确认您的助记符种子词",
        enter7words: "按正确顺序输入助记符种子的前七个单词：",
        usingEmptyPass: "使用空密码将使您的钱包在您的文件系统上不加密！",
        checkTransaction: {
            description: "通过提供交易ID，收件人地址，用于签名的消息和签名，验证资金是否已支付给地址.\n对于“支出证明”，您不需要提供收件人地址.",
            infoTitles: {
                confirmations: "确认",
                inPool: "在游泳池",
                validTransaction: "有效交易",
                received: "收到金额"
            },
            validTransaction: {
                no: "没有",
                yes: "是"
            }
        },
        closing: "闭幕",
        connectingToBackend: "连接到后端",
        contribution: "贡献",
        daemon: {
            local: {
                title: "仅限本地守护进程",
                description: "完全安全，钱包将下载完整的区块链。 在完成同步之前，您将无法进行交易."
            },
            localRemote: {
                title: "本地+远程守护进程",
                description: "使用此默认选项快速入门。 电子钱包将下载完整的区块链，但在同步时使用远程节点."
            },
            remote: {
                title: "仅限远程守护程序",
                description: "安全性较低，钱包将连接到远程节点以进行所有事务."
            }
        },
        destinationUnknown: "未知目的地",
        editAddressBookEntry: "编辑地址簿条目",
        loading: "加载...",
        loadingSettings: "加载设置",
        arqmaBalance: "平衡",
        arqmaExchangeBalance: "平衡",
        arqmaUnlockedBalance: "解锁平衡",
        arqmaUnlockedShort: "解锁",
        noTransactionsFound: "没有发现交易",
        notes: "笔记",
        numberOfUnspentOutputs: "未用完的输出数量",
        paymentID: "付款ID",
        peerList: "同行名单",
        priorityOptions: {
            automatic: "自动",
            slow: "慢",
            normal: "正常",
            fast: "快速",
            fastest: "最快的"
        },
        proveTransactionDescription: "通过提供交易ID，收件人地址和可选消息，生成您的收款/付款凭证。\n对于付款的情况，您可以获得证明交易的作者身份的“支出证明”。 在这种情况下，您无需指定收件人地址。",
        readingWalletList: "阅读钱包清单",
        recentIncomingTransactionsToAddress: "最近到此地址的传入事务",
        recentTransactionsWithAddress: "最近与此地址的交易",
        rescanModalDescription: "仅选择完全重新扫描或重新扫描已用完的输出.",
        saveSeedWarning: "请将它们复制并保存在安全的位置!",
        saveToAddressBook: "保存到地址簿",
        seedWords: "种子词",
        selectLanguage: "选择语言",
        serviceNodeRegistrationDescription: "输入 {registerCommand} 由守护进程生成的命令，该守护进程使用注册成为服务节点 \"{prepareCommand}\" 命令",
        spendKey: "花钱钥匙",
        startingDaemon: "启动守护进程",
        startingWallet: "启动钱包",
        switchToDateSelect: "切换到日期选择",
        switchToHeightSelect: "切换到高度选择",
        syncingDaemon: "同步守护进程",
        transactionID: "交易ID",
        transactionConfirmed: "确认",
        transactions: {
            amount: "量",
            description: "{type} 交易",
            fee: "费用",
            paidBySender: "由发件人支付",
            received: "收到",
            sent: "发送",
            sentTo: "{type} 交易发送到",
            timestamp: "时间戳",
            types: {
                all: "所有",
                incoming: "来",
                outgoing: "传出",
                pending: "有待",
                pendingIncoming: "等待传入",
                pendingOutgoing: "即将卸任",
                miner: "矿工",
                serviceNode: "服务节点",
                governance: "治理",
                stake: "赌注",
                failed: "失败"
            }
        },
        unspentOutputs: "未用完的输出",
        userNotUsedAddress: "你还没有用过这个地址",
        userUsedAddress: "您已使用此地址",
        viewKey: "查看密钥",
        viewOnlyMode: "仅查看模式。 请加载完整的钱包以发送硬币."
    },
    titles: {
        addressBook: "地址簿",
        addressDetails: "详细地址",
        advanced: {
            checkTransaction: "检查交易",
            prove: "证明"
        },
        changePassword: "更改密码",
        configure: "配置",
        currentlyStakedNodes: "目前赌注的节点",
        privateKeys: "私钥",
        rescanWallet: "重新扫描钱包",
        serviceNode: {
            registration: "注册",
            staking: "罢工"
        },
        settings: {
            title: "设置",
            tabs: {
                general: "一般",
                language: "语言",
                peers: "同行",
                exchange: "交換"
            }
        },
        transactionDetails: "交易明细",
        transactions: "交易",
        wallet: {
            createNew: "创建新钱包",
            createdOrRestored: "钱包创建/恢复",
            importFromFile: "从文件导入钱包",
            importFromLegacyGUI: "从旧GUI导入钱包",
            importFromOldGUI: "从旧GUI导入钱包",
            restoreFromSeed: "从种子恢复钱包",
            restoreViewOnly: "恢复仅查看钱包"
        },
        welcome: "欢迎",
        yourWallets: "你的钱包"
    },
    headers: {
        address: "地址",
        amount: "量",
        confirmations: "確認",
        double_spend_seen: "看到雙倍花費",
        fee: "費用",
        height: "高度",
        note: "注意",
        paymentid: "付款ID",
        suggestedConfirmationsThreshold: "建議的確認閾值",
        timestamp: "時間戳",
        txid: "TxID",
        type: "類型",
        unlockTime: "地址"
    }
}
