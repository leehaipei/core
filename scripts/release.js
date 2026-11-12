import handleIsAddLastCommit from '../handler/handleIsAddLastCommit.js';
import handleReleaseMessage from '../handler/handleReleaseMessage.js';
import handleVersionAndTime from '../handler/handleVersionAndTime.js';
import handleReleaseGit from '../handler/handleReleaseGit.js';
import handleAddCommit from '../handler/handleAddCommit.js';
import handleReleaseMerge from '../handler/handleReleaseMerge.js';

async function main() {

  const { isAddLastCommit, lastCommitMessage } = await handleIsAddLastCommit();

  if (!isAddLastCommit) {
    const message = await handleReleaseMessage();
    await handleVersionAndTime(message);
    await handleReleaseGit(message);
  } else {
    await handleVersionAndTime(lastCommitMessage);
    await handleAddCommit(lastCommitMessage);
  }

  await handleReleaseMerge();

}

main();
