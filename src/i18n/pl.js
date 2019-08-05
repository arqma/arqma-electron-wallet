export default {
    buttons: {
        // All button text is uppercased in the gui
        advanced: "ZAAWANSOWANE",
        addressBook: "KSIĄŻKA ADRESOWA",
        all: "WSZYSTKIE",
        back: "POWRÓT",
        browse: "PRZEGLĄDAJ",
        cancel: "ANULUJ",
        change: "ZMIEŃ",
        check: "SPRAWDŹ",
        clear: "WYCZYŚĆ",
        close: "ZAMKNIJ",
        contacts: "KONTAKTY",
        copyAddress: "KOPIUJ ADRES",
        copySignature: "KOPIUJ SYGNATURĘ",
        createWallet: "UTWÓRZ PORTFEL",
        delete: "USUŃ",
        edit: "EDYTUJ",
        export: "EXPORTUJ",
        generate: "GENERUJ",
        import: "IMPORTUJ",
        importWallet: "IMPORTUJ PORTFEL | IMPORTUJ PORTFELE",
        next: "NASTĘPNY",
        openWallet: "OTWÓRZ PORTFEL",
        receive: "ODBIERZ",
        registerServiceNode: "ZAREJESTRUJ SERVICE NODE",
        rescan: "PRZESKANUJ",
        restoreWallet: "PRZYWRÓĆ PORTFEL",
        save: "ZAPISZ",
        saveTxNotes: "ZAPISZ TX",
        selectLocation: "WYBIERZ LOKALIZACJĘ",
        selectWalletFile: "WYBIERZ PLIK PORTFELA",
        send: "WYŚLIJ",
        sendCoins: "WYŚLIJ ARQ",
        serviceNode: "SERVICE NODE",
        settings: "USTAWIENIA",
        showQRCode: "POKAŻ KOD QR",
        showTxDetails: "POKAŻ SZCZEGÓŁY TX",
        stake: "STAKE",
        sweepAll: "WYŚLIJ WSZYSTKIE",
        txHistory: "HISTORIA TX",
        unlock: "ODBLOKUJ",
        viewOnExplorer: "ZOBACZ W EXPLORER",
        wallet: "PORTFEL"

    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "OK",
            cancel: "ANULUJ",
            open: "OTWÓRZ"
        },

        // Dialogs
        banPeer: {
            title: "Banuj peer",
            peerDetailsTitle: "Szczegóły peer",
            message: "Wprowadź długośc bana peer w sekundach.\nDefault 3600 = 1 godzina.",
            ok: "Banuj peer"
        },
        copyAddress: {
            title: "Kopuj addres",
            message: "Z tym adresem powiązany jest identyfikator płatności.\nPamiętaj, aby skopiować identyfikator płatności oddzielnie."
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "Kopiuj {type}",
            message: "Uważaj, do kogo wysyłasz klucze prywatne, ponieważ kontrolują twoje fundusze.",
            seedWords: "Seed",
            viewKey: "Klucz podglądu",
            spendKey: "Klucz wydawania"
        },
        deleteWallet: {
            title: "Usuń portfel",
            message: "Czy jesteś absolutnie pewien, że chcesz usunąć swój portfel?\nUpewnij się, że masz kopię zapasową prywatnych kluczy.\nTEN PROCES JEST NIEODWRACALNY!",
            ok: "USUŃ"
        },
        exit: {
            title: "Wyjdź",
            message: "Jesteś pewny, ze chcesz wyjść?",
            ok: "WYJDŹ"
        },
        keyImages: {
            title: "{type} obraz kluczy",
            message: "Czy chcesz {type} obraz kluczy?",
            export: "Exportuj",
            import: "Importuj"
        },
        noPassword: {
            title: "Hasło nie ustawione",
            message: "Czy na pewno chcesz utworzyć portfel bez hasła?",
            ok: "TAK"
        },
        password: {
            title: "Haslo",
            message: "Wprowadź hasło portfela, aby kontynuować."
        },
        registerServiceNode: {
            title: "Register service node",
            message: "Do you want to register the service node?",
            ok: "ZAREJESTRUJ"
        },
        rescan: {
            title: "Przeskanuj portfel",
            message: "Ostrzeżenie: niektóre informacje o poprzednich transakcjach\ntakie jak adres odbiorcy zostanie utracony.",
            ok: "PRZESKANUJ"
        },
        restart: {
            title: "Restart",
            message: "Zmiany wymagają ponownego uruchomienia. Czy chcesz teraz uruchomić ponownie program??",
            ok: "RESTART"
        },
        showPrivateKeys: {
            title: "Pokaż prywatne klucze",
            message: "Czy chcesz wyświetlić swoje prywatne klucze?",
            ok: "POKAŻ"
        },
        stake: {
            title: "Stake",
            message: "Do you want to stake?",
            ok: "STAKE"
        },
        sweepAll: {
            title: "Wyślij wszystko",
            message: "Czy chcesz wysłac wszystko?",
            ok: "WYŚLIJ WSZYSTKO"
        },
        sweepAllWarning: {
            title: "Wyślij wszystko - Ostrzeżenie",
            message: "Zamierzasz połączyć wszystkie niewydane środki, wysyłając transakcję do siebie, portfel może tymczasowo wykazywać saldo 0, po 18 blokach Twoje środki odblokują się i możesz normalnie korzystać.",
            ok: "KONTYNUUJ"
        },
        switchWallet: {
            title: "Przełącz portfel",
            closeMessage: "Czy na pewno chcesz zamknąć bieżący portfel?",
            restartMessage: "Portfel RPC jest obecnie synchronizowany. \nJeśli chcesz zmienić portfele, musisz ponownie uruchomić aplikację. \nUtracisz postęp synchronizacji i będziesz musiał ponownie przeskanować blockchain."
        },
       transactionDetails: {
            title: "Szczegóły transakcji",
            ok: "ZAMKNIJ"
        },
        transfer: {
            title: "Transfer",
            message: "Czy chcesz wysłać transakcje?",
            ok: "WYŚLIJ"
        },
        unlockConfirm: {
            title: "Potwierdź odblokowanie",
            ok: "ODBLOKUJ"
        },
        unlockServiceNode: {
            title: "Odblokuj service node",
            confirmTitle: "Potwierdz odblokowanie",
            message: "Czy chcesz odblokować service node?",
            ok: "ODBLOKUJ"
        },
        unlockServiceNodeWarning: {
            title: "Osblokowanie service node - Ostrzeżenie",
            message: "Unlocking a partial stake in a node will also unstake for any other participants, if staking in a shared node its best to let the operator and other participants know you are unstaking.",
            ok: "KONTYNUUJ"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "ADRES",
        amount: "ILOŚĆ",
        confirmPassword: "POTWIERDŹ HASŁO",
        daemonLogLevel: "DAEMON LOG LEVEL",
        daemonP2pPort: "DAEMON P2P PORT",
        daemonZMQPort: "DAEMON ZMQ PORT",
        dataStoragePath: "ŚCIEŻKA NA DANE",
        filter: "FILTR",
        filterTransactionType: "FILTRUJ WEDŁUG RODZAJU TRANSAKCJI",
        internalWalletPort: "WEWNĘTRZNY PORT PORTFELA",
        keyImages: {
            exportDirectory: "EXPORTUJ KEY IMAGE DO KATALOGU",
            importFile: "IMPORTUJ KEY IMAGE Z PLIKU"
        },
        limitDownloadRate: "LIMIT DOWNLOAD RATE",
        limitUploadRate: "LIMIT UPLOAD RATE",
        localDaemonIP: "LOCAL DAEMON IP",
        localDaemonPort: "LOCAL DAEMON PORT",
        maxIncomingPeers: "MAX INCOMING PEERS",
        maxOutgoingPeers: "MAX OUTGOING PEERS",
        message: "WIADOMOŚĆ",
        mnemonicSeed: "MNEMONIC SEED",
        name: "NAZWA",
        newWalletName: "NAZWA NOWEGO PORTFELA",
        notes: "NOTES",
        optional: "OPCJONALNIE",
        password: "HASŁO",
        paymentId: "PAYMENT ID",
        priority: "PRIORYTET",
        remoteNodeHost: "ZDALNY HOST",
        remoteNodePort: "ZDALNY PORT",
        restoreFromBlockHeight: "PRZYWRÓĆ OD WYSOKOŚCI BLOKU",
        restoreFromDate: "PRZYWRÓĆ OD DATY",
        seedLanguage: "SEED LANGUAGE",
        serviceNodeCommand: "SERVICE NODE COMMAND",
        serviceNodeKey: "SERVICE NODE KEY",
        signature: "SYGNATURA",
        transactionId: "TRANSACTION ID",
        walletFile: "PORTFEL PLIK",
        walletLogLevel: "PORTFEL LOG LEVEL",
        walletName: "PORTFEL NAZWA",
        walletRPCPort: "PORTFEL RPC PORT",
        walletStoragePath: "PORTFEL STORAGE PATH",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "Potwierdź nowe hasło",
        newPassword: "Nowe hasło",
        oldPassword: "Stare hasło",
        rescanFullBlockchain: "Przeskanuj cały blockchain",
        rescanSpentOutputs: "Przeskanuj wysłane outputy",
        transactionNotes: "Transaction Notes",
        chooseNetwork: "Wybierz sieć",
        network: "Sieć"
    },
    footer: {
        ready: "GOTOWY",
        scanning: "SKANOWANIE",
        status: "Status",
        syncing: "SYNCHRONIZACJA",
        remote: "Zewnętrzny",
        wallet: "Portfel"
    },
    menuItems: {
        about: "O programie",
        changePassword: "Zmień Hasło",
        copyAddress: "Kopiuj adres",
        copyQR: "Kopiuj kod QR",
        copySeedWords: "Kopiuj słowa seed",
        copySpendKey: "Kopiuj klucz wydawania",
        copyServiceNodeKey: "Copy service node key",
        copyTransactionId: "Kopiuj ID transakcji",
        copyViewKey: "Kopiuj klucz podglądu",
        createNewWallet: "Utwórz nowy portfel",
        deleteWallet: "Usuń portfel",
        exit: "Wyjdź Arqma GUI Wallet",
        importOldGUIWallet: "Importuj portfel z starego GUI",
        manageKeyImages: "Zarządzaj kluczami",
        openWallet: "Otwórz portfel",
        rescanWallet: "Przeskanuj portfel",
        restoreWalletFile: "Odtwórz portfel z pliku",
        restoreWalletSeed: "Odtwórz portfel z seed",
        saveQR: "Zapisz kod QR do pliku",
        sendToThisAddress: "Wyślij na ten adres",
        settings: "Ustawienia",
        showDetails: "Pokaż szczegóły",
        showPrivateKeys: "Pokaż klucze prywatne",
        showQRCode: "Pokaż kod QR",
        switchWallet: "Zmień portfel",
        viewOnExplorer: "Zobacz w explorer"
    },
    notification: {
        positive: {
            addressCopied: "Adres skopiowany do schowka",
            bannedPeer: "Banned {host} until {time}",
            copied: "{item} skopiowany do schowka",
            itemSaved: "{item} zapisany do {filename}",
            keyImages: {
                exported: "Key images exported to {filename}",
                imported: "Key images imported"
            },
            passwordUpdated: "Haslo zaktualizowane",
            qrCopied: "QR kopiowany do schowka",
            registerServiceNodeSuccess: "Successfully registered service node",
            sendSuccess: "Transakcja została pomyślnie wysłana",
            signatureCopied: "Sygnatura skopiowana do schowka",
            stakeSuccess: "Successfully staked",
            transactionNotesSaved: "Zapisane notatki transakcyjne"
        },
        errors: {
            banningPeer: "Error banning peer",
            cannotAccessRemoteNode: "Nie można uzyskać dostępu do zdalnego węzła, spróbuj użyć innego zdalnego węzła",
            changingPassword: "Błąd podczas zmiany hasła",
            copyWalletFail: "Nie udało się skopiować portfela",
            copyingPrivateKeys: "Błąd podczas kopiowania kluczy prywatnych",
            dataPathNotFound: "Nie znaleziono ścieżki do przechowywania danych",
            differentNetType: "Węzeł zdalny używa innego typu sieci",
            enterSeedWords: "Wprowadź seed",
            enterTransactionId: "Wprowadź ID transakcji",
            enterTransactionProof: "Wprowadź dowód transakcji",
            enterWalletName: "Wprowadź nazwę portfela",
            errorSavingItem: "Bład zapisu {item}",
            failedServiceNodeUnlock: "Nie udalo się odblokować service node",
            failedToSetLanguage: "Nie można ustawić języka: {lang}",
            failedWalletImport: "Nie udało się zaimportować portfela",
            failedWalletOpen: "Nie udało się otworzyć portfela. Proszę spróbuj ponownie.",
            internalError: "Błąd wewnętrzny",
            invalidAddress: "Adres jest nieprawidłowy",
            invalidAmount: "Kwota nie jest nieprawidłowa",
            invalidOldPassword: "Nieprawidłowe stare hasło",
            invalidPassword: "Nieprawidłowe hasło",
            invalidPaymentId: "Identyfikator płatności jest nie poprawny",
            invalidPrivateViewKey: "Nieprawidłowy prywatny klucz dostępu",
            invalidPublicAddress: "Nieprawidłowy adres publiczny",
            invalidRestoreDate: "Nieprawidłowa data przywrócenia",
            invalidRestoreHeight: "Nieprawidłowa wysokość przywracania",
            invalidSeedLength: "Niepoprawna długośc słow seed",
            invalidServiceNodeCommand: "Please enter the service node registration command",
            invalidServiceNodeKey: "Service node key not valid",
            invalidWalletPath: "Nieprawidłowa ścieżka portfela",
            keyImages: {
                exporting: "Błąd eksportowania key images",
                reading: "Błąd odczytu key images",
                importing: "Błąd importu key images"
            },
            negativeAmount: "Kwota nie może być ujemna",
            newPasswordNoMatch: "Nowe hasła nie są zgodne",
            newPasswordSame: "Nowe hasło musi być inne",
            notEnoughBalance: "Za mało odblokowanego salda",
            passwordNoMatch: "Hasła nie pasują do siebie",
            remoteCannotBeReached: "Zdalny węzeł jest nieosiągalny",
            selectWalletFile: "Wybierz plik portfela",
            unknownError: "Wystąpił nieznany błąd",
            walletAlreadyExists: "Portfel o tej nazwie już istnieje",
            walletPathNotFound: "Nie znaleziono ścieżki przechowywania danych portfela",
            zeroAmount: "Kwota musi być większa niż zero"
        },
        warnings: {
            noKeyImageExport: "Nie znależiono key images do exportu",
            usingLocalNode: "Nie można uzyskać dostępu do zdalnego węzła, przełączając się tylko na lokalny",
            usingRemoteNode: "arqmad nie znaleziono, używam zdalnego węzła"
        }
    },
    placeholders: {
        additionalNotes: "Dodatkowe uwagi",
        addressBookName: "Nazwa, która należy do tego adresu",
        filterTx: "Wprowadź ID, nazwę, adres i ilość",
        hexCharacters: "{count} znaki szesnastkowe",
        mnemonicSeed: "25 słów mnemonicznych",
        pasteTransactionId: "Wklej ID transakcji",
        pasteTransactionProof: "Wklej dowód transakcji",
        proveOptionalMessage: "Opcjonalna wiadomość, na podstawie której podpis jest podpisany",
        recipientWalletAddress: "Adres portfela odbiorcy",
        selectAFile: "Wybierz plik",
        transactionNotes: "Dodatkowe uwagi do dołączenia do transakcji",
        walletName: "Nazwa twojego portfela",
        walletPassword: "Opcjonalne hasło do portfela",
        operations: "Operacje"
    },
    strings: {
        addAddressBookEntry: "Dodaj wpis książki adresowej",
        addressBookDetails: "Szczegóły książki adresowej",
        addressBookIsEmpty: "Książka adresowa jest pusta",
        addresses: {
            myPrimaryAddress: "Mój główny adres",
            myUnusedAddresses: "Moje nieużywane adresy",
            myUsedAddresses: "Moje używane adresy",
            primaryAddress: "Adres główny",
            subAddress: "Podadres",
            subAddressIndex: "Index {index}"
        },
        advancedOptions: "Zaawansowane opcje",
        bannedPeers: {
            title: "Banned peers (bans will cleared if wallet is restarted)",
            bannedUntil: "Banned until {time}"
        },
        blockHeight: "Wysokość",
        checkTransaction: {
            description: "Sprawdź, czy środki zostały wypłacone na adres, podając identyfikator transakcji, adres odbiorcy, wiadomość użytą do podpisania i podpis.\nW przypadku „Wydania dowodu” nie musisz podawać adresu odbiorcy.",
            infoTitles: {
                confirmations: "Potwierdzenia",
                inPool: "W pool",
                validTransaction: "Ważna transakcja",
                received: "Otrzymana ilość"
            },
            validTransaction: {
                no: "NIE",
                yes: "TAK"
            }
        },
        closing: "Zamykanie",
        connectingToBackend: "Łączenie z zapleczem",
        contribution: "Wkład",
        daemon: {
            local: {
                title: "Tylko Lokalny Węzeł",
                description: "Pełne bezpieczeństwo, portfel pobierze pełny blockchain. Nie będziesz mógł dokonać transakcji, dopóki synchronizacja nie zostanie zakończona."
            },
            localRemote: {
                title: "Lokalny + Zdalny Węzeł",
                description: "Zacznij szybko dzięki tej domyślnej opcji. Portfel pobierze pełny blok bloków, ale użyje zdalnego węzła podczas synchronizacji."
            },
            remote: {
                title: "Tylko Zdalny Węzeł",
                description: "Mniej zabezpieczeń, portfel połączy się ze zdalnym węzłem, aby dokonać wszystkich transakcji."
            }
        },
        destinationUnknown: "Miejsce docelowe nieznane",
        editAddressBookEntry: "Edytuj wpis książki adresowej",
        loadingSettings: "Ładowanie ustawień",
        arqmaBalance: "Saldo",
        arqmaUnlockedBalance: "Odblokowane saldo",
        arqmaUnlockedShort: "Odblokowane",
        noTransactionsFound: "Nie znaleziono transakcji",
        notes: "Uwagi",
        numberOfUnspentOutputs: "Liczba niewydanych wyników",
        paymentID: "Identyfikator Płatności",
        peerList: "Lista Peerów",
        priorityOptions: {
            automatic: "Automatyczny",
            slow: "Powoli",
            normal: "Normalnie",
            fast: "Szybko",
            fastest: "Najszybciej"
        },
        proveTransactionDescription: "Wygeneruj dowód płatności przychodzącej / wychodzącej, podając identyfikator transakcji, adres odbiorcy i opcjonalną wiadomość.\nW przypadku płatności wychodzących można uzyskać „Dowód wydania”, który potwierdza autorstwo transakcji. W takim przypadku nie musisz podawać adresu odbiorcy.",
        readingWalletList: "Czytanie listy portfeli",
        recentIncomingTransactionsToAddress: "Ostatnie transakcje przychodzące na ten adres",
        recentTransactionsWithAddress: "Ostatnie transakcje z tym adresem",
        rescanModalDescription: "Wybierz pełne ponowne skanowanie lub ponowne skanowanie tylko zużytych wyjść.",
        saveSeedWarning: "Skopiuj i zapisz je w bezpiecznym miejscu!",
        saveToAddressBook: "Zapisz w książce adresowej",
        seedWords: "Słowa mnemoniczne",
        selectLanguage: "Wybierz język",
        serviceNodeRegistrationDescription: "Wprowadź {registerCommand} polecenie wyprodukowane przez demona, który rejestruje się, aby stać się węzłem serwisowym przy użyciu \"{prepareCommand}\" komendy",
        spendKey: "Klucz wydawania",
        startingDaemon: "Start daemona",
        startingWallet: "Start portfela",
        switchToDateSelect: "Przełącz na wybór daty",
        switchToHeightSelect: "Przełącz na wybór wysokości",
        syncingDaemon: "Synchronizacja daemona",
        transactionID: "Identyfikator transakcji",
        transactionConfirmed: "potwierdzony",
        transactions: {
            amount: "Ilość",
            description: "{type} transakcji",
            fee: "Opłata",
            paidBySender: "opłacone przez nadawcę",
            received: "Odebrane",
            sent: "Wyslane",
            sentTo: "{type} transakcja wysłana do",
            timestamp: "Znak czasu",
            types: {
                all: "Wszystkie",
                incoming: "Przychodzące",
                outgoing: "Wychodzące",
                pending: "Oczekujące",
                pendingIncoming: "Oczekujące przychodzące",
                pendingOutgoing: "Oczekujące wychodzące",
                miner: "Kopacz",
                serviceNode: "Service Node",
                governance: "Zarządzanie",
                stake: "Stake",
                failed: "Nie powiodło się"
            }
        },
        unspentOutputs: "Niewydane wyjścia",
        userNotUsedAddress: "Nie użyłeś tego adresu",
        userUsedAddress: "Użyłeś tego adresu",
        viewKey: "Klucz podglądu",
        viewOnlyMode: "tryb podglądu. Załaduj pełny portfel, aby wysłać monety."
    },
    titles: {
        addressBook: "Książka adresowa",
        addressDetails: "Dane adresowe",
        advanced: {
            checkTransaction: "SPRAWDŹ TRANSAKSCJE",
            prove: "DOWÓD"
        },
        changePassword: "Zmień hasło",
        configure: "Konfiguruj",
        currentlyStakedNodes: "Currently staked nodes",
        privateKeys: "Klucze prywatne",
        rescanWallet: "Przeskanuj portfel",
        serviceNode: {
            registration: "REGISTRATION",
            staking: "STAKING"
        },
        settings: {
            title: "Ustawienia",
            tabs: {
                general: "Ogólne",
                language: "Język",
                peers: "Podłączeni"
            }
        },
        transactionDetails: "Szczegóły transakcji",
        transactions: "Transakcje",
        wallet: {
            createNew: "Utwórz nowy portfel",
            createdOrRestored: "Portfel utworzony / przywrócony",
            importFromFile: "Importuj portfel z pliku",
            importFromLegacyGUI: "Importuj portfel z GUI",
            importFromOldGUI: "Importuj portfel z starego GUI",
            restoreFromSeed: "Odtwórz portfel z seed",
            restoreViewOnly: "Odtwórz portfel tylko do odczytu"
        },
        welcome: "Witamy",
        yourWallets: "Twoje Portfele"
    }
}
