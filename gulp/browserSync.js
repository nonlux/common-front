import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  const config = require(`../${ENV.src.webpackConfig}`);

  gulp.task('devServer', 'BrowserSync server with webpack middleware', () => {
    const bundler = plugins.tools.webpack(config);
    browserSync({
      server: {
        baseDir: ENV.BUILD_DIR,
        middleware: [
          webpackDevMiddleware(bundler, {
            stats: { colors: true }
          }),
          webpackHotMiddleware(bundler)
        ]
      },
      files: [
        'app/css/*.css',
        'app/*.html'
      ]
    });
  });
  gulp.task('reload', 'Browser sync sources', browserSync.reload);
  gulp.task('restart', 'Browser sync restart', browserSync.restartServer);
  gulp.task('watch:webpack', 'Watch for webpack config changes',() => {
    gulp.watch(ENV.src.webpackConfig, ['restart','build']);
  });
}
