const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var url = 'https://cdn.bootcdn.net/ajax/libs/'
const CDN = {
  js: [
    `${url}vue/2.6.12/vue.min.js`,
    `${url}vue-router/3.0.3/vue-router.min.js`,
    `${url}vuex/3.0.1/vuex.min.js`,
    `${url}axios/0.20.0/axios.min.js`,
    `${url}echarts/4.8.0/echarts.min.js`,
    `${url}react/16.9.0/umd/react.development.js`,
    `${url}react-dom/16.9.0/umd/react-dom.development.js`,
  ],
}

const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    // libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              //less-loader@6+
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    vue: 'Vue',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'webpack plugin',
      cdn: CDN,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    // new BundleAnalyzerPlugin()
  ],
  //为了方便阅读理解打包后的代码，关闭代码压缩和模块合并
  optimization: {
    minimize: false,
    concatenateModules: false,
    splitChunks: {
      chunks: 'all',
      minSize: 100,
      cacheGroups: {
        libs: {
          name: 'libs',
          // test: /[\\/]node_modules[\\/](jquery|vue|vue-router)[\\/]/,
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
        },
        default: {
          name: 'default',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
