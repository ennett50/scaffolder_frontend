import gulp from 'gulp';
import config from '../config';
import mainBowerFiles from 'main-bower-files';

/**
 * @name bower
 * @description Копирует нужные файлы библиотек для стабильной работы.
 * Если в bower.json библиотеки указано мало или неверно пути библиотеки,
 * это можно исправить с помощью bower.json проекта в пункте "overrides"
 * @example gulp bower
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