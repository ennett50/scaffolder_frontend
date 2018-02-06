import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import rupture from 'rupture';

import stylint from 'gulp-stylint';
import filter from 'gulp-filter';
import stylus from 'gulp-stylus';
import importIfExist from 'stylus-import-if-exist';
import autoprefixer from 'autoprefixer-stylus';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';

/**
 * @name styles:vendor
 * @description Собирает вендорные стили проекта. Файлы минифицируются.
 * @example gulp styles:vendor
 */
gulp.task('styles:vendor', () => (
	gulp.src([config.src.styles.vendor + '.styl', config.src.styles.additional + '.styl'])
		.pipe(plumber())
		.pipe(filter([config.src.styles.vendor + '.styl', config.src.styles.additional + '.styl'], {restore: true}))
		.pipe(stylus({
			use: [
				importIfExist(),
				rupture(),
				autoprefixer({browsers: 'last 20 versions'})
			],
			'include css': true
		}))
		.pipe(gcmq())
		.pipe(nano({zindex: false}))
		.pipe(gulp.dest(config.dist.styles.vendor))
));
/**
 * @name styles
 * @description Собирает проектные стили проекта. Файлы не минифицируются.
 * @example gulp styles
 */
gulp.task('styles', () => (
	gulp.src(config.src.styles.main + '.styl')
		.pipe(plumber())
		.pipe(filter(config.src.styles.main + '.styl'))
		.pipe(stylus({
			use: [
				importIfExist(),
				rupture(),
				autoprefixer({browsers: 'last 20 versions'})
			],
			'include css': true
		}))
		.pipe(gcmq())
		.pipe(gulp.dest(config.dist.styles.main))
));