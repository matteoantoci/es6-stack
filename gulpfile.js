'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var eslint = require('gulp-eslint');
var karma = require('gulp-karma');
var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;

var config = {
    src : './src/**/*.js',
    entryFile: './src/app.js',
    outputDir: './dist/',
    outputFile: 'app.js',
    spec : 'spec/**/*.js',
    e2e : 'e2e/**/*.js'
};

var bundler;
function getBundler() {
    if (!bundler) {
        bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
    }
    return bundler;
}

function bundle() {
    return getBundler()
        .transform(babelify)
        .bundle()
        .on('error', function(err) { console.log('Error: ' + err.message); })
        .pipe(source(config.outputFile))
        .pipe(gulp.dest(config.outputDir))
        .pipe(reload({ stream: true }));
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

// ESlint files
gulp.task('_lint', function () {
    gulp.src(config.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// bundle and write files
gulp.task('_build-persistent', ['_lint', '_clean'], function() {
  return bundle();
});

// build files and exit
gulp.task('build', ['_build-persistent'], function() {
  process.exit(0);
});

gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver_standalone', webdriver_standalone);

/*** PUBLIC TASKS ***/

// START WEB SERVER
gulp.task('serve', function () {
    runBrowserSync();
});

// BUILD FILES AND WATCH THEM
gulp.task('watch', ['_build-persistent', 'serve'], function() {
    getBundler().on('update', function() {
        gulp.start('build-persistent')
    });
});

//UNIT TESTS
gulp.task('spec', function () {
    return gulp.src(config.spec)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'start'
        }))
        .on('error', function(err) {
            throw err;
        });
});

//END2END TESTS
gulp.task('e2e', ['webdriver_update'], function() {
    gulp.src(config.e2e)
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: ['--baseUrl', 'http://localhost:3000']
        }))
        .on('error', function(e) { throw e })
});