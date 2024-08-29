'use strict';
const args = process.argv.slice(2)
const message = args[0]

const handleVersionAndTime = require('./tools/handleVersionAndTime.cjs');
const handleReleaseGit = require('./tools/handleReleaseGit.cjs');


handleVersionAndTime(message)
  .then((res) => handleReleaseGit(message))
  .then((res) => {
  })
  .catch(err => {
    console.log("release.cjs", err);
  });


// npm run release xxxxxx