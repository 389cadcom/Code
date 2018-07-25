//7.25 webpack4  
//css-loader@1.0.0  extract-text-webpack-plugin@last ==>  4.0 beta
//optimize-css-assets-webpack-plugin
//提取压缩样式   
rules: [
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
				loader: 'css-loader',
				options: {										//TODO 4.x无法压缩
					minimize: true
				}
			}]
		}),
		//MiniExtractPlugin
		use: [ MiniExtractPlugin.loader, 'css-loader' ]
	}
]
//压缩配置
plugins: [
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin()
		]
	}
]

//webpack3  
//css-loader@0.28.0  extract-text-webpack-plugin@3.0.2

1.ExtractTextPlugin
//ExtractTextPlugin.extract(options: loader | object)		--> fallback, use, publicPath
//new ExtractTextPlugin(options: String | object)				--> filename, allChunks

//数组，对象
use: ExtractTextPlugin.extract({
	use: [{																				  //use: ['css-loader?minimize', 'sass-loader']
		loader: 'css-loader',
		options: {
			minimize:true,
			camelCase: true
		}
	},{
		loader: 'sass-loader',												//3.对象型式
		options: { 
			sourceMap: true
		}
	}]
})
rules: [
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: 'css-loader'														//1.字符型式
		})
	},
  {
		test:/\.scss$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'sass-loader']					//2.数组型式
		})
	}
]
//3.数组->对象(配置--loader, options)
{
	test: /\.css$/,
	//use: ['style-loader', 'css-loader?minimize'], //1.字符型式
	use: [
		{ loader: 'style-loader' },										//2.对象型式
		{
			loader: 'css-loader',
			options: {
				modules: true
			}
		}
	]
}


2.devServer		//默认实时预览--socket刷新网页
//参数			webpack  --config webpack.dev.js
--hot			//只能配参数，重启 DevServer 后再去更新文件就能体验到模块热替换
--watch			//DevServer默认开启， webpack  --watch开启监听模式，entry 为入口去递归解析出 entry 所依赖的文件
--devtool source-map   //开启调试代码  chrome source
--open			//自动打开页面

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


3.resolve		//配置别名 alias, 省略后缀 extensions
alias:
react$ 只会命中以 react 结尾的导入语句
//即只会把 import 'react' 关键字替换成 import '/path/to/react.min.js'


4.第三方库、样式引用
1).JS中导入
	import jquery from 'jquery'
	import 'vux/src/styles/1px.less'

2).样式中引用
	@import '../../node_modules/weui/src/style/icon/weui-font.less';