import shell from 'shelljs';
import appRoot from "app-root-path";
import chalk from 'chalk';

const rootPath = appRoot.path;

export default function handleAddCommit(message) {
  return new Promise(async (resolve, reject) => {

    shell.cd(rootPath);
    const status = shell.exec('git status', { silent: true }).stdout.trim().toLowerCase();
    const isUpToDate = status.includes('your branch is up to date');

    shell.exec(`git add .`);
    shell.exec(`git commit --amend --no-edit`);

    if (isUpToDate) {
      shell.exec(`git push --force-with-lease`);
    } else {
      shell.exec(`git push`);
    }

    console.log(chalk.green("commit & push"));

    resolve("add commit done");

  })
}
