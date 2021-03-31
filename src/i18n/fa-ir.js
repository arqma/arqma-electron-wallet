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
        export: "خروجی از اطلاعات",
        generate: "ساختن",
        import: "وارده از اطلاعات قبلی ",
        importWallet: "کیف پول واردشده | کیف پول های وارد شده",
        next: "بعدی",
        openWallet: "بازکردن کیف پول",
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
        stake: "وثیقه گذاشتن ارز خود",
        sweepAll: "از بین بردن همه",
        txHistory: "تاریخچه تراکنش ها",
        unlock: "باز کردن قفل",
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
            title: "خروج از برنامه",
            message: "آیا مطمین هستید میخواهید خروج شوید؟",
            ok: "خروج"
        },
        keyImages: {
            title: "{درحال تایپ کردن} تصاویر کلیدی",
            message: "آیا شما {در حال تایپ} تصاویر کلیدی را میخواهید?",
            export: "خروجی از اطلاعات",
            import: "ورودی از اطلاعات قبلی"
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
            message: "آزادسازی جزئی از وثیقه در یک نود باعث بدون وثیقه شدن سایر شرکت کنندگان میگردد ،اگر وثیقه های  نود های مشترک استفاده مینمایید بهترین کار این است به اپراتور و سایر شرکت کنندگان بفهمانید که بدون وثیقه ارزی هستید .",
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
        about: "درباره",
        changePassword: "تغییر رمز عبور",
        copyAddress: "کپی آدرس",
        copyQR: "کپی بارکد",
        copySeedWords: "کپی کلمات هسته",
        copySpendKey: "کپی کلید پرداخت",
        copyServiceNodeKey: "کپی کلید خدمات نود",
        copyTransactionId: "کپی شناسه تراکنش",
        copyViewKey: "کپی کلید نمایش",
        createNewWallet: "ساخت کیف پول جدید",
        deleteWallet: "حذف کیف پول",
        exportTransactions: "خروجی تراکنش ها",
        exportWallet: "خروجی کیف پول",
        exit: "خروج از کیف پول آرکما",
        importOldGUIWallet: "وارد کردن کیف پول های دیمی",
        manageKeyImages: "مدیریت کلید تصویری",
        openWallet: "باز کردن کیف پول",
        rescanWallet: "بازبینی مجدد کیف پول",
        restoreWalletFile: "بازیابی کیف پول از یک فایل",
        restoreWalletSeed: "بازیابی کیف پول از هسته",
        saveQR: "ذخیره بارکد در پوشه",
        sendToThisAddress: "به این آدرس ارسال شود",
        settings: "تنظیمات",
        showDetails: "نمایش جزئیات",
        showPrivateKeys: "نمایش کلید های خصوصی",
        showQRCode: "نمایش بارکد",
        switchWallet: "تغییر کیف پول",
        viewOnExplorer: "مشاهده در کاوشگر"
    },
    notification: {
        positive: {
            addressCopied: "کپی آدرس در حافظه",
            bannedPeer: "{ممنوع کردن {میزبان} تا {مدت زمان",
            copied: "مورد} در حافظه کپی شد}",
            itemSaved: "{مورد} ذخیره در {نام فایل}",
            keyImages: {
                exported: "{کلید تصویری ارسال شود به {نام پوشه",
                imported: "ورود کلید تصویری"
            },
            passwordUpdated: "رمز عبور به روزرسانی شد",
            qrCopied: "بارکد در حافظه کپی شد",
            registerServiceNodeSuccess: "خدمات نود با موفقیت ثبت شد",
            sendSuccess: "تراکنش با موفقیت ارسال شد",
            signatureCopied: "امضا در حافظه کپی شد",
            stakeSuccess: "اعتبار موفقیت آمیز بود",
            transactionNotesSaved: "یادداشت های تراکنش ها ذخیره شد"
        },
        errors: {
            banningPeer: "خطای ممنوعیت کاربران",
            cannotAccessRemoteNode: "دسترسی  به این نود امکان پذیر نیست، لطفا یک نود دیگر را امتحان نمایید",
            changingPassword: "خطا در تغییر رمز عبور",
            copyWalletFail: "کپی کیف پول انجام نشد",
            copyingPrivateKeys: "خطا در کپی کلید های خصوصی",
            dataPathNotFound: "مسیر ذخیره اطلاعات یافت نشد",
            differentNetType: "نود از نوع دیگری ارتباط استفاده میکند",
            enterSeedWords: "کلمات هسته را وارد نمایید",
            enterTransactionId: "آی دی تراکنش راوارد نمایید",
            enterTransactionProof: "مدارک تراکنش راوارد نمایید",
            enterWalletName: "نام کیف پول را وارد نمایید",
            errorSavingItem: "{خطا در ذخیره سازی {مورد",
            failedServiceNodeUnlock: "قفل خدمات نود باز نشد",
            failedToSetLanguage: "{تنظیم زبان انجام نشد: {زبان",
            failedWalletImport: "وارد کردن کیف پول انجام نشد",
            failedWalletOpen: "کیف پول باز نشد،لطفادوباره امتحان نمایید.",
            internalError: "خطای داخلی",
            invalidAddress: "آدرس معتبر نیست",
            invalidAmount: "مقدار معتبر نیست",
            invalidOldPassword: "رمز عبور قدیمی معتبر نیست",
            invalidPassword: "رمز عبور معتبر نیست",
            invalidPaymentId: "شناسه پرداخت معتبر نیست",
            invalidPrivateViewKey: "کلید نمایش شخصی نامعتبر است",
            invalidPublicAddress: "آدرس عمومی نامعتبر است",
            invalidRestoreDate: "بازیابی تاریخ نامعتبر است",
            invalidRestoreHeight: "بازیابی ارتفاع نامعتبر است",
            invalidSeedLength: "طول کلمات هسته نامعتبر است ",
            invalidServiceNodeCommand: "لطفا دستور خدمات نود را وارد نمایید",
            invalidServiceNodeKey: "کلید خدمات نود نامعتبر است",
            invalidWalletPath: "مسیر کیف پول نامعتبر است",
            keyImages: {
                exporting: "خطا در خروجی کلید تصویری ",
                reading: "خطا در خواندن کلید تصویری",
                importing: "خطا در بارگذاری کلید تصویری"
            },
            negativeAmount: "مقدار نمیتواند منفی باشد",
            newPasswordNoMatch: "رمز عبور جدید مطابقت ندارد",
            newPasswordSame: "رمز عبور جدید باید متفاوت باشد",
            notEnoughBalance: "موجودی در دسترس کافی نیست",
            passwordNoMatch: "رمز عبور مطابقت ندارد",
            remoteCannotBeReached: "شبکه در دسترس نمی باشد",
            selectWalletFile: "پوشه کیف پول راانتخاب نمایید",
            unknownError: "خطای ناشناخته شناسایی شد",
            walletAlreadyExists: "کیف پول با این نام ها وجود دارد",
            walletPathNotFound: "مسیر ذخیره اطلاعات کیف پول یافت نشد",
            zeroAmount: "مقدار باید از صفر بیشتر باشد"
        },
        warnings: {
            noKeyImageExport: "هیچ کلید تصویری برای ذخیره سازی یافت نشد",
            usingLocalNode: "نمیتوان به نود های شبکه دسترسی داشت ، از نود محلی استفاده نمیایید",
            usingRemoteNode: "نود های آرکما پیدا نشد،از نود های شبکه استفاده نمایید"
        }
    },
    placeholders: {
        additionalNotes: "یادداشت های اضافی",
        addressBookName: "نامی که متعلق به این آدرس است",
        filterTx: "فیلتر",
        hexCharacters: "نویسه هگزادسیمال ",
        mnemonicSeed: "کلمات حفظی هسته",
        pasteTransactionId: "جایگذاری آی دی تراکنش",
        pasteTransactionProof: "جایگذاری مدارک تراکنش",
        proveOptionalMessage: "پیام های اختیاری که امضا شده اند",
        recipientWalletAddress: "آدرس کیف پول گیرنده",
        selectAFile: "انتخاب پوشه",
        transactionNotes: "یادداشت های تراکنش",
        walletName: "نام کیف پول",
        walletPassword: "رمز عبور کیف پول",
        operations: "عملکرد کیف پول",
        walletOperations: "نمایش"
    },
    strings: {
        addAddressBookEntry: "اضافه کردن آدرس های ورودی",
        addressBookDetails: "جزئیات آدرس ها",
        addressBookIsEmpty: "دفترچه آدرس ها خالی است",
        addresses: {
            myPrimaryAddress: "آدرس اصلی من",
            myUnusedAddresses: "آدر س های بلا استفاده من",
            myUsedAddresses: "آدرس های مورد استفاده من",
            primaryAddress: "آدرس اصلی",
            subAddress: "آدرس فرعی",
            subAddressIndex: "فهرست {index}"
        },
        advancedOptions: "گزینه های بیشتر",
        bannedPeers: {
            title: "(ممنوعیت برای سایرین (ممنوعیت با دوباره راه اندازی کیف پول از بین خواهد رفت",
            bannedUntil: "ممنوعیت تا زمان {time}"
        },
        backupSeedWord: "تهیه نسخه پشتیبان از کلمه هسته.",
        blockHeight: "ارتفاع شبکه",
        confirmWords: "تایید کلمات حفظی هسته",
        enter7words: "هفت کلمه اول هسته حفظی خود را به ترتیب صحیح وارد نمایید:",
        usingEmptyPass: "بدون رمز عبور ،کیف پول شما در پوشه سیستم رمزگذاری نمیگردد!",
        checkTransaction: {
            description: "تایید پرداخت وجوهبه آدرس  دریافتی با تهیه آی دی تراکنش،آدرس گیرنده،پیام مورد استفاده برای امضا.\nبرای مدرک اثبات نیازی به آدرس گیرنده نمیباشد.",
            infoTitles: {
                confirmations: "تایید ها",
                inPool: "در استخر",
                validTransaction: "تراکنش معتبر",
                received: "مقدار دریافتی"
            },
            validTransaction: {
                no: "نه",
                yes: "بله"
            }
        },
        closing: "بستن",
        connectingToBackend: "اتصال به دامنه اصلی",
        contribution: "مشارکت",
        daemon: {
            local: {
                title: "فقط شبکه محلی",
                description: "امنیت کامل،کیف پول دامنه بلاک چین را کامل دانلود میکند،تازمان همگام سازی کامل قادر به انجام معاملات نیستید ."
            },
            localRemote: {
                title: "محلی + کنترل شبکه",
                description: "با تنظیمات پیش فرض سریع شروع کنید ، کیف پولکل دامنه بلاک چین رادانلودمیکند ، هنگام همگام سازی از دامنه نود استفاده نمایید."
            },
            remote: {
                title: "فقط کنترل شبکه",
                description: "امنیت کمتر، کیف پول جهت انجام تراکنش ها به یک نود متصل میشود ."
            }
        },
        destinationUnknown: "مقصد ناشناخته است",
        editAddressBookEntry: "ویرایش دفترچه آدرس های ورودی",
        loading: "در حال بارگذاری ...",
        loadingSettings: "تنظیمات بارگذاری",
        arqmaBalance: "موجودی آرکما",
        arqmaExchangeBalance: "موجودی مبادله آرکما",
        arqmaUnlockedBalance: "موجودی قفل شده آرکما",
        arqmaUnlockedShort: "آرکما کوتاه مدت قفل شده است",
        noTransactionsFound: "تراکنشی پیدا نشد",
        notes: "یادداشت ها",
        numberOfUnspentOutputs: "تعدادخروجی های مصرف نشده",
        paymentID: "شناسه پرداخت",
        peerList: "لیست برابری دسترسی",
        priorityOptions: {
            automatic: "اتوماتیک",
            slow: "آهسته",
            normal: "عادی",
            fast: "سریع",
            fastest: "خیلی سریع"
        },
        proveTransactionDescription: "تولید یک مدرک از ورودی ها، پرداخت های خروجی با تهیه شناسه تراکنش ها،آدرس گیرنده و یک پیام اختیاری.\nدر موردپرداخت های خروجی شما میتوانیدهزینه اثبات تراکنش را تایید نمایید در این حالت نیازی به تعیین آدرس گیرنده نیست.",
        readingWalletList: "خواندن لیست کیف پول",
        recentIncomingTransactionsToAddress: "معاملات ورودی اخیر به این آدرس",
        recentTransactionsWithAddress: "معاملات اخیر با این آدرس",
        rescanModalDescription: "انتخاب اسکن مجدد کامل یا فقط اسکن مجدد خروجی های مصرف شده.",
        saveSeedWarning: "ذخیره هشدار هسته در محلی امن!",
        saveToAddressBook: "ذخیره در دفترچه آدرس",
        seedWords: "کلمات هسته",
        selectLanguage: "انتخاب زبان",
        serviceNodeRegistrationDescription: "وارد نمایید {registerCommand} توضیحات ثبت خدمات نود ،دستور تولید شبکه ثبت نود برای تبدیل به خدمات نود \"{prepareCommand}\" دستور",
        spendKey: "کلید صرف شدن",
        startingDaemon: "شروع شبکه",
        startingWallet: "شروع کیف پول",
        switchToDateSelect: "تغییر به تاریخ انتخابی",
        switchToHeightSelect: "تغییر به ارتفاع انتخابی",
        syncingDaemon: "همگام سازی شبکه",
        transactionID: "شناسه تراکنش",
        transactionConfirmed: "تایید شده",
        transactions: {
            amount: "مقدار",
            description: "{type} تراکنش",
            fee: "هزینه",
            paidBySender: "پرداخت شده توسط فرستنده",
            received: "دریافت شده",
            sent: "ارسال شده",
            sentTo: "{type} ارسال تراکنش به",
            timestamp: "تمبر زمانی",
            types: {
                all: "همه",
                incoming: "ورودی",
                outgoing: "خروجی",
                pending: "در انتظار",
                pendingIncoming: "در انتظار ورودی است",
                pendingOutgoing: "در انتظار خروجی است",
                miner: "معدن کار",
                serviceNode: "خدمات نود",
                governance: "حکومت",
                stake: "اعتبار",
                failed: "ناموفق"
            }
        },
        unspentOutputs: "خروجی های مصرف نشده",
        userNotUsedAddress: "شما از این آدرس استفاده نکرده اید",
        userUsedAddress: "شما از این آدرس استفاده کرده اید",
        viewKey: "مشاهده کلید",
        viewOnlyMode: "فقط حالت مشاهده، لطفا برای ارسال ارز کیف پول را کامل بارگیری نمایید."
    },
    titles: {
        addressBook: "دفترچه آدرس",
        addressDetails: "جزیئات آدرس",
        advanced: {
            checkTransaction: "بررسی تراکنش ها",
            prove: "ثابت کردن"
        },
        changePassword: "تغییر رمز عبور",
        configure: "پیکربندی",
        currentlyStakedNodes: "نود های موجود در حال حاظر",
        privateKeys: "کلیدهای خصوصی",
        rescanWallet: "بازبینی کیف پول",
        serviceNode: {
            registration: "ثبت",
            staking: "گرفتن"
        },
        settings: {
            title: "تنظیمات",
            tabs: {
                general: "عمومی",
                language: "زبان",
                peers: "هم گروهی ها",
                exchange: "مبادلات"
            }
        },
        transactionDetails: "جزئیات تراکنش",
        transactions: "تراکنش ها",
        wallet: {
            createNew: "ساخت کیف پول جدید",
            mcreateNew: "ایجاد کیف پول جدید چندمنظوره",
            createdOrRestored: "کیف پول  ساختن/بازیابی ",
            importFromFile: "کیف پول را از پوشه وارد نمایید",
            importFromLegacyGUI: "وارد کردن کیف پول های قبل",
            importFromOldGUI: "وارد کردن کیف پول قبلی",
            restoreFromSeed: "بازیابی کیف پول از هسته",
            restoreViewOnly: "بازیابی کیف پول فقط برای مشاهده"
        },
        welcome: "خوش آمدید",
        yourWallets: "کیف پول های شما"
    },
    headers: {
        address: "آدرس",
        amount: "مقدار",
        confirmations: "تائید ها",
        double_spend_seen: "دوبار دیده شدن",
        fee: "هزینه",
        height: "ارتفاع",
        note: "یادداشت",
        paymentid: "شناسه پرداخت",
        suggestedConfirmationsThreshold: "آستانه تایید های پیشنهادی",
        timestamp: "زمان تمبر",
        txid: "شناسه متنی",
        type: "تایپ کنید",
        unlockTime: "زمان باز کردن قفل"
    }
}
