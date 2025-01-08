const fs = require('fs-extra');
const chalk = require('react-dev-utils/chalk');
const moment = require('moment');
const _packageJson = fs.readFileSync('./package.json')

const packageJson = JSON.parse(_packageJson)

function makeCustomLog(isBuild) {
    if (isBuild) {
        return `console.log("%cversion:${packageJson.version}%c${packageJson["last-release-time"]}","background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a","color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");
        console.log("%cbuilt%c${moment().format('YYYY-MM-DD HH:mm:ss')}","background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a","color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");`
    } else {
        return ""
    }
}

module.exports = function handleCustomLog(isBuild = false) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./core/tools/console_log/index.js", makeCustomLog(isBuild), (err) => {
            if (err) {
                console.log(chalk.red(`custom Log ${isBuild ? "add" : "restore"} error`));
            }
        })
        resolve()
    })
}