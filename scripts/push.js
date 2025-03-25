import axios from 'axios';
import moment from 'moment';
import fs from 'fs-extra';
import appRoot from "app-root-path";

import momentBeijing from '../tools/momentBeijing/index.js';

const rootPath = appRoot.path;
const packageJsonBuffer = fs.readFileSync(rootPath + "/package.json");
const packageJson = JSON.parse(packageJsonBuffer);
const releaseRecordBuffer = fs.readFileSync(rootPath + '/release-record.json');
let releaseRecord = JSON.parse(releaseRecordBuffer)

const buildtimeBuffer = fs.readFileSync(rootPath + '/buildtime.json');
const buildtime = JSON.parse(buildtimeBuffer);


const args = process.argv.slice(2)

const device_key = args[0]
const push_host = args[1]
const action_start = args[2]

let beijingTimeString = momentBeijing().format('YYYY-MM-DD HH:mm:ss');


axios.post(push_host, {
  "device_key": device_key,
  "body": `post:${beijingTimeString}\nmessage:${releaseRecord[0].message}\nbuilt:${buildtime.use}\naction:${moment().diff(moment(action_start), 'seconds', true)}s\nrelease:${releaseRecord[0].time}`,
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
