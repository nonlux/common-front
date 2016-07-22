const defaults = require('./defaults.json');
import src from './src';
import { argv } from 'yargs';

const ENV = {
  ...defaults,
  ...process.env,
  args: { ...argv },
  src,
  set(key, value) {
    this[key] = value;
  }
};

export default ENV;
