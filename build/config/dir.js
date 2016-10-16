var path = require('path');
var dir = {};

//  构建配置
dir.staticRootDir = path.resolve(__dirname, '../../'); // 项目根目录
dir.configBootstrapDir =  path.resolve(__dirname, './bootstrap');
dir.nodemodulesDir = path.resolve(__dirname, '../../node_modules');

// 项目相关目录
dir.srcDir = path.resolve(__dirname, '../../src');
dir.assetsDir = path.resolve(dir.srcDir, 'assets');
dir.assetsDllDir = path.resolve(dir.assetsDir, 'dll');
dir.assetsJsDir = path.resolve(dir.assetsDir, 'js');
dir.modulesDir = path.resolve(dir.srcDir, 'modules');

module.exports = dir;
