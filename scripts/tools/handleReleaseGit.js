#!/usr/bin/env node
const shell = require('shelljs');
const rootPath = process.cwd();
const chalk = require('react-dev-utils/chalk');


module.exports = function handleReleaseGit(cmd, msg) {

  return new Promise((resolve, reject) => {

    if (cmd === "push") {
      shell.cd(rootPath);
      shell.exec(`git commit -am "${msg}"`);
      shell.exec(`git push`);
      console.log(chalk.yellow(`handleReleaseGit commit & push`));
      resolve("commit")

    } else {
      console.log(chalk.yellow(`handleReleaseGit No action`));
      resolve("ReleaseGit不做操作")
    }

  })

};