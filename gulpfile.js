'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var eslint = require('gulp-eslint');
var karma = require('gulp-karma');
var protractor = require('gulp-protractor').protractor;
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

var config = {
    src: './src/**/*.js',
    entryFile: './src/app.js',
    outputDir: './dist/',
    outputFile: 'app.js',
    spec: 'spec/**/*.js',
    e2e: 'e2e/**/*.js'
};

// ESlint
function lint(src) {
    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.format());
}

var bundler;
function getBundler() {
    if (!bundler) {
        bundler = watchify(browserify(config.entryFile, _.extend({debug: true}, watchify.args)));
    }
    return bundler;
}

function bundle() {
    return getBundler()
        .transform(babelify)
        .bundle()
        .on('error', function(err) {
            throw err;
        })
        .pipe(source(config.outputFile))
        .pipe(gulp.dest(config.outputDir))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function runBrowserSync(){
    browserSync({
        server: {
            baseDir: './'
        }
    });
}

// clean the output directory
gulp.task('_clean', function(cb){
    rimraf(config.outputDir, cb);
});

// bundle and write files
gulp.task('_build-persistent', ['_clean'], function() {
    lint(config.src);
    return bundle();
});

gulp.task('webdriverUpdate', webdriverUpdate);
gulp.task('webdriverStandalone', webdriverStandalone);

/********************/
/*** PUBLIC TASKS ***/
/********************/

// START WEB SERVER
gulp.task('serve', function () {
    runBrowserSync();
});

// Build files and exit
gulp.task('build', ['_build-persistent'], function() {
    process.exit(0);
});

// BUILD FILES AND WATCH THEM
gulp.task('watch', ['_build-persistent', 'serve'], function() {
    getBundler().on('update', function() {
        gulp.start('_build-persistent');
    });
});

//UNIT TESTS
gulp.task('spec', function () {
    return lint(config.spec)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }))
        .on('error', function(err) {
            throw err;
        });
});

//END2END TESTS
gulp.task('e2e', ['webdriverUpdate'], function() {
    return lint(config.e2e)
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: ['--baseUrl', 'http://localhost:3000']
        }))
        .on('error', function(e) {
            throw e;
        });
});
