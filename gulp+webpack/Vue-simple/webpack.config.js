var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('static/css/normal.css')
var extractVue = new ExtractTextPlugin('static/css/vue-style.css')

var utils = {
	assetsPath(_path) {
		const assetsRoot =
			process.env.NODE_ENV === 'production' ? 'static' : 'static'
		return path.posix.join(assetsRoot, _path)
	}
}

module.exports = {
	entry: {
        build: './src/main.js',
        common: ['jquery']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: utils.assetsPath('js/[name].js'),
		publicPath: './'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: extractCSS.extract({
					use: 'css-loader',
					fallback: 'vue-style-loader'
				})
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: extractVue.extract({
							use: ['css-loader'],
							fallback: 'vue-style-loader'
						}),
						scss: extractVue.extract({
							use: ['css-loader', 'sass-loader'],
							fallback: 'vue-style-loader'
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
				loader: 'file-loader',
				options: {
					name: utils.assetsPath('img/[name].[ext]')
				}
			}
		]
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
            jquery: path.resolve(__dirname, 'static/js/jquery.js')
		},
		extensions: ['.js', '.vue', '.json']
	},
	/* externals: {
		jquery: 'jQuery'
	}, */
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = false
	module.exports.plugins = (module.exports.plugins || []).concat([
		new CleanWebpackPlugin('dist'),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		/* new CopyWebpackPlugin([{
				from: path.resolve(__dirname, 'static'),
				to: 'static',
				ignore: ['.*']
			}
		]), */
		/* new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}), */
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: path.resolve(__dirname, './dist/index.html')
		}),
		//new ExtractTextPlugin('style.css'),
		extractCSS,
		extractVue,
		new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'runtime'],
            filename: '[name].js',
            minChunks: function(module, count){
                console.log(module.resource, count);
            }
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
