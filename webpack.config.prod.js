/**
 * Created by z on 2017/6/5.
 */
var path = require('path');
var webpack = require('webpack');

var webpackMerge = require('webpack-merge');

var commonConfig = require('./webpack.config.base.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                    }),
                    exclude: /(node_modules|bower_components)/
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('prod')
                }
            }),
            new ExtractTextPlugin("./dist/css/style.css"),
            new UglifyJSPlugin()
        ]
    })
}