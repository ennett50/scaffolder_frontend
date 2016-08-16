import gulp from 'gulp';
import config from '../config';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';




gulp.task('copy', () => (
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