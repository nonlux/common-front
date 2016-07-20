
export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  const config = require(`../${ENV.src.webpackConfig}`);
  gulp.task('webpack', 'Create browser bundle with webpack', () => {
    const { webpackStream, plumber } = plugins.gulp;
    return gulp.src(config.entry.main[0])
      .pipe(plumber({errorHandler: ENV.WATCH}))
      .pipe(webpackStream(config))
      .pipe(gulp.dest(ENV.BUILD_DIR));
  });

  gulp.task('watch:js', 'Rebbuild browser bundle', () => {
    gulp.watch('src/**/*.js', ['webpack', 'reload']);
  });
}
