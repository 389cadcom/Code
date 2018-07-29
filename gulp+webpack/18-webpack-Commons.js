//7.23
splitChunks: {
  chunks                : "initial",      //必须三选一： "initial" | "all"(默认就是all) | "async" 
  minSize               : 0,              //最小尺寸，默认0
  minChunks             : 1,              //最小 chunk ，默认1
  maxAsyncRequests      : 1,              //最大异步请求数， 默认1
  maxInitialRequests    : 1,              //最大初始化请求书，默认1
  name                  : function () {}, //名称，此选项可接收 function
  cacheGroups           : {               //这里开始设置缓存的 chunks
    priority            : 0,              //缓存组优先级
    vendor              : {               //key 为entry中定义的 入口名称
      chunks            : "initial",      //必须三选一： "initial" | "all" | "async"(默认就是异步)
      test              : /react|lodash/, //正则规则验证，如果符合就提取 chunk
      name              : "vendor",       //要缓存的 分隔出来的 chunk 名称
      minSize           : 0,
      minChunks         : 1,
      enforce           : true,
      maxAsyncRequests  : 1,              //最大异步请求数， 默认1
      maxInitialRequests: 1,              //最大初始化请求书，默认1
      reuseExistingChunk: true            //可设置是否重用该chunk（查看源码没有发现默认值）
    }
  }
}



//1.入口需明确指定第三方库 chunk，若没指明则合并到第一个chunk name --> utils
entry: {
  vendor: ['jquery']
}
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['utils', 'vendor', 'runtime'],
    filename: '[name].js',
  }),
]

//2.通过依赖方式，等价第一种方式，数组分开写法
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'utils',
    filename: '[name].js',
    chunks: ['first', 'second']
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime',
    filename: '[name].js',
    chunks: ['vendor']
  }),
]

//3.不需要指定第三方库内容， 正则判断引入node_modules的第三方库
plugins: [
  //1.先把所有入口模块抽取公共内容
  //从first.js和second.js中抽取commons chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: '[name].js',
    chunks: ['first', 'second']
  }),
  //2.再抽取第三方模块
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js',
    //正则判断有哪些模块会被加入到vendor中
    minChunks: function (module, count) {
      console.log(module.resource, `引用次数${count}`);
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
]

//4.minChunks函数，正则判断自定义的引入逻辑文件-->打包成工具模块
plugins: [
  //抽取第三方库内容
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  //定义抽取--逻辑公共代码模块
  new webpack.optimize.CommonsChunkPlugin({
    name: 'utils',
    minChunks: function (module, count) {
      console.log(module.resource, module.context.indexOf('assets'));
      return (
        module.context &&
        /\.js$/.test(module.resource) &&
        module.context.indexOf('assets') !== -1
      )
    }
  }),
  //抽取运行时所需的文件manifest--> runtime
  new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity
  })
]

//5.多页面抽取公共引入样式
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks(module, count) {
      // any required modules inside node_modules are extracted to vendor
      //node_modules所需的模块会被提出到公共文件
      console.log(module.resource, count);

      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../node_modules')
        ) === 0 || /\.(css|less|scss)$/.test(module.resource) && count >= 2
      )
    }
  })
]