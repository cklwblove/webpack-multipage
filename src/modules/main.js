/**
 * 初始化一些变量
 */
require('../assets/less/app.less');

var config = require('./config');
var lang = require('./lang/zh-cn');

var main = {
    initialize: function() {
        window.i18n = lang;
        window.CT = config;
    }
};

main.initialize();
