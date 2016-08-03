import gulp from 'gulp';
import config from '../config';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import flatten from 'gulp-flatten';
import eslint from 'gulp-eslint';

gulp.task('scripts', () => (
    gulp.src(config.src.script)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(flatten())
        .pipe(gulp.dest(config.dist.script.main))
));