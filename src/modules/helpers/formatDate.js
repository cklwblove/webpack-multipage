var func = require('../utils/func');

module.exports = function(context, options) {

    return func.formatDate(func.getUnixTimeStamp(context), options.hash.pattern);
}
