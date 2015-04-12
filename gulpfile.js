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

var config = {
    src : './src/**/*.js',
    entryFile: './src/app.js',
    outputDir: './dist/',
    outputFile: 'app.js'
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

// build files and watch them
gulp.task('watch', ['_build-persistent'], function() {
  runBrowserSync();
  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});

// WEB SERVER
gulp.task('serve', function () {
  runBrowserSync();
});

//SPECS
gulp.task('specs', function () {
    return gulp.src('spec/**/*.js')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'start'
        }))
        .on('error', function(err) {
            throw err;
        });
});