import gulp from 'gulp';
import runSequence from 'run-sequence';
import {get as browserSync} from 'browser-sync';
import watch from 'gulp-watch';
import config from '../config'

const bs = browserSync('server');

gulp.task('watch', () => {
    global.watch = true;

    watch( [config.src.styles.dev[0]], () => {
        runSequence(['styles', 'styles:lint'], () => bs.reload('web/template/template_styles.css'));
    });
    watch([config.src.styles.vendor, config.src.styles.dev[1]], () => {
        runSequence(['styles:vendor', 'styles:lint-vendor'], () => bs.reload('web/template/styles/vendor.css'));
    });

    watch(config.src.script, () => runSequence('scripts'));

    watch([config.src.jade, config.src.jade_modules], () => runSequence('jade', function(){
        setTimeout(function(){
            bs.reload
        }, 2000)
    }));

    watch(config.src.images, () => runSequence('copy', bs.reload));


});