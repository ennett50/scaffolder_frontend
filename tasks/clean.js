import gulp from 'gulp';
import rm from 'gulp-clean';
import config from '../config'
import notify from 'gulp-notify';

gulp.task('clean', () => (
   gulp.src(config.public, {read: false})
       .pipe(rm({ async: false }))
       .pipe(notify(`Directory ${config.public} is CLEAN!`))
));