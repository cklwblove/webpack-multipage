/**
 * 分页组件
 */
require('./mricode.pagination.less');
require('pagination');

var func = require('../utils/func');

var pagination = {
    init: function (query) {
        if(query) {
            pagination.loadPaging(query.selector, query.totalNum, query.callback);
        }
    },
    loadPaging: function(selector, totalNum, callback) {
        selector.pagination({
            total: totalNum,
            firstBtnText: '首页',
            lastBtnText: '尾页',
            prevBtnText: '上一页',
            nextBtnText: '下一页',
            showInfo: true,
            infoFormat: '{start} ~ {end}条，共{total}条'
        }).on("pageClicked", function (event, data) { //分页按钮点击事件
            ($.isFunction(callback)) && callback(++data.pageIndex);
        }).on('jumpClicked', function (event, pageIndex) {  //跳转按钮点击事件
            ($.isFunction(callback)) && callback(++data.pageIndex);
        }).on('pageSizeChanged', function (event, pageSize) {  //页面大小切换事件
            ($.isFunction(callback)) && callback(++data.pageSize);
        });
    },
    render: function(selector, totalNum) {
        selector.pagination('render', [totalNum]);
    }

};

module.exports = pagination;
