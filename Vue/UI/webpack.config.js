var path = require('path')
var webpack = require('webpack')
var HtmlPlugin = require('html-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        // publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    /*postcss: [require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })],*/
                    loaders: {
                        //'scss': 'vue-style-loader!css-loader!sass-loader',
                        scss: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: 'css-loader!sass-loader'
                        })
                    }
                }
            },
            {
               test:/\.css$/, 
               use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
               })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                    //publicPath: 'assets/',               //自定义公共路径
                    outputPath: 'images/'                  //??
                }
            },
            {
                test: /\.(ttf)$/,
                loader: 'file-loader',
                options: {
                    name: 'font/[name].[ext]',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'pic$': path.resolve('__dirname', 'src/assets/img/')
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/',
        host: '10.206.16.105',
        noInfo: true
    },
    plugins:[
        new CopyPlugin([{
            from: path.resolve(__dirname, './static/'),
            to: './static/',
            ignore: ['.*']
        }]),
        new HtmlPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('static/css/base.css'),
        new ExtractTextPlugin('static/css/style.css')
    ],
    devtool: '#eval-source-map'
}