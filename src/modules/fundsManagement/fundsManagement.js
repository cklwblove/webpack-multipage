require('./fundsManagement.less');
require('../main');

var func = require('../utils/func'),
    service = require('./service'),
    daterangepicker = require('daterangepicker'),
    pagination = require('../pagination/pagination'),
    balckUserListTpl = require('./balckUserList.handlebars'),
    userListTpl = require('./userList.handlebars');

var fundsManagement = {
    init: function() {
        $(".fans-list").show();
        $(".black-fans-list").hide();
        this.bindEvent();
        this.getFansList();
        this.getBlackUsersList();
    },

    onBlackUserList: function() {
        $(this).addClass("active");
        $(".user-list").removeClass("active");
        $(".fans-list").hide();
        $(".black-fans-list").show();
    },

    getFansList: function() {
        var that = this;

        that.getUserList({
            type: '1'
        }, function(totalNum) {
            pagination.init({
                selector: $('.fans-list .m-pagination'),
                totalNum: totalNum,
                callback: function(pageNo) {
                    that.getUserList({
                        type: '1',
                        page_no: pageNo
                    });
                }
            });
        });
    },

    getBlackUsersList: function() {
        var that = this;

        that.getUserList({
            type: '0'
        }, function(totalNum) {
            pagination.init({
                selector: $('.black-fans-list .m-pagination'),
                totalNum: totalNum,
                callback: function(pageNo) {
                    that.getUserList({
                        type: '0',
                        page_no: pageNo
                    });
                }
            });
        });
    },

    getUserList: function(params, callback) {
        var output = '';
        service.getUserList({
            branch_no : "3",
            fans_type : params.type, // 0黑名单
            page_no: params.page_no || 1
        }, function(res) {
            var list = res.data_list;

            if(params.type == '1') {
                output = userListTpl(list);
                $('.fans-list tbody').html(output ? output : i18n.global.no_data);
            } else {
                output = balckUserListTpl(list);
                $('.black-fans-list tbody').html(output ? output : i18n.global.no_data);
            }
            (func.isFunction(callback) && callback(res.count));
        });

    },
    bindEvent: function() {
        var bindings = [{
            element: '.page-fans-management',
            selector: '.black-user-list',
            event: 'click',
            handler: fundsManagement.onBlackUserList
        }];

        func.bindEvents(bindings);
    }
};

fundsManagement.init();
