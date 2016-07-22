/*eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry:{
    main: [
      './src/index.js',
      //   'webpack/hot/dev-server',
      //'webpack-hot-middleware/client',
    ],
  },
  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: 'build/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/,
        loaders:['react-hot', 'babel'] },
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

/*eslint-enable */
