const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let prodConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),
  ]
}

module.exports = prodConfig