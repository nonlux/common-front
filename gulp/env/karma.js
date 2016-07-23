import karmaWebpack from 'karma-webpack';
import karmaMocha from 'karma-mocha';
import karmaMochaReporter from 'karma-mocha-reporter';
import karmaPhantomjsLauncher from 'karma-phantomjs-launcher';
import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaSourcemapLoader from 'karma-sourcemap-loader';
import webpackConfig from './webpack.config.js';

export default function karmaConfig(ENV) {
  const nextWebpackConfig = {
    ...webpackConfig({
      ...ENV,
      NODE_ENV: 'test'
    }),
    externals: {
      jsdom: 'window',
      cheerio: 'window',
      'react/lib/ReactContext': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/addons': true
    },
  };
  delete nextWebpackConfig.entry;
  const config = {
    browsers: ['PhantomJS'],
    singleRun: ENV.CI,
    autoWatch: true,
    frameworks: ['mocha'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'static/*.js',
      'test.js',
    ],
    preprocessors: {
      'test.js': ['webpack', 'sourcemap']
    },
    client: {
      captureConsole: true,
    },
    reporters: ['mocha'],
    plugins: [
      karmaWebpack,
      karmaMocha,
      karmaMochaReporter,
      karmaPhantomjsLauncher,
      karmaChromeLauncher,
      karmaSourcemapLoader
    ],
    webpack: nextWebpackConfig,

  };

  return config;
}
