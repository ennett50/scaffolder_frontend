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
import fs from 'fs';


gulp.task('jade', () => {
    let scriptsLibs = mainBowerFiles({
        includeDev: false,
        bowerDirectory: '__dev/scripts/libs',
        bowerrc: '.bowerrc',
        bowerJson: 'bower.json'
    }).filter(fileName => path.extname(fileName) === '.js')
        .map(fileName => fileName.substr(fileName.indexOf('libs')));

    let scriptsProject = fs.readdirSync('__dev/scripts').filter(fileName => path.extname(fileName) === '.js');
    let scriptsModules = [];

    fs.readdir('__dev/views/modules/', function (err, items) {
        for (var i = 0; i < items.length; i++) {
            var fileJs = fs.readdirSync('__dev/views/modules/' + items[i]).filter(fileName => path.extname(fileName) === '.js');
            if (fileJs.length) {
                for (var j = 0; j < fileJs.length; j++) {
                    scriptsModules.push(fileJs[j])
                }
            }
        }

        const data = {
            getData: getData('__dev/data'),
            jv0: 'javascript:void(0);',
            timestamp: Date.now(),
            scriptsLibs: scriptsLibs,
            scriptsProject: scriptsProject,
            scriptsModules: scriptsModules
        };


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
        // ));

    });


})