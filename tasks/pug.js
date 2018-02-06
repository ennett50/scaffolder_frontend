import gulp from 'gulp';
import config from '../config';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import getData from 'jade-get-data';
import inheritance from 'gulp-pug-inheritance';
import gulpIf from 'gulp-if';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import prettify from 'gulp-jsbeautifier';
import mainBowerFiles from 'main-bower-files'
import path from 'path';
import fs from 'fs';
import pugLinter from 'gulp-pug-linter';

/**
 * @name  filterTypeFile
 * @param extension - расширение, по которым будут фильтроваться файлы
 * @returns {Array}
 * @example filterTypeFile(filterTypeFile)
 */
function filterTypeFile(extension) {
    return mainBowerFiles({
        includeDev: false,
        bowerDirectory: '__dev/scripts/libs',
        bowerrc: '.bowerrc',
        bowerJson: 'bower.json'
    }).filter(fileName => path.extname(fileName) === extension)
        .map(fileName => fileName.substr(fileName.indexOf('libs')));
}

/**
 * @name pug
 * @description Генерирует html шаблоны.
 * Через locals передаются данные в шаблон (список библиотек, стилей, отдельных скриптов)
 * и json-данные из папка data с помощью функции getData(nameJsonFile)
 * @example gulp pug
 */
gulp.task('pug', () => {

    let scriptsLibs = filterTypeFile('.js');
    let stylesLibs = filterTypeFile('.css');

    let scriptsProject = fs.readdirSync('__dev/scripts').filter(fileName => path.extname(fileName) === '.js');
    let scriptsModules = [];

    fs.readdir('__dev/views/modules/', function (err, items) {
        for (var i = 0; i < items.length; i++) {
            var fileJs = fs.readdirSync('__dev/views/modules/' + items[i])
                .filter(fileName => path.extname(fileName) === '.js');
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
            stylesLibs: stylesLibs,
            scriptsProject: scriptsProject,
            scriptsModules: scriptsModules
        };


        gulp.src([config.src.pug])
            .pipe(pugLinter())
            .pipe(pugLinter.reporter())
            .pipe(plumber())
            .pipe(gulpIf(global.watch, inheritance({basedir: '/__dev/'})))
            .pipe(filter(file => /__dev[\\\/]views/.test(file.path)))
            .pipe(pug({basedir: '__dev', data}))
            .pipe(plumber())
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
            .pipe(plumber())
            .pipe(gulp.dest(config.dist.pug));
    });
});



