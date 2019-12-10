import { Daemon } from "./daemon";
import { WalletRPC } from "./wallet-rpc";
import { Market } from "./market";
import { Pool } from "./pool";
import { ipcMain, dialog } from "electron";

const os = require("os");
const fs = require("fs");
const path = require("path");
const objectAssignDeep = require("object-assign-deep");


export class Backend {
    constructor(mainWindow) {
        this.mainWindow = mainWindow
        this.daemon = null
        this.walletd = null
        this.market = null
        this.pool = null
        this.config_dir = null
        this.wallet_dir = null
        this.config_file = null
        this.config_data = {}
    }

    init() {

        if(os.platform() == "win32") {
	    this.config_dir = "C:\\ProgramData\\arqma";
	    this.wallet_dir = `${os.homedir()}\\Documents\\Arqma`
        } else {
            this.config_dir = path.join(os.homedir(), ".arqma");
            this.wallet_dir = path.join(os.homedir(), "Arqma")
        }

        if (!fs.existsSync(this.config_dir)) {
            fs.mkdirSync(this.config_dir);
        }

	      if (!fs.existsSync(path.join(this.config_dir, "gui"))) {
            fs.mkdirSync(path.join(this.config_dir, "gui"));
        }

        this.config_file = path.join(this.config_dir, "gui", "config.json")

                const daemon = {
                    type: "remote",
                    p2p_bind_ip: "0.0.0.0",
                    p2p_bind_port: 19993,
                    rpc_bind_ip: "127.0.0.1",
                    rpc_bind_port: 19994,
                    zmq_rpc_bind_ip: "127.0.0.1",
                    zmq_rpc_bind_port: 19995,
                    out_peers: -1,
                    in_peers: -1,
                    limit_rate_up: -1,
                    limit_rate_down: -1,
                    log_level: 0
                }

                const daemons = {
                    mainnet: {
                        ...daemon,
                        remote_host: "node.supportarqma.com",
                        remote_port: 19994
                    },
                    stagenet: {
                        ...daemon,
                        type: "local",
                        p2p_bind_port: 39993,
                        rpc_bind_port: 39994,
                        zmq_rpc_bind_port: 39995
                    },
                    testnet: {
                        ...daemon,
                        type: "local",
                        p2p_bind_port: 29993,
                        rpc_bind_port: 29994,
                        zmq_rpc_bind_port: 29995
                    }
                }

                // Default values
                this.defaults = {
                    app: {
                      data_dir: this.config_dir,
                      ws_bind_port: 12213,
                      testnet: false,
                      wallet_data_dir: this.wallet_dir,
                      net_type: "mainnet",
                      wallet_dir: this.wallet_dir
                    },
                    appearance: {
                        theme: "dark"
                    },

                    preference: {
                notify_no_payment_id: true,
                notify_empty_password: true,
                minimize_to_tray: false,
                autostart: false,
                timeout: 600000 // 10 minutes
                },
                daemon: {
                type: "local_remote",
                remote_host: "node.supportarqma.com",
                remote_port: 19994,
                p2p_bind_ip: "0.0.0.0",
                p2p_bind_port: 19993,
                rpc_bind_ip: "127.0.0.1",
                rpc_bind_port: 19994,
                zmq_rpc_bind_ip: "127.0.0.1",
                zmq_rpc_bind_port: 19995,
                out_peers: 8,
                in_peers: 0,
                limit_rate_up: -1,
                limit_rate_down: -1,
                log_level: 0,
                enhanced_ip_privacy: true
            },

            wallet: {
                rpc_bind_port: 19999,
                log_level: 0
            },

            pool: {
                server: {
                    enabled: false,
                    bindIP: "0.0.0.0",
                    bindPort: 3333,
                },
                mining: {
                    address: "",
                    enableBlockRefreshInterval: false,
                    blockRefreshInterval: 5,
                    minerTimeout: 900,
                    uniform: true,
                },
                varDiff: {
                    enabled: true,
                    startDiff: 5000,
                    minDiff: 1000,
                    maxDiff: 100000000,
                    targetTime: 30,
                    retargetTime: 60,
                    variancePercent: 30,
                    maxJump: 100,
                    fixedDiffSeparator: ".",
                },
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
            },
            daemons: objectAssignDeep({}, daemons),
        }
        this.config_data = {
                    // Copy all the properties of defaults
                    ...objectAssignDeep({}, this.defaults),

                }

                this.remotes = [
                    {
                        host: "node.supportarqma.com",
                        port: "19994"
                    }
                ]

        ipcMain.on("event", (event, data) => {
            this.receive(data)
        })

        this.startup()
    }

    send(event, data={}) {
        let message = {
            event,
            data
        }
        this.mainWindow.webContents.send("event", message)
    }

    receive(data) {

        // route incoming request to either the daemon, wallet, or here
        switch (data.module) {
            case "core":
                this.handle(data);
                break;
            case "daemon":
                if (this.daemon) {
                    this.daemon.handle(data);
                }
                break;
            case "wallet":
                if (this.walletd) {
                    this.walletd.handle(data);
                }
                if (this.market) {
                    this.market.handle(data)
                }
                break;
          }
        }

    handle(data) {

        let params = data.data

        switch (data.method) {
          case "set_language":
            this.send("set_language", { lang: params.lang })
            break

            case "quick_save_config":
                // save only partial config settings
                Object.keys(params).map(key => {
                    this.config_data[key] = Object.assign(this.config_data[key], params[key])
                })
                fs.writeFile(this.config_file, JSON.stringify(this.config_data, null, 4), 'utf8', () => {
                    this.send("set_app_data", {
                        config: params,
                        pending_config: params
                    })
                })
                break

            case "save_config":
                // check if config has changed
                let config_changed = false
                Object.keys(this.config_data).map(i => {
                    if(i == "appearance" || i == "pool") return
                    Object.keys(this.config_data[i]).map(j => {
                        if(this.config_data[i][j] !== params[i][j])
                            config_changed = true
                    })
                })
            case "save_config_init":
                delete params.pool
                Object.keys(params).map(key => {
                    this.config_data[key] = Object.assign(this.config_data[key], params[key])
                });
                fs.writeFile(this.config_file, JSON.stringify(this.config_data, null, 4), 'utf8', () => {

                    if(data.method == "save_config_init") {
                        this.startup();
                    } else {
                        this.send("set_app_data", {
                            config: this.config_data,
                            pending_config: this.config_data,
                        })
                        if(config_changed) {
                            this.send("settings_changed_reboot")
                        }
                    }
                });
                break;

            case "save_pool_config":
                Object.keys(params).map(key => {
                    this.config_data.pool[key] = Object.assign(this.config_data.pool[key], params[key])
                })
                fs.writeFile(this.config_file, JSON.stringify(this.config_data, null, 4), 'utf8', () => {
                    this.send("set_app_data", {
                        config: this.config_data
                    })
                    this.pool.init(this.config_data)
                })
                break

                case "open_explorer":
                  const { net_type } = this.config_data.app

                  let path = null
                  if (params.type === "tx") {
                      path = "tx"
                  } else if (params.type === "service_node") {
                      path = "service_node"
                  }

                  if (path) {
                      const baseUrl = net_type === "testnet" ? "https://stageblocks.arqma.com/" : "https://explorer.arqma.com/"
                      const url = `${baseUrl}/${path}/`
                      require("electron").shell.openExternal(url + params.id)
                  }
                  break

            case "open_url":
                require("electron").shell.openExternal(params.url)
                break;

            case "save_png":
                let filename = dialog.showSaveDialog(this.mainWindow, {
                    title: "Save "+params.type,
                    filters: [{name: "PNG", extensions:["png"]}],
                    defaultPath: os.homedir()
                })
                if(filename) {
                    let base64Data = params.img.replace(/^data:image\/png;base64,/,"")
                    let binaryData = new Buffer(base64Data, 'base64').toString("binary")
                    fs.writeFile(filename, binaryData, "binary", (err) => {
                        if(err)
                            this.send("show_notification", {type: "negative", message: "Error saving "+params.type, timeout: 2000})
                        else
                            this.send("show_notification", {message: params.type+" saved to "+filename, timeout: 2000})
                    })
                }
                break;

            default:
        }
    }

    startup() {
        this.send("initialize")
        fs.readFile(this.config_file, "utf8", (err, data) => {
            if (err) {
                this.send("set_app_data", {
                    status: {
                        code: -1 // Config not found
                    },
                    config: this.config_data,
                    pending_config: this.config_data,
                });
                return;
            }

            let disk_config_data = {}
            try {
                disk_config_data = JSON.parse(data)
            } catch(e) {
            }

            // semi-shallow object merge
            Object.keys(disk_config_data).map(key => {
                if(!this.config_data.hasOwnProperty(key))
                    this.config_data[key] = {}
                this.config_data[key] = Object.assign(this.config_data[key], disk_config_data[key])
            });

            // If not Windows or Mac OS, and minimize to tray preference not set, force to false
            // Else if is Windows or Mac OS, and minimize to tray preference not set, prevent minimize
            if(this.config_data.preference.minimize_to_tray === null) {
                if(os.platform() !== "win32" && os.platform() !== "darwin") {
                    this.config_data.preference.minimize_to_tray = false
                } else {
                    this.mainWindow.setMinimizable(false)
                }
            }

            // here we may want to check if config data is valid, if not also send code -1
            // i.e. check ports are integers and > 1024, check that data dir path exists, etc

            // Filter out http:// from remote_host (remote daemon address)
            if(this.config_data.daemon.remote_host.indexOf("//") !== -1) {
                let remote_host = this.config_data.daemon.remote_host
                remote_host = this.config_data.daemon.remote_host.split("//")
                remote_host.shift()
                remote_host = remote_host.join("//")
                this.config_data.daemon.remote_host = remote_host
            }

            // save config file back to file, so updated options are stored on disk
            fs.writeFileSync(this.config_file, JSON.stringify(this.config_data, null, 4), "utf8");


            // get network interfaces for UI
            const interfaces = os.networkInterfaces()
            let network_interfaces = [{
                value: "0.0.0.0",
                label: "All interfaces - 0.0.0.0"
            }]
            for(let k in interfaces) {
                for(let k2 in interfaces[k]) {
                    const address = interfaces[k][k2]
                    if(address.family === "IPv4" && address.internal) {
                        network_interfaces.push({
                            value: address.address,
                            label: `Local machine only - ${address.address}`
                        })
                    } else if(address.family === "IPv4" && !address.internal) {
                        network_interfaces.push({
                            value: address.address,
                            label: `Local network only - ${address.address}`
                        })
                    }
                }
            }


            this.send("set_app_data", {
                config: this.config_data,
                pending_config: this.config_data,
                network_interfaces: network_interfaces
            });

            // Check to see if data dir exists, if not it may have been on network drive
            // if not exist, send back to config screen with message so user can select
            // new location
            if (!fs.existsSync(this.config_data.app.data_dir)) {
                this.send("show_notification", {type: "negative", message: "Error: data storge path not found", timeout: 2000})
                this.send("set_app_data", {
                    status: {
                        code: -1 // Return to config screen
                    }
                });
                return;
            }

            let lmdb_dir = path.join(this.config_data.app.data_dir, "lmdb02")
            let log_dir = path.join(this.config_data.app.data_dir, "logs")
            let wallet_dir = path.join(this.config_data.app.data_dir, "wallets")
            let gui_dir = path.join(this.config_data.app.data_dir, "gui")

            if(this.config_data.app.testnet) {

                let testnet_dir = path.join(this.config_data.app.data_dir, "testnet")
                if (!fs.existsSync(testnet_dir))
                    fs.mkdirSync(testnet_dir);

                lmdb_dir = path.join(testnet_dir, "lmdb02")
                log_dir = path.join(testnet_dir, "logs")
                wallet_dir = path.join(testnet_dir, "wallets")
                gui_dir = path.join(testnet_dir, "gui")

            }

            if (!fs.existsSync(lmdb_dir))
                fs.mkdirSync(lmdb_dir);
            if (!fs.existsSync(log_dir))
                fs.mkdirSync(log_dir);
            if (!fs.existsSync(wallet_dir))
                fs.mkdirSync(wallet_dir)
            if (!fs.existsSync(gui_dir))
                fs.mkdirSync(gui_dir)

            // Check permissions
            try {
                fs.accessSync(this.config_dir, fs.constants.R_OK | fs.constants.W_OK);
                fs.accessSync(path.join(this.config_dir, "gui"), fs.constants.R_OK | fs.constants.W_OK);
                fs.accessSync(this.config_file, fs.constants.R_OK | fs.constants.W_OK);
                fs.accessSync(lmdb_dir, fs.constants.R_OK | fs.constants.W_OK);
                fs.accessSync(log_dir, fs.constants.R_OK | fs.constants.W_OK);
                fs.accessSync(wallet_dir, fs.constants.R_OK | fs.constants.W_OK);
            } catch (err) {
                this.send("show_notification", {type: "negative", message: "Error: data storge path not writable", timeout: 2000})
                this.send("set_app_data", {
                    status: {
                        code: -1 // Return to config screen
                    }
                });
                return;
            }
            const { net_type } = this.config_data.app

            this.daemon = new Daemon(this);
            this.walletd = new WalletRPC(this);
            this.pool = new Pool(this);
            this.market = new Market(this);

            this.send("set_app_data", {
                status: {
                    code: 3 // Starting daemon
                }
            });

            this.daemon.checkVersion().then((version) => {

                if(version) {
                    this.send("set_app_data", {
                        status: {
                            code: 4,
                            message: version
                        }
                    });
                } else {
                    // daemon not found, probably removed by AV, set to remote node
                    this.config_data.daemon.type = "remote"
                    this.send("set_app_data", {
                        config: this.config_data,
                        pending_config: this.config_data,
                    });
                    this.send("show_notification", {type: "warning", textColor: "black", message: "Warning: arqmad not found, using remote node", timeout: 2000})
                }

                this.market.start(this.config_data)
                                .then(() => {

                                })
                                .catch(error => {

                                })
                this.daemon.checkRemoteDaemon(this.config_data).then((data) => {

                    if(data.hasOwnProperty("error")) {
                        // error contacting remote daemon

                        if(this.config_data.daemon.type == "local_remote") {
                            // if in local+remote, then switch to local only
                            this.config_data.daemon.type = "local"
                            this.send("set_app_data", {
                                config: this.config_data,
                                pending_config: this.config_data,
                            });
                            this.send("show_notification", {type: "warning", textColor: "black", message: "Warning: remote node not available, using local node", timeout: 2000})

                        } else if(this.config_data.daemon.type == "remote") {
                            this.send("set_app_data", {
                                status: {
                                    code: -1 // Return to config screen
                                }
                            });
                            this.send("show_notification", {type: "negative", message: "Error: remote node not available, change to local mode or update remote node", timeout: 2000})
                            return;
                        }
                    } else if(this.config_data.app.testnet && !data.result.testnet) {
                        // remote node network does not match local network (testnet, mainnet)

                        if(this.config_data.daemon.type == "local_remote") {
                            // if in local+remote, then switch to local only
                            this.config_data.daemon.type = "local"
                            this.send("set_app_data", {
                                config: this.config_data,
                                pending_config: this.config_data,
                            });
                            this.send("show_notification", {type: "warning", textColor: "black", message: "Warning: remote node network does not match, using local node", timeout: 2000})

                        } else if(this.config_data.daemon.type == "remote") {
                            this.send("set_app_data", {
                                status: {
                                    code: -1 // Return to config screen
                                }
                            });
                            this.send("show_notification", {type: "negative", message: "Error: remote node network does not match, change to local mode or update remote node", timeout: 2000})
                            return;
                        }

                    }

                    this.daemon.start(this.config_data).then(() => {

                        this.send("set_app_data", {
                            status: {
                                code: 6 // Starting wallet
                            }
                        });

                        this.walletd.start(this.config_data).then(() => {

                            this.send("set_app_data", {
                                status: {
                                    code: 7 // Reading wallet list
                                }
                            });

                            this.walletd.listWallets(true)

                            this.pool.init(this.config_data)

                            this.send("set_app_data", {
                                status: {
                                    code: 0 // Ready
                                }
                            });
                        }).catch(error => {
                            this.send("set_app_data", {
                                status: {
                                    code: -1 // Return to config screen
                                }
                            });
                            return;
                        });

                    }).catch(error => {
                        if(this.config_data.daemon.type == "remote") {
                            this.send("show_notification", {type: "negative", message: "Remote daemon cannot be reached", timeout: 2000})
                        } else {
                            this.send("show_notification", {type: "negative", message: "Local daemon internal error", timeout: 2000})
                        }
                        this.send("set_app_data", {
                            status: {
                                code: -1 // Return to config screen
                            }
                        });
                        return;
                    });
                });

            }).catch(error => {
                this.send("set_app_data", {
                    status: {
                        code: -1 // Return to config screen
                    }
                });
                return;
            });
            this.market.start(this.config_data)
                            .then(() => {
                            })
                            .catch(error => {
                            })
        });
    }

    getTooltipLabel () {

        if(!this.daemon || !this.walletd)
            return "Initializing..."

        let daemon_type = this.config_data.daemon.type
        let daemon_info = this.daemon.daemon_info
        let wallet_info = this.walletd.wallet_info

        if(Object.keys(daemon_info).length == 0 || Object.keys(wallet_info).length == 0)
            return "Initializing..."

        let target_height = 0
        if(daemon_type === "local" && !daemon_info.is_ready)
            target_height = Math.max(daemon_info.height, daemon_info.target_height)
        else
            target_height = daemon_info.height

        let daemon_local_pct = 0
        if(daemon_type !== "remote") {
            let d_pct = (100 * daemon_info.height_without_bootstrap / target_height).toFixed(1)
            if(d_pct == 100.0 && daemon_info.height_without_bootstrap < target_height)
                daemon_local_pct = 99.9
            else
                daemon_local_pct = d_pct
        }

        let daemon_pct = 0
        if(daemon_type === "local")
            daemon_pct = daemon_local_pct

        let wallet_pct  = 0
        let w_pct = (100 * wallet_info.height / target_height).toFixed(1)
        if(w_pct == 100.0 && wallet_info.height < target_height)
            wallet_pct = 99.9
        else
            wallet_pct = w_pct

        let status = ""

        if(daemon_type !== "remote") {
            status += `Daemon: ${daemon_info.height_without_bootstrap} / ${target_height} (${daemon_local_pct}%) `
        }

        if(daemon_type !== "local") {
            status += `Remote: ${daemon_info.height} `
        }

        status += `Wallet: ${wallet_info.height} / ${target_height} (${wallet_pct}%) `

        if(daemon_type === "local") {
            if(daemon_info.height_without_bootstrap < target_height || !daemon_info.is_ready) {
                status += "Syncing..."
            } else if(wallet_info.height < target_height - 1 && wallet_info.height != 0) {
                status += "Scanning..."
            } else {
                status += "Ready"
            }
        } else {
            if(wallet_info.height < target_height - 1 && wallet_info.height != 0) {
                status += "Scanning..."
            } else if(daemon_info.height_without_bootstrap < target_height) {
                status += "Syncing..."
            } else {
                status += "Ready"
            }
        }

        return status
    }

    quit() {
        return new Promise((resolve, reject) => {
            let process = []
            if(this.daemon)
                process.push(this.daemon.quit())
            if(this.walletd)
                process.push(this.walletd.quit())
            if(this.pool)
                process.push(this.pool.quit())
            if(this.market)
                    process.push(this.market.quit())
            Promise.all(process).then(() => {
                resolve()
            })
        })
    }
}
