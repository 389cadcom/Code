const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: { importLoaders: 1 }
						},
						'postcss-loader'
					]
				})
			},
			{
				test: /\.png$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images'
				}
			}
		]
	},
	plugins: [new ExtractTextPlugin('[name].css')]
}
