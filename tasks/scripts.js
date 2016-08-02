import gulp from 'gulp';
import config from '../config';
import babel from 'gulp-babel';
import flatten from 'gulp-flatten';
import eslint from 'gulp-eslint';

gulp.task('scripts', () => (
    gulp.src(config.src.script)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(flatten())
        .pipe(gulp.dest(config.dist.script.main))
));