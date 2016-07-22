export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  function eslintTask(src) {
    const { eslint, ifs } = plugins.gulp;
    return gulp.src(src)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(ifs(!ENV.WATCH, eslint.failAfterError()));
  }

  gulp.generateTargetTask(
      ENV.src.js,
      'eslint',
      eslintTask,
      'Linting javascript');

  gulp.task(
      'watch:eslint',
      'Watha for js canges and lint',
      ['set:watch', 'eslint:all'],
      () => {
        gulp.watch(ENV.src.js.all, ['eslint:all']);
      });
}
