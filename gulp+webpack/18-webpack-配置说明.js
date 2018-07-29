//ES6
Babel(preset, plugin): 
babel-loader, babel-core
babel-preset-es2015, babel-preset-env
babel-plugin-transform-runtime, babel-runtime
babel-polyfill

/*
babel7
@babel/core @babel/preset-env
babel-loader@last
*/

//cross-env	开发、生产环境  process.env.NODE_ENV
1.sourcemap, 热更新(HotModuleReplacementPlugin)
2.压缩(UglifyJsPlugin),													//mode: "production"
3.路径(output.publicPath), css-loader@0.28.0		//minimize和autoprefixer参数

//webpack  --config webpack.config.js  --color --progress 
webpack				//#最基本的启动webpack命令
webpack -w 			//#提供watch方法，实时进行打包更新watch
webpack -p			//#对打包后的文件进行压缩
webpack -d			//#提供SourceMaps，方便调试
webpack --colors	//#输出结果带彩色，比如：会用红色显示耗时较长的步骤
webpack --profile	//#输出性能数据，可以看到每一步的耗时
webpack --display-modules //#默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
webpack --display-error-details //#显示编译出错信息

--progerss：				会出现打包过程，有百分比进度条
--display-modules： 会把所有打包的模块列出来
--display-reasons： 会把打包的原因列出来


[id]				模块标识符(module identifier)
[name]			模块名称 [hash:8]	  
[query]			模块的 query，例如，文件名 ? 后面的字符串
[hash]			模块标识符(module identifier)的 hash, 本次编译的一个hash版本		//默认20位
[chunkhash]		chunk 内容的 hash(没改动则没有变化---设置线上缓存)

//当前chunk的一个hash版本,在同一次编译中，每一个chunk的hash都是不一样的,
//如果页面的文件没有发生改变，那么chunk的hash也不会发生改变，因此未改变的文件会在缓存中读取
contenthash   //ExtractTextWebpackPlugin, 文件内容算出的8位 hash

js		-- chunkhash				//根据js里的不同内容进行生成
img		-- hash							//每一个资源本身有自己的hash
css		-- contenthash			//extract插件的contenthash
//[name].[chunkhash:5]
//publicPath: 'http://cdn.example.com/assets/[hash]'


一.webpack.optimize.CommonsChunkPlugin  //需配置多入口(entry)--对象方式  4.x  splitChunks, runtimeChunk

//字符串方式-- 默认会把所有入口节点的公共代码提取出来
CommonsChunkPlugin('common.js')
								 
//有选择的提取公共代码
CommonsChunkPlugin('common.js', ['main', 'print'])

//对象传参--有选择提取
CommonsChunkPlugin({
	name:'common',
	//filename: 'common.js',
	chunks: ['main', 'print', 'user']
})

二.extract-text-webpack-plugin
ExtractTextPlugin.extract({		//options: loader|object
	fallback: 'style-loader',
	use: 'css-loader',
	publicPath: ''
})
new ExtractTextPlugin({			//options: filename|object
	filename: 'style.css',
	allChunks: true
})	
//提取多个样式
var extractVue = new ExtractTextPlugin('style/[name].css')
var extractSass = new ExtractTextPlugin('style/[name].css')


三.jquery第三方插件		//externals用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块

a).cdn方式引入，全局$可用，eslint会报错('$' is not defined) //注意: 不能放在</body>之后

b).cdn方式引入，import $ from 'jquery' | require('jquery')
//umd方式引入第三方插件 $.fn.green  ,jquery未被识别
externals: {
	jquery: 'jQuery'		//把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery, webpackJsonp中引入module.exports = jQuery;
}

//若入引入本地文件，则不能定义externals(排除定义的库打包入build.js)
c).配置别名：alias， --> 引入：import $ from jquery
    resolve: {
		alias: {
			@: './src',
			vue$: 'vue/dist/vue.esm.js',
			jquery: path.resolve(__dirname, '/static/js/jquery')
		}
	}
d.在c的基础上，配置 plugins，无需 import 全局即可用(碰到使用$, jQuery自动引入require('jquery')--alias指定路径)
  plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
e).分离打包第三方库 webpack.optimize.CommonsChunkPlugin
	//entry中定义入口，不打包的库
  entry: {   
		common: ['jquery']
	}
	

/*
引入bootstrap.min.js文件：
在main.js中import引入
import 'bootstrap/js/bootstrap.min.js'
import 'jquery.peity.min.js'

在mounted方法中使用
$("span.pie").peity("pie", {
	fill: ["#1ab394", "#d7d7d7", "#ffffff"]
})
*/