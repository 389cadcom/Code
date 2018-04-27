const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
	entry: {
		app: './src/main.js'
	},
	output: {
		filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
	},
	module: {
		rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            minimize:true,
            camelCase: true
          }
        }]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        /* test: /\.ts/,
        use: 'ts-loader' */
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader:'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        } 
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: ['vue-style-loader', 'css-loader', 'sass-loader']
        }
      }
    ]
	},
	resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'res/jquery.js')
    },
		extensions: ['.json', '.js', '.jsx', '.css', '.less']
	},
	devtool: 'source-map',
	devServer: {
    // open: true,
    hot: true
  },
  externals: {
    $: 'jquery',
    jquery: 'jQuery' 
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      jq: 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('common.[contenthash:8].css')
  ]
}

module.exports = config;