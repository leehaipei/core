const axios = require('axios');
const moment = require('moment');
const fs = require('fs-extra');
const _packageJson = fs.readFileSync('./package.json')
const _release_record = fs.readFileSync('./release-record.json')
const args = process.argv.slice(2)
const _buildtime = fs.readFileSync('./buildtime.json')
const momentBeijing = require('../tools/momentBeijing')


let packageJson = JSON.parse(_packageJson)
let release_record = JSON.parse(_release_record)
const buildtime = JSON.parse(_buildtime)

const device_key = args[0]
const push_host = args[1]
const action_start = args[2]

let beijingTimeString = momentBeijing().format('YYYY-MM-DD HH:mm:ss');

axios.post(push_host, {
  "device_key": device_key,
  "body": `post:${beijingTimeString}\nmessage:${release_record[0].message}\nbuilt:${buildtime.use}\naction:${moment().diff(moment(action_start), 'seconds', true)}s\nrelease:${release_record[0].time}`,
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