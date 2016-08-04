export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;
  const { run } = plugins.gulp;
  
  gulp.task('assets', 'Copy static assets', function() {
    gulp.src('static/**/*')
    .pipe(gulp.dest(ENV.BUILD_DIR));
            });
            
  gulp.task(
      'watch:assets',
      'Watha for assets changed',
      () => {
        gulp.watch(ENV.src.assets, ['assets', 'reload']);
      });
}
