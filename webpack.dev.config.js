const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader/useable', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
            test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    'react-hot-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: ['file-loader']
            },         
            { 
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?name=img/[name].[ext]'
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname),
            path.resolve(__dirname, 'js', 'fw', 'lib')
        ]
    },
    context: __dirname,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
        new HtmlWebpackPlugin({
            title: 'iService - iPhone, iMac, MacBook, iPod Repairs and Service Center',
            description: 'iService is an iPhone, iMac, MacBook, iPod Repairs and Service Center',
            username: 'root',
            filename: 'index.html',
            inject: 'body',
            template: 'index.html_vm',
            favicon: 'img/glyph.png',
            hash: false
        })
    ]
};
