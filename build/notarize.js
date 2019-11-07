require("dotenv").config()
const { notarize } = require("electron-notarize")

/*
 Pre-requisites: https://github.com/electron/electron-notarize#prerequisites
    1. Generate an app specific password
    2. Add ELECTRON_WALLET_APPLE_ID, ELECTRON_WALLET_APP_PASSWORD, ELECTRON_WALLET_TEAM_ID to .env file in the root directory (where quasar.conf.js is located)
*/

exports.default = async function notarizing (context) {
    const { electronPlatformName, appOutDir } = context
    if (electronPlatformName !== "darwin") {
        return
    }

    const appName = context.packager.appInfo.productFilename

    return notarize({
        appBundleId: "com.arqma.wallet",
        appPath: `${appOutDir}/${appName}.app`,
        appleId: process.env.ELECTRON_WALLET_APPLE_ID,
        appleIdPassword: process.env.ELECTRON_WALLET_APP_PASSWORD,
        ascProvider: process.env.ELECTRON_WALLET_TEAM_ID
    })
}
