new webpack.IgnorePlugin(/\.\/src\/jquery.js/)		
//忽略打包文件(路径为require中加载的路径), 使用script引入

//如果build目录使用CleanWebpackPugin插件会认为 webpack.config.js 所在的目录为项目的根目录, 需设置根目录
new CleanWebpack(['dist/assets/js', 'dist/index.html'], {			//删除指定文件
	root: path.resolve(__dirname, '../dist'),
	verbose: true
})

new PurifyCSS({
  verbose: true,
  minimize: true,
  paths: glob.sync([													//要做CSS Tree Shaking的路径文件
    path.resolve(__dirname, "./*.html"),
    path.resolve(__dirname, "./src/*.js")
  ])
});

//1.
new CopyWebpackPlugin([{
  from: __dirname + '/src/public',
	to: 'assets/'
}]);

//作用：把public 里面的内容全部拷贝到编译目录
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
new HtmlTextPlugin({
	title: 'index Demo',										//<title><%= htmlWebpackPlugin.options.title %></title>
	template:  './index.html',
	filename: 'index.html',
	inject:"body",					//true | head | body
	//hash: true,						//?hash
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
  hash:		是否使用hash true false ,     
  cache:	是否缓存,   
  showErrors:是否显示错误,  
  chunks:	模板对应上面那个节点(打包entry中的入口模块)
  xhtml:	是否自动关毕标签 默认false  
*/

//3.配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识

//webpack.configconfig 标识当前的环境
cross-env=devlopment  

//业务代码可以直接使用配置的标识, webpack4 使用mode: 'production'代替
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
new webpack.optimize.UglifyJsPlugin({
	mangle: { // 排除不想要压缩的对象名称
		except: ['$', 'exports', 'require', 'module']
	},
	compress: {
		// http://lisperator.net/uglifyjs/compress
		warnings: false,    // warn about potentially dangerous optimizations/code
		conditionals: true, // optimize if-s and conditional expressions
		unused: true,       // drop unused variables/functions
		comparisons: true,  // optimize comparisons
		sequences: true,    // join consecutive statements with the "comma operato"
		dead_code: true,    // discard unreachable code 丢弃未使用的代码
		evaluate: true,     // evaluate constant expressions
		join_vars: true,    // join var declarations
		if_return: true     // optimize if-s followed by return/continue
	},
	output: {
			// https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
			comments: false
	},
	sourceMap: false         //将错误信息的位置映射到模块。这会减慢编译的速度。仅在开发环境下使用。
}),

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
	jq: 'jQuery',					// 引用本地   alias: { jQuery$: path.resolve(__dirname, 'src/assets/js/jquery.js') }
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

//8.ExtractTextWebpackPlugin, 如果filename定义同一个名(style.css), 后打包会覆盖前面的样式
ExtractTextPlugin.extract({
	use: ['css-loader'],
	fallback: 'style-loader'
})
new ExtractTextPlugin({
	filename: utils.assetsPath('css/[name].css'),
	allChunks: true														//将所有额外的chunk都压缩成一个文件, false不打包异步加载的 CSS
})
//多个样式
let styleLess = new ExtractTextWebpackPlugin('css/style.css');
let resetCss = new ExtractTextWebpackPlugin('css/reset.css');

//9.添加splitChunks.cacheGroups.commons 可提取共用样式
commons: {						//共用样式style.css是被单独提取到commons
	name: 'commons',
	minSize: 0,
	minChunks: 2,
},

MiniCssExtractPlugin.loader
new MiniCssExtractPlugin({
	filename: "[name].css",
  chunkFilename: "[id].css"
})




//FixMe: 
1.@import url('../asserts/style.css')		//只能抽取到当前chunk
2.import '../assert/style.css'					//通过CommonsChunkPlugin设置导出到公共样式中，/\.(css|less|scss)$/.test(module.resource) && count>=2


//8.webpack-dev-server					当入口的js文件被修改，则会自动更新数据并刷新浏览器，使用style-loader将样式添加到js文件中
devServer: {
	// --告诉服务器从哪里提供内容。这只有在您想要提供静态文件时才需要。例如图片？？
	contentBase: path.join(__dirname, 'dist'),			//优于publicPath
	// contentBase: false,
	// --告诉服务器观看由devServer.contentBase选项提供的文件。文件更改将触发整个页面重新加载。
	watchContentBase: true,
	// --随所有内容启用gzip压缩
	compress: true,
	port: 9997,
	host: '0.0.0.0',
	// hot:true, plugins加入new HotModuleReplacementPlugin()，因为API无法访问您的webpack配置
	//--open --hot package.json设置不需要加入 hotModule
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

devServer: {
	proxy: { // 代理到后端服务接口
      '/api': 'http://localhost:3000'
    },
	open: true,
	https: false,
	historyApiFallback:true
}

//针对命中的路由时都返回一个HTML 文件  http://webpack.wuhaolin.cn/2配置/2-6DevServer.html
historyApiFallback: {
  // 使用正则匹配命中路由
  rewrites: [
    // /user 开头的都返回 user.html
    { from: /^\/user/, to: '/user.html' },
    { from: /^\/game/, to: '/game.html' },
    // 其它的都返回 index.html
    { from: /./, to: '/index.html' },
  ]
}
