var path = require('path');
var config = require('./gulp.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    debug: true,
    devtool: '#source-map',
    watchDelay: 200,
    entry: {
        /*
            Add here additional packages
            eg:
                page1: "./page1",
                page2: ["./entry1", "./entry2"]
         */
        app: config.js.entryFile
    },
    output: {
        path: __dirname,
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};
