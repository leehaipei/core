const fs = require('fs-extra');
const chalk = require('react-dev-utils/chalk');
const _packageJson = fs.readFileSync('./package.json')
const momentBeijing = require('../../tools/momentBeijing')

const packageJson = JSON.parse(_packageJson)

function makeCustomLog(isBuild) {
    const nowStr = momentBeijing().format('YYYY-MM-DD HH:mm:ss')
    if (isBuild) {
        return `console.groupCollapsed("%cversion%c${packageJson.version}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");
        console.log("%crelease%c${packageJson['last-release-time']}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");
        console.log("%cbuilt%c${nowStr}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");
        console.groupEnd();`
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