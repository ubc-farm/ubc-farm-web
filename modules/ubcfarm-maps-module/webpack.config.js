/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	settings for webpack
*/
var webpack = require("webpack");
var path = require('path');

module.exports = {

    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'build/bundle.js',
        sourceMapFilename: 'build/bundle.map'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query:{
                    presets:['react', 'es2015']
                }
            }
        ]
    }
}
