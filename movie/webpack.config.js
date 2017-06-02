var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './src/main.js',
        vendor: ['vue', 'vue-router', 'axios']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': ExtractTextPlugin.extract({
                            loader: 'css-loader!sass-loader',
                            fallbackLoader: 'vue-style-loader'
                        })
                    }
                }
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        proxy:{
            '/api': {
              target: 'http://api.douban.com/v2',
              pathRewrite: {'^/api' : ''},
              changeOrigin: true
            }
        }
    },
    plugins:[
        new ExtractTextPlugin('css/style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename: 'vendor.js'
        })
    ],
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'    
}

if (process.env.NODE_ENV === 'production') {
//  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanPlugin('./dist/'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}