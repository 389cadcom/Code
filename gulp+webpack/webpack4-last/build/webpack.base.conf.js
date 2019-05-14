const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin  = require('copy-webpack-plugin')

//拼接路径、资源路径
function assetsPath(_path) {
  return path.posix.join('static', _path);
}

//root--默认为执行启动webpack时所在的当前工作目录   
//npx webpack-dev-server --config=webpack.dev.conf.js找不到路径


let baseConfig = {
  // context: path.resolve(__dirname, '../src'),
  entry: {
    index: './src/index.js'
  },
  output: {
    publicPath: './',                                            //css, js资源路径设置
    path: path.resolve(__dirname, '../dist'),
    filename: assetsPath('js/[name].js'),
    chunkFilename: assetsPath('js/[name].js')
  },
  resolve: {
    extensions: ['.js', '.css', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,                         //样式有使用的相对路径的图片存入, imgs中
        loader: 'file-loader',
        options: {
          name: assetsPath('imgs/[name].[ext]'),
          publicPath: '../',                                   //引用资源(cdn)的路径添加前缀
          // outputPath: 'static',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
      verbose: false
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      template: path.resolve(__dirname, "..", "index.html"),
    }),
    new CopyWebpackPlugin([{
      from: './static',
      to: './static'
    }])
  ]
}


module.exports = baseConfig