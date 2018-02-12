//1.
new CopyWebpackPlugin([{
    from: __dirname + '/src/public',
	to: 'assets/'
}]);
作用：把public 里面的内容全部拷贝到编译目录
/*
from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
to      定义要拷贝到的目标目录       from: __dirname + ‘/dist’
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

//6.
webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery'
})


//7.autoprefixer 插件配置
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