'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack-build');
var browserify = require('browserify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var bs = require("browser-sync").create();
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

function bundle() {
    return gulp.src(webpack.config.CONFIG_FILENAME)
        .pipe(webpack.init(config.webpackConfig))
        //.pipe(webpack.props(config.webpackOptions)) //Overrides
        .pipe(webpack.run(function (err, stats) {
            if (err) {
                console.log('Error', err);
            } else {
                console.log(stats.toString());
            }
        }))
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(config.paths.dist));
}

// clean the output directory
gulp.task('_clean', function (cb) {
    rimraf(config.paths.dist, cb);
});

//BOWER
gulp.task('bower', function () {
    return bower();
});

// bundle and write files
gulp.task('_build-persistent', ['_clean', 'bower'], function () {
    lint(config.js.src);
    return bundle();
});

gulp.task('webdriverUpdate', webdriverUpdate);
gulp.task('webdriverStandalone', webdriverStandalone);

/********************/
/*** PUBLIC TASKS ***/
/********************/

// START WEB SERVER
gulp.task('serve', function () {
    var initOptions = {};

    if (config.browserSync.proxy) {
        initOptions.proxy = config.browserSync.proxy;
    } else {
        initOptions.server = {
            baseDir: './'
        };
    }

    bs.init(initOptions);
});

// Build files and exit
gulp.task('build', ['_build-persistent'], function () {
    process.exit(0);
});

// BUILD FILES AND WATCH THEM
gulp.task('watch', ['_build-persistent', 'serve'], function () {
    gulp.watch(config.watchedFiles).on('change', function(event) {
        if (event.type === 'changed') {
            bundle();
        }
    });
});

//UNIT TESTS
gulp.task('spec', function () {
    return lint(config.js.spec)
        .pipe(karma({
            configFile: 'karma.conf.js',
            files: config.js.src,
            basePath: config.paths.assets,
            action: 'watch'
        }))
        .on('error', function (err) {
            throw err;
        });
});

//END2END TESTS
gulp.task('e2e', ['webdriverUpdate'], function () {
    return lint(config.js.e2e)
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: ['--baseUrl', 'http://localhost:3000']
        }))
        .on('error', function (e) {
            throw e;
        });
});
