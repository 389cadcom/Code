//检查包的版本信息--
npm-check
npm outdated


app, vendor, manifest区别
/*
虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。
原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。
当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。

主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
*/


//只读
Object.defineProperty(Vue.prototype, '$xxx', { value: xxx });


//代理 devServer
proxy: {
	'/api': {
		target: 'http://api.csdn.com/api',
		changeOrigin: true,
		pathRewrite: {										//需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
			'^/api': ''											//将 ^/api替换为 ''
		}
	}
}
//ng
location /api {
	proxy_pass http://172.16.12.109:8083;
	proxy_redirect off;

}


//webpack4 使用环境变量 webpack --mode=production
module.exports = (env, argv) => {
	console.log(env, argv.mode);

	return {
		entry: {
			index: './src/index.js'
		},
		output: {
			filename: 'js/[name].js'
		},
		devServer: {
			historyApiFallback: true,
			noInfo: true,
			overlay: true,
			inline: true,
			progress: true, // 进度
		},
	}
}

//热更新、样式热更新   style-loader将样式添加到js文件中, css-hot-loader抽取样式热更新
//css 和 html 没有热更新的原因是没有进入到entry 入口，不在热跟新的检测范围内
//当webpack入口的js文件被修改，则会自动更新数据并刷新
devServer: {
	hot:true,
	host: 'localhost',
	port: 8080,
}
plugins: [
	new webpack.HotModuleReplacementPlugin(), //模块热更新
	new webpack.NamedModulesPlugin(),					//模块热更新
]

['css-hot-loader'].concat(ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: ['css-loader']
}))



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
