#!/usr/bin/env node
const shell = require('shelljs');
const fs = require('fs-extra');
const rootPath = process.cwd();
const path = require('path');
const chalk = require('react-dev-utils/chalk');
const _packageJson = fs.readFileSync('./package.json')

const packageJson = JSON.parse(_packageJson)

const coreUrl = packageJson.coreGitUrl
const coreBranch = packageJson.coreGitBranch


function isSameGit(cfgs, local) {
  // git remote 相同
  if (local.url.replace(/http:\/\/(.*?)\/|git@(.*?):/, '$1$2').indexOf(cfgs.url.replace(/http:\/\/(.*?)\/|git@(.*?):/, '$1$2')) > -1) {
    // branch 不同
    if (cfgs.branch && cfgs.branch !== local.branch) {
      return 0;
    } else {
      return 1;
    }
    // remote 不同
  } else {
    return -1;
  }
}

module.exports = function checkcore(userCfg) {

  return new Promise(async (resolve, reject) => {

    console.log(chalk.yellow(`update core start`));

    function cloneCore() {

      let giturl = shell.exec('git remote get-url --all origin').stdout;
      let execStr = '';

      // 兼容两种协议
      if (giturl.indexOf('git@') == 0) {
        execStr = `git clone ${coreUrl.replace(/http:\/\/(.*?)\/|git@(.*?):/, 'git@$1$2:')} ${coreBranch ? `-b ${coreBranch}` : ''}`;
      } else {
        execStr = `git clone ${coreUrl.replace(/http:\/\/(.*?)\/|git@(.*?):/, 'http://$1$2/')} ${coreBranch ? `-b ${coreBranch}` : ''}`;
      }
      console.log(chalk.yellow(`clone core shell: ${execStr}`));
      shell.exec(execStr);
      resolve("cloneCore");
    }

    shell.cd(rootPath);

    // 已经clone core仓库
    if (shell.cd('core').stderr === null) {
      let cfgs = {
        url: coreUrl,
        branch: coreBranch
      };
      let curUrl = shell.exec('git remote get-url --all origin').stdout;
      let curBranch = shell.exec('git rev-parse --abbrev-ref HEAD').stdout;
      let localCfgs = {
        url: curUrl,
        branch: curBranch
      }

      // -1 remote不同, 0 remote相同branch不同，1 remote相同branch相同
      const compareGit = isSameGit(cfgs, localCfgs);

      if (compareGit === -1) {
        console.log(chalk.yellow(`Repositories mismatch`));
        shell.cd(rootPath);
        await shell.rm('-rf', path.join(rootPath, `./core`));
        cloneCore()
      } else if (compareGit === 0) {
        console.log(chalk.yellow(`checkout branch and pull ${cfgs.url} ${cfgs.branch}`));
        shell.exec('git pull');
        shell.exec(`git checkout ${cfgs.branch}`)
        shell.exec('git pull');
        shell.cd(rootPath);
        resolve("checkout branch and pull")
      } else {
        console.log(chalk.yellow(`pull ${cfgs.url} ${cfgs.branch}`));
        shell.exec('git pull');
        shell.cd(rootPath);
        resolve("pull")
      }

      // // 未配置coreCfg 或者配置coreCfg并且和当前地址相同 
      // if ((!userCfg.coreCfg || !userCfg.coreCfg.url) || (userCfg.coreCfg && userCfg.coreCfg.url && giturl.replace(/http:\/\/(.*?)\/|git@(.*?):/,'$1$2').indexOf(userCfg.coreCfg.url.replace(/http:\/\/(.*?)\/|git@(.*?):/,'$1$2')) > -1)) {
      //   shell.exec('git pull');
      //   shell.cd(rootPath);
      // } else {
      //   // 当前core和配置core地址不同
      //   shell.cd(rootPath);
      //   await shell.rm('-rf', path.join(rootPath,`./core`));
      //   cloneCore()
      // }
    } else {
      console.log(chalk.yellow(`Not yet clone core repositories`));
      cloneCore()
    }
  })

};