/**
	optimize.CommonsChunkPlugin抽取
	1.默认全部打包一个包
	2.创建多个Common则从第一个包中分离出相应的文件
	3.
*/
//1.入口需明确指定第三方库 chunk，若没指明则合并到第一个chunk name --> utils
entry: {
  vendor: ['jquery']
}
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
		minChunks: (module, count)=>{
			return module.resource && /node_modules/.test(module.resource)					//所有 node_modules 下的文件
		}
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
//module.resource    模块文件绝对路径
//module.context		 模块文件目录

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
	//从node_module中抽取vue-相关文件
	new webpack.optimize.CommonsChunkPlugin({
		return (
			module.resource && 
			/\.js$/.test(module.resource) && 
			module.resource.includes('node_modules') && 
			module.context.includes('vue')
		)
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