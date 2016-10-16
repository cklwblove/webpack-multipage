var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dir = require('../config/dir');

var __PRODUCTION__ = process.env.PRODUCTION;
var lessLoader;

if (__PRODUCTION__) {
    lessLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
} else {
    lessLoader = 'style!css!less';
}

module.exports = {
  // preLoaders: [{
  //   test: /\.js$/,
  //   loader: 'eslint',
  //   include: dir.srcDir,
  //   exclude: [/bootstrap/],
  // }],

  loaders: [
    {
      test: require.resolve('jquery'),
      loader: 'expose?$!expose?jQuery',
    },
    {
      test: /\.css$/,
      exclude: /node_modules|bootstrap/,
      loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
    },
    {
      test: /\.less$/,
      loader: lessLoader,
    },
    {
      test: /\.hbs/,
      include: dir.srcDir,
      loader: 'handlebars-loader?helperDirs[]=' + dir.modulesDir + '/helpers' // 路径问题 需要依赖handlebars
    },
    // {
    //   test: /\.js$/,
    //   include: dir.srcDir,
    //   loader: 'babel-loader?presets[]=es2015-loose&cacheDirectory&plugins[]=transform-runtime',
    // },
    {
      test: /\.html$/,
      include: dir.srcDir,
      loader: 'html-loader' //避免压缩html,https://github.com/webpack/html-loader/issues/50
    },
    {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      include: dir.srcDir,
      loader: 'url?limit=8192&name=assets/[hash:8].[ext]'
    },
    {
      // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      include: dir.srcDir,
      loader: 'url?limit=8192&name=assets/[hash:8].[ext]'
    },
  ]
};
