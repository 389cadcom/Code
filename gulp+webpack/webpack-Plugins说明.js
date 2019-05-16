new webpack.IgnorePlugin(/\.\/src\/jquery.js/)		
//忽略打包文件(路径为require中加载的路径), 使用script引入

//如果build目录使用CleanWebpackPugin插件会认为 webpack.config.js 所在的目录为项目的根目录, 需设置根目录
new CleanWebpack(['dist/assets/js', 'dist/index.html'], {			//删除指定文件
	root: path.resolve(__dirname, '../dist'),
	verbose: true																//控制台打印日志
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

//2. 自动生成HTML文件
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

new UglifyJsPlugin({
	uglifyOptions: {
		compress: {
			warnings: false
		}
	},
	cache: true,
	parallel: true,           //开启多线程压缩
	sourceMap: true
})
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


//webpack打包资源引用(相对路径、绝对路径)
publicPath, outputPath


//导出资源路径：js, css, img	   filename, name
output:{
	path: util.assertPath('dist'),
	//publicPath: '',
	filename: 'js/[name].[chunkhash].js'				//util.assertPath('js/[name].[chunkhash].js')
}



//TODO 样式引用图片  相对路径打包-- 
/**
	1.图片位于 dist/img/0.png, 
	2.样式位于 dist/css/app.css
	3.background-image: url(img/0.png)  相对位于 dist/css/img/0.png
	解决:
		a.url-loader设置 options.publicPath --> '../img'

		b.ExtractTextPlugin.extract的publicPath --> '../../'
		c.MiniCssTextPlugin设置 options:{ publicPath --> '../../' }

		File, URL配置options.publicPath高于extract.options
*/
use: ExtractTextPlugin.extract({
	fallback: 'vue-style-loader',
	use: ['css-loader', 'sass-loader'],
	publicPath: '../../'												//TODO: 若打包设置相对路径，css插件需设置引用图片路径
})
new ExtractTextPlugin({
	filename: 'css/[name].[contenthash].css',		//util.assertPath('css/[name].[contenthash].css')
	allChunks: true															//TODO 
}}
//提取多个样式
var extractVue = new ExtractTextPlugin('style/[name].css')
var extractSass = new ExtractTextPlugin('style/[name].css')


use: [
	{
		loader: MiniCssExtractPlugin.loader, 
		options: {
			publicPath: '../images'
		}
	},
	'css-loader'
]
new MiniCssExtractPlugin({
	filename: 'css/[name].[contenthash].css'
})

/**
 多页面打包同一个样式:
 需各入口引入样式base.css, common.css  -> style.css
 new ExtractTextPlugin('style.css')

 //Err:每个入口一个样式，共有样式会被重复打包, 多入口打包同一名称样式会出错
 new MiniCssExtractPlugin({
	filename: '[name].css'
 })
*/

//图片资源 -- 打包时webpack将background url内容替换成配置文件中options指定的路径, 同时将图片文件复制到options指定的路径下
rules: [
 {
	test: /\.(jpe?g|png|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		//publicPath: 'http://cdn.static.com',		//设置CDN路径
		publicPath: '../images/',
		outputPath: util.assertPath('images'),		//图片打包后存放的目录  --> 相对于dist路径下目录
		name: 'img/[name].[hash:7].[ext]'					//util.assertPath('img/[name].[hash:7].[ext]')
	}
 }
]
new CopyWebpackPlugin([{
	from: path.resolve(__dirname, '../static'),
	to: 'static'																//config.build.assetsSubDirectory
}])


html-url-loader, html-withimg-loader					//设置html中图片路径

image-webpack-loader													//压缩图片



//绝对路径--> /、相对路径 --> ./
1. /static				 
2. static/img/logo.png
3. src目录	使用相对引用


//FixMe: 
1.@import url('../asserts/style.css')		//只能抽取到当前chunk
2.import '../assert/style.css'					//通过CommonsChunkPlugin设置导出到公共样式中，/\.(css|less|scss)$/.test(module.resource) && count>=2


