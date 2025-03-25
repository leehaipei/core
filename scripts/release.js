import chalk from 'chalk';

import handleVersionAndTime from '../handler/handleVersionAndTime.js';
import handleReleaseGit from '../handler/handleReleaseGit.js';


const args = process.argv.slice(2);
const message = args[0];

async function main() {
  if (!message) {
    console.log(chalk.red(`release message is not filled in.`));
    return
  }

  await handleVersionAndTime(message);
  await handleReleaseGit(message);

}

main();
