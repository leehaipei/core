import { confirm } from '@inquirer/prompts';
import shell from 'shelljs';

export default async function handleIsAddLastCommit() {
    const lastCommitMessage = shell.exec('git log -1 --pretty=%s', { silent: true }).stdout.trim();
    const result = await confirm({ message: `是否追加至上次提交=> ${lastCommitMessage}`, required: true });
    return new Promise((resolve, reject) => {
        resolve({ isAddLastCommit: result, lastCommitMessage })
    })
}
