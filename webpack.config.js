
var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        path: path.resolve(__dirname, './'),
        filename: "./dist/js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })),
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /js[\/|\\]lib[\/||\\][\w|\.|_|-]+js$/,
                use: 'url-loader?importLoaders=1&limit=1000&name=./dist/js/lib/[name].[ext]'
            },
            {
                test:/\.js$/,
                use: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.hbs/,
                use: "handlebars-loader"
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
        }),
        new CopyWebpackPlugin([{
            context: __dirname,
            from: './src/img',
            to: './dist/img'
        }]),
        new CopyWebpackPlugin([{
            context: __dirname,
            from: './src/media',
            to: './dist/img'
        }]),
        new ExtractTextPlugin("./dist/css/style.css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['./dist/js/vendor.js'],
            files: ['index.html'],
            append: false,
            hash: true
        }),
    ],
    externals: {
        '$':'window.$',
        'global' : 'window.global'
    }
};