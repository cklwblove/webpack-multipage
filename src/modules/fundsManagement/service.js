var xhr = require('../utils/xhr');

var service = {
    //請求用戶列表信息
    getUserList: function(data, callback) {
        data.page_count = data.page_count || CT.PAGE_NUM;
        xhr.sendRequest('func_operate_get_fans', data, function(res){
            callback(res);
        });
    },
    //將指定用戶進行拉黑/取消操作
    onBlockUser: function(data,callback){
        xhr.sendRequest('func_operate_fans_block', data, function(res){
            callback(res);
        });
    },

    //将指定用户进行禁言/取消操作
    onGagUser: function(data,callback){
        xhr.sendRequest('func_operate_fans_gag', data, function(res){
            callback(res);
        });
    },

};

module.exports = service;
