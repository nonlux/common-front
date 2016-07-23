export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;
  const { run } = plugins.gulp;

  gulp.task(
      'assets',
      'Copy static assets',
      () => run(`cp static/* ${ENV.BUILD_DIR} -fr`).exec());

  gulp.task(
      'watch:assets',
      'Watha for assets changed',
      () => {
        gulp.watch(ENV.src.assets, ['assets', 'reload']);
      });
}
