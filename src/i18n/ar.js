export default {
    buttons: {
        // All button text is uppercased in the gui
        advanced: "متطور",
        addressBook: "دليل العناوين",
        all: "الجميع",
        back: "عودة",
        browse: "الابحر",
        cancel: "إلغاء",
        change: "تغيير",
        check: "التحقق",
        clear: "مسح",
        close: "أغلاق",
        contacts: "إتصالات",
        copyAddress: " نسخ العنوان",
        copySignature: "نسخ التوقيع",
        createWallet: "إنشاء المحفظة",
        delete: "حذف",
        edit: "تعديل",
        export: "تصدير",
        generate: "انشاء",
        import: "استيراد",
        importWallet: "استيراد المحفظة | استيراد المحافظ",
        next: "التالي",
        openWallet: "افتح المحفظة",
        receive: "تسلم",
        registerServiceNode: "تسجيل عقدة الخدمة",
        rescan: "إعادة تفحص",
        restoreWallet: "استعادة المحفظة",
        save: "حفظ",
        saveTxNotes: "حفظ ملاحظات TX",
        selectLocation: "اختر موقعا",
        selectWalletFile: "حدد ملف المحفظة",
        send: "إرسال",
        sendCoins: "إرسال عملات معدنية",
        serviceNode: "عقدة الخدمة",
        settings: "الإعدادات",
        showQRCode: "إظهار رمز الاستجابة السريعة",
        showTxDetails: "إظهار تفاصيل TX",
        stake: "الرهان",
        sweepAll: "مسح",
        txHistory: "TX التاريخ",
        unlock: "الغاء القفل",
        viewOnExplorer: "عرض على المستكشف",
        wallet: "المحفظة"
    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "نعم",
            cancel: "إلغاء",
            open: "فتح"
        },
        // Dialogs
        banPeer: {
            title: "استبعاد الاقران",
            peerDetailsTitle: "تفاصيل الأقران",
            message: "أدخل الوقت بالثواني لاستبعاد الأقران. \n الافتراضي 3600 = 1 ساعة.",
            ok: "استبعاد الاقران"
        },
        copyAddress: {
            title: "نسخ العنوان",
            message: "يوجد معرّف دفع مقترن بهذا العنوان. \n تأكد من نسخ معرف الدفع بشكل منفصل."
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "نسخ {type}",
            message: "كن حذرًا لمن ترسل مفاتيحك الخاصة لأنه يتحكم في أموالك.",
            seedWords: "كلمات الأمان",
            viewKey: "مفتاح العرض",
            spendKey: "مفتاح المصاريف "
        },
        deleteWallet: {
            title: "حذف المحفظة",
            message: "هل أنت متأكد تمامًا من أنك تريد حذف محفظتك؟ \ تأكد من الاحتفاظ بنسخة احتياطية من مفاتيحك الخاصة. \n هذه العملية ليست قابلة للعكس!",
            ok: "حذف"
        },
        exit: {
            title: "خروج",
            message: "هل أنت متأكد من انك تريد الخروج؟ ",
            ok: "خروج"
        },
        keyImages: {
            title: "{type} الصور الرئيسية",
            message: "هل ترغب في {type} الصور الرئيسية?",
            export: "تصدير",
            import: "استيراد"
        },
        noPassword: {
            title: "لم يتم تعيين كلمة مرور",
            message: "هل أنت متأكد أنك تريد إنشاء محفظة بدون كلمة مرور؟",
            ok: "نعم"
        },
        password: {
            title: "كلمه السر",
            message: "أدخل كلمة مرور المحفظة للمتابعة."
        },
        registerServiceNode: {
            title: "تسجيل عقدة الخدمة ",
            message: "هل تريد تسجيل عقدة الخدمة؟ ",
            ok: "تسجيل"
        },
        rescan: {
            title: "إعادة فحص المحفظة",
            message: "تحذير: سيتم فقد بعض المعلومات حول المعاملات السابقة \n مثل عنوان المستلم. ",
            ok: "إعادة فحص"
        },
        restart: {
            title: "إعادة تشغيل",
            message: "تتطلب التغييرات إعادة التشغيل. هل ترغب في إعادة تشغيل الآن؟",
            ok: "إعادة تشغيل"
        },
        showPrivateKeys: {
            title: "إظهار المفاتيح الخاصة",
            message: "هل تريد عرض مفاتيحك الخاصة؟",
            ok: "عرض"
        },
        stake: {
            title: "حصة",
            message: "هل تريد المشاركة؟",
            ok: "الرهان"
        },
        sweepAll: {
            title: "اكتساح الكل",
            message: "هل تريد اكتساح كل شيء؟ ",
            ok: "كنس الكل"
        },
        sweepAllWarning: {
            title: "امسح كل التحذيرات ",
            message: "أنت على وشك دمج جميع أموالك غير المنفقة عن طريق إرسال معاملة إلى نفسك ، وقد تظهر محفظتك رصيدًا قدره 0 مؤقتًا ، بعد 18 كتلة سيتم فتح أموالك ويمكنك المشاركة بشكل طبيعي. ",
            ok: "واصل"
        },
        switchWallet: {
            title: "تبديل المحفظة",
            closeMessage: "هل أنت متأكد أنك تريد إغلاق المحفظة الحالية؟",
            restartMessage: "تجري حاليًا مزامنة RPC للمحفظة. \n إذا كنت ترغب في تبديل المحافظ ، فيجب عليك إعادة تشغيل التطبيق. \n ستفقد تقدم المزامنة وسيتعين عليك إعادة فحص blockchain مرة أخرى. "
        },
        transactionDetails: {
            title: "تفاصيل الصفقه ",
            ok: "غلق"
        },
        transfer: {
            title: "تحويل ",
            message: "هل تريد إرسال المعاملة؟",
            ok: "إرسال"
        },
        unlockConfirm: {
            title: "تأكيد فتح",
            ok: "الغاء القفل"
        },
        unlockServiceNode: {
            title: "افتح عقدة الخدمة",
            confirmTitle: "تأكيد فتح",
            message: "هل تريد فتح عقدة الخدمة؟ ",
            ok: "الغاء القفل"
        },
        unlockServiceNodeWarning: {
            title: "فتح تحذير عقدة الخدمة",
            message: "سيؤدي فتح حصة جزئية في العقدة أيضًا إلى إلغاء الاشتراك في أي مشارك آخر ، إذا كان الاشتراك في عقدة مشتركة ، فمن الأفضل السماح للمشغل والمشاركين الآخرين بمعرفة أنك غير مرتبط. ",
            ok: "استمر"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "عنوان",
        amount: "كمية",
        confirmPassword: "تأكيد كلمة المرور",
        daemonLogLevel: "DAEMON LOG LEVEL",
        daemonP2pPort: "DAEMON P2P PORT",
        daemonZMQIP: "ZMQ DAEMON IP",
        daemonZMQPort: "ZMQ DAEMON PORT",
        dataStoragePath: "مسار تخزين البيانات",
        filter: "منقي",
        filterTransactionType: "التصفية حسب نوع المعاملة",
        internalWalletPort: "منفذ المحفظة الداخلي",
        keyImages: {
            exportDirectory: "دليل تصدير الصور الرئيسية",
            importFile: "ملف استيراد الصور الرئيسية"
        },
        limitDownloadRate: "حد معدل التنزيل",
        limitUploadRate: "حد معدل التحميل",
        localDaemonIP: "LOCAL DAEMON IP",
        localDaemonPort: "LOCAL DAEMON PORT (RPC)",
        maxIncomingPeers: "الحد الأقصى من الأفراد الوافدين ",
        maxOutgoingPeers: "أقصى عدد من الأشخاص المتخرجين",
        message: "رسالة",
        mnemonicSeed: "عبارة الأمان",
        name: "اسم",
        newWalletName: "اسم المحفظة الجديد",
        notes: "ملاحظات",
        optional: "اختياري",
        password: "كلمه السر",
        paymentId: "معرف الدفع ",
        priority: "أفضلية",
        remoteNodeHost: "مضيف العقدة البعيدة",
        remoteNodePort: "منفذ العقدة البعيدة ",
        restoreFromBlockHeight: "استعد من ارتفاع الكتلة ",
        restoreFromDate: "استعادة من التاريخ",
        seedLanguage: "لغة عبارة الأمان",
        serviceNodeCommand: "SERVICE NODE COMMAND",
        serviceNodeKey: "SERVICE NODE KEY",
        signature: "التوقيع",
        transactionId: "رقم المعاملة",
        wallet247: "هل تخطط لإبقاء المحفظة مضاءة على مدار الساعة طوال أيام الأسبوع؟ ",
        walletFile: "ملف المحفظة",
        walletLogLevel: "مستوى سجل المحفظة",
        walletName: "اسم المحفظة",
        walletRPCPort: "منفذ المحفظة RPC",
        walletStoragePath: "مسار تخزين المحفظة",
        protocol: "بروتوكول",
        hostname: "HOSTNAME",
        endpoint: "نقطة النهاية",
        port: "PORT",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "تأكيد كلمة المرور الجديدة ",
        newPassword: "كلمة السر الجديدة",
        oldPassword: "كلمة سر قديمة ",
        rescanFullBlockchain: "إعادة فحص blockchain الكامل ",
        rescanSpentOutputs: "قضى إعادة تفحص النواتج ",
        transactionNotes: "ملاحظات المعاملات ",
        network: "شبكة الاتصال",
        stagenet: "stagenet"
    },
    footer: {
        ready: "جاهز",
        scanning: "يتم المسح",
        status: "حالة",
        syncing: "تزامن",
        remote: "بعيد",
        wallet: "محفظة"
    },
    menuItems: {
        about: "حول",
        changePassword: "تغيير كلمة المرور",
        copyAddress: "نسخ العنوان",
        copyQR: "انسخ رمز الاستجابة السريعة",
        copySeedWords: "نسخ كلمات الأمان ",
        copySpendKey: "نسخ مفتاح الإنفاق",
        copyServiceNodeKey: "نسخ مفتاح عقدة الخدمة",
        copyTransactionId: "انسخ معرف المعاملة",
        copyViewKey: "نسخ مفتاح العرض",
        createNewWallet: "إنشاء محفظة جديدة",
        deleteWallet: "حذف المحفظة",
        exportTransactions: "معاملات التصدير ",
        exportWallet: "تصدير المحفظة",
        exit: " محفظة  الخروج من Arqma GUI Wallet",
        importOldGUIWallet: "استيراد محافظ من واجهة المستخدم الرسومية القديمة ",
        manageKeyImages: "إدارة الصورة الرئيسية ",
        openWallet: "افتح المحفظة",
        rescanWallet: "إعادة فحص المحفظة",
        restoreWalletFile: "استعادة المحفظة من الملف ",
        restoreWalletSeed: "استعادة المحفظة باستعمال عبارة الأمان ",
        saveIdenticon: "حفظ المعرف في ملف ",
        saveQR: "حفظ المعرف لحفظ رمز الاستجابة السريعة في ملف ",
        sendToThisAddress: "أرسل إلى هذا العنوان ",
        settings: "إعدادات",
        showDetails: "اظهر التفاصيل ",
        showPrivateKeys: "عرض المفاتيح الخاصة",
        showQRCode: "كيف رمز الاستجابة السريعة ",
        soloMining: "Solo Mining",
        switchWallet: "تبديل المحفظة",
        viewOnExplorer: "عرض على استكشاف"
    },
    notification: {
        positive: {
            addressCopied: "تم نسخ العنوان إلى الحافظة ",
            bannedPeer: "محظور  {host} حتى {time}",
            copied: "{item} نسخ إلى الحافظة ",
            itemSaved: "{item} المحفوظة ل {filename}",
            keyImages: {
                exported: "تم تصدير الصور الرئيسية إلى  {filename}",
                imported: "تم استيراد الصور الرئيسية "
            },
            passwordUpdated: "تم تحديث كلمة السر ",
            qrCopied: "تم نسخ رمز الاستجابة السريعة إلى الحافظة ",
            registerServiceNodeSuccess: "تم تسجيل عقدة الخدمة بنجاح ",
            sendSuccess: "تم إرسال المعاملة بنجاح ",
            signatureCopied: "تم نسخ التوقيع إلى الحافظة ",
            stakeSuccess: "رهان بنجاح ",
            transactionNotesSaved: "تم حفظ ملاحظات المعاملة "
        },
        errors: {
            banningPeer: "خطأ في حظر الأقران",
            cannotAccessRemoteNode: "تعذر الوصول إلى العقدة البعيدة ، يرجى تجربة عقدة بعيدة أخرى ",
            changingPassword: "تعذر الوصول إلى العقدة البعيدة ، يرجى تجربة عقدة بعيدة أخرى ",
            copyWalletFail: "فشل نسخ المحفظة ",
            copyingPrivateKeys: "خطأ في نسخ المفاتيح الخاصة ",
            dataPathNotFound: "مسار تخزين البيانات غير موجود",
            differentNetType: "تستخدم العقدة البعيدة نوع نات مختلف ",
            enterSeedWords: "أدخل كلمات الأمان",
            enterTransactionId: "أدخل معرف المعاملة",
            enterTransactionProof: "أدخل إثبات المعاملة",
            enterWalletName: "أدخل اسم المحفظة",
            errorSavingItem: "خطأ في الحفظ {item}",
            failedServiceNodeUnlock: "فشل إلغاء تأمين عقدة الخدمة ",
            failedToSetLanguage: "فشل تعيين اللغة:  {lang}",
            failedWalletImport: "فشل استيراد المحفظة",
            failedWalletOpen: "فشل في فتح المحفظة. حاول مرة اخرى. ",
            internalError: "خطأ داخلي ",
            invalidAddress: "العنوان غير صحيح",
            invalidAmount: "المبلغ غير صالح",
            invalidOldPassword: "كلمة المرور القديمة غير صحيحة",
            invalidPassword: "رمز مرور خاطئ",
            invalidPaymentId: "معرف الدفع غير صالح",
            invalidPrivateViewKey: "مفتاح العرض الخاص غير صالح",
            invalidPublicAddress: "العنوان العام غير صالح",
            invalidRestoreDate: "تاريخ الاستعادة غير صالح",
            invalidRestoreHeight: "ارتفاع الاستعادة غير صالح",
            invalidSeedLength: "طول كلمة كلمات غير صالح",
            invalidServiceNodeCommand: "الرجاء إدخال أمر تسجيل عقدة الخدمة",
            invalidServiceNodeKey: "مفتاح عقدة الخدمة غير صالح",
            invalidWalletPath: "مسار المحفظة غير صالح",
            keyImages: {
                exporting: "خطأ في تصدير الصور الرئيسية",
                reading: "خطأ في قراءة الصور الرئيسية",
                importing: "خطأ في استيراد الصور الرئيسية"
            },
            negativeAmount: "لا يمكن أن يكون المبلغ سالبًا",
            newPasswordNoMatch: "كلمات المرور الجديدة لا تتطابق",
            newPasswordSame: "يجب أن تكون كلمة المرور الجديدة مختلفة",
            notEnoughBalance: "لا يوجد رصيد غير مقفل كافٍ",
            passwordNoMatch: "كلمة المرور غير مطابقة",
            remoteCannotBeReached: "لا يمكن الوصول إلى البرنامج الخفي البعيد",
            selectWalletFile: "حدد ملف المحفظة",
            unknownError: "حدث خطأ غير معروف",
            walletAlreadyExists: "المحفظة التي تحمل الاسم موجودة بالفعل",
            walletPathNotFound: "لم يتم العثور على مسار تخزين بيانات المحفظة",
            zeroAmount: "يجب أن يكون المبلغ أكبر من الصفر"
        },
        warnings: {
            noKeyImageExport: "لم يتم العثور على صور رئيسية للتصدير",
            usingLocalNode: "تعذر الوصول إلى العقدة البعيدة ، التبديل إلى المحلية فقط",
            usingRemoteNode: "arqmad غير موجود ، باستخدام عقدة بعيدة"
        }
    },
    placeholders: {
        additionalNotes: "ملاحظات إضافية",
        addressBookName: "الاسم الذي ينتمي إلى هذا العنوان",
        filterTx: "أدخل معرفًا أو اسمًا أو عنوانًا أو مبلغًا",
        hexCharacters: "{count} أحرف سداسية عشرية",
        mnemonicSeed: "25 (أو 24) كلمة أمان",
        pasteTransactionId: "لصق معرف المعاملة",
        pasteTransactionProof: "لصق إثبات المعاملة",
        proveOptionalMessage: "رسالة اختيارية يتم التوقيع على التوقيع عليها",
        recipientWalletAddress: "عنوان محفظة المستلم",
        selectAFile: "الرجاء تحديد ملف",
        transactionNotes: "ملاحظات إضافية لإرفاقها بالمعاملة",
        walletName: "اسم محفظتك",
        walletPassword: "كلمة مرور اختيارية للمحفظة",
        operations: "محفظة الأسهم",
        walletOperations: "تبين"
    },
    strings: {
        addAddressBookEntry: "إضافة إدخال دفتر العناوين",
        addressBookDetails: "تفاصيل دفتر العناوين",
        addressBookIsEmpty: "دفتر العناوين فارغ",
        addresses: {
            myPrimaryAddress: "عنواني الأساسي",
            myUnusedAddresses: "عناويني غير المستخدمة",
            myUsedAddresses: "عناويني المستخدمة",
            primaryAddress: "العنوان الأساسي",
            subAddress: "العنوان الفرعي",
            subAddressIndex: "فهرس {index}"
        },
        advancedOptions: "خيارات متقدمة",
        bannedPeers: {
            title: "الأقران المحظورون (سيتم مسح الحظر في حالة إعادة تشغيل المحفظة) ",
            bannedUntil: "محظور حتى {time}"
        },
        backupSeedWord: "احتفظ بنسخة احتياطية من عبارة الأمان في مكان آمن ! هذه هي الطريقة الوحيدة للوصول إلى أموالك إذا قمت بتبديل الأجهزة.",
        blockHeight: "ارتفاع",
        confirmWords: "قم بتأكيد كلمات بذرة ذاكري",
        enter7words: "أدخل الكلمات السبع الأولى من بذرتك بالترتيب الصحيح:",
        usingEmptyPass: "سيؤدي استخدام كلمة مرور فارغة إلى ترك محفظتك غير مشفرة على نظام الملفات الخاص بك! ",
        usingInsecurePass: "قد يؤدي استخدام كلمة مرور غير آمنة إلى السماح للمهاجمين بفرض محفظتك بقوة!",
        checkTransaction: {
            description: "تحقق من أنه تم دفع الأموال إلى عنوان من خلال توفير معرف المعاملة وعنوان المستلم والرسالة المستخدمة للتوقيع والتوقيع. \n للحصول على إثبات الإنفاق ، لن تحتاج إلى تقديم عنوان المستلم.",
            infoTitles: {
                confirmations: "التأكيدات",
                inPool: "في البركة",
                validTransaction: "معاملة صالحة",
                received: "المبلغ الذي تسلمه"
            },
            validTransaction: {
                no: "لا",
                yes: "نعم"
            }
        },
        closing: "إغلاق",
        connectingToBackend: "الاتصال بالخلفية",
        contribution: "مساهمة",
        daemon: {
            local: {
                title: "الشيطان المحلي فقط",
                description: "أمان كامل ، ستقوم المحفظة بتنزيل blockchain الكامل. لن تتمكن من إجراء المعاملات حتى تكتمل المزامنة. "
            },
            localRemote: {
                title: "Local + Remote Daemon ",
                description: "ابدأ بسرعة مع هذا الخيار الافتراضي. ستقوم Wallet بتنزيل blockchain الكامل ، ولكن استخدم عقدة بعيدة أثناء المزامنة."
            },
            remote: {
                title: "برنامج Remote Daemon فقط ",
                description: "أقل أمانًا ، ستتصل المحفظة بعقدة بعيدة لإجراء جميع المعاملات."
            },
            zmq: {
                title: "ZMQ Daemon فقط "
            }
        },
        destinationUnknown: "الوجهة غير معروفة",
        editAddressBookEntry: "تحرير إدخال دفتر العناوين",
        enhancedOptions: {
            privateNetworkMode: "لا - وضع الشبكة الخاصة",
            interconnectedNetworkMode: "نعم - وضع الشبكة المترابطة"
        },
        getStarted: "للبدء ، حدد أحد الخيارات أدناه: ",
        loading: "جار التحميل...",
        loadingSettings: "إعدادات التحميل",
        arqmaBalance: "رصيد",
        arqmaExchangeBalance: "رصيد",
        arqmaUnlockedBalance: "رصيد مفتوح ",
        arqmaUnlockedShort: "مفتوحة",
        noTransactionsFound: "لم يتم العثور على معاملات",
        notes: "ملاحظات",
        numberOfUnspentOutputs: "عدد المخرجات غير المنفقة",
        paymentID: "معرف الدفع",
        passwordStrength: "قوة كلمة المرور",
        peerList: "قائمة الأقران",
        priorityOptions: {
            automatic: "أوتوماتيكي",
            slow: "بطيء",
            normal: "طبيعي",
            fast: "سريع",
            fastest: "أسرع"
        },
        proveTransactionDescription: "قم بإنشاء دليل على دفعتك الواردة / الصادرة عن طريق توفير معرف المعاملة وعنوان المستلم ورسالة اختيارية. \n في حالة المدفوعات الصادرة ، يمكنك الحصول على إثبات الإنفاق الذي يثبت تأليف المعاملة. في هذه الحالة ، لا تحتاج إلى تحديد عنوان المستلم.",
        readingWalletList: "قراءة قائمة المحفظة",
        recentIncomingTransactionsToAddress: "المعاملات الواردة الأخيرة لهذا العنوان",
        recentTransactionsWithAddress: "المعاملات الأخيرة بهذا العنوان",
        rescanModalDescription: "حدد إعادة المسح الكامل أو إعادة المسح الضوئي للمخرجات المستهلكة فقط.",
        saveSeedWarning: "يرجى نسخ وحفظ هذه في مكان آمن!",
        saveToAddressBook: "حفظ في دفتر العناوين ",
        seedWords: "كلمات الأمان",
        selectLanguage: "اختار اللغة",
        serviceNodeContributionDescription:
        "Staking contributes to the safety of the ARQMA network. For your contribution, you earn ARQMA. Once staked, you will have to wait either 15 or 30 days to have your ARQMA unlocked, depending on if a stake was unlocked by a contributor or the node was deregistered. To learn more about staking, please visit the documentation on the",
        serviceNodeRegistrationDescription: "ادخل {registerCommand} الأمر الذي تم إنشاؤه بواسطة البرنامج الخفي الذي يتم تسجيله ليصبح عقدة خدمة باستخدام  \"{prepareCommand}\" الأمر",


        serviceNodeStartStakingDescription:
        "To start staking, please visit the Staking tab",
        noServiceNodesCurrentlyAvailable:
            "There are currently no service nodes available for contribution",
        serviceNodeDetails: {
            contributors: "Contributors",
            lastRewardBlockHeight: "Last reward block height",
            lastUptimeProof: "Last uptime proof",
            maxContribution: "Max contribution",
            minContribution: "Min contribution",
            operatorFee: "Operator Fee",
            registrationHeight: "Registration height",
            unlockHeight: "Unlock height",
            reserved: "Reserved",
            serviceNodeKey: "Service Node Key",
            snKey: "SN Key",
            stakingRequirement: "Staking requirement",
            totalContributed: "Total contributed"
        },
        signAndVerifyDescription:
            "Sign data with your primary address's private key or verify a signature against a public address.",





        spendKey: "مفتاح الإنفاق",
        startingDaemon: "بدء البرنامج الخفي",
        startingWallet: "بدء المحفظة ",
        switchToDateSelect: "التبديل إلى تحديد التاريخ ",
        switchToHeightSelect: "التبديل إلى تحديد الارتفاع",
        syncingDaemon: "مزامنة البرنامج الخفي",
        transactionID: "رقم المعاملة",
        transactionConfirmed: "تم تأكيد",
        transactions: {
            amount: "كمية",
            description: "{type} صفقة",
            fee: "مصاريف",
            paidBySender: "يدفعه المرسل",
            received: "تم الاستلام",
            sent: "ارسل",
            sentTo: "{type} تم إرسال المعاملة إلى ",
            timestamp: "الطابع الزمني",
            types: {
                all: "الجميع",
                incoming: "واردة",
                outgoing: "منفتح",
                pending: "قيد الانتظار",
                pendingIncoming: "في انتظار وارد",
                pendingOutgoing: "في انتظار المنتهية ولايته ",
                miner: "عامل منجم",
                serviceNode: "عقدة الخدمة",
                governance: "الحكم",
                stake: "حصة",
                failed: "باءت بالفشل"
            }
        },
        unspentOutputs: "النواتج غير المنفقة",
        userNotUsedAddress: "لم تستخدم هذا العنوان",
        userUsedAddress: "لقد استخدمت هذا العنوان",
        viewKey: "عرض مفتاح",
        viewOnlyMode: "طريقة العرض فقط. يرجى تحميل المحفظة كاملة لإرسال العملات المعدنية.",
        website: "website"
    },
    titles: {
        addressBook: "دليل العناوين",
        addressDetails: "تفاصيل العنوان",
        advanced: {
            checkTransaction: "تحقق من المعاملة ",
            prove: "إثبات"
        },
        availableForContribution: "Service nodes available for contribution",
        changePassword: "تغيير كلمة المرور",
        configure: "تهيئة",
        currentlyStakedNodes: "العقد المتوقفة حاليًا",
        onsRecordDetails: "ONS record details",
        onsSessionRecords: "Session records",
        onsArqmaRecords: "Arqma records",
        onsWalletRecords: "Wallet records",
        privateKeys: "مفاتيح خاصة",
        rescanWallet: "إعادة فحص المحفظة",
        serviceNode: {
            registration: "التسجيل",
            staking: "الرهان",
            myStakes: "MY STAKES"
        },
        serviceNodeDetails: "Service node details",
        settings: {
            title: "إعدادات",
            tabs: {
                general: "جنرال لواء",
                language: "لغة",
                peers: "الأقران",
                exchange: "تبادل"
            }
        },
        transactionDetails: "تفاصيل الصفقه ",
        transactions: "المعاملات",
        wallet: {
            createNew: "إنشاء محفظة جديدة",
            mcreateNew: "إنشاء محفظة جديدة متعددة التوقيع",
            createdOrRestored: "تم إنشاء / استعادة المحفظة ",
            importFromFile: "استيراد المحفظة من ملف",
            importFromLegacyGUI: "استيراد المحفظة من واجهة المستخدم الرسومية القديمة ",
            importFromOldGUI: "استيراد المحفظة من واجهة المستخدم الرسومية القديمة ",
            restoreFromSeed: "استعادة المحفظة عن طريق عبارة الأمان ",
            restoreViewOnly: "استعادة محفظة العرض فقط"
        },
        versionDaemon: "إصدار Daemon",
        versionWallet: "نسخة المحفظة ",
        welcome: "مرحبا ",
        welcomeNoWallet: "مرحبا بكم في Arqma Electron Wallet ",
        yourWallets: "محافظك"
    },
    headers: {
        address: "عنوان",
        amount: "كمية ",
        confirmations: "التأكيدات",
        double_spend_seen: "تمت رؤية الإنفاق المزدوج",
        fee: "مصاريف",
        height: "ارتفاع",
        note: "ملحوظة",
        paymentid: "معرف الدفع ",
        suggestedConfirmationsThreshold: "عتبة التأكيدات المقترحة ",
        timestamp: "الطابع الزمني",
        txid: "TxID",
        type: "نوع",
        unlockTime: "فتح الوقت"
    }
}
