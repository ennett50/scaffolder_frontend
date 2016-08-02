import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import rupture from 'rupture';

import stylint from 'gulp-stylint';

import stylus from 'gulp-stylus';
import importIfExist from 'stylus-import-if-exist';
import autoprefixer from 'autoprefixer-stylus';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';


//import errorHandler from 'gulp-plumber-error-handler';


gulp.task('styles-vendor', () => (
    gulp.src([config.src.styles.vendor + '.styl', config.src.styles.additional + '.styl'])
        .pipe(plumber())
        .pipe(stylus({
            use: [
                importIfExist(),
                rupture(),
                autoprefixer({ browsers: 'last 20 versions'})
            ],
            'include css': true
        }))
        .pipe(gcmq())
        .pipe(nano({zindex: false}))
        .pipe(gulp.dest(config.dist.styles.vendor))
));

gulp.task('styles', () => (
    gulp.src(config.src.styles.main + '.styl')
        .pipe(plumber())
        .pipe(stylus({
            use: [
                importIfExist(),
                rupture(),
                autoprefixer({ browsers: 'last 20 versions'})
            ],
            'include css': true
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(config.dist.styles.main))
));

gulp.task('styles:lint', () => (
    gulp.src(config.src.styles.dev)
        .pipe(stylint({
            reporter: 'stylint-stylish',
            reporterOptions: {verbose: true}
        }))
        .pipe(stylint.reporter())
));