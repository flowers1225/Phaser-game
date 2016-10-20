
var path = require('path');
var webpack = require('webpack');
//var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        main: "./src/js/index.js",
    },
    output: {
        path: '.',
        filename: "./dist/js/[name].js"
    },
    module: {
        loaders: [
            {
                test: /js[\/|\\]lib[\/||\\][\w|\.|_|-]+js$/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/dist/js/lib/[name].[ext]'
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader"
            },
            {
                test: /pixi\.js/,
                loader: 'expose?PIXI'
            },
            {
                test: /phaser-split\.js$/,
                loader: 'expose?Phaser'
            },
            {
                test: /p2\.js/,
                loader: 'expose?p2'
            },
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
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
    //watch: true,
    plugins: [
        // new BrowserSyncPlugin({
        //     host: process.env.IP || 'localhost',
        //     port: process.env.PORT || 3000,
        //     open: false,
        //     server: {
        //         baseDir: ['./', './dist/js/main']
        //     }
        // })
    ],
    externals: {
        '$':'window.$',
        'global' : 'window.global'
    }
};