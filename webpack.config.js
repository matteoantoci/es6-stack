var config = require('./gulp.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watchDelay: 200,
    debug: true,
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
        path: config.paths.dist,
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
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')},
            {test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "file-loader?prefix=font/"},
            {test: /\.eot$/, loader: "file-loader?prefix=font/"},
            {test: /\.svg$/, loader: "file-loader?prefix=font/"},
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};
