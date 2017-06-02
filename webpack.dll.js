/**
 * Created by z on 2017/5/31.
 */

var path = require('path');
var webpack = require('webpack');
var DllPlugin = webpack.DllPlugin;

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        vendor: [pixi, p2, phaser],
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: './dist/js/[name].js',
        library: '[name]_library'
    },
    module: {
        loaders: [
            {
                test: /js[\/|\\]lib[\/||\\][\w|\.|_|-]+js$/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/dist/js/lib/[name].[ext]'
            },
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader"
            },
            {
                test: /pixi\.js/,
                loader: 'expose-loader?PIXI'
            },
            {
                test: /p2\.js/,
                loader: 'expose-loader?p2'
            },
            {
                test: /phaser-split\.js$/,
                loader: 'expose-loader?Phaser!imports-loader?PIXI=pixi!imports-loader?p2=p2'
            }
        ]
    },
    resolve: {
        alias: {
            'zepto': './lib/zepto.min.js',
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    plugins: [
        new DllPlugin({
            path: 'manifest.json',
            name: '[name]_library',
            context: __dirname,
        }),
    ],
    externals: {
        '$':'window.$',
        'global' : 'window.global',
    }
};