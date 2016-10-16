require('./loading.less');

var loading = {
    init: function() {
        loading.showIndicator();
        setTimeout(function() {
            loading.hideIndicator();
        }, 1000);
    },
    showIndicator: function() {
        var html = '<div class="preloader-indicator-overlay"></div>' +
                   '<div class="loader ball-pulse">' +
                      '<div></div>' +
                      '<div></div>' +
                      '<div></div>' +
                   '</div>';
        $('body').append(html);
    },
    hideIndicator: function () {
        $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
    }

};

module.exports = loading;
