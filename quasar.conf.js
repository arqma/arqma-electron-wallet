// Configuration for your app

module.exports = function (ctx) {
    return {
        // app plugins (/src/plugins)
        plugins: [
            "i18n",
            "axios",
            "vuelidate",
            "gateway",
            "timeago"
        ],
        css: [
            "app.styl",
            "~flag-icon-css/css/flag-icon.min.css"
        ],
        extras: [
            ctx.theme.mat ? "roboto-font" : null,
            "material-icons" // optional, you are not bound to it
            // "ionicons",
            // "mdi",
            // "fontawesome"
        ],
        supportIE: false,
        build: {
            scopeHoisting: true,
            vueRouterMode: "history",
            // vueCompiler: true,
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            extendWebpack (cfg) {
                /*
                cfg.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules|quasar)/
                })
                */
            }
        },
        devServer: {
            // https: true,
            // port: 8080,
            open: true // opens browser window automatically
        },
        // framework: "all" --- includes everything; for dev only!
        framework: {
            components: [
                "QLayout",
                "QLayoutHeader",
                "QLayoutFooter",
                "QLayoutDrawer",
                "QPageContainer",
                "QPage",
                "QToolbar",
                "QToolbarTitle",
                "QTooltip",
                "QField",
                "QInput",
                "QRadio",
                "QOptionGroup",
                "QBtn",
                "QBtnToggle",
                "QIcon",
                "QTabs",
                "QTab",
                "QRouteTab",
                "QBtnDropdown",
                "QPopover",
                "QModal",
                "QModalLayout",
                "QStep",
                "QStepper",
                "QStepperNavigation",
                "QSpinner",
                "QList",
                "QListHeader",
                "QItem",
                "QItemMain",
                "QItemSeparator",
                "QItemSide",
                "QItemTile",
                "QSelect",
                "QToggle",
                "QPageSticky",
                "QCollapsible",
                "QCheckbox",
                "QInnerLoading",
                "QInfiniteScroll",
                "QDatetime",
                "QContextMenu",
                "QScrollArea"
            ],
            directives: [
                "Ripple",
                "CloseOverlay"
            ],
            // Quasar plugins
            plugins: [
                "Notify",
                "Loading",
                "LocalStorage",
                "Dialog"
            ]
            // iconSet: ctx.theme.mat ? "material-icons" : "ionicons"
            // i18n: "de" // Quasar language
        },
        // animations: "all" --- includes all animations
        animations: [],
        pwa: {
            // workboxPluginMode: "InjectManifest",
            // workboxOptions: {},
            manifest: {
                // name: "Quasar App",
                // short_name: "Quasar-PWA",
                // description: "Best PWA App in town!",
                display: "standalone",
                orientation: "portrait",
                background_color: "#ffffff",
                theme_color: "#1ba7fd",
                icons: [{
                    "src": "src/statics/icons/16x16.png",
                    "sizes": "16x16",
                    "type": "image/png"
                },
                {
                    "src": "src/statics/icons/24x24.png",
                    "sizes": "24x24",
                    "type": "image/png"
                },
                {
                    "src": "src/statics/icons/32x32.png",
                    "sizes": "32x32",
                    "type": "image/png"
                },
                {
                    "src": "src/statics/icons/48x48.png",
                    "sizes": "48x48",
                    "type": "image/png"
                },
                {
                    "src": "src/statics/icons/64x64.png",
                    "sizes": "64x64",
                    "type": "image/png"
                },
                {
                    "src": "src/statics/icons/96x96.png",
                    "sizes": "96x96",
                    "type": "image/png"
                },
                {
                    "src": "src/statics/icons/128x12.png",
                    "sizes": "128x128",
                    "type": "image/png"
                },
                {
                    "src": "src/statics/icons/256x256.png",
                    "sizes": "256x256",
                    "type": "image/png"
                }

                ]
            }
        },
        cordova: {
            // id: "org.cordova.quasar.app"
        },
        electron: {
            bundler: "builder", // or "packager"
            extendWebpack (cfg) {
                // do something with Electron process Webpack cfg
            },
            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: "",
                // appCategoryType: "",
                // osxSign: "",
                // protocol: "myapp://path",

                // Window only
                // win32metadata: { ... }

                extraResource: [
                    "bin"
                ]
            },
            builder: {
                // https://www.electron.build/configuration/configuration

                appId: "com.arqma.wallet",
                productName: "Arqma Electron Wallet",
                copyright: "Copyright © 2018-2019 Arqma Project, 2018 Ryo/Loki Currency Project",

                // directories: {
                //     buildResources: "src-electron/build"
                // },
                publish: "github",
                files: [
                    "!dev-app-update.yml"
                ],

                linux: {
                    target: ["AppImage", "snap", "deb"],
                    icon: "src-electron/icons/linux-512x512.png",
                    category: "Finance"
                },

                mac: {
                    icon: "src-electron/icons/icon.icns",
                    category: "public.app-category.finance"
                },

                dmg: {
                    background: "src-electron/build/loki-dmg.tiff"
                },

                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true

                },

                extraResources: [
                    "bin"
                ]
            }
        }
    }
}
