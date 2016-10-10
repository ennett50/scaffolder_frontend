import gulp from 'gulp';
import config from '../config'
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import markdox from 'gulp-markdox';
import wrap from 'gulp-wrapper';
import fs from 'fs';

gulp.task('doc-tasks', () => (
	gulp.src(config.doc.gulp.from)
		.pipe(plumber())
		.pipe(markdox({
			template: config.doc.gulp.template
		}))
		.pipe(concat("--dev--gulpTaskDoc.html"))
		.pipe(wrap({
			header: '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Documentation Gulp Task</title><link rel="stylesheet" href="_index/documentation.css"><link rel="stylesheet" href="_index/highlight/styles/monokai.css"><script src="_index/highlight/highlight.pack.js"></script><script>hljs.initHighlightingOnLoad();</script><script src="https://code.jquery.com/jquery-1.12.3.min.js"></script></head><body><div id="content">',
			footer: '</div><script src="_index/documentation.js"></script></body></html>'
		}))
		.pipe(gulp.dest(config.doc.gulp.to))
));