import shell from 'shelljs';
import appRoot from "app-root-path";
import handleReleaseGit from './handleReleaseGit.js';

const rootPath = appRoot.path;

export default function handleAddCommit(message) {
  return new Promise(async (resolve, reject) => {

    shell.cd(rootPath);
    const status = shell.exec('git status', { silent: true }).stdout.trim().toLowerCase();
    const isUpToDate = status.includes('your branch is up to date');

    if (isUpToDate) {
      shell.exec(`git add .`);
      shell.exec(`git commit --amend --no-edit`);
    }
    
    await handleReleaseGit(message, isUpToDate);

    resolve("add commit done");

  })
}
