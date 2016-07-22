const src = {
  js: {
    all: ['**/*.js', '!node_modules/**', '!build/**'],
    gulp: ['gulpfile.js', 'gulp/**/*.js'],
    src: ['src/**/*.js']
  },
  jade: 'jade/**.jade',
  webpackConfig: 'webpack.config.js',
};

export default src;
