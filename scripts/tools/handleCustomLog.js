const fs = require('fs-extra');
const chalk = require('react-dev-utils/chalk');
const _packageJson = fs.readFileSync('./package.json')

const packageJson = JSON.parse(_packageJson)

function makeCustomLog(isBuild) {
    const nowStr = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
    if (isBuild) {
        return `console.log("%cversion%c${packageJson.version}", "background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");
        console.log("%crelease%c${packageJson['last-release-time']}", "background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");
        console.log("%cbuilt%c${nowStr}", "background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");`
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