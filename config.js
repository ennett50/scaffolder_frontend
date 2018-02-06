import path from 'path';

let root = '__dev';
let dist = 'dist';
let template = path.join(dist, 'template');
let pathFolders = {
    bower: path.join(root, 'scripts', 'libs'),
    public: dist,
    index: path.join(root, '_index', 'index'),
    src: {
        images: [
            path.join(root, 'images', '**', '*.png'),
            path.join(root, 'images', '**', '*.jpg'),
            path.join(root, 'images', '**', '*.svg'),
            path.join(root, 'images', '**', '*.gif')],
        styles: {
            vendor: path.join(root, 'styles', 'vendor'),
            additional: path.join(root, 'styles', 'additional'),
            main: path.join(root, 'styles', 'template_styles'),
            dev: ['__dev/views/**/**/*.styl', '__dev/styles/helpers/**']
        },
        script: [
            './__dev/scripts/*.js',
            './__dev/views/**/**/*.js',
            '!./__dev/scripts/libs/**/*.js',
            '!./__dev/scripts/helpers/**/*.js'
        ],
        pug: './__dev/views/*.pug',
        pug_modules: './__dev/views/modules/**/*.pug',
        fonts: path.join(root, 'fonts', '**', '*'),
        sprite: {
            "svg": "./__dev/sprites/svg/*.svg",
            "png": "./__dev/sprites/png/*.png"
        }
    },
    dist: {
        script: {
            libs: path.join(template, 'libs'),
            main: path.join(template, 'scripts'),
        },
        images: path.join(template, 'images'),
        styles: {
            vendor: path.join(template, 'styles'),
            main: template,
        },
        pug: dist,
        fonts: path.join(template, 'styles', 'fonts'),
        indexPage : {
            from : ['./__dev/_index/**/*', '!./__dev/_index/index.pug'],
            to: path.join(dist, '_index')
        }
    },
    doc: {
        gulp: {
            from: './__dev/scripts/*.js',
            from2: './tasks/**/*.js',
            to: "./dist",
            template: "jsdoc-template.ejs",
            //scripts: template('scripts')
        }
    },
    favicons : {
        from :  path.join(root, 'images'),
        to : path.join(template, 'favicons'),
    }
};

module.exports = pathFolders;