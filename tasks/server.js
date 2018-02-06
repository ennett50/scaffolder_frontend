import { create as browserSync } from 'browser-sync';
import gulp from 'gulp';
import debuga from 'debuga';

const bs = browserSync('server');
const { PORT, OPEN, NODE_ENV, TUNNEL } = process.env;

gulp.task('server', () => (
    bs.init({
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        files: ['dist/**/**/**/*'],
        open: !!OPEN,
        reloadOnRestart: true,
        port: PORT || 3000,
        snippetOptions: {
            rule: {
                match: /<\/body>/i
            }
        },
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: true
        },
        server: {
            baseDir: 'dist',
            index: "index.html",
            directory: true,
            middleware: [debuga()]
        },
        notify: true,
        startPath: "index.html",
        tunnel: !!TUNNEL
    })
));