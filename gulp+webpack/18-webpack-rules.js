1.rules
use: ['style-loader', 'css-loader'] //先使用 css-loader 读取 CSS 文件，再交给 style-loader 把 CSS 内容注入到JS里

use: ExtractTextPlugin.extract({
	use: [{
		loader: 'css-loader',
		fallback: 'vue-loader',
		options: {
			minimize:true,
			camelCase: true
		}
	}]
})



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