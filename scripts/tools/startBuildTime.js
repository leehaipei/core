const fs = require('fs-extra');
const chalk = require('chalk');

module.exports = function logBuildTime(start) {
  return new Promise((resolve, reject) => {

    const time = { start: new Date().getTime() }
    fs.writeFile("./buildtime.json", JSON.stringify(time, null, "\t"), (err) => {
      if (err) {
        console.log(chalk.red(`buildtime.json update error`));
        reject()
      } else {
        console.log(chalk.green(`buildtime.json update success`));
        resolve()
      }
    })
  })
}


