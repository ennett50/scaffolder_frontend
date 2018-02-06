import gulp from 'gulp';
import config from '../config';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import fs from 'fs';

/**
 * @name getDesc
 * @param fileName - имя файла в диреткории ./dist
 * @returns {Array|Object}
 * @example getDesc(fileName)
 */
function getDesc(fileName) {
    let dict, key, value;
    dict = fs.readFileSync('./dictionary.json', 'utf-8');
    dict = JSON.parse(dict);
    for (key in dict) {
        value = dict[key];
        if (key === fileName) {
            return value;
        }
    }
    return fileName;
}

/**
 * @name index-page
 * @description генерация разводящей страницы,
 * где будет отображены все макеты верстки.
 * За именование файлов в спике отвечает dictionary.json
 * @example gulp index-page
 */
gulp.task('index-page', function () {
    let dirOutput = config.public;
    if (!fs.existsSync(dirOutput)){
        fs.mkdirSync(dirOutput);
    }
    let dirs = fs.readdirSync(dirOutput);
    let files = [];
    for (let i = 0, len = dirs.length; i < len; i++) {
        let file = dirs[i];
        if (file.indexOf('.html') + 1 && !(file.indexOf('index') + 1)) {
            files.push({
                file: file.replace('.html', ''),
                name: getDesc(file)
            });

        }
    }
    gulp.src(config.index + '.pug')
        .pipe(plumber())
        .pipe(pug({pretty: true, locals: {'pages': files}}))
        .pipe(gulp.dest(config.dist.pug));

    gulp.src(config.dist.indexPage.from)
        .pipe(gulp.dest(config.dist.indexPage.to));

});