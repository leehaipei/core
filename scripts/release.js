'use strict';
const args = process.argv.slice(2)
const message = args[0]

const handleVersionAndTime = require('./tools/handleVersionAndTime');
const handleReleaseGit = require('./tools/handleReleaseGit');


handleVersionAndTime(message)
  .then((res) => handleReleaseGit(message))
  .then((res) => {
  })
  .catch(err => {
    console.log("release.js", err);
  });


// npm run release xxxxxx