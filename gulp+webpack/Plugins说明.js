//1.
new CopyWebpackPlugin([{
    from: __dirname + '/src/public',
	to: 'assets/'
}]);
作用：把public 里面的内容全部拷贝到编译目录
/*
from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
to      定义要拷贝到的目标目录       to: __dirname + ‘/dist’
toType  file 或者 dir         		 可选，默认是文件
force   强制覆盖先前的插件           可选 默认false
context                         	 可选 默认base context可用specific context
flatten 只拷贝文件不管文件夹         默认是false
ignore  忽略拷贝指定的文件           可以用模糊匹配
*/

//2.
new HTMLPlugin({
	title: 'index Demo',
	template:  './index.html',
	filename: 'index.html',
	inject:"body",					//true | head | body
	//hash: true,					//?hash
	chunks: ['index', 'libs']
})
//参数
/*
  title:	设置title的名字   
  filename: 设置这个html的文件名   
  template:	要使用的模块的路径  
  inject:	把模板注入到哪个标签后 'body',   
  favicon:	给html添加一个favicon  './images/favico.ico',   
  minify:	是否压缩  {...} | false （最新api变动，原来是ture|false 感谢@onmi指正) html-minifier
  hash:		是否hash化 true false ,     
  cache:	是否缓存,   
  showErrors:是否显示错误,  
  chunks:	模板对应上面那个节点
  xhtml:	是否自动关毕标签 默认false  
*/

//3.配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识
new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': "'production'"
	}
})

//4.压缩代码
new UglifyJsPlugin({
	beautify: true,
	compress: {warnings: false},
	output: {comments: true},
	mangle:{
		except:['$']
	}
})
//美化不压缩
new UglifyJsPlugin({
	beautify: true,
	mangle: false
});
/*
parse			解释
compress		压缩
mangle			混淆   -- 默认为true；指定为false时，表示不进行混淆压缩.
beautify		美化
minify			最小化
CLI				命令行工具
sourcemap		编译后代码对源码的映射，用于网页调试
AST				抽象语法树
name			名字，包括变量名、函数名、属性名
toplevel		顶层作用域
unreachable		不可达代码
option			选项
STDIN			标准输入，指在命令行中直接输入
STDOUT			标准输出
STDERR			标准错误输出
side effects	函数副作用，即函数除了返回外还产生别的作用，比如改了全局变量
*/

//5.抽取公用代码
new CommonsChunkPlugin("common.js")
new CommonsChunkPlugin("common.js", ['index', 'login'])		//只提取index节点和login节点
new CommonsChunkPlugin({
	name:'common',		//不要后缀
	chunks: ['index', 'login']
})

//6.不需要手动导入
webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery'
})


//7.autoprefixer 插件配置  webpack2 loader不支持use
new webpack.LoaderOptionsPlugin({
	options: {
		postcss: function(){
			return [
				require("autoprefixer")({
					browsers: ['ie>=8','>1% in CN']
				})
			]
		}
	}
})

//ExtractTextWebpackPlugin
ExtractTextPlugin.extract({
	use: [],
	fallback: 'style-loader'
})
new ExtractTextPlugin({
	filename: utils.assetsPath('css/[name].css'),
	allChunks: true				//将所有额外的chunk都压缩成一个文件
})
//FixMe: 
1.@import url('../asserts/style.css')		//只能抽取到当前chunk
2.import '../assert/style.css'				//通过CommonsChunkPlugin设置导出到公共样式中，/\.(css|less|scss)$/.test(module.resource) && count>=2

//8.webpack-dev-server
devServer: {
	// --告诉服务器从哪里提供内容。这只有在您想要提供静态文件时才需要。例如图片？？
	contentBase: path.join(__dirname, 'dist'),
	// contentBase: false,
	// --告诉服务器观看由devServer.contentBase选项提供的文件。文件更改将触发整个页面重新加载。
	watchContentBase: true,
	// --随所有内容启用gzip压缩
	compress: true,
	port: 9997,
	host: '0.0.0.0',
	// --这个是使用热更新的标志，然后并不提供热更新功能，需要引入hotModule
	// hot:true, 不加入HotModuleReplacementPlugin，因为API无法访问您的webpack配置
	// --hot添加它。 （因为CLI可以访问您的webpack配置）
	hot: true,
	// --在构建失败的情况下，启用热模块替换（请参阅devServer.hot）而不刷新页面作为回退。
	hotOnly: true,
	// --devtool控制台显示信息
	clientLogLevel: 'none', //none, info, (warning,error 一直有）
	// --延迟编译，对于异步模块，只有在请求时才会编译，在生产中不需要
	lazy: true,
	filename: "bundle.js",
	// --为所有请求添加请求头
	headers: {
		"X-Custom-Foo": "bar"
	},
	// --使用HTML5 History API时，系统可能会放送index.html网页来取代404回应
	historyApiFallback: true,
	/*historyApiFallback: {
	   rewrites: [
		 { from: /^\/$/, to: '/views/landing.html' },
		 { from: /^\/subpage/, to: '/views/subpage.html' },
		 { from: /./, to: '/views/404.html' }
	   ]
	}*/
	https: true, //使用https协议
	// --在开发服务器的两种不同模式之间切换(--inline, --iframe)。默认情况下，将使用内联模式启用应用程序。这意味着一个脚本将插入到您的包中以处理实时重新加载，并且构建消息将显示在浏览器控制台中。
	inline: true,
	// --隐藏webpack打包是的信息
	noInfo: true,
	// --使用代理，需要 http-proxy-middleware  代理包,连接后台接口的时候使用
	proxy: {
		"/api": "http://localhost:3000"
	    /*"/api": {
			target: "http://localhost:3000",
			pathRewrite: {"^/api" : ""},
			secure: false
	    }*/
	},
	public: "myapp.test:80",
	// --也是静态文件的目录， 相当于 output.publicPath
	publicPath: "/assets/",
	// --启用安静功能后，除了初始启动信息之外的任何内容都将写入控制台。这也意味着来自webpack的错误或警告不可见。
	quiet: true
}