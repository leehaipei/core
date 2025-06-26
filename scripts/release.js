import handleReleaseMessage from '../handler/handleReleaseMessage.js';
import handleVersionAndTime from '../handler/handleVersionAndTime.js';
import handleReleaseGit from '../handler/handleReleaseGit.js';

async function main() {

  const message = await handleReleaseMessage();
  await handleVersionAndTime(message);
  await handleReleaseGit(message);

}

main();
