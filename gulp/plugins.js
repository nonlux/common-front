const gulp = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'webpack-stream'],
  replaceString: /^(gulp|postcss)(-|\.)/,
});

const postcss = require('gulp-load-plugins')({
  pattern: ['postcss-*', 'autoprefixer'],
  replaceString: /^postcss(-|\.)/,
});

const tools = require('gulp-load-plugins')({
  pattern: ['webpack'],
});

gulp.ifs = gulp.if;

const plugins = {
  gulp,
  postcss,
  tools,
};

export default plugins;
