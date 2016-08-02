import gulp from 'gulp';
import config from '../config';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import newer from 'gulp-newer';

gulp.task('copy', () => (
    gulp.src(config.src.images)
        .pipe(newer(config.dist.images))
        //.pipe(imagemin({
        //    progressive: true,
        //    svgoPlugins: [{removeViewBox: false}],
        //    use: [pngquant()],
        //    interlaced: true
        //}))
        .pipe(gulp.dest(config.dist.images))
));