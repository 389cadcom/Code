const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = require('./webpack.dev.conf.js')
const prodConfig = require('./webpack.prod.conf.js')

//拼接路径、资源路径
function assetsPath(_path){
	return path.posix.join('static', _path);
}

let baseConfig = {
  // context: path.resolve(__dirname, '../'),
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: assetsPath('js/[name].js'),
    chunkFilename: assetsPath('js/[name].js')
  },
  resolve: {
    extensions: ['.js', '.css', '.json', '.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      template: path.resolve(__dirname, "..", "index.html"),
    })
  ]
}

function GenerateConfig(env){
  
  return baseConfig
}


module.exports = env => {
  let config = env == 'development' ? devConfig : prodConfig

  return merge(GenerateConfig(env), config)
}