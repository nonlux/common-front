export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;
  const { rename } = plugins.gulp;

  gulp.task(
      'assets',
      'Copy static assets',
      () => gulp.src(ENV.src.assets)
           .pipe(rename({ dirname: '' }))
           .pipe(gulp.dest(ENV.BUILD_DIR)));

  gulp.task(
      'watch:assets',
      'Watha for assets changed',
      () => {
        gulp.watch(ENV.src.assets, ['assets', 'reload']);
      });
}
