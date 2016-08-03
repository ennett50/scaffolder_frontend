import gulp from 'gulp';
import runSequence from 'run-sequence';
import {get as browserSync} from 'browser-sync';
import watch from 'gulp-watch';
import config from '../config'

const bs = browserSync('server');

gulp.task('watch', () => {
    //global.watch = true;

    watch( [config.src.styles.dev[0]], () => {
        runSequence(['styles', 'styles:lint'], () => bs.reload());
    });
    watch([config.src.styles.vendor, config.src.styles.dev[1]], () => {
        runSequence(['styles:vendor', 'styles:lint-vendor'], () => bs.reload());
    });

    //watch(['app/sprites/**/*.png', '!app/sprites/*.png'], () => runSequence('sprites'));

    // watch('__dev/{styles,blocks}/**/*.styl', () => {
    //     runSequence(['styles', 'styles:lint'], () => bs.reload('assets/styles/app.min.css'));
    // });
    //
    // watch([config.src.jade, config.src.jade_modules], () => runSequence('jade', function(){
    //     setTimeout(function(){
    //         bs.reload
    //     }, 2000)
    // }));

    watch([config.src.jade, config.src.jade_modules], () => runSequence('jade', ()=> {
        setTimeout(()=>{
            bs.reload
        }, 2000)
    }));
    watch(config.src.images, () => runSequence('copy', bs.reload));


});