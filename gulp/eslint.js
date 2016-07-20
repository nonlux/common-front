export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  function eslintTask(src) {
    const { eslint, plumber } = plugins.gulp;
    return gulp.src(src)
      .pipe(plumber({errorHandler: ENV.WATCH}))
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
