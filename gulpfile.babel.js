'use strict';

process.env.NODE_PATH = __dirname + '/__dev';
require('module').Module._initPaths();
require('require-dir')('tasks', {recurse: true});