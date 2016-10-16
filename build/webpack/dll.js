// 管理第三方js依赖，因为第三方js一般不会有什么变化

var path = require('path');
var dir = require('../config/dir');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var vendors = [
    'jquery',
    '!!bootstrap-webpack!bootstrapConfig',
    'toastr',
    'pagination',
    'modaldialog',
    'datetimepicker'
];

module.exports = {
    entry: {
        'vendor': vendors
    },
    output: {
        path: dir.assetsDllDir,
        filename: '[name].dll.js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            /**
             * path 定义 manifest 文件生成的位置
             */
            path: path.join(dir.staticRootDir, "manifest.json"),
            /**
             * name 是dll暴露的对象名，要跟 output.library 保持一致；
             * dll bundle 输出到那个全局变量上
             */
            name: '[name]_library',
            context: __dirname //是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。
        }),
        new webpack.ProvidePlugin({
            $: 'jquery', //加载jq
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
            output: {
                comments: false,
            }
        }),
        new ExtractTextPlugin('[name].dll.css'), // 打包css/less的时候会用到ExtractTextPlugin
    ],
    resolve: require('../config/resolve')
};
