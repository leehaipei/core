import shell from 'shelljs';
import chalk from 'chalk';
import appRoot from "app-root-path";
import { confirm } from '@inquirer/prompts';
import fs from 'fs-extra';

const rootPath = appRoot.path;

export default function handleReleaseMerge() {
  return new Promise(async (resolve, reject) => {

    const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim();
    const targetBranch = await getReleaseBranch();

    const answer = await confirm({ message: `确认将当前分支 ${currentBranch} 合并到 ${targetBranch} 吗？` });

    if (answer) {
      shell.cd(rootPath);
      shell.exec(`git switch ${targetBranch}`);
      shell.exec(`git merge ${currentBranch}`);
      shell.exec(`git push`);
      shell.exec(`git switch ${currentBranch}`);
      console.log(chalk.green("merged!"));
      resolve("merged!")
    } else {
      console.log(chalk.green("ReleaseMerge不做操作"));
      resolve("ReleaseMerge不做操作")
    }
  })
}




/**
 * 从 GitHub Actions yml 中精准提取 push.branches 里的分支名
 * @returns {string} 分支名，例如：vite-release
 */
async function getReleaseBranch() {
  try {

      const githubWorkflowPath = rootPath + "/.github/workflows/main.yml";

    // 1. 读取你的 workflow yml 文件（改成你实际的路径）
    const ymlContent =  await fs.readFile(githubWorkflowPath, "utf-8");

    // 2. 正则匹配：只抓 branches: [ xxx ] 里的 xxx
    // 支持空格、换行、缩进等所有 GitHub Actions 常见格式
    const branchMatch = ymlContent.match(/branches:\s*\[\s*([^\]\s]+)\s*\]/);

    if (branchMatch && branchMatch[1]) {
      return branchMatch[1].trim();
    }

    return null;
  } catch (err) {
    console.error('读取文件失败', err);
    return null;
  }
}