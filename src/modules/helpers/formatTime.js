var func = require('../utils/func');

module.exports = function(timestamp) {

    return func.timeFormat(func.getUnixTimeStamp(timestamp));
}
