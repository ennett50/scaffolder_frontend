import path from 'path';

let root = '__dev';
let web = 'web';
let template = path.join(web, 'template');
let pathFolders = {
    bower: path.join(root, 'scripts', 'libs'),
    public: web,
    src: {
        images: path.join(root, 'images', '**', '*'),
        styles: {
            vendor: path.join(root, 'styles', 'vendor'),
            additional: path.join(root, 'styles', 'additional'),
            main: path.join(root, 'styles', 'template_styles'),
            dev: ['__dev/views/**/**/*.styl', '__dev/styles/helpers/**']
        },
        script : ['./__dev/scripts/*.js', './__dev/views/**/**/*.js', '!./__dev/scripts/libs/**/*.js', '!./__dev/scripts/helpers/**/*.js'],
        jade: './__dev/views/*.jade',
        jade_modules : './__dev/views/modules/**/*.jade'
    },
    dist: {
        script: {
            libs: path.join(template, 'libs'),
            main : path.join(template, 'scripts'),
        },
        images: path.join(template, 'images'),
        styles: {
            vendor: path.join(template, 'styles'),
            main: template,
        },
        jade: web
    }
};

module.exports = pathFolders;