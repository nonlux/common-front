import gulpProto from 'gulp';
import ENV from './env';
import plugins from './plugins';
import fs from 'fs';

const gulp = plugins.gulp.help(gulpProto);

gulp.plugins = plugins;
gulp.ENV = ENV;
gulp.ENV.WATCH = false;
gulp.deps = (deps) => { deps.forEach((file) => { require(`./${file}.js`)(gulp) }) }

function swallowError(error) {
  console.log(error.toString());
  gulp.emit('end');
}

plugins.swallowError = swallowError;


const __runTask = gulp.Gulp.prototype._runTask; //eslint-disable-line no-underscore-dangle
gulp.Gulp.prototype._runTask = (task) => { //eslint-disable-line no-underscore-dangle
  ENV.set('CURRENT_TASK', task.name.split(':')[0]);

  if (!ENV.args[`skip-${ENV.CURRENT_TASK}`]) {
    return __runTask.apply(gulp, [task]);
  }

  return null;
};

gulp.generateTargetTask = (src, task, callback, help) => {
  const deps = [];
  Object.entries(src).forEach(data => {
    const key = data[0];
    const value = data[1];
    const taskName = [task, key].join(':');
    gulp.task(taskName, [help, 'for target', key].join(' '), () => callback(value));
    deps.push(taskName);
  });
  gulp.task(task, [help, 'for all targets'].join(' '), deps);
};

gulp.task('clean', 'Remove all files from build folder', (done) => {
  const { clean, callback } = plugins.gulp;
  if (fs.existsSync(ENV.BUILD_DIR)){
    gulp.src(ENV.BUILD_DIR, {read: false})
    .pipe(clean({force: true}))
    .pipe(callback(done));
  }
  else {
    done();
  }
});


export default gulp;
