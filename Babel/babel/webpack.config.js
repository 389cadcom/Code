const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { NODE_ENV, PORT, npm_config_port, VUE_APP_BASE_API, ANALYZE } = process.env
const defaultSetting = require('./src/setting')
const { cdnUrl, title, outputDir } = defaultSetting

//CDN处理 vue.global.js
var url = cdnUrl || 'https://cdn.bootcdn.net/ajax/libs/'

const CDN = {
  css:[],
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
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  react: 'React',
  'react-dom': 'ReactDOM'
}

const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/chunk.[name].js',
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
  externals: externals,
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: title || 'webpack plugin',
      cdn: CDN,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new BundleAnalyzerPlugin(),
  ],
  //为了方便阅读理解打包后的代码，关闭代码压缩和模块合并
  optimization: {
    minimize: false,
    concatenateModules: false,
    splitChunks: {
      chunks: 'all',
      // minSize: 100,
      minChunks: 1,
      cacheGroups: {
        common: {
          name: 'common',
          // test: /[\\/]node_modules[\\/](jquery|vue|vue-router)[\\/]/,
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
        libs: {
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash(.*)/,
          priority: 20,
        },
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/]antd(.*)/,
          priority: 15,
        },
        /* commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true,
        }, */
      },
    },
  },
}
