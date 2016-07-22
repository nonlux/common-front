import { Server } from 'karma';

export default function eslintTasks(gulp) {
  const { ENV } = gulp;

  gulp.task('karma', 'Run karma runner', (done) => {
    new Server(ENV.karmaConfig, done).start();
  });
}
