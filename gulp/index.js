import gulp from './gulp';
import runSequence from 'run-sequence';

gulp.deps([
  'eslint',
  'webpack',
  'jade',
  'browserSync',
  'less', 'assets',
  'karma']);


gulp.task('default', ['watch']);

gulp.task('build', 'Build project',(done) => {
  runSequence('clean', ['assets', 'jade', 'webpack', 'less'], done);
});

gulp.task('set:watch', 'SET WATCH ENV', (done) => {
  gulp.ENV.set('WATCH', true);
  done();
});

gulp.task('watch', 'Watch for project changes', (done) => {
  runSequence(
    'set:watch', 'build', 'devServer',
    [ 'watch:jade', 'watch:less', 'watch:assets','watch:js']
  );
});
