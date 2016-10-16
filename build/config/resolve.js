var path = require('path');
var dir = require('./dir.js');

module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {

    // components
   'pagination': path.resolve(dir.assetsJsDir, 'mricode.pagination'),
   'modaldialog': path.resolve(dir.assetsJsDir, 'jquery.modaldialog'),
   'simpledateformat': path.resolve(dir.assetsJsDir, 'jquery.simpledateformat'),
   'datetimepicker': path.resolve(dir.assetsJsDir, 'bootstrap-datetimepicker'),
   'datetimepicker_CN': path.resolve(dir.assetsJsDir, 'bootstrap-datetimepicker.zh-CN'),

    /* config */
    'bootstrapConfig': path.resolve(dir.configBootstrapDir, 'bootstrap.config')
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extentions: ['', 'js'],
};
