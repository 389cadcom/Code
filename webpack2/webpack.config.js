const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    entry: {
        app: './src/js/index.js',
        main: './src/js/main.js',
        test: './src/js/test.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            //			{ test:/\.css$/, loader: 'style!css' },
            //			{ test:/\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
            //			{ test:/\.scss$/, loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader!sass-loader'}) },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', { modules: false }]
                    ]
                }
            },
        ],
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract(['css-loader'])
        },{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract(['css-loader','postcss-loader', 'sass-loader?outputStyle=expanded'])
        }]
    },
    plugins: [
        new CleanWebpackPlugin('./dist/'),
        new CommonsChunkPlugin({ name: 'common', filename: 'common.js', chunks:['app', 'main'] }),
        new ExtractTextPlugin('css/[name].css'),
        /*new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),*/
    ],
    externals: {
        jquery: 'jQuery'
    }
}

module.exports = config;