import gulp from 'gulp';
import config from '../config';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import fs from 'fs';

/**
 * @name getDesc
 * @param fileName - name of file in directory ./web
 * @returns {Array|Object}
 * @author ennet
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


gulp.task('index-page', function () {
    let dirOutput = './web/';
    if (!fs.existsSync(dirOutput)){
        fs.mkdirSync(dirOutput);
    }
    let dirs = fs.readdirSync('./web/');
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

    gulp.src(['./__dev/_index/**/*', '!./__dev/_index/index.pug'])
        .pipe(gulp.dest('./web/_index/'));

});