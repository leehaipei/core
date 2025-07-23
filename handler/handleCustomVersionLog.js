import axios from 'axios';
import moment from 'moment';
import momentBeijing from '../tools/momentBeijing/index.js'

export default function handleCustomVersionLog(packageJson) {
  return new Promise(async (resolve, reject) => {
    let coreBeijingTime = false;

    // 查询vite分支的信息
    const commits = await axios.get('https://api.github.com/repos/leehaipei/core/branches/vite')
    const coreTime = commits?.data?.commit?.commit?.author?.date;
    coreBeijingTime = moment.utc(coreTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')

    const logStr = `console.groupCollapsed("%cversion%c${packageJson.version}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%crelease%c${packageJson['last-release-time']}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%cbuilt%c${momentBeijing().format('YYYY-MM-DD HH:mm:ss')}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.log("%ccore%c${coreBeijingTime}", "border-radius: 3px 0 0 3px;background-color:#20232a;color:#61dafb;font-weight:bold;padding:0px 3px;border:1px solid #20232a", "border-radius:0 3px 3px 0;color:#20232a;background-color:#61dafb;font-weight:bold;padding:1px 3px");console.groupEnd();`

    resolve(logStr)
  })
}
