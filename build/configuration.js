/**
 *
 * @authors liwb (lwbhtml@163.com)
 * @date    2016/7/6 13:42
 * @version $ IIFE
 */

/* name module */
var g_config = {};
var config = {
    build: { // 生产
        api: 'https://fans.yjifs.com/vipstu/v1/',
        uploading_api: 'https://fans.yjifs.com/fileOpenapi/'
    },
    uat: { // 仿真
 		api: 'https://fansuat.yjifs.com/vipstu/v1/',
        uploading_api: 'https://fansuat.yjifs.com/fileOpenapi/'
    },
    test: { // 测试
 		api: 'https://davtest.yjifs.com/vipstu/v1/',
        uploading_api: 'https://davtest.yjifs.com/fileOpenapi/'
    },
    dev: { // 开发
        api: 'https://fulldev.yjifs.com/vipstu/v1/',
        uploading_api: 'https://fulldev.yjifs.com/fileOpenapi/',
    },
};

var __PRODUCTION__ = process.env.PRODUCTION;
var __DEV__ = process.env.DEV;
var __TEST__ = process.env.TEST;
var __UAT__ = process.env.UAT;

if (__PRODUCTION__) {
	g_config = config.build;
} else if(__UAT__) {
	g_config = config.uat;
}  else if(__TEST__) {
	g_config = config.test;
} else {
	g_config = config.dev;
}

module.exports = g_config;
