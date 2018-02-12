const webpack = require('webpack')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const glob = require('glob')
const config = require('./config.build')
// isProduct 判断是否是生产环境
const isProduct = (process.env.NODE_ENV === 'production')
console.log(process.env.NODE_ENV)
const entryPath = path.resolve(config.projectPath, config.entryPathName)
const baseURL = !isProduct ? 'http://localhost:8080/assets/' : '/site/static/'
const commonModulePath = path.resolve('./assets/src/modules')
const commonPluginPath = path.resolve('./assets/src/plugins')
const getEntry = entries => {
    const entry = {}
    const srcDirName = entries + '/**/*.js'
    glob.sync(srcDirName).forEach(function (filepath) {
        const name = filepath.slice(filepath.lastIndexOf(config.entryPathName) + config.entryPathName.length + 1, -3);
        entry[name] = filepath;
    })
    return entry
}
module.exports = {
    entry: getEntry(entryPath),
    output: {
        path: config.buildPath,
        filename: 'js/[name].[chunkhash:6].js',
        publicPath: baseURL
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap&minimize!postcss-loader?sourceMap'
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap&minimize!sass-loader?sourceMap'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.join(config.projectPath, './src/js'),
            'node_modules'
        ],
        extensions: ['.js', '.json', '.scss'],
        alias: {
            commonModule: commonModulePath,
            css: path.resolve(__dirname, 'plugins/Site/webroot/css'),
            commonPlugin: commonPluginPath,
            module: path.resolve(config.modulePath),
            plugin: path.resolve(config.pluginPath),
            layer: 'commonPlugin/layer/layer.js',
            lazyload: 'commonPlugin/jquery.lazyload.min.js',
            cookie: 'commonPlugin/js.cookie.js',
            dmuploader:  'commonPlugin/uploader/src/dmuploader.min.js',
            tmpl:  'commonPlugin/wu.tmpl.js/wu.tmpl.js',
            prettySocial: 'commonPlugin/prettySocial/jquery.prettySocial.js',
            "jquery.rating": 'commonPlugin/jquery-star-rating/src/rating.js',
            "jquery.rating.css": 'commonPlugin/jquery-star-rating/src/rating.css',
            "jquery.validate": "jquery-validation",
        }
    },
    externals: {
        'jquery': 'window.$',
        'lodash': 'window._'
    },
    devtool: 'source-map',
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            proxy: 'localhost:8765'
        }),
        new CleanPlugin(['*'], {
            root: path.resolve(config.buildPath)
        }),
        new ExtractTextPlugin({ filename: "css/[name]-[chunkhash:6].css", allChunks: true }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "lodash"
        }),
        new CommonsChunkPlugin({
            name: "common",
            filename: 'common-[chunkhash:6].js',
            minChunks: 3
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: {
        //         warnings: false
        //     },
        //     comments: false
        // }),
        //生成编译之后的文件映射
        function () {
            this.plugin('done', function(stats){
                require('fs').writeFileSync(path.join(config.mapPath, "map.json"), JSON.stringify(stats.toJson().assetsByChunkName, null, 4));
            })
        }
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/assets',
        host: "0.0.0.0",
        compress: true,
        hot: true
    }
}