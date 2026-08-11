import handleIsUseLastReleaseMessage from '../handler/handleIsUseLastReleaseMessage.js';
import handleReleaseMessage from '../handler/handleReleaseMessage.js';
import handleVersionAndTime from '../handler/handleVersionAndTime.js';
import handleReleaseGit from '../handler/handleReleaseGit.js';
import handleReleaseMerge from '../handler/handleReleaseMerge.js';

async function main() {
  let message = "";
  const { result, lastReleaseMessage } = await handleIsUseLastReleaseMessage();

  if (result) {
    message = lastReleaseMessage
  } else {
    message = await handleReleaseMessage();
  }

  await handleVersionAndTime(message);
  await handleReleaseGit(message);
  await handleReleaseMerge();

}

main();
