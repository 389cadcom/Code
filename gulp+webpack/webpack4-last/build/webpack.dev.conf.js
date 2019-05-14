const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

let devConfig = {
  mode: 'development',
  model: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
    proxy: {
      '/api':{
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/hfBeam-tims-api': ''
        }
      }
    },
    historyApiFallback: true
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)