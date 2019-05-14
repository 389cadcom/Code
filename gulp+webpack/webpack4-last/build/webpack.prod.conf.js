const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',                                 //对样式中图片路径处理
            }
          },
          'css-loader'
        ]
        /* use: ExtractTextPlugin.extract({
          use: ['css-loader'],
          publicPath: '../../'
        }) */
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('static', 'css/[name].css')
    })
  ]
}

module.exports = merge(baseConfig, prodConfig)