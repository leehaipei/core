import { input } from '@inquirer/prompts';

export default async function handleReleaseMessage() {
    const message = await input({ message: '输入release信息:', required: true });
    return new Promise((resolve, reject) => {
        resolve(message)
    })
}
