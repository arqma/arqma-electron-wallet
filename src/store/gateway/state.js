export default {
    app: {
        status: {
            code: 1 // Connecting to backend
        },
        config: {
            appearance: {
                theme: "dark"
            },
            preference: {
                notify_no_payment_id: true,
                notify_empty_password: true,
                minimize_to_tray: false,
                timeout: 600000 // 10 minutes
            }
        },
        pending_config: {
        },
        network_interfaces: [
            {
                address: "0.0.0.0",
                label: "All interfaces - 0.0.0.0"
            },
            {
                address: "127.0.0.1",
                label: "Local machine only - 127.0.0.1"
            }
        ]
    },
    wallets: {
        list: [],
        legacy: []
    },
    wallet: {
        status: {
            code: 1,
            message: null
        },
        info: {
            name: "",
            address: "",
            height: 0,
            balance: 0,
            unlocked_balance: 0,
            view_only: false
        },
        secret: {
            mnemonic: "",
            view_key: "",
            spend_key: ""
        },
        transactions: {
            tx_list: [],
        },
        address_list: {
            used: [],
            unused: [],
            address_book: [],
        }
    },
    tx_status: {
        code: 0,
        message: ""
    },
    prove_transaction_status: {
        code: 0,
        message: "",
        state: {}
    },
    check_transaction_status: {
        code: 0,
        message: "",
        state: {}
    },
    daemon: {
        info: {
            alt_blocks_count: 0,
            cumulative_difficulty: 0,
            difficulty: 0,
            grey_peerlist_size: 0,
            height: 0,
            height_without_bootstrap: 0,
            incoming_connections_count: 0,
            is_ready: true,
            outgoing_connections_count: 0,
            status: "OK",
            target: 120,
            target_height: 0,
            testnet: false,
            top_block_hash: null,
            tx_count: 0,
            tx_pool_size: 0,
            white_peerlist_size: 0
        },
        connections: [],
        bans: [],
        tx_pool_backlog: []
    },
    pool: {
        status: 2,
        desynced: false,
        system_clock_error: false,
        stats: {
            currentEffort: 0
        },
        blocks: [],
        workers: []
    },
    market: {
        info: {
            default: 0,
            exchanges: []
        },
        exchange: {
            protocol: "https://",
            hostname: "api.coingecko.com",
            port: 443,
            coin: "arqma",
            endpoint: "/api/v3/coins/arqma/tickers"
        }
    }
}
