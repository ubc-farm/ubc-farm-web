/*
 **Author: Xingyu Tao
 **Last Updated: 5-15-2017
 **Comments:
 **	settings for webpack
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    //for development
    devtool: '#inline-source-map',
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],
    // the entry file for the bundle
    entry: [path.join(__dirname, '/client/src/app.jsx'),
        'webpack-hot-middleware/client'
    ],

    // the bundle file we will get in the result
    output: {
        path: path.join(__dirname, '/client/dist/js'),
        publicPath: path.join(__dirname, '/client/dist/js'),
        filename: 'app.js',
    },

    module: {

        // apply loaders to files that meet given conditions
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, '/client/src'),
            loaders: [
                'react-hot',
                'babel-loader?' +
                    'presets[]=es2015,' +
                    'presets[]=react'
            ]
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }

        ],
        noParse: /\.node_modules\/object-hash\/dist\/object_hash.js/,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],

    // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
    watch: true
};
