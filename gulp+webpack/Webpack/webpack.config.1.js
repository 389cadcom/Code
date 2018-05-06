const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		first: './src/first.js',
		second: './src/second.js',
		vendor: ['jquery', 'vue']                  //明确第三方库 chunk
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
        /* use: ExtractTextPlugin.extract({
          use: 'css-loader',
					fallback: 'style-loader'
        }) */
      }
    ]
  },
	plugins: [
    new CleanWebpackPlugin('dist'),
    
    new webpack.optimize.CommonsChunkPlugin({
	    name: ['utils', 'vendor', 'runtime'],
      filename: '[name].js',
    }),
    /* new webpack.optimize.CommonsChunkPlugin({
      name: 'utils',
      filename: '[name].js',
      chunks: ['first', 'second']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      filename: '[name].js',
      chunks: ['vendor']
    }), */

    /* new ExtractTextPlugin({
      filename: 'style.css'
    }), */
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html'
		})
	]
}
