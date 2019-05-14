const webpack = require('webpack')

let devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, "../dist/"),
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

module.exports = devConfig