'use strict';

const handleVersionAndTime = require('./tools/handleVersionAndTime');

handleVersionAndTime().then((res) => {

}).catch(err => {
  console.log("release.js", err);
});
