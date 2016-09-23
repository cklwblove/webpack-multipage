var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

var __PRODUCTION__ = process.env.PRODUCTION;
var lessLoader;

if (__PRODUCTION__) {
    lessLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
} else {
    lessLoader = 'style!css!less';
}

var moduleName = [];
var basePath = './src/modules/';
var nodemodulesPath = path.resolve(__dirname, '../../node_modules');
var srcPath = path.resolve(__dirname, '../../src');
var srcVenderPath = path.resolve(__dirname, '../../src/assets/js');
var srcModulesPath = path.resolve(__dirname, '../../src/modules');

var pages = getEntry('src/**/*.html', 'src/');
var entries = getEntry('src/modules/**/*.js', 'src/modules/');
var chunks = Object.keys(entries);

entries.vendor = ['jquery', 'bootstrap'];

var config = {
    entry: entries,
    output: {
        path: './dev',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js' //chunk生成的配置
    },
    module: {
        loaders: [{
                test: /\.less$/,
                loader: lessLoader
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?postcss-loader'
            }, {
                test: /\.handlebars$/,
                loader: 'handlebars-loader?helperDirs[]=' + srcModulesPath + '/helpers' // 路径问题 需要依赖handlebars
            }, {
                test: /\.html$/,
                loader: 'html-loader' //避免压缩html,https://github.com/webpack/html-loader/issues/50
            }, {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: 'url?limit=8192&name=assets/[hash:8].[ext]'
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url?limit=8192&name=assets/[hash:8].[ext]'
            }
        ]
    },
    postcss: [autoprefixer()],
    resolve: {
        alias: { // 定义别名
            'pagination': srcVenderPath + '/mricode.pagination',
            'modaldialog': srcVenderPath + '/jquery.modaldialog',
            'simpledateformat': srcVenderPath + '/jquery.simpledateformat'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery', //加载jq
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),

        new CopyWebpackPlugin([{
            from: './src/api',
            to: 'api'
        }, {
            from: './src/pages',
            to: 'pages'
        }, ])
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
