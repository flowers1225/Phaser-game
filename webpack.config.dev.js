/**
 * Created by z on 2017/6/5.
 */
var path = require('path');
var webpack = require('webpack');

var webpackMerge = require('webpack-merge');

var commonConfig = require('./webpack.config.base.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
        module: {
          rules: [
              {
                  test: /\.less$/,
                  use: ['style-loader', 'css-loader', 'less-loader'],
                  exclude: /(node_modules|bower_components)/
              },
          ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('dev')
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            host: '0.0.0.0',
            contentBase: path.join(__dirname, './'),
            compress: true,
            port: 3000,
            inline: true,
            hot: true,
            open: true,
            disableHostCheck: true
        }
    })
}