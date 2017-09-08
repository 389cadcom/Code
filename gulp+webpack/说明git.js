//webpack --config xx.js  使用另一份配置文件来打包, 默认使用webpack.config.js


//1.一个入口文件  所有模块都会在启动时加载，并且导出最后一个
entry: ["./entry1", "./entry2"]

//2.多个入口文件  传入一个对象：多个入口会被创建
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/built'
  }
}
// 输出为: ./built/app.js, ./built/search.js


//输出文件在浏览器环境访问的中路径
output: {
  path: "/home/proj/public/assets",
  publicPath: "/assets/"				
}

module.loaders
/*
test: 一个必须满足的条件
exclude: 一个排除的条件
include: 要用Loader转换的导入文件的路径数组
loader: 一个用"！"隔开 loader的字符串
loaders: 一个loader字符串的数组
*/
//3.ES6转换      babel-loader
				 loader: 'babel-loader?presets[]=es2015&presets[]=react'
				 loader, query
//4.样式loader   style-loader, css-loader  postcss: [request('autoprefixer')] {browsers:['last 2 versions']}

//css-loader 使你能够使用类似@import 和 url(…)的方法实现 require()的功能


//5.css module
				{test: /\.css$/, loader:'style!css?modules'}

//6.图片loader, file-loader  url-loader  image-webpack-loader   
				{
					test: /\.(png|jpg|gif)$/, loader:'url?limit=8192',
					query: {
						limit: 4000,
						name: '/assets/[name]-hash-[ext]'
					}
				}

//7.UglifyJs插件
				webpack.optimize.UglifyJsPlugin
				new UglifyJsPlugin({
					beautify: true,
					compress: {warnings: false},
					output: {comments: true},
					mangle:{
						except:['$']
					}
				})

//8.html-webpack-plguin
				new HtmlWebpackPlugin({
					title: 'App Demo',
					template:  __dirname + '/tmpl/index.html',
					filename: __dirname + '/dist/index.html',
					inject:"body",											//定制生成的脚本放在那个地方
					hash: true,
					chunks: ['index', 'common.js']			//模板对应上面那个节点
				}),
/*
  title:	设置title的名字   
  filename: 设置这个html的文件名   
  template:	要使用的模块的路径  
  inject:	把模板注入到哪个标签后 'body',   
  favicon:	给html添加一个favicon  './images/favico.ico',   
  minify:	是否压缩  {...} | false （最新api变动，原来是ture|false 感谢@onmi指正)
  hash:		是否hash化 true false ,     
  cache:	是否缓存,   
  showErrors:是否显示错误,  
  chunks:	模板对应上面那个节点
  xhtml:	是否自动关毕标签 默认false  
 */


//9.提取公共内容插件 CommonsChunkPlugin
				webpack.optimize.CommonsChunkPlugin
/*
默认会把所有入口节点的公共代码提取出来,生成一个common.js
有选择的提取公共代码
对象方式传参
*/
				new CommonsChunkPlugin("common.js")
				new CommonsChunkPlugin("common.js", ['index', 'login'])		//只提取index节点和login节点
				new CommonsChunkPlugin({
					name:'common',		//不要后缀
					chunks: ['index', 'login']
				})

//10.全局挂载插件, 第三方库抽取
		//a.在当前导入$
		//b.做为全局变量，每个模块都能使用 
		//c.当模块用到这些变量时webpack会自动给注入进模块来
		webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})

//11.导入库, 打包到bundle里面
import $ from 'jQuery';


//12.直接引用库，作为external lib从bundle里面分离出来
	   //1).webpack.config
	   externals:{
		  jquery: 'jQuery'				//$, jQuery, window.jQuery
	   }
	   //2).index.js
	   import $ from 'jquery'			//导入接口
		
	   //3).index.html					//引入第三方库
	   <script src="res/jquery.js"></script>

//13.vue文件配置,下是为了在.vue文件中使用ES6语法，以及把使用css或sass语法的样式提取出来
vue: {
    loaders: {
        js: 'babel', 
        css: ExtractTextPlugin.extract("css"),
        sass: ExtractTextPlugin.extract("css!sass")            
    },
}



loader配置:

//匹配以js结尾的文件
test: /\.js$/,
//使用babel-loader
loader: 'babel',
//为了解决加载速度的问题，可以排除不要扫描的文件夹
exclude: './node_modules',
//有时候排除了也无法解决问题，那就只能指定文件夹
include: './src/',
//如果上面的两个方法也没效果，使用node的方法指定绝对路径。
//1.引用node的api ，var path = require('path');
//2.exclude: path.resolve(__dirname , 'node_modules'),include: path.resolve(__dirname , 'src'),

//用query参数指定插件解析js。
query: {
	//解析js的特效 安装latest  npm install babel-preset-latest  --save-dev
	presets: ['latest']
}