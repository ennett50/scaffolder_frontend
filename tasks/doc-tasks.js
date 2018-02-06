import gulp from 'gulp';
import config from '../config'
import plumber from 'gulp-plumber';
import jsdoc from 'gulp-jsdoc3';

/**
 * @name doc-tasks
 * @description Генерирует документацию из комментариев javascript
 * на основе jsDoc
 * @example gulp doc-tasks
 */
gulp.task('doc-tasks', () => (
	gulp.src(['README.md', config.doc.gulp.from, config.doc.gulp.from2], {read: false})
		.pipe(jsdoc({
			"tags": {
				"allowUnknownTags": true
			},
			"opts": {
				"template": "node_modules/docdash",
				"destination": "./dist/documentations/task"
			},
			"templates" : {
				//"path": "ink-docstrap",
				//"theme": "flatly", //flatly, spacelab, slate
				"navType": "vertical",
				"linenums": true,
				"dateFormat": "MMMM Do YYYY, h:mm:ss a",
				"inverseNav": true,
				"syntaxTheme" : "dark"
			}
		}))
		.pipe(plumber())
		.pipe(gulp.dest(config.doc.gulp.to))
));