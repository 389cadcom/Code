1.使用extract-text-webpack-plugin 生成单独的css时，可能会报错chunk.sortModules is not a function
//解决方案是回退extract-text-webpack-plugin版本号到2.1.2，npm i extract-text-webpack-plugin@2.1.2

2.一般的压缩js插件无法压缩es6，如果想对es6代码进行压缩，
//可以使用UglifyjsWebpackPlugin。

3.Unexpected token: name (doc)
//解决方案是将babel配置拿出来，不要放在webpack.config中，单独的放到.babelrc中。

4.使用了extract-text-webpack-plugin后无法进行css压缩？
//可以使用optimize-css-assets-webpack-plugin这一插件来解决。


webpack与gulp差别

webpack本质上是一个打包工具，支持CMD的语法，将多个互相依赖的js文件打包成一个js文件

gulp则是一个自动化工具，用来处理less编译，代码压缩这些，gulp的核心概念是管道，
所有文件在管道中流通，然后在流的过程中依次进行代码压缩，less编译等操作，最后再将这些文件流输出到指定目录



//loader、query与options可以是同一级，但use不能与options同一级使用
rules:[
	{test:/\.css$/, loader:'style-loader!css-loader' },						//loader链式
	{test:/\.css$/,  use:'style-loader!css-loader'},						//use链式
	{test:/\.css$/,  use:['style-loader', 'css-loader']},					//use数组

	{test:/\.css$/,  use:[{loader:'style-loader'}, {loader:'css-loader'}]},	//use数组对象

	{
	 test:/\.scss/,										//抽取文件use, fallback
	 use: ExtractTextPlugin.extract({
	    use:'css-loader!sass-loader',
		fallback: 'style-loader'
	 })
	}
]