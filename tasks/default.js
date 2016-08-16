import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
    runSequence(
        //'sprites',
        'svg',
        'styles:vendor',
        'styles'
    )
));

gulp.task('default', () => (
    runSequence(
        //'clean',
        [
            'styles:dependencies',
            'jade',

            'bower',
            'scripts',
            'copy',
            'fonts',
            'jade:index'
        ],
        'server',
        'watch'
    )
));

gulp.task('build', () => (
    gulp.start(
        'styles:dependencies',
        'jade',
        'bower',
        'scripts',
        'copy',
        'fonts',
        'jade:index'
    )
));