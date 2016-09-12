var webpack = require('webpack');
var webpackConfig = require('./_base');
var configuration = require('../configuration');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var projectPath = process.cwd();

webpackConfig.plugins.push(
    new CleanWebpackPlugin(['./dist'], {
        root: projectPath,
        verbose: true,
        dry: false
    }),

    // 如果代码中有需要插入静态的全局变量，或者需要根据环境变量来区分的分支，可以使用 DefinePlugin 插件来插入静态环境变量，插入的变量在编译时将被处理:
    new webpack.DefinePlugin({
        __PRODUCTION__: JSON.stringify(JSON.parse(process.env.PRODUCTION || 'false')),
        g_config: '' + JSON.stringify(configuration)
    }),

    new ExtractTextPlugin('[name].[hash].min.css', {
      allChunks: true
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
        }
    })

);

webpackConfig.output.path = './dist';
webpackConfig.output.filename = '[name].[hash].min.js';

module.exports = webpackConfig;
