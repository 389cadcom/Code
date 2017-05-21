var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = {
	entry: './src/js/index.js',
	output: {
		path: __dirname + 'dist',
		filename: '[name].js'
	},
	module:{
		loaders: [
			{ test:/\.js$/, exclude: 'node_modules', loader:'babel-loader' },
		]
	},
	plugins: [
		new CommonsChunkPlugin('common.js')
	],
	resolve: {
		extensions:['.js']
	},
	externals: {
		jquery: 'jQuery'
	}
}

module.exports = config;

export default config;