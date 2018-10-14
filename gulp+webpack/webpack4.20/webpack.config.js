const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(path.resolve(__dirname, 'dist'))
console.log(path.resolve(__filename))

module.exports = {
  // mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'                                 //FIXME: util.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      },
      {
        test: /.css$/,
        // loader: ['style-loader', 'css-loader']
        use: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.css']
  },
  // devtool: 'source-map',
  devServer: {
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('static/common.css'),           //FIXME: util.assetsSubDirectory
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
			minify: true
    })
  ]
}