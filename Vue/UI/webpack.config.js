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
        rules: [
            {
               test:/\.css$/, 
               use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
               })
            },
            {
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
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 9182,
                    name: 'assets/[name].[ext]',
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
    externals:{
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'fastclick': 'FastClick'
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
            to: './assets/',
            ignore: ['.*']
        }]),
        new HtmlPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        //new ExtractTextPlugin('static/css/base.css'),
        new ExtractTextPlugin('assets/css/style.css')
    ],
    //devtool: '#eval-source-map'
}
if(process.env.NODE_ENV == 'production'){
    //module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'production'"
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
if(process.env.NODE_ENV == 'development'){
    //开发版---美化代码
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourcemap: true,
            beautify: true,
            //output: {comments: true},
            mangle: false,
        }),
    ])
}


