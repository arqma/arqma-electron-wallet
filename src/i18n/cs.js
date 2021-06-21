export default {
    buttons: {
        // All button text is uppercased in the gui
        advanced: "POKROČILÉ",
        addressBook: "ADRESÁŘ",
        all: "VŠE",
        back: "ZPĚT",
        browse: "PROCHÁZET",
        cancel: "ZRUŠIT",
        change: "ZMĚNIT",
        check: "ZKONTROLOVAT",
        clear: "VYČISTIT",
        close: "ZAVŘÍT",
        contacts: "KONTAKTY",
        copyAddress: "KOPÍROVAT ADRESU",
        copySignature: "KOPIE PODPISU",
        createWallet: "VYTVOŘIT PENĚŽENKU",
        delete: "SMAZAT",
        edit: "EDITOVAT",
        export: "EXPORT",
        generate: "GENEROVAT",
        import: "IMPORT",
        importWallet: "IMPORTOVAT PENĚŽENKU | IMPORTOTOVAT PENĚŽENKY",
        next: "DALŠÍ",
        openWallet: "OTEVŘÍT PENĚŽENKU",
        receive: "PŘIJMOUT",
        registerServiceNode: "ZAREGISTRUJ SERVICE NODE",
        rescan: "ZNOVU PROHLEDAT",
        restoreWallet: "OBNOVIT PENĚŽENKU",
        save: "ULOŽIT",
        saveTxNotes: "ZAPIŠ TX",
        selectLocation: "VYBRAT UMÍSTĚNÍ",
        selectWalletFile: "VYBRAT SOUBOR PENĚŽENKY",
        send: "ODESLAT",
        sendCoins: "ODESLAT ARQ",
        serviceNode: "SERVICE NODE",
        settings: "NASTAVENÍ",
        showQRCode: "ZOBRAZIT QR KÓD",
        showTxDetails: "ZOBRAZIT TX DETAILY",
        stake: "STAKE",
        sweepAll: "VYČISTIT VŠE",
        unlock: "ODEMKNOUT",
        viewOnExplorer: "ZOBRAZIT V PROHLÍŽEČI",
        txHistory: "TX HISTORIE",
        wallet: "PENĚŽENKA"
    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "OK",
            cancel: "ZRUŠIT",
            open: "OTEVŘIT"
        },

        // Dialogs
        banPeer: {
            title: "Banuj peer",
            peerDetailsTitle: "Peer detaily",
            message: "Zadejte délku zákazu peeru v sekundách.\nDefaultně 3600 = 1 hodina.",
            ok: "Banuj peer"
        },
        copyAddress: {
            title: "Kopírovat adresu",
            message: "K této adrese je přiřazeno ID platby.\nJe nutné zkopírovat platební id samostatně."
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "Kopírovat {type}",
            message: "Dávejte pozor komu odesíláte private keys, protože můžou kontrolovat Vaše finance.",
            seedWords: "Seed",
            viewKey: "View Key",
            spendKey: "Spend Key"
        },
        deleteWallet: {
            title: "Smazat peněženku",
            message: "Jste si naprosto jisti, že chcete odstranit svou peněženku?\nUjistěte se, že máte zálohované private keys.\nTENTO PROCES JE NEVRATNÝ!",
            ok: "VYMAZAT"
        },
        exit: {
            title: "Ukončit",
            message: "Opravdu chcete skončit?",
            ok: "UKONČIT"
        },
        keyImages: {
            title: "{type} key images", // **
            message: "Do you want to {type} key images?", // **
            export: "Export",
            import: "Import"
        },
        noPassword: {
            title: "Není nastaveno heslo",
            message: "Opravdu chcete vytvořit peněženku bez hesla?",
            ok: "ANO"
        },
        password: {
            title: "Heslo",
            message: "Chcete-li pokračovat, zadejte heslo peněženky."
        },
        registerServiceNode: {
            title: "Registrovat service node",
            message: "Chcete zaregistrovat service node?",
            ok: "REGISTROVAT"
        },
        rescan: {
            title: "Prohledat peněženku znovu",
            message: "Varování: Některé informace o předešlých transakcích\n,jako třeba adresa příjemce, budou ztraceny.",
            ok: "PROHLEDAT ZNOVU"
        },
        restart: {
            title: "Restartovat",
            message: "Změny vyžadují restartování. Chcete restartovat nyní?",
            ok: "RESTARTOVAT"
        },
        showPrivateKeys: {
            title: "Zobrazit private keys",
            message: "Chcete si nechat zobrazit private keys?",
            ok: "ZOBRAZIT"
        },
        stake: {
            title: "Stake",
            message: "Do you want to stake?",
            ok: "STAKE"
        },
        sweepAll: {
            title: "Vyčistit",
            message: "Chcete vyčistit vše?",
            ok: "VYČISTIT VŠE"
        },
        sweepAllWarning: {
            title: "Vymazat veškerá varování",
            message: "Plánujete kombinovat všechny nevyužité prostředky odesláním transakce k sobě, peněženka může dočasně zobrazit zůstatek 0, po 18 blocích budou vaše prostředky odemčeny a můžete je použít normálně.", // *
            ok: "POKRAČOVAT"
        },
        switchWallet: {
            title: "Přepnout peněženku",
            closeMessage: "Opravdu chcete zavřít aktuální peněženku?",
            restartMessage: "RPC peněženky je právě synchronizováno. \nPokud si přejete změnit peněženky, musíte aplikaci restartovat. \nZtratí svůj postup synchronizace a budete muset prohledat blockchain znovu."
        },
        transactionDetails: {
            title: "Detaily transakce",
            ok: "ZAVŘÍT"
        },
        transfer: {
            title: "Převod",
            message: "Chcete odeslat transakci?",
            ok: "ODESLAT"
        },
        unlockConfirm: {
            title: "Potvrďte odemknutí",
            ok: "ODEMKNOUT"
        },
        unlockServiceNode: {
            title: "Odemnknout service node",
            confirmTitle: "Potvrďte odemknutí",
            message: "Chcete odemknout service node?",
            ok: "ODEMKNOUT"
        },
        unlockServiceNodeWarning: {
            title: "Odemknout varování service node",
            message: "Unlocking a partial stake in a node will also unstake for any other participants, if staking in a shared node its best to let the operator and other participants know you are unstaking.", // **
            ok: "POKRAČOVAT"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "ADRESA",
        amount: "ČÁSTKA",
        confirmPassword: "POTVRDIT HESLO",
        daemonLogLevel: "DAEMON LOG LEVEL",
        daemonP2pPort: "DAEMON P2P PORT",
        daemonZMQPort: "DAEMON ZMQ PORT",
        dataStoragePath: "CESTA K ADRESÁŘI S DATY",
        filter: "FILTR",
        filterTransactionType: "FILTER PODLE TYPU TRANSAKCE",
        internalWalletPort: "INTERNÍ PORT PENĚŽENKY",
        keyImages: {
            exportDirectory: "EXPORTNÍ ADRESÁŘ KEY IMAGE", // **
            importFile: "IMPORTUJ KEY IMAGE ZE SOUBORU"// **
        },
        limitDownloadRate: "LIMIT PRO STAHOVÁNÍ",
        limitUploadRate: "LIMIT PRO ODESÍLÁNÍ",
        localDaemonIP: "IP LOKÁLNÍHO DAEMONA",
        localDaemonPort: "PORT LOKÁLNÍHO DAEMONA",
        maxIncomingPeers: "MAX PŘÍCHOZÍCH PEERS",
        maxOutgoingPeers: "MAX ODCHOZÍCH PEERS",
        message: "ZPRÁVA",
        mnemonicSeed: "MNEMONIC SEED", // **
        name: "JMÉNO",
        newWalletName: "NOVÉ JMÉNO PENĚŽENKY",
        notes: "POZNÁMKY",
        optional: "VOLITELNÉ",
        password: "HESLO",
        paymentId: "ID PLATBY",
        priority: "PRIORITA",
        remoteNodeHost: "VZDÁLENÝ UZEL",
        remoteNodePort: "VZDÁLENÝ PORT",
        restoreFromBlockHeight: "OBNOVENÍ OD VÝŠKY BLOKU",
        restoreFromDate: "OBNOVIT OD DATA",
        seedLanguage: "JAZYK PRO SEED",
        serviceNodeCommand: "PŘÍKAZ NA SERVICE NODE",
        serviceNodeKey: "KLÍČ K SERVICE NODE",
        signature: "PODPIS",
        transactionId: "ID TRANSAKCE",
        walletFile: "SOUBOR PENĚŽENKY",
        walletLogLevel: "LOG LEVEL PENĚŽENKY",
        walletName: "JMÉNO PENĚŽENKY",
        walletRPCPort: "RPC PORT PENĚŽENKY",
        walletStoragePath: "CESTA K ADRESÁŘI S PENĚŽENKOU",
        protocol: "PROTOKOL",
        hostname: "HOSTNAME",
        endpoint: "ENDPOINT",
        port: "PORT",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "Potvrďte nové heslo",
        newPassword: "Nové Heslo",
        oldPassword: "Staré Heslo",
        rescanFullBlockchain: "Prohledej znovu celý blockchain",
        rescanSpentOutputs: "Prohledej znovu v odchozích platbách",
        transactionNotes: "Transakční poznámky",
        chooseNetwork: "Vybrat síť",
        network: "Síť"
    },
    footer: {
        ready: "PŘIPRAVENO",
        scanning: "PROHLEDÁVÁNÍ",
        status: "Stav",
        syncing: "SYNCHRONIZACE",
        remote: "Externí",
        wallet: "Peněženka"
    },
    menuItems: {
        about: "O programu",
        changePassword: "Změna Hesla",
        copyAddress: "Kopírovat adresu",
        copyQR: "Zkopírovat QR kód",
        copySeedWords: "Zkopíruj seed slova",
        copySpendKey: "Zkopíruj spend key",
        copyServiceNodeKey: "Zkopírovat service node key",
        copyTransactionId: "Zkopírovat ID transakce",
        copyViewKey: "Zkopírovat view key",
        createNewWallet: "Vytvořit novou peněženku",
        deleteWallet: "Smazat Peněženku",
        exportWallet: "Exportovat peněženku",
        exportTransactions: "Exportní transakce",
        exit: "Ukončit Arqma GUI Peněženku",
        importOldGUIWallet: "Import peněženky ze starého GUI",
        manageKeyImages: "Správa Key Images",
        openWallet: "Otevřít peněženku",
        rescanWallet: "Prohledat znovu peněženku",
        restoreWalletFile: "Obnovit peněženku ze souboru",
        restoreWalletSeed: "Obnovit peněženku ze seedu",
        saveQR: "Uložit QR kód do souboru",
        sendToThisAddress: "Odeslat na tuto adresu",
        settings: "Nastavení",
        showDetails: "Zobrazit detaily",
        showPrivateKeys: "Zobrazit Private Key",
        showQRCode: "Zobrazit QR kód",
        switchWallet: "Změnit Peněženku",
        viewOnExplorer: "Zobrazit v prohlížeči"
    },
    notification: {
        positive: {
            addressCopied: "Adresa zkopírovaná do schránky",
            bannedPeer: "Zablokováno {host} do {time}",
            copied: "{item} zkopírován do schránky",
            itemSaved: "{item} uložen do {filename}",
            keyImages: {
                exported: "Key images exportovány do {filename}",
                imported: "Key images importován"
            },
            passwordUpdated: "Heslo změněno",
            qrCopied: "QR zkopírován do schránky",
            registerServiceNodeSuccess: "Úspěšně zaregistrovaný service node",
            sendSuccess: "Transakce byla úspěšně odeslána",
            signatureCopied: "Podpis zkopírován do schránky",
            stakeSuccess: "Successfully staked", // ?
            transactionNotesSaved: "Poznámky k transakcím byly uloženy"
        },
        errors: {
            banningPeer: "Chyba při banování peer",
            cannotAccessRemoteNode: "Nelze získat přístup k vzdálenému node, zkuste jiný vzdálený node",
            changingPassword: "Chyba při změně hesla",
            copyWalletFail: "Nepodařilo se zkopírovat peněženku",
            copyingPrivateKeys: "Chyba při kopírování private keys",
            dataPathNotFound: "Cesta k adresáři s daty nebyla nalezena",
            differentNetType: "Vzdálený uzel používá jiný typ sítě",
            enterSeedWords: "Vložte seed slova",
            enterTransactionId: "Vložte ID transakce",
            enterTransactionProof: "Enter transaction proof", // **
            enterWalletName: "Vložte jméno peněženky",
            errorSavingItem: "Chyba při ukládání {item}",
            failedServiceNodeUnlock: "Nepodařilo se odemknout service node",
            failedToSetLanguage: "Nepodařilo se nastavit jazyk: {lang}",
            failedWalletImport: "Nepodařilo se importovat peněženku",
            failedWalletOpen: "Nepodařilo se otevřít peněženku. Zkuste to prosím znovu.",
            internalError: "Interní chyba",
            invalidAddress: "Adresa není platná",
            invalidAmount: "Částka není platná",
            invalidOldPassword: "Neplatné staré heslo",
            invalidPassword: "Neplatné heslo",
            invalidPaymentId: "Neplatné ID platby",
            invalidPrivateViewKey: "Neplatný private viewkey",
            invalidPublicAddress: "Neplatná veřejná adresa",
            invalidRestoreDate: "Neplatné datum obnovení",
            invalidRestoreHeight: "Neplatná výška obnovení",
            invalidSeedLength: "Neplatná délka seed slova",
            invalidServiceNodeCommand: "Zadejte prosím příkaz pro registraci service node",
            invalidServiceNodeKey: "Neplatný service node key",
            invalidWalletPath: "Neplatná cesta peněženky",
            keyImages: {
                exporting: "Chyba při exportu key images",
                reading: "Chyba při čtení key images",
                importing: "Chyba při importování key images"
            },
            negativeAmount: "Částka nemůže být záporná",
            newPasswordNoMatch: "Nová hesla neodpovídají",
            newPasswordSame: "Nové heslo musí být odlišné",
            notEnoughBalance: "Nedostatečně odemčený zůstatek",
            passwordNoMatch: "Hesla neodpovídají",
            remoteCannotBeReached: "Nelze dosáhnout na vzdálený daemon",
            selectWalletFile: "Vyberte soubor peněženky",
            unknownError: "Došlo k neznámé chybě",
            walletAlreadyExists: "Peněženka s tímto názvem již existuje",
            walletPathNotFound: "Cesta k uloženým datům z peněženky nebyla nalezena",
            zeroAmount: "Částka musí být větší než nula"
        },
        warnings: {
            noKeyImageExport: "Nebyly nalezeny žádné key images pro export",
            usingLocalNode: "Nelze přistupovat ke vzdálenému node, přepnout pouze na lokální",
            usingRemoteNode: "arqmad nenalezeno, použít vzdálený node"
        }
    },
    placeholders: {
        additionalNotes: "Doplňující poznámky",
        addressBookName: "Jméno, které patří k této adrese",
        filterTx: "Zadejte ID, jméno, adresu nebo částku",
        hexCharacters: "{count} hexadecimální znaky",
        mnemonicSeed: "25 (or 24) mnemotechnických slov",
        pasteTransactionId: "Vložit ID transakce",
        pasteTransactionProof: "Paste transaction proof",
        proveOptionalMessage: "Volitelná zpráva, na jejímž základě je podpis podepsán",
        recipientWalletAddress: "Adresa peněženky příjemce",
        selectAFile: "Vyberte prosím soubor",
        transactionNotes: "Další poznámky k transakci",
        walletName: "Jméno pro vaši peněženku",
        walletPassword: "Volitelné heslo pro peněženku",
        operations: "Akce peněženky",
        walletOperations: "Zobrazit"
    },
    strings: {
        addAddressBookEntry: "Přidat položku adresáře",
        addressBookDetails: "Podrobnosti adresáře",
        addressBookIsEmpty: "Adresář je prázdný",
        addresses: {
            myPrimaryAddress: "Moje primární adresa",
            myUnusedAddresses: "Moje nepoužité adresy",
            myUsedAddresses: "Moje použité adresy",
            primaryAddress: "Primární adresa",
            subAddress: "Podadresa",
            subAddressIndex: "Index {index}"
        },
        advancedOptions: "Rozšířené možnosti",
        bannedPeers: {
            title: "Banované peers (bany budou vymazány, pokud je peněženka restartována)",
            bannedUntil: "Blokovat do {time}"
        },
        backupSeedWord: "Zálohujte vaše počáteční slova na bezpečném místě! Toto je jediný způsob, jak získat přístup k vašim finančním prostředkům, pokud změníte zařízení.",
        blockHeight: "Výška",
        checkTransaction: {
            description: "Zkontrolujte, zda byly prostředky na adresu zaplaceny uvedením ID transakce, adresy příjemce, zprávy použité pro podpis a podpisu.\nPro 'Spend Proof' nemusíte poskytnout adresu příjemce.",
            infoTitles: {
                confirmations: "Potvrzení",
                inPool: "V poolu",
                validTransaction: "Platná transakce",
                received: "Přijatá částka"
            },
            validTransaction: {
                no: "NE",
                yes: "ANO"
            }
        },
        closing: "Zavírání",
        connectingToBackend: "Připojování k backendu",
        contribution: "Příspěvek",
        daemon: {
            local: {
                title: "Pouze lokální daemon",
                description: "Plné zabezpečení, peněženka stáhne celý blockchain. Nebude možné provádět transakce dokud nebude synchronizace dokončena."
            },
            localRemote: {
                title: "Lokální + Vzdálený daemon",
                description: "Pomocí této výchozí možnosti můžete začít rychle. Peněženka stáhne celý blockchain, ale při synchronizaci použije vzdálený uzel."
            },
            remote: {
                title: "Pouze vzdálený daemon",
                description: "Menší zabezpečení, peněženka se připojí ke vzdálenému uzlu a provede všechny transakce."
            }
        },
        destinationUnknown: "Neznámý cíl",
        editAddressBookEntry: "Editovat položku adresáře",
        loading: "Načítání...",
        loadingSettings: "Načítání nastavení",
        arqmaBalance: "Zůstatek",
        arqmaUnlockedBalance: "Odemčený zůstatek",
        arqmaUnlockedShort: "Odemčeno",
        arqmaExchangeBalance: "Stavy na burzách",
        noTransactionsFound: "Nebyly nalezeny žádné transakce",
        notes: "Poznámky",
        numberOfUnspentOutputs: "Dostupné prostředky",
        paymentID: "ID platby",
        peerList: "Seznam peerů",
        priorityOptions: {
            automatic: "Automaticky",
            slow: "Pomalu",
            normal: "Normálně",
            fast: "Rychle",
            fastest: "Nejrychleji"
        },
        proveTransactionDescription: "Vygenerujte doklad o své příchozí / odchozí platbě zadáním ID transakce, adresy příjemce a volitelné zprávy.\nV případě odchozích plateb můžete získat „Spend proof“, který prokazuje autorství transakce. V tomto případě nemusíte zadávat adresu příjemce.", // **
        readingWalletList: "Načítá se seznam peněženek",
        recentIncomingTransactionsToAddress: "Nedávné příchozí transakce na tuto adresu",
        recentTransactionsWithAddress: "Nedávné transakce s touto adresou",
        rescanModalDescription: "Projít celé znovu nebo jen v odchozích platbách.",
        saveSeedWarning: "Zkopírujte a uložte je na bezpečném místě!",
        saveToAddressBook: "Uložit do adresáře",
        seedWords: "Seed slova",
        selectLanguage: "Zvolte jazyk",
        serviceNodeContributionDescription:
        "Staking contributes to the safety of the ARQMA network. For your contribution, you earn ARQMA. Once staked, you will have to wait either 15 or 30 days to have your ARQMA unlocked, depending on if a stake was unlocked by a contributor or the node was deregistered. To learn more about staking, please visit the documentation on the",
        serviceNodeRegistrationDescription: "Vložte {registerCommand} příkaz vytvořený daemonem, který se registruje, aby se stal service node \"{prepareCommand}\" příkazem", // *?


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





        spendKey: "Spend key",
        startingDaemon: "Start daemona",
        startingWallet: "Spouštění peněženky",
        switchToDateSelect: "Přepněte na výběr data",
        switchToHeightSelect: "Přepněte na výběr výšky",
        syncingDaemon: "Synchronizuji daemona",
        transactionID: "ID Transakce",
        transactionConfirmed: "potvrzeno",
        transactions: {
            amount: "Částka",
            description: "{type} transakce",
            fee: "Poplatek",
            paidBySender: "hradí odesílatel",
            received: "Přijato",
            sent: "Odesláno",
            sentTo: "{type} transakce odeslána na",
            timestamp: "Časová značka",
            types: {
                all: "Vše",
                incoming: "Příchozí",
                outgoing: "Odchozí",
                pending: "Čekající",
                pendingIncoming: "Čeká se na příchozí",
                pendingOutgoing: "Čeká se na odchozí",
                miner: "Těžař",
                serviceNode: "Service Node",
                governance: "Řízení",
                stake: "Stake",
                failed: "Nepodařilo se"
            }
        },
        unspentOutputs: "Dostupné prostředky",
        userNotUsedAddress: "Tuto adresu jste nepoužili",
        userUsedAddress: "Tuto adresu jste použili",
        viewKey: "View key",
        viewOnlyMode: "Zobrazit pouze režim náhledu. Nahrajte prosím celou peněženku, abyste mohli posílat mince.",
        website: "website"
    },
    titles: {
        addressBook: "Adresář",
        addressDetails: "Podrobnosti adresy",
        advanced: {
            checkTransaction: "ZKONTROLUJTE TRANSAKCI",
            prove: "PROVE"// **
        },
        availableForContribution: "Service nodes available for contribution",
        changePassword: "Změnit heslo",
        configure: "Konfigurace",
        currentlyStakedNodes: "Currently staked nodes", // **
        onsRecordDetails: "ONS record details",
        onsSessionRecords: "Session records",
        onsArqmaRecords: "Arqma records",
        onsWalletRecords: "Wallet records",
        privateKeys: "Private keys",
        rescanWallet: "Prohledat znovu peněženku",
        serviceNode: {
            registration: "REGISTRACE",
            staking: "STAKING",
            myStakes: "My Stakes"
        },
        serviceNodeDetails: "Service node details",
        settings: {
            title: "Nastavení",
            tabs: {
                general: "General",
                language: "Jazyk",
                peers: "Peers",
                exchange: "Výměna"
            }
        },
        transactionDetails: "Detaily transakce",
        transactions: "Transakce",
        wallet: {
            createNew: "Vytvořit novou peněženku",
            createdOrRestored: "Peněženka vytvořena/obnovena",
            importFromFile: "Importovat peněženku ze souboru",
            importFromLegacyGUI: "Import peněženky z GUI",
            importFromOldGUI: "Import peněženky ze starého GUI",
            restoreFromSeed: "Obnovit peněženku ze seedu",
            restoreViewOnly: "Obnovit peněženku pouze v náhledovém režimu"
        },
        welcome: "Vítejte",
        yourWallets: "Vaše peněženky"
    },
    headers: {
        address: "Adresa",
        amount: "Množství",
        confirmations: "Potvrzení",
        double_spend_seen: "Dvojitá útrata viděna",
        fee: "Poplatek",
        height: "Výška",
        note: "Poznámka",
        paymentid: "ID platby",
        suggestedConfirmationsThreshold: "Doporučená prahová hodnota pro potvrzení",
        timestamp: "Časové razítko",
        txid: "TxID",
        type: "Typ",
        unlockTime: "Odemkněte čas"
    }
}
