const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
	entry: {
		app: './src/test.js'
	},
	output: {
		filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: 'static/img/[name].[hash:7].[ext]'
        } 
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'static/js/jquery.js',
      to: 'static/js/'
    }]),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: 'html-webpack',
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}

module.exports = config;