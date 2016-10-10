import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import plumber from 'gulp-plumber';
import config from '../config';



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