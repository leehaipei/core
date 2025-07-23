import fs from 'fs-extra';

export default function handleWriteBuiltTime(buildtime, rootPath) {
  return new Promise(async (resolve, reject) => {
    fs.writeFile(rootPath + "/buildtime.json", JSON.stringify({ use: buildtime }, null, "\t"), (err) => {
      if (err) {
        console.log(chalk.red(`buildtime.json update error`));
        reject()
      } else {
        resolve()
      }
    })
  })
}
