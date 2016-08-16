import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprites';
import fs from 'fs';




gulp.task('svg', () => (
    gulp.src('./__dev/sprites/svg/*.svg')
        .pipe(svgSprite({
            cssFile: "../styles/helpers/07_sprite.styl",
            svg: {
                sprite: "../images/sprite-icons.svg"
            },
            svgPath : 's./images/sprite-icons.svg',
            preview:  false,
            padding: 5,
            templates: {
                css: fs.readFileSync( process.cwd() + '/sprite-template.css', "utf-8")
            }
        }))
         .pipe(gulp.dest('./__dev/sprites'))
));

