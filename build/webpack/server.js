var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./_base');

new WebpackDevServer(webpack(config), {
    stats: { colors: true },
    proxy: {
        "*": "http://localhost:7479" // <- backend
    },
    // publicPath: config.output.publicPath,
    quiet: true, // lets WebpackDashboard do its thing
  hot: true,
  historyApiFallback: true
}).listen(5000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:5000');
  });
