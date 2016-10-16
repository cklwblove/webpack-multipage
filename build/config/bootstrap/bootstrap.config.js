/**
 * 自定义bootstrap
 */


var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  styleLoader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss!less'),
  // styleLoader: 'file?name=bootstrap.min.css!raw!css?minimize&-autoprefixer!postcss!less',
  scripts: {
    'transition': true,
    'alert': false,
    'button': true,
    'carousel': false,
    'collapse': false,
    'dropdown': true,
    'modal': true,
    'tooltip': false,
    'popover': false,
    'scrollspy': false,
    'tab': true,
    'affix': false
  },
  styles: {
    "mixins": true,

    "normalize": true,
    "print": true,

    "scaffolding": true,
    "type": true,
    "code": true,
    "grid": true,
    "tables": true,
    "forms": true,
    "buttons": true,

    "component-animations": true,
    "glyphicons": false,
    "dropdowns": true,
    "button-groups": true,
    "input-groups": true,
    "navs": true,
    "navbar": true,
    "breadcrumbs": false,
    "pagination": true,
    "pager": true,
    "labels": true,
    "badges": true,
    "jumbotron": true,
    "thumbnails": true,
    "alerts": true,
    "progress-bars": true,
    "media": true,
    "list-group": true,
    "panels": true,
    "wells": true,
    "close": true,

    "modals": true,
    "tooltip": false,
    "popovers": false,
    "carousel": false,

    "utilities": true,
    "responsive-utilities": true
  }
};
