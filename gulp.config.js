/**
 * Created by mantoci on 06/06/15.
 */

'use strict';

var path = require('path');

var paths = {
    assets: path.resolve('./assets/'),
    dist: path.resolve('./dist/')
};

module.exports = {
    paths: paths,
    js: {
        src: paths.assets + '/js/src/**/*.js',
        entryFile: paths.assets + '/js/src/app.js',
        spec: paths.assets + '/js/spec/**/*.js',
        e2e: paths.assets + '/js/e2e/**/*.js',
        outputDir: paths.dist + '/js/',
        outputFile: 'app.js'
    },
    css: {
        src: paths.assets + '/scss/*.scss',
        dest: paths.dist + '/css/'
    },
    browserSync: {
        proxy: false
    },
    webpackOptions: {
        debug: true,
        devtool: '#source-map',
        watchDelay: 200
    },
    webpackConfig: {
        useMemoryFs: true,
        progress: true
    }
};
