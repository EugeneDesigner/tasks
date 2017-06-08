'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dist/bundle.js',
        path: path.join(__dirname, '/'),
    },
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.js$/, exclude: [/node_modules/], use: 'babel-loader' },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ExtractTextPlugin.extract('css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles/main.css',
            allChunks: true
        })
    ]
};

