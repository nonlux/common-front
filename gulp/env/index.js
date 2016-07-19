const defaults = require('./defaults.json');
import { argv } from 'yargs';

const ENV = {
  ...defaults,
  ...process.env,
  args: { ...argv },
  src: {
    js: {
      all: ['**/*.js', '!node_modules/**', '!build/**'],
      gulp: ['gulpfile.js', 'gulp/**/*.js'],
      src: ['src/**/*.js']
    },
    jade: 'jade/**.jade',
  },
  set(key, value) {
    this[key] = value;
  }
};

export default ENV;
