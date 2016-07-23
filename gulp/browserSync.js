import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import httpProxyMiddleware from 'http-proxy-middleware';

export default function eslintTasks(gulp) {
  const { plugins, ENV } = gulp;

  gulp.task(
    'devServer',
    'BrowserSync server with webpack middleware',
    () => {
      const bundler = plugins.tools.webpack(ENV.webpackConfig);
      const middleware = [
        webpackDevMiddleware(bundler, { stats: { colors: true } }),
        webpackHotMiddleware(bundler)
      ];

      if (ENV.PROXY_API) {
        middleware.push(
          httpProxyMiddleware('/api', { target: ENV.PROXY_API_URL }));
      }
      browserSync({
        server: {
          baseDir: ENV.BUILD_DIR,
        },
        middleware,
      });
    });
  gulp.task('reload', 'Browser sync sources', browserSync.reload);
  gulp.task('restart', 'Browser sync restart', browserSync.restartServer);
  gulp.task('watch:webpack', 'Watch for webpack config changes', () => {
    gulp.watch(ENV.src.webpackConfig, ['restart', 'build']);
  });
}
