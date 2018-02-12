 new BrowserSyncPlugin({
	// browse to http://localhost:3000/ during development,
	// ./public directory is being served
	host: 'localhost',
	port: 3000,
	proxy: 'localhost:8765'
}),
devServer: {
	contentBase: path.join(__dirname, 'dist'),
	publicPath: '/assets',
	host: "0.0.0.0",
	compress: true,
	hot: true
}



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