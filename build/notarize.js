require("dotenv").config();
const { notarize } = require("electron-notarize");

/*
 Pre-requisites: https://github.com/electron/electron-notarize#prerequisites
    1. Generate an app specific password
    2. Add SIGNING_APPLE_ID, SIGNING_APP_PASSWORD, SIGNING_TEAM_ID to .env file in the root directory (where quasar.conf.js is located)
*/

/*
  Notarizing: https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
*/

const log = msg => console.log(`\n${msg}`);
const isEmpty = v => !v || v.length === 0;

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }
  log("Notarizing mac application");

  const appName = context.packager.appInfo.productFilename;
  const { ELECTRON_WALLET_APPLE_ID, ELECTRON_WALLET_PASSWORD, ELECTRON_WALLET_TEAM_ID } = process.env;

  if (isEmpty(ELECTRON_WALLET_APPLE_ID) || isEmpty(ELECTRON_WALLET_PASSWORD)) {
    log("SIGNING_APPLE_ID or SIGNING_APP_PASSWORD not set.\nTerminating noratization.");
    return;
  }

  const options = {
    appBundleId: "com.arqma-project.electron-wallet",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: ELECTRON_WALLET_APPLE_ID,
    appleIdPassword: ELECTRON_WALLET_PASSWORD
  };
  if (!isEmpty(ELECTRON_WALLET_TEAM_ID)) options.ascProvider = ELECTRON_WALLET_TEAM_ID;
  return notarize(options);
};
