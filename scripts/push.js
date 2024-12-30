const axios = require('axios');
const moment = require('moment');
const fs = require('fs-extra');
const _packageJson = fs.readFileSync('./package.json')
const _release_record = fs.readFileSync('./release-record.json')
const args = process.argv.slice(2)
const _buildtime = fs.readFileSync('./buildtime.json')


let packageJson = JSON.parse(_packageJson)
let release_record = JSON.parse(_release_record)
const buildtime = JSON.parse(_buildtime)

const device_key = args[0]
const push_host = args[1]
const action_start = args[2]

// 创建一个新的 Date 对象，并使用 toLocaleString() 方法将其转换为北京时间字符串
let beijingTimeString = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });

axios.post(push_host, {
  "device_key": device_key,
  "body": `post:${beijingTimeString}\nmessage:${release_record[0].message}\nbuilt:${buildtime.use}\nrelease:${release_record[0].time}\naction run:${moment(action_start).diff(moment(), 'seconds', true)}`,
  "title": `${packageJson.name} version:${packageJson.version}`,
  "icon": "https://static.leehaipei.com/images/github.png",
  "group": 'ReleaseNotice'
}).then(res => {
  if (res.data.code === 200) {
    console.log(`push success`);
  } else {
    console.log(`push fail`);
  }
}).catch(error => {
  console.log(`push error`);
  console.log(error);
});