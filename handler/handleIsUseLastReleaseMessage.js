import { confirm } from '@inquirer/prompts';
import shell from 'shelljs';

export default async function handleIsUseLastReleaseMessage() {
    const lastReleaseMessage = shell.exec('git log -1 --pretty=%s', { silent: true }).stdout.trim();
    const result = await confirm({ message: `是否使用上一个提交信息: [${lastReleaseMessage}]`, required: true });
    return new Promise((resolve, reject) => {
        resolve({ result, lastReleaseMessage: `[release] ${lastReleaseMessage}` })
    })
}
