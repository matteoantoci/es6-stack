module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        exclude: [
        ],

        preprocessors: {
            '**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        browsers: ['PhantomJS'],

        reporters: ['progress']
    });
};
