const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const CopyWebpackPlugin  = require('copy-webpack-plugin')

module.exports = {
	entry: {
		bundle: './src/main.js'
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
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
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
    alias: {
      '@': path.resolve('src'),
      'weui': 'weui/src/style/',
      'components': path.resolve(__dirname,'../src/components'),
    },
		extensions: ['.json', '.js', '.css','.less']
  },
  //TODO
  resolveLoader: {
    modules: ["node_modules"],
  },
  externals: {
    jquery: 'jQuery' 
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      jq: 'jquery'
    }),
    //TODO 
    /* new CopyWebpackPlugin([{
      form: 'static/js/jquery.js',
      to: 'dist/static/js/'
    }]), */
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('common'),
    /* new webpack.LoaderOptionsPlugin({
      minimize: true
    }) */
  ]
}
