import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
    runSequence(
        //'sprites',
        //'icons',
        'styles:vendor',
        'styles'
    )
));

gulp.task('default', () => (
    runSequence(
        'clean',
        [
            'styles:dependencies',
            'jade',
            'scripts',
            'copy'
        ],
        'server',
        'watch'
    )
));

gulp.task('build', () => (
    gulp.start(
        'styles:dependencies',
        'jade',
        'scripts',
        'copy'
    )
));