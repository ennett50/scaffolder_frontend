import gulp from 'gulp';
import runSequence from 'run-sequence';
import {get as browserSync} from 'browser-sync';
import watch from 'gulp-watch';
import config from '../config'

const bs = browserSync('server');

gulp.task('watch', () => {
    global.watch = true;

    watch( [config.src.styles.dev[0]], () => {
        runSequence(['styles'], () => bs.reload('dist/template/template_styles.css'));
    });

    watch( config.src.sprite.png, () => {
        runSequence(['sprite'], () => bs.reload);
    });

    watch( config.src.sprite.svg, () => {
        runSequence(['svg-sprite'], () => bs.reload);
    });

    watch([config.src.styles.vendor, config.src.styles.dev[1]], () => {
        runSequence(['styles:vendor'], () => bs.reload('dist/template/styles/vendor.css'));
    });

    watch(config.src.script, () => runSequence('scripts'));

    watch([config.src.pug, config.src.pug_modules], () => runSequence(['pug', 'index-page'], function(){
        setTimeout(function(){
            bs.reload
        }, 3000)
    }));

    watch(config.src.images, () => runSequence('copy-image', bs.reload));

});