import shell from 'shelljs';
import chalk from 'chalk';
import appRoot from "app-root-path";
import { confirm } from '@inquirer/prompts';

const rootPath = appRoot.path;

export default function handleReleaseGit(message) {
  return new Promise(async (resolve, reject) => {
    const answer = await confirm({ message: '是否提交并推送代码' });
    if (answer) {
      shell.cd(rootPath);
      shell.exec(`git commit -am "${message}"`);
      shell.exec(`git push`);
      console.log(chalk.green("commit & push"));
      resolve("commit & push")
    } else {
      console.log(chalk.green("ReleaseGit不做操作"));
      resolve("ReleaseGit不做操作")
    }
  })
}
