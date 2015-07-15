var webpack = require('webpack');

module.exports = function karmaConfig(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine-jquery', 'jasmine'],

        colors: true,

        exclude: [],

        preprocessors: {
            '**/*.js': ['webpack', 'sourcemap']
        },

        webpack: {
            disableSha1: false,
            disableLogging: false,
            cache: true,
            bail: true,
            module: {
                loaders: [
                    {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader'},
                    {test: /\.handlebars$/, loader: 'handlebars-loader'}
                ]
            },
            devtool: 'inline-source-map',
            resolve: {
                modulesDirectories: [
                    'node_modules'
                ]
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        browsers: ['PhantomJS'],

        reporters: ['progress']
    });
};
