const fs = require('fs-extra');
const axios = require('axios');
const moment = require('moment');
const chalk = require('react-dev-utils/chalk');
const _packageJson = fs.readFileSync('./package.json')
const momentBeijing = require('../../tools/momentBeijing')

const packageJson = JSON.parse(_packageJson)

function makeCustomLog(isBuild, coreTime) {
    const nowStr = momentBeijing().format('YYYY-MM-DD HH:mm:ss')
    if (isBuild && coreTime) {
        return `console.groupCollapsed("%cversion%c${packageJson.version}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%crelease%c${packageJson['last-release-time']}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%cbuilt%c${nowStr}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%ccore%c${coreTime}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.groupEnd();`
    } else {
        return ""
    }
}

module.exports = function handleCustomLog(isBuild = false) {
    return new Promise(async (resolve, reject) => {

        let coreBeijingTime = false;
        if (isBuild) {
            const commits = await axios.get('https://api.github.com/repos/leehaipei/core/branches/master')
            const coreTime = commits?.data?.commit?.commit?.author?.date;
            coreBeijingTime = moment.utc(coreTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
        }

        fs.writeFile("./core/tools/console_log/index.js", makeCustomLog(isBuild, coreBeijingTime), (err) => {
            if (err) {
                console.log(chalk.red(`custom Log ${isBuild ? "add" : "restore"} error`));
            }
        })
        resolve()
    })
}