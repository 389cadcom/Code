const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = {
  // mode: 'development',
  entry: {
    vendor: [
      'jquery',
      'echarts/lib/echarts',
      'echarts/lib/chart/pie',
      'echarts/lib/chart/bar',
      'echarts/lib/chart/line',      
      'echarts/lib/component/tooltip',
      'echarts/lib/component/title'
    ],
    beauty: path.resolve(__dirname, 'src/js/beauty.js'),
    shadow: path.resolve(__dirname, 'src/js/shadow.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader',
        ],
      },
      {
        test: /\.(webm|mp4)$/,
        loader: 'file-loader',
      },
    ],
  },
	devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/beauty.html'),
      chunks: ['vendor', 'beauty'],
    }),
    new HtmlWebpackPlugin({
      filename: 'shadow.html',
      template: path.resolve(__dirname, 'src/shadow.html'),
      chunks: ['vendor', 'shadow'],
    })
  ],
  performance: {
    hints: false
  },
}

module.exports = config
