import fs from 'fs-extra';
import chalk from 'chalk';
import appRoot from "app-root-path";
import { select, number, confirm } from '@inquirer/prompts';

import momentBeijing from '../tools/momentBeijing/index.js'


const rootPath = appRoot.path;
const packageJsonBuffer = fs.readFileSync(rootPath + "/package.json");
const packageJson = JSON.parse(packageJsonBuffer);
const releaseRecordBuffer = fs.readFileSync('./release-record.json')
let releaseRecord = JSON.parse(releaseRecordBuffer)


export default async function handleVersionAndTime(message) {

    const currentVision = packageJson.version;
    console.log(chalk.bold.bgBlueBright(`current version: ${currentVision}`));
    const currentVisionArry = currentVision.split('.');

    const visionAnswer = await select({
        message: '选择更新版本号',
        choices: [
            {
                name: '0.0.🙋',
                value: 2,
                description: '3.小版本更新',
            },
            {
                name: '0.🙋.0',
                value: 1,
                description: '2.中间版本更新',
            },
            {
                name: '🙋.0.0',
                value: 0,
                description: '1.大版本升级',
            }
        ],
    });

    const typeAnswer = await select({
        message: '选择版本号更新方式',
        choices: [
            {
                name: '💻️自动更新',
                value: 1,
                description: '自动对所选版本号+1',
            },
            {
                name: '✒️ 手动输入',
                value: 0,
                description: '手动输入新的版本号',
            }
        ],
    });

    if (typeAnswer === 0) {
        const numberAnswer = await number({ message: '输入新的版本号' });
        currentVisionArry[visionAnswer] = numberAnswer;
    }
    if (typeAnswer === 1) {
        currentVisionArry[visionAnswer] = Number(currentVisionArry[visionAnswer]) + 1
    }

    packageJson["version"] = currentVisionArry.join('.')
    packageJson["last-release-time"] = momentBeijing().format("YYYY-MM-DD HH:mm:ss")
    packageJson["release-message"] = message

    const answer = await confirm({ message: `更新为 ${currentVisionArry.join('.')} ` });
    if (!answer) {
        return
    }

    releaseRecord.unshift({
        time: packageJson["last-release-time"],
        version: packageJson["version"],
        message
    })

    return new Promise((resolve, reject) => {
        fs.writeFile(rootPath + "/package.json", JSON.stringify(packageJson, null, "\t"), (err) => {
            if (err) {
                console.log(chalk.red(`package.json update error`));
            } else {
                fs.writeFile(rootPath + "/release-record.json", JSON.stringify(releaseRecord, null, "\t"), (err) => {
                    if (err) {
                        console.log(chalk.red(`release-record.json record error`));
                    } else {
                        resolve()
                        console.log(chalk.green(`file record success`));
                    }
                })
            }
        })
    })
}
