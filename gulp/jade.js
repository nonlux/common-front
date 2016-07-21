export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  gulp.task('jade', 'Build jade templates to html', () => {
    const { jade, changed, plumber } = plugins.gulp;
    return gulp.src(ENV.src.jade)
      .pipe(plumber({ errorHandler: ENV.WATCH }))
      .pipe(changed(ENV.BUILD_DIR, { extension: '*.html' }))
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest(ENV.BUILD_DIR));
  });

  gulp.task('watch:jade', 'Watch for jade templates changes', () => {
    gulp.watch(ENV.src.jade, ['jade', 'reload']);
  });
}
