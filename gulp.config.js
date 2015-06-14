/**
 * Created by mantoci on 06/06/15.
 */

'use strict';

var path = require('path');

var paths = {
    assets: path.resolve('./assets/'),
    dist: path.resolve('./dist/')
};

var devProxy = {
    host: "localhost",
    port: 8080
};

module.exports = {
    paths: paths,
    devProxy: devProxy,
    watchedFiles: paths.assets + '/**/*.*',
    css: {
        src: paths.assets + '/scss/src/**/*.scss'
    },
    js: {
        src: paths.assets + '/js/src/**/*.js',
        entryFile: paths.assets + '/js/src/app.js',
        spec: paths.assets + '/js/spec/**/*.js',
        e2e: paths.assets + '/js/e2e/**/*.js'
    },
    browserSync: {
        //proxy: devProxy.host + ":" + devProxy.port
        proxy: false
    }
};
