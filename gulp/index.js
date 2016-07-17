import gulp from 'gulp';
const plugins = require('gulp-load-plugins')();

gulp.task('default', ['js'], () => {
  console.log('this is default gulp task');
});

gulp.task('js', ['js:lint']);

gulp.task('js:lint', () => {
  const { eslint } = plugins;
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
