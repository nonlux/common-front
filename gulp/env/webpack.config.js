import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import HappyPack from 'happypack';

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
      plugins: combinedPlugins,
      cacheDirectory: '.cache/babel',
    };
  }

  return ['babel', JSON.stringify(babelLoaderQuery)].join('?');
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
  const insDevelopment = NODE_ENV === 'development';

  const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: insDevelopment,
    }),
  ];

  jsLoader.loaders.push(babelLoader(NODE_ENV));

  if (NODE_ENV === 'development') {
    jsLoader.loaders.unshift('react-hot');
    devtool = 'eval';
    mainEntry.push('webpack-hot-middleware/client');
    plugins.push(new webpack.HotModuleReplacementPlugin());
    if (0) {

    plugins.push(new HappyPack({
      loaders: jsLoader.loaders,
      tempDir: '.cache/happypack',
      cachePath: '.cache/happypack/cache--[id].json',
      threads: 4,
    }));
    jsLoader.loaders = ['happypack/loader'];
    }


  }


  const BASE_DIR =  path.resolve(__dirname, '../../');

  const config = {
    devtool,
    cache: insDevelopment,
    context: BASE_DIR,
    entry: { main: mainEntry,
    },
    output: {
      path: path.resolve(BASE_DIR, 'build/'),
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
