var config = require('./gulp.config');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watchOptions: {aggregateTimeout: 200},
    debug: true,
    entry: {
        /*
         Add here additional packages
         eg:
         page1: './page1',
         page2: ['./entry1', './entry2']
         */
        app: config.js.entryFile
    },
    output: {
        path: config.paths.dist,
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&')
                +
                'includePaths[]=' +
                (path.resolve(__dirname, './node_modules'))
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')},
            {test: /\.handlebars$/, loader: 'handlebars-loader'},
            {test: /\.woff$/, loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'file-loader?prefix=font/'},
            {test: /\.eot$/, loader: 'file-loader?prefix=font/'},
            {test: /\.svg$/, loader: 'file-loader?prefix=font/'},
            {test: /\.gif$/, loader: 'url?limit=10000&mimetype=image/gif'},
            {test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpg'},
            {test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png'}
        ],
        preLoaders: [
            {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        modulesDirectories: [
            'node_modules'
        ]
    }
};
