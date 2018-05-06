const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: {
        first: './src/first.js',
        second: './src/second.js',
        // vendor: ['vue', 'jquery']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js'
    },
    plugins: [
      /* new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor', 'runtime'],        
          filename: '[name].js',
          minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'utils',
        filename: '[name].js',
        chunks: ['first', 'second']
      }) */
      //1.先把所有入口模块抽取公共内容
      //从first.js和second.js中抽取commons chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: '[name].js',
        chunks: ['first','second']
      }),
      //2.再抽取第三方模块
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].js',
        //正则判断有哪些模块会被加入到vendor中
        minChunks: function (module,count) {
            console.log(module.resource,`引用次数${count}`);
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
            )
        }
      }),
      //3.最后抽出webpack运行的文件依赖内容
      new webpack.optimize.CommonsChunkPlugin({
          name: 'runtime',
          filename: '[name].js'
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html'
      })
    ]
}

module.exports = config;