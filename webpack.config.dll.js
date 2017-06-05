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

var zepto = path.join(__dirname, 'src/js/lib/zepto.min.js');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        vendor: [zepto, pixi, p2, phaser],
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: './dist/js/[name].js',
        library: '[name]_library'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /zepto\.min\.js/,
                use: 'expose-loader?$'
            },
            {
                test: /pixi\.js/,
                use: 'expose-loader?PIXI'
            },
            {
                test: /p2\.js/,
                use: 'expose-loader?p2'
            },
            {
                test: /phaser-split\.js$/,
                use: [{
                    loader: 'expose-loader?Phaser'
                },{
                    loader: 'imports-loader?PIXI=pixi!imports-loader?p2=p2'
                }]
            }
        ]
    },
    resolve: {
        alias: {
            'zepto': zepto,
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
        new UglifyJSPlugin()
    ],
    externals: {
        '$':'window.$',
        'global' : 'window.global',
    }
};