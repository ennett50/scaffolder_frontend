import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';

/**
 * @name fonts
 * @description Копирует шрифты для сайта в скомпелированную папку проекта
 * @example gulp fonts
 */

gulp.task('fonts', () => (
    gulp.src(config.src.fonts)
        .pipe(plumber())
        .pipe(changed(config.dist.fonts))
        .pipe(gulp.dest(config.dist.fonts))
));