import gulp from 'gulp';
import config from '../config';
import path from 'path';
import mainBowerFiles from 'main-bower-files';

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