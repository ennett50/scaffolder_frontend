import gulp from 'gulp';
import config from '../config';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';


/**
 * @name copy-image
 * @description Копирует изображения для сайта, которые изменились при работе и
 * оптимизирует их с помощью imagemin пакета
 * @example gulp copy-image
 */
gulp.task('copy-image', () => (
    gulp.src(config.src.images)
        .pipe(plumber())
        .pipe(changed(config.dist.images))
        .pipe(imagemin({
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           use: [pngquant()],
           interlaced: true
        }))
        .pipe(gulp.dest(config.dist.images))
));