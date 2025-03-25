import chalk from 'chalk';

import handleVersionAndTime from '../handler/handleVersionAndTime.js';
import handleReleaseGit from '../handler/handleReleaseGit.js';


const args = process.argv.slice(2);
const message = args[0];

async function main() {
  if (!message) {
    console.log(chalk.red(`release message is not filled in.`));
    return
  }


  await handleVersionAndTime(message);
  await handleReleaseGit(message);


}

// const handleVersionAndTime = require('./tools/handleVersionAndTime');
// const handleReleaseGit = require('./tools/handleReleaseGit');


// handleVersionAndTime(message)
//   .then((res) => handleReleaseGit(message))
//   .then((res) => {
//   })
//   .catch(err => {
//     console.log("release.js", err);
//   });

// 三位版本号，最后两位通过选择来控制。录入的信息还是通过命令行的参数传入
// 第一位版本号，必须手动修改
// 第二位版本号，通过选择来控制。选择后，第二位版本号加1，第三位版本号重置为0。
// 第三位版本号，通过选择来控制



main();
