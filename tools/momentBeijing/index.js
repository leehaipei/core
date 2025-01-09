const moment = require('moment');
const momentBeijing = () => moment.utc().utcOffset(8)
module.exports = momentBeijing
