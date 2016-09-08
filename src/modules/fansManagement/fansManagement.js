require('./fansManagement.less');
require('../main');
require('modaldialog');

var func = require('../utils/func'),
    common = require('../common/common'),
    service = require('./service'),
    daterangepicker = require('daterangepicker'),
    pagination = require('../pagination/pagination'),
    balckUserListTpl = require('./balckUserList.handlebars'),
    userListTpl = require('./userList.handlebars');

var fansManagement = {
    init: function() {
        this.getFansList();
        this.getBlackUsersList();
        this.bindEvent();
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

            ($.isFunction(callback) && callback(res.count));
        });
    },

    gagUser: function() {
       var that = $(this);
       var customer_id = that.data('customer-id');
       var tenant_id = that.data('tenant-id');

       if(that.data('gag-flag') == "1"){
           fansManagement.gag(that, customer_id, tenant_id, '0');
       }else {
           fansManagement.gag(that, customer_id, tenant_id, '1');
       }
    },

    gag: function(that, customer_id, tenant_id, gag_type) {
        $.modaldialog.confirm({message: '确认要执行此操作吗？'}).on(function(e) {
            // 取消
            if (!e) {
                return;
            }
            // 确认
            service.onGagUser({
                customer_id : customer_id,
                tenant_id : tenant_id,
                gag_type : gag_type
            }, function(res) {
                func.callback(res, function() {
                    if(gag_type == '1'){
                       common.openToastr(i18n.fans.txt_cancel_gag_success, true);
                       that.attr('title', '禁言').addClass('blue').removeClass('red').html('&#xe60a;').data('gag-flag', '1');
                    } else if(gag_type == '0'){
                       common.openToastr(i18n.fans.txt_gag_success, true);
                       that.attr('title', '取消禁言').addClass('red').removeClass('blue').html('&#xe60b;').data('gag-flag', '0');
                    }
                }, null, true);

            })
        })

    },

    bindEvent: function() {
        var bindings = [{
            element: '.fans-list',
            selector: '.js-gagList',
            event: 'click',
            handler: fansManagement.gagUser
        }];

        func.bindEvents(bindings);
    }
};

fansManagement.init();
