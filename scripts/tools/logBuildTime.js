const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');



module.exports = function logBuildTime() {
    return new Promise((resolve, reject) => {

        const _buildtime = fs.readFileSync('./buildtime.json')
        const buildtime = JSON.parse(_buildtime)

        buildtime.end = new Date().getTime();
        buildtime.use = `${(buildtime.end - buildtime.start) / 1000}s`;

        fs.writeFile("./buildtime.json", JSON.stringify(buildtime, null, "\t"), (err) => {
            if (err) {
                console.log(chalk.red(`buildtime.json update error`));
                reject()
            } else {
                console.log(
                    chalk.green(`✓`), `built in ${(buildtime.end - buildtime.start) / 1000}s`
                );
                resolve()
            }
        })
    })
}