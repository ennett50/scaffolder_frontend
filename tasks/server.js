import { create as browserSync } from 'browser-sync';
import gulp from 'gulp';
import debuga from 'debuga';

const bs = browserSync('server');
const { PORT, OPEN, NODE_ENV, TUNNEL } = process.env;

gulp.task('server', () => (
    bs.init({
        files: ['web/**/**/**/*'],
        open: !!OPEN,
        reloadOnRestart: true,
        port: PORT || 3000,
        snippetOptions: {
            rule: {
                match: /<\/body>/i
            }
        },
        server: {
            logPrefix: "frontend",
            baseDir: [
                //'__dev/images',
                'web'
            ],
            directory: false,
            middleware: [debuga()]
        },
        tunnel: !!TUNNEL
    })
));