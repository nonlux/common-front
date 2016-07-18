import defaults from '../env/defaults.json';
const ENV  = {
  ...defaults,
  ...process.env
};

import gulp from 'gulp';

import { argv } from 'yargs';
const args = {
  ...argv,
};

const plugins = require('gulp-load-plugins')({});
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

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
  const config = require('../wepack.config.js');
  return gulp.src('src/index.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest(ENV.BUILD_DIR));
});

const jadeSrc= 'jade/**.jade';

gulp.task('jade', () => {
  const { jade, changed } = plugins;
  return gulp.src(jadeSrc)
    .pipe(changed(ENV.BUILD_DIR, { extension: '*.html' }))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(ENV.BUILD_DIR));

});


import browserSync from 'browser-sync';
import webpackDevMiddleware  from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
gulp.task('devServer', () => {
  const config = require('../wepack.config.js');
  const bundler = webpack(config);
  browserSync({
    server: {
      baseDir: ENV.BUILD_DIR,
      }
      /*
      middleware: [
        webpackDevMiddleware(bundler, {
          stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      'app/css/*.css',
      'app/*.html'
    ]
    */
  });
});
gulp.task('reload', browserSync.reload);

gulp.task('build',['jade', 'webpack']);

gulp.task('watch', ['build', 'devServer'], () => {
  gulp.watch(jadeSrc, ['jade', 'reload']);

  gulp.watch('src/**.js', ['webpack', 'reload']);

})
