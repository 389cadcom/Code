const path = require('path')
const webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
	},
	module: {
		rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize:true,
              camelCase: true
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        /* use: [{
          loader:'file-loader',
          options: {
            name: 'images/[name].[ext]?[hash]'
          } 
        }], */
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
    alias: { },
		extensions: ['.json', '.js', '.jsx', '.css']
	},
  externals: {
    jquery: 'jQuery' 
  },
  plugins: [
    new webpack.ProvidePlugin({
      jq: 'jquery'
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
