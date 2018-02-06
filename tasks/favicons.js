import gulp from 'gulp';
import favicons from 'gulp-favicons';
import plumber from 'gulp-plumber';
import config from '../config';

/**
 * @name favicons
 * @description Генерация фавиконок под все возможные варианты
 * из существующего логотипа. При необходимости мож отключить.
 * По-умолчанию файл logo.png в корне  картинок
 * @example gulp favicons
 */
gulp.task('favicons', () => {
    gulp.src(config.favicons.from + '/logo.png')
        .pipe(favicons({
            background: "#ffffff",
            path: "./template/favicons/",
            display: "standalone",
            orientation: "portrait",
            version: 1.0,
            logging: false,
            online: false,
            pipeHTML: false,
            replace: false,
            icons: {
                android: false,              // Create Android homescreen icon. `boolean`
                appleIcon: false,            // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
                appleStartup: false,
                coast: false,
                //coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
                favicons: true,             // Create regular favicons. `boolean`
                firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
                windows: false,              // Create Windows 8 tile icons. `boolean`
                yandex: false                // Create Yandex browser icon. `boolean`
            }
        }))
        .pipe(plumber())
        .pipe(gulp.dest(config.favicons.to));
});