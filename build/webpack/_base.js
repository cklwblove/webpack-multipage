var path = require('path');
var glob = require('glob');
var dir = require('../config/dir');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

var moduleName = [];
var pages = getEntry('src/**/*.html', 'src/');
var entries = getEntry('src/modules/**/*.js', 'src/modules/');
var chunks = Object.keys(entries);
// console.log('entries' + JSON.stringify(entries));


var config = {
    entry: entries,
    output: {
        path: './dev',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js' //chunk生成的配置
    },
    module: require('../config/module'),
    postcss: [autoprefixer()],
    // eslint: {
    //     configFile: path.resolve(dir.staticRootDir, './.eslintrc'), // 指定eslint的配置文件在哪里
    //     failOnWarning: true, // eslint报warning了就终止webpack编译
    //     failOnError: true, // eslint报error了就终止webpack编译
    //     cache: true, // 开启eslint的cache，cache存在node_modules/.cache目录里
    // },
    resolve: require('../config/resolve'),
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(dir.staticRootDir + '/manifest.json')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery', //加载jq
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 将公共模块提取，生成名为`common`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),

        new CopyWebpackPlugin([{
            from: './src/api',
            to: 'api'
        }, {
            from: './src/pages',
            to: 'pages'
        }, {
            from: './src/assets/dll',
            to: 'assets/dll'
        }])
    ],
    //添加了此项，则表明从外部引入，内部不会打包合并进去
    // externals: {
    //     jquery: 'window.jQuery',
    //
    // }

};

moduleName.forEach(function(pathname) {
    var conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: './src/' + pathname + '.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        minify: false,
        hash: true
    };
    if (pathname in config.entry) {
        conf.chunks = ['vendor', pathname];
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        if (extname === '.html') {
            moduleName.push(basename);
        } else if (extname === '.js' && moduleName.indexOf(basename) === -1) {
            continue;
        }
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[basename] = ['./' + entry];
    }

    return entries;
}
