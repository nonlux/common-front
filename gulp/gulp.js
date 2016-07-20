import gulpProto from 'gulp';
import ENV from './env';
import plugins from './plugins';

const gulp = plugins.gulp.help(gulpProto);

gulp.plugins = plugins;
gulp.ENV = ENV;
gulp.ENV.WATCH = true;

/*
const oldTask =gulp.task;
gulp.task = (task, help, deps, callback) => {
  const exec = callback ? callback : (deps ? deps : help);

  let  nextCallback = () => {
  console.log('foo');
    try {
      console.log('run')
      console.log(exec);
      exec();
    }
    catch(error){
      console.log('trow')
        console.log(error);
      if (!gulp.ENV.WATCH){
        gulp.src('./*.js')
        .pipe(plugins.gulp.fail('Build fail '));
      }
    }
  }
  if (exec instanceof Array || exec instanceof String){
    nextCallback = exec;
  }
  const args = [task];
  if (deps) {
    args.push(help);
  }
  if ( callback ) {
    args.push(deps);
  }
  args.push(nextCallback);

 oldTask.apply(gulp, args);
}
*/

/*
const oldSrc = gulp.Gulp.prototype.src;
gulp.Gulp.prototype.src = () => {
  let stream = {};
  try {
  stream = oldSrc(arguments);
  stream.on('error', (error) => { console.log(error); });
  }
  catch (e) {
    console.log(e);
    console.log(arguments[0]);
  }
  return stream;
}
*/


function swallowError (error) {
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

gulp.task('clean', 'Remove all files from build folder', () => {
  const { clean } = plugins.gulp;
  return gulp.src(ENV.BUILD_DIR, { read: false })
    .pipe(clean({ force: true }));
});


export default gulp;
