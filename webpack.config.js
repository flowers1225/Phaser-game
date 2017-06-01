
var path = require('path');
var webpack = require('webpack');
var DllReferencePlugin = webpack.DllReferencePlugin;

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
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader"
            },
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
        new DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        })
    ],
    externals: {
        '$':'window.$',
        'global' : 'window.global'
    }
};