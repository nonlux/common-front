import gulp from './gulp';

require('./eslint')(gulp);
require('./webpack')(gulp);
require('./jade')(gulp);
require('./browserSync')(gulp);
require('./less')(gulp);

gulp.task('default', ['watch']);
gulp.task('build', 'Build project', ['clean', 'jade', 'webpack', 'less']);
gulp.task('set:watch', 'SET WATCH ENV', () => {
  gulp.ENV.set('WATCH', true);
});
gulp.task('watch', 'Watch for project changes', [
  'set:watch',
  'build',
  'devServer',
  'watch:jade',
  'watch:less',
  'watch:eslint']);

