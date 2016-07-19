import gulp from './gulp';

require('./eslint')(gulp);
require('./webpack')(gulp);
require('./jade')(gulp);
require('./browserSync')(gulp);
require('./less')(gulp);

gulp.task('default', ['watch']);
gulp.task('build', 'Build project', ['clean', 'jade', 'webpack', 'less']);
gulp.task('watch', 'Watch for project changes',
    ['build',
    'devServer',
    'watch:jade',
    'watch:less',
    'watch:js']);

