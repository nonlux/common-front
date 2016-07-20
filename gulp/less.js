export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  gulp.task('less', 'Build less to css', () => {
    const {
      lessEngine,
      initial,
      cssnext,
    } = plugins.postcss;

    const {
      postcss,
      rename,
      plumber
    } = plugins.gulp;

    const processors = [
      lessEngine(),
      initial(),
      cssnext(),
    ];
    gulp.src('less/index.less')
      .pipe(plumber({errorHandler: ENV.WATCH}))
      .pipe(postcss(processors, { parser: lessEngine.parser }))
      .pipe(rename((path) => { path.extname = '.css'; })) //eslint-disable-line no-param-reassign
      .pipe(gulp.dest(ENV.BUILD_DIR));
  });

  gulp.task('watch:less', 'Watch for less changes', () => {
    gulp.watch('src/**/*.less', ['less', 'reload']);
  });
}
