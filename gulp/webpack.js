
export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  gulp.task('webpack', 'Create browser bundle with webpack', () => {
    const { webpackStream, plumber } = plugins.gulp;
    if (!ENV.WATCH || !ENV.USE_WEBPACK_MIDDLEWARE) {
      gulp.src(ENV.webpackConfig.entry.main[0])
        .pipe(plumber({ errorHandler: ENV.WATCH }))
        .pipe(webpackStream(ENV.webpackConfig))
        .pipe(gulp.dest(ENV.BUILD_DIR));
    }
  });

  gulp.task('watch:js', 'Rebbuild browser bundle', () => {
    gulp.watch('src/**/*.js', ['webpack', 'reload']);
  });
}
