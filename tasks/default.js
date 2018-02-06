import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'sprite',
		//'svg-sprite',
	)
));

gulp.task('default', () => (
	runSequence(
		'clean',
		'styles:dependencies',
		['pug', 'bower', 'scripts'],
		[
			'styles:vendor',
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