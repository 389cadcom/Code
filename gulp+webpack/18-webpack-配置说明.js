//ES6
Babel(preset, plugin): 
babel-loader, babel-core
babel-preset-es2015, babel-preset-env

babel-plugin-transform-runtime, babel-runtime

babel-polyfill


//cross-env	开发、生产环境
1.sourcemap, 热更新(HotModuleReplacementPlugin)
2.压缩(UglifyJsPlugin), 
3.路径(output.publicPath), css-loader--minimize和autoprefixer参数


//webpack
id			  Chunk 的唯一标识，从0开始
name		  Chunk 的名称， filename: '[name]/entry.js'
hash		  Chunk 的唯一标识的 Hash 值，本次编译的一个hash版本
chunkhash	  Chunk 内容的 Hash 值
			  //当前chunk的一个hash版本,在同一次编译中，每一个chunk的hash都是不一样的, 但是两次编译中，如果某个chunk根本没有发生变化
[hash:8]	  //默认20位
contenthash   //ExtractTextWebpackPlugin, 文件内容算出的8位 hash

//plugins
1.webpack.optimize.CommonsChunkPlugin  //需配置多入口(entry)--对象方式

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
2.extract-text-webpack-plugin

ExtractTextPlugin.extract({		//options: loader|object
	use: 'css-loader',
	fallback: 'style-loader',
	publicPath: ''
})
new ExtractTextPlugin({			//options: filename|object
	filename: 'style.css',
	allChunks: true
})	
var extractVue = new ExtractTextPlugin('style/[name].css')
var extractSass = new ExtractTextPlugin('style/[name].css')


3.jquery第三方插件		//Externals用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块
a.script方式引入，全局$可用，eslint会报错('$' is not defined)
b.script方式引入，添加externals:{jquery: 'jQuery'} 配置，要使用时import $ from 'jquery'
  externals: {
	jquery: 'jQuery'		//把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery, JSON中引入module.exports = jQuery;
  }

c.配置 alias，import 引入后再使用
    resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			jquery: path.resove(__dirname, '/static/js/jquery')
		}
	}
d.在c的基础上，配置 plugins，无需 import 全局可用
    plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
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