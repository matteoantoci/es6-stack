'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var rimraf = require('rimraf');
var bs = require('browser-sync').create();
var eslint = require('gulp-eslint');
var karma = require('gulp-karma');
var protractor = require('gulp-protractor').protractor;
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var bower = require('gulp-bower');
var config = require('./gulp.config');

// ESlint
function lint(src) {
    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.format());
}

// Webpack
function webpackBuild(conf, callback) {
    webpack(conf, function run(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('webpack', stats.toString({
            colors: true
        }));
        callback();
    });
}

// clean the output directory
gulp.task('clean', function clean(cb) {
    return rimraf(config.paths.dist, cb);
});

// BOWER
gulp.task('bower', bower);

gulp.task('webdriverUpdate', webdriverUpdate);
gulp.task('webdriverStandalone', webdriverStandalone);

gulp.task('default', ['clean', 'bower', 'webpack:build-dev'], function() {
    var initOptions = {};

    if (config.browserSync.proxy) {
        initOptions.proxy = config.browserSync.proxy;
    } else {
        initOptions.server = {
            baseDir: './'
        };
    }

    bs.init(initOptions);
    gulp.watch(config.watchedFiles, ['webpack:build-dev']);
    gulp.watch(config.paths.dist + '**/*.css').on('change', bs.stream);
    gulp.watch(config.paths.dist + '**/*.js').on('change', bs.reload);
    /*
     gulp
     .watch(paths.src + '/icons/*.svg', ['icons'])
     .on('change', bs.reload);
     */
});

// Production build
gulp.task('build', ['clean', 'bower', 'webpack:build']);

gulp.task('webpack:build', function webpackbuild(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.debug = false;
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    webpackBuild(myConfig, callback);
});

gulp.task('webpack:build-dev', function webpackbuildDev(callback) {
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = '#source-map';
    webpackBuild(myDevConfig, callback);
});

// UNIT TESTS
gulp.task('spec', function spec() {
    return lint(config.js.spec)
        .pipe(karma({
            configFile: 'karma.conf.js',
            files: {
                pattern: config.js.src,
                watched: false
            },
            basePath: config.paths.assets,
            action: 'watch'
        }))
        .on('error', function(err) {
            throw err;
        });
});

// END2END TESTS
gulp.task('e2e', ['webdriverUpdate'], function e2e() {
    return lint(config.js.e2e)
        .pipe(protractor({
            configFile: 'protractor.conf.js',
            args: ['--baseUrl', 'http://localhost:3000']
        }))
        .on('error', function(e) {
            throw e;
        });
});
