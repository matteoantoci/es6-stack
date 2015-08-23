'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var rimraf = require('gulp-rimraf');
var bs = require('browser-sync').create('server');
var karma = require('gulp-karma');
var protractor = require('gulp-protractor').protractor;
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var config = require('./gulp.config');

// WEBDRIVER
gulp.task('webdriverUpdate', webdriverUpdate);
gulp.task('webdriverStandalone', webdriverStandalone);

// CLEAN THE OUTPUT DIRECTORY
gulp.task('clean', function clean(cb) {
    return rimraf(config.paths.dist, cb);
});

// WEBPACK
function webpackBuild(conf) {
    webpack(conf, function run(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('webpack', stats.toString({
            colors: true
        }));
        // callback();
    });
}

// DEFAULT - BrowserSync
gulp.task('default', [], function browserSync() {
    var initOptions = {};

    if (config.browserSync.proxy) {
        initOptions.proxy = config.browserSync.proxy;
    } else {
        initOptions.server = {
            baseDir: './public/'
        };
    }

    gulp.start('clean');
    gulp.start('webpack:build-dev');
    bs.init(initOptions);
    gulp.watch(config.watchedFiles, ['webpack:build-dev']);
    gulp.watch(config.paths.dist + '**/*.css').on('change', bs.stream);
    gulp.watch(config.paths.dist + '**/*.js').on('change', bs.reload);
    // gulp.watch(paths.src + '/icons/*.svg', ['icons']).on('change', bs.reload);
});

// WEBPACK PROD
gulp.task('build', [], function wpBuild() {
    gulp.start('clean');
    var myConfig = Object.create(webpackConfig);
    myConfig.debug = false;
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false})
    );
    webpackBuild(myConfig);
});

// WEBPACK DEV
gulp.task('webpack:build-dev', function wpBuildDev(callback) {
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = '#source-map';
    myDevConfig.watch = true;
    webpackBuild(myDevConfig, callback);
});

// UNIT TESTS
gulp.task('spec', function spec() {
    return gulp.src(config.js.spec)
        .pipe(karma({
            configFile: 'karma.conf.js',
            basePath: config.paths.assets,
            action: 'watch'
        }))
        .on('error', function error(err) {
            throw err;
        });
});

// END2END TESTS
gulp.task('e2e', ['webdriverUpdate'], function e2e() {
    return gulp.src(config.js.e2e)
        .pipe(protractor({
            configFile: 'protractor.conf.js',
            args: ['--baseUrl', 'http://localhost:3000']
        }))
        .on('error', function error(err) {
            throw err;
        });
});
