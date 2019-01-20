const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[hash].[name].bundle.js',
        chunkFilename: '[hash].[id].bundle.js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader/useable', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
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
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?name=img/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: ['file-loader']
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('[hash].common.bundle.js'),
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
