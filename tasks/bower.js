import gulp from 'gulp';
import config from '../config';
import mainBowerFiles from 'main-bower-files';

/**
 * @name bower
 * @borrows module:documents/qwerty.all as all
 * @description Копирует нужные файлы библиотек для стабильной работы.
 * Если в bower.json библиотеки указано мало или неверно пути библиотеки,
 * это можно исправить с помощью bower.json проекта в пункте "overrides"
 * @example gulp bower
 * var a = 2; function(){}
 * var probe = require("documents/probe");
 * probe.update( obj, {'name.last' : 'Owen', 'name.first' : 'LeRoy'},
 * // attr is the name of the array field
 * {$inc : {'password.changes' : 2}} )
 */
gulp.task('bower', () => (
    gulp.src(mainBowerFiles({
        paths: {
            bowerDirectory: config.bower,
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    }), { base: config.bower }).
        pipe(gulp.dest(config.dist.script.libs))
));