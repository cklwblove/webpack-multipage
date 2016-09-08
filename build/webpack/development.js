var utils = require('./utils');
var configuration = require('../configuration');
var webpack = require('webpack');
var webpackConfig = require('./_base');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var projectPath = process.cwd();

webpackConfig.plugins.push(
    new CleanWebpackPlugin(['./dev'], {
        root: projectPath,
        verbose: true,
        dry: false
    }),
    // 如果代码中有需要插入静态的全局变量，或者需要根据环境变量来区分的分支，可以使用 DefinePlugin 插件来插入静态环境变量，插入的变量在编译时将被处理:
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.DEV || 'true')),
        G_CONFIG: '' + JSON.stringify(configuration)
    }),

    new ExtractTextPlugin('[name].css'),

    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['./dev'] }
    })
);

webpackConfig.devtool = 'eval-source-map';

module.exports = webpackConfig;
