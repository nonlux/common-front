const config = require('../wepack.config.js');

export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  gulp.task('webpack', 'Create browser bundle with webpack', () => {
    const { webpackStream, plumber } = plugins.gulp;
    if (!ENV.WATCH) {
      gulp.src(config.entry[0])
        .pipe(plumber({ errorHandler: ENV.WATCH }))
        .pipe(webpackStream(config))
        .pipe(gulp.dest(ENV.BUILD_DIR));
    }
  });

  gulp.task('watch:js', 'Rebbuild browser bundle', () => {
    gulp.watch('src/**/*.js', ['webpack', 'reload']);
  });
}
