export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  function eslintTask(src) {
    const { eslint } = plugins.gulp;
    return gulp.src(src)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  }

  gulp.generateTargetTask(
      ENV.src.js,
      'eslint',
      eslintTask,
      'Linting javascript');
}
