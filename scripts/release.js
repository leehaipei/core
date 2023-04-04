'use strict';
const args = process.argv.slice(2)
const message = args[0]
const command = args[1]

const handleVersionAndTime = require('./tools/handleVersionAndTime');
const handleReleaseGit = require('./tools/handleReleaseGit');


handleVersionAndTime(message)
  .then((res) => handleReleaseGit(command, message))
  .then((res) => {
  })
  .catch(err => {
    console.log("release.js", err);
  });


  // npm run release xxxxxx push
  // push可选,不选不自动处理