module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        colors: true,

        exclude: [],

        preprocessors: {
            '**/*.js': ['webpack', 'sourcemap']
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
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
