import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const config = require('../wepack.config.js');

export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

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
}
