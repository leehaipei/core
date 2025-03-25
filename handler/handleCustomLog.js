import fs from 'fs-extra';
import axios from 'axios';
import moment from 'moment';
import chalk from 'chalk';
import appRoot from "app-root-path";
import momentBeijing from '../tools/momentBeijing/index.js'

const rootPath = appRoot.path;
const packageJsonBuffer = fs.readFileSync(rootPath + "/package.json");
const packageJson = JSON.parse(packageJsonBuffer);



export default function handleCustomLog(isCreate) {
  return new Promise(async (resolve, reject) => {

    let coreBeijingTime = false;
    if (isCreate) {
      // 查询vite分支的信息
      const commits = await axios.get('https://api.github.com/repos/leehaipei/core/branches/vite')
      const coreTime = commits?.data?.commit?.commit?.author?.date;
      coreBeijingTime = moment.utc(coreTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
    }

    fs.writeFile(rootPath + "/core/tools/console_log/index.js", makeCustomLog(isCreate, coreBeijingTime), (err) => {
      if (err) {
        console.log(err);
        console.log(chalk.red(`custom Log ${isCreate ? "add" : "restore"} error`));
      }
    })
    resolve()
  })
}


function makeCustomLog(isCreate, coreTime) {
  const nowStr = momentBeijing().format('YYYY-MM-DD HH:mm:ss')
  if (isCreate && coreTime) {
    return `console.groupCollapsed("%cversion%c${packageJson.version}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%crelease%c${packageJson['last-release-time']}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%cbuilt%c${nowStr}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%ccore%c${coreTime}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.groupEnd();`
  } else {
    return ""
  }
}
