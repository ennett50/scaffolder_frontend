import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
    runSequence(
        'sprite',
        'svg-sprite',
        'styles:vendor'
    )
));

gulp.task('default', () => (
    runSequence(
        'clean',
        'styles:dependencies',
        [
            'pug',
            'bower',
            'scripts',
            'styles',
            'copy-image',
            'fonts',
            'favicons',
            'index-page'
        ],
        'server',
        'watch'
    )
));

gulp.task('build', () => (
    gulp.start(
        'styles:dependencies',
        'pug',
        'bower',
        'scripts',
        'copy-image',
        'fonts',
        'favicons',
        'index-page'
    )
));