'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var bs = require("browser-sync").create();
var eslint = require('gulp-eslint');
var karma = require('gulp-karma');
var protractor = require('gulp-protractor').protractor;
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var sourcemaps = require('gulp-sourcemaps');

var config = require('./gulp.config');

// ESlint
function lint(src) {
    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.format());
}

var bundler;
function getBundler() {
    if (!bundler) {
        bundler = watchify(browserify(config.js.entryFile, _.extend({debug: true}, watchify.args)));
    }
    return bundler;
}

function bundle() {
    return getBundler()
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            throw err;
        })
        .pipe(source(config.js.outputFile))
        .pipe(gulp.dest(config.js.outputDir))
        .pipe(bs.reload({
            stream: true
        }));
}

// clean the output directory
gulp.task('_clean', function (cb) {
    rimraf(config.js.outputDir, function(){});
    rimraf(config.css.dest, cb);
});

//BOWER
gulp.task('bower', function () {
    return bower();
});

//SCSS
gulp.task('sass', ['bower'], function () {
    gulp.src(config.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.css.dest))
        .pipe(bs.reload({
            stream: true
        }));
});

// bundle and write files
gulp.task('_build-persistent', ['_clean', 'sass'], function () {
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

    if (config.browserSync.proxy){
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
    gulp.watch(config.css.src, ['sass']);
    getBundler().on('update', function () {
        gulp.start('_build-persistent');
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
