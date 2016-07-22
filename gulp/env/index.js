import defaults from './defaults.json'; //eslint-disable-line import/no-named-as-default
import src from './src';
import { argv } from 'yargs';
import webpackConfig from './webpack.config.js';

const ENV = {
  ...defaults,
  ...process.env,
  args: { ...argv },
  src,
  set(key, value) {
    this[key] = value;
  },
};
ENV.webpackConfig = webpackConfig(ENV);

export default ENV;
