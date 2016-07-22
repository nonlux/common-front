import path from 'path';
import webpack from 'webpack';
import fs from 'fs';

function babelLoader(NODE_ENV) {
  const babelrc = fs.readFileSync('./.babelrc');
  let babelrcObject = {};

  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
  }

  const babelrcEnvObject = babelrcObject.env[NODE_ENV];
  let babelLoaderQuery = { ...babelrcObject };
  let combinedPlugins = babelrcObject.plugins || [];
  if (babelrcEnvObject) {
    combinedPlugins = combinedPlugins.concat(babelrcEnvObject.plugins);
    babelLoaderQuery = {
      ...babelLoaderQuery,
      ...babelrcEnvObject,
      combinedPlugins,
    };
  }

  return ['babel?', JSON.stringify(babelLoaderQuery)].join('');
}

export default function config(ENV) {
  const { NODE_ENV } = ENV;

  const jsLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: []
  };

  let devtool = 'inline-source-map';

  const mainEntry = ['./src/index.js'];

  const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: NODE_ENV === 'development',
      __DEVTOOLS__: NODE_ENV === 'development'
    }),
  ];

  if (NODE_ENV === 'development') {
    jsLoader.loaders.push('react-hot');
    devtool = 'eval';
    mainEntry.push('webpack-hot-middleware/client');
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  jsLoader.loaders.push(babelLoader(NODE_ENV));

  const config = {
    devtool,
    cache: true,
    context: path.resolve(__dirname, '../../'),
    entry: { main: mainEntry },
    output: {
      path: path.join(__dirname, 'build/'),
      publicPath: 'build/',
      filename: '[name].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        jsLoader,
        { test: /\.json$/, loader: 'json-loader' },
      ]
    },
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx']
    },
    plugins
  };

  return config;
}
