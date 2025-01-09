const fs = require('fs-extra');
const chalk = require('react-dev-utils/chalk');
const _packageJson = fs.readFileSync('./package.json')
const _release_record = fs.readFileSync('./release-record.json')
const momentBeijing = require('../../tools/momentBeijing')

let packageJson = JSON.parse(_packageJson)
let release_record = JSON.parse(_release_record)

function makeVersion() {
    const _v_str = packageJson.version
    let _v_arr = _v_str.split(".")
    let _autoNum = Number(_v_arr[_v_arr.length - 1])
    _v_arr[_v_arr.length - 1] = `${_autoNum + 1}`
    return _v_arr.join(".")
}

module.exports = function handleVersionAndTime(message) {
    return new Promise((resolve, reject) => {

        if (!message) {

            console.log(chalk.red(`release parameter is not filled in.`));
            reject("please check ==>handleVersionAndTime.js")

        } else {

            packageJson["version"] = makeVersion()
            packageJson["last-release-time"] = momentBeijing().format("YYYY-MM-DD HH:mm:ss")
            packageJson["release-message"] = message

            release_record.unshift({
                time: packageJson["last-release-time"],
                version: packageJson["version"],
                message
            })

            fs.writeFile("./package.json", JSON.stringify(packageJson, null, "\t"), (err) => {
                if (err) {
                    console.log(chalk.red(`package.json update error`));
                } else {
                    console.log(chalk.green(`package.json update success`));
                    fs.writeFile("./release-record.json", JSON.stringify(release_record, null, "\t"), (err) => {
                        if (err) {
                            console.log(chalk.red(`release-record.json record error`));
                        } else {
                            resolve()
                            console.log(chalk.green(`release-record.json record success`));
                        }
                    })
                }
            })
        }
    })
}