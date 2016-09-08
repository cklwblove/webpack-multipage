/**
 * 通用函数，依赖于模块，不同于 ./utils/func.js
 */
require('toastr/toastr.less');

var toastr = require('toastr');

var common = {
    /**
     * @function openToastr 打开一个不带按钮的弹出框
     * @param tips - 提示信息内容
     * @param isTrue - 显示提示框的样式，true-正确提示框，false-错误提示框
     */
    openToastr: function(tips, isTrue) {
        if (typeof toastr !== 'undefined') {
            toastr.options = {
                "positionClass": "toast-bottom-right", //弹出窗的位置
                "timeOut": 1000 //展现时间
            };

            if (isTrue) {
                toastr.success(tips);
            } else {
                toastr.error(tips);
            }
        }
    }
};

module.exports = common;
