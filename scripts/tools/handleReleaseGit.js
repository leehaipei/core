#!/usr/bin/env node
const shell = require('shelljs');
const rootPath = process.cwd();
const chalk = require('react-dev-utils/chalk');
const inquirer = require("inquirer");

module.exports = function handleReleaseGit(msg) {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: "confirm",
        name: "isCommitPush",
        message: "是否提交并推送代码",
      },
    ]).then((answers) => {
      if (answers.isCommitPush) {
        shell.cd(rootPath);
        shell.exec(`git commit -am "${msg}"`);
        shell.exec(`git push`);
        console.log(chalk.yellow(`handleReleaseGit commit & push`));
        resolve("commit & push")
      } else {
        console.log(chalk.yellow(`handleReleaseGit No action`));
        resolve("ReleaseGit不做操作")
      }
    }).catch((error) => {
      reject(error);
    });
  })
};