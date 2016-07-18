import gulp from 'gulp';

import { argv } from 'yargs';
const args = {
  ...argv,
};

const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'webpack-stream'],
  rename: {
    'webpack-stream': 'webpack',
  }
});

let CURRENT_TASK = 'default';
const __runTask = gulp.Gulp.prototype._runTask; //eslint-disable-line no-underscore-dangle
gulp.Gulp.prototype._runTask = (task) => { //eslint-disable-line no-underscore-dangle
  CURRENT_TASK = task.name.split(':')[0];
  if (!args[`skip-${CURRENT_TASK}`]) {
    return __runTask.apply(gulp, [task]);
  }
  return null;
};

gulp.task('default', () => {
  console.log('this is default gulp task');
});

function eslintTask(src) {
  const { eslint } = plugins;
  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

gulp.task('gulp', ['eslint:gulp']);

(() => {
  const src = {
    all: ['**/*.js', '!node_modules/**', '!build/**'],
    gulp: ['gulpfile.js', 'gulp/**/*.js'],
    src: ['src/**/*.js']
  };
  Object.entries(src).forEach(data => {
    gulp.task(`eslint:${data[0]}`, () => eslintTask(data[1]));
  });
})();

gulp.task('eslint', ['eslint:all']);

gulp.task('webpack', () => {
  const { webpack } = plugins;
  return gulp.src('src/index.js')
    .pipe(webpack())
    .pipe(gulp.dest('build/'));
});
