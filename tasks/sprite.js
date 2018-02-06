import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import config from '../config';


/**
 * @name sprite
 * @description  Генерирует png-спрайт из директории sprites/png.
 * Координаты, размеры и т.п. записываются в файл 07_sprite.styl через шаблон sprite.template.mustache
 * В stylus вызывается через миксин
 * @example gulp sprite
 */
gulp.task('sprite', () => {
    let spriteData = gulp.src(config.src.sprite.png)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '07_sprite.styl',
            cssFormat: 'stylus',
            imgPath: 'sprite.png',
            algorithm: 'binary-tree',
            padding: 5,
            cssTemplate: './__dev/styles/helpers/sprite.template.mustache',
            cssVarMap: function (sprite) {
                sprite.name = 's-' + sprite.name
            }
        }));

    spriteData.img.pipe(gulp.dest('./__dev/images/'));
    spriteData.css.pipe(gulp.dest('./__dev/styles/helpers/'));

});