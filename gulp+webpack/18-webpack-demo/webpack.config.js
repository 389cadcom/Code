const path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
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
        /* use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              camelCase: true
            }
          }]
        }) */
      }
    ]
	},
	resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'res/jquery.js')
    },
		extensions: ['.json', '.js', '.jsx', '.css']
	},
	devtool: 'source-map',
	devServer: {
    open: true,
    hot: true
  },
  externals: {
    $: 'jquery',
    jquery: 'jQuery' 
  },
  plugins: [
    new ExtractTextPlugin('common.[contenthash:8].css')
  ]
}
