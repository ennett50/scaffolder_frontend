import gulp from 'gulp';
import config from '../config';
import jade from 'gulp-jade';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import getData from 'jade-get-data';
import inheritance from 'gulp-jade-inheritance';
import gulpIf from 'gulp-if';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import prettify from 'gulp-jsbeautifier';
import mainBowerFiles from 'main-bower-files'
import path from 'path';

let scripts = mainBowerFiles({
    includeDev: false,
    bowerDirectory: '__dev/scripts/libs',
    bowerrc: '.bowerrc',
    bowerJson: 'bower.json'
}).filter(fileName => path.extname(fileName) === '.js')
    .map(fileName => fileName.substr(fileName.indexOf('libs')));


const data = {
    getData: getData('__dev/data'),
    jv0: 'javascript:void(0);',
    timestamp: Date.now(),
    scripts: scripts
};


gulp.task('jade', () => (
    gulp.src(config.src.jade)
        .pipe(plumber())
        .pipe(cached('jade'))
        .pipe(gulpIf(global.watch, inheritance({basedir: '__dev'})))
        .pipe(filter(file => /__dev[\\\/]views/.test(file.path)))
        .pipe(jade({basedir: '__dev', data}))
        .pipe(prettify({
            braceStyle: 'expand',
            indentWithTabs: true,
            indentInnerHtml: true,
            preserveNewlines: true,
            endWithNewline: true,
            wrapLineLength: 120,
            maxPreserveNewlines: 50,
            wrapAttributesIndentSize: 1,
            unformatted: ['use']
        }))
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest(config.dist.jade))
));