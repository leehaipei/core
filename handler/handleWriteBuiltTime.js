import fs from 'fs-extra';
import appRoot from "app-root-path";

const rootPath = appRoot.path;

export default function handleWriteBuiltTime(buildtime) {
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
