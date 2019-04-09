/** JS Tree Shaking, Css Tree Shanking, Split Code
 *
 * 1. 针对单页应用提取公共代码需要通过代码分割和懒加载
 * 2. 代码分割和懒加载是通过代码写法来实现，并不是通过webpack配置来实现。更多请见: ./src/page.js
			const page = () => import(/* webpackChunkName: 'page' */ "./src/page")
 */

//分包  https://segmentfault.com/a/1190000015919928#articleHeader9   花裤叉

/*
	基础类库：vendor --> vue, vue-router, vuex, axios
	UI库：		UI		 --> mint-ui, vux
	公用方法:	common -->	
											必要		路由表、全局 state --> 默认app.js
											非必要	
	低频组件:				 --> echarts

	业务组件:				 --> page = () => import(/* webpackChunkName: "home" /'@/pages/home.vue')

splitChunks: {
  chunks: 'async', 								可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async;
  minSize: 30000,									表示在压缩前的最小模块大小
  minChunks: 1,										表示被引用次数，默认为1；
  maxAsyncRequests: 5,						最大的按需(异步)加载次数，默认为5
  maxInitialRequests: 3,					最大的初始化加载次数
  automaticNameDelimiter: '~', 		打包块链接符
  name: true,
	cacheGroups: {}									缓存组
	
	priority:												缓存的优先级；
	test:														缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
	reuseExistingChunk: 						表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
 }
}

	async  : 1 只会抽取异步导入的模块如: const $ = () => import('jquery'), 同步引入模块被并入口文件中

	all		 : 2 同步、异步加载模块都被打包抽取-- 自定义公有组件包，另外打一个包(多个入口共同使用commons)
	initial: 3 若同一库给不同模块加载，分开优化打包异步和非异步模块--公有组件包, 同步加载打包一个, 异步加载打包一个

	默认设置initial , all模式会将所有来自node_modules的模块分配到一个叫vendors的缓存组(优先级为负)
	所有重复引用至少两次的代码，会被分配到default的缓存组
	自定义打包块优先级为0

	来自node_module模块 默认小于30k不会抽取为公共文件，包括css和js; 会被打包到具体使用它的页面 bundle
*/

optimization: {
	minimize: true,																	// [new UglifyJsPlugin({...})]
	minimizer: [																		//与mode设置有关  mode > minimizer
		new UglifyJsPlugin({													//Uglify-js不支持es6语法(uglify-es)，请使用terser-webpack-plugin插件
			cache: true,
			parallel: true,
			sourceMap: true,
			uglifyOptions: {
				warnings: false,													// 在UglifyJs删除没有用到的代码时不输出警告
				output: {
					comments: false,												// 删除所有的注释
					beautify: false													// 最紧凑的输出
				},
				compress: {
						drop_console: true,										// 删除所有的 `console` 语句
						collapse_vars: true,									// 内嵌定义了但是只用到一次的变量
						reduce_vars: true,										// 提取出出现多次但是没有定义成变量去引用的静态值
				}
			}
		}),
		new OptimizeCssAssetsPlugin()									//css
	],
	//针对第三方库通过设置priority先被打包提取，最后再提取剩余业务中公共代码
	splitChunks: {
		chunks: "initial",														//默认，其他initial, all 自node_modules的分配到vendors的缓存组, 重复两次分配到default的缓存组
		cacheGroups: {																//自定组优先级为0, 默认打包块vendors（优先级为负）
			vendor: {                                   //只打包初始时依赖的第三方 vue + vue-router + vuex + axios
				name: 'vendor',
				chunks: 'initial',
				priority: -10,
				test: /[\\/]node_modules[\\/]/,
			},
			vux: {                                      //在node_modules基础上继续分离
				name: 'vux-UI',
				priority: 10,															//权重要大于 vendor 和 app 不然会被打包进 vendor 或者 app
				test: /node_modules\/vux/,
			},
			commons: {                                  //抽取公用 自定义与第三方 (注意：不是初始时使用--App, Home中组件使用)
				name: 'commons',
				minChunks: 2,															//被依赖超过两次的 chunk 都分离到commons
				priority: -20,
			},
			echarts: {																	//对echarts进行单独优化，优先级较高
				name: 'echarts',
				chunks: 'all',
				priority: 30,
				test: function(module){
					var context = module.context
					return context && context.includes('echarts') || context.includes('zrender')
				}
			},
			styles: {																		//样式抽取打包
				name: 'styles',
				test: /\.css/,
				chunks: 'initial',
				enforce: true															
			},
			default: {//cacheGroups重写继承配置，				
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	},
	runtimeChunk: {
		name: 'runtime.js'
	}
}

//webpack4优化
minimize						 --> webpack.optimize.UglifyJsPlugin()
concatenateModules   --> webpack.optimize.ModuleConcatenationPlugin()
noEmitOnErrors			 --> webpack.optimize.NoEmitOnErrorsPlugin()      //编译错误时不打印输出资源


pulugins: [
	// 解决moment语言包问题
	new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/,	/^\.\/(zh-cn)$/),

	//多入口html文件引用js, chunks
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, src, 'index.html'),
		filename: 'index.html',
		chunk: ['index', 'vendor'],
		hash: true,
		minify: {
			removeAttributeQuotes:true//压缩 去掉属性引号
		}
	}),

	new webpack.ProvidePlugin({
		_: 'lodash'
	})
]


//11-27日
//webpack3   webpack.optimize.CommonsChunkPlugin
/*
new webpack.optimize.CommonsChunkPlugin({
		name: ['vendor', 'runtime'],        
		filename: '[name].js',
		minChunks: Infinity
}),
new webpack.optimize.CommonsChunkPlugin({
	name: 'utils',
	filename: '[name].js',
	chunks: ['first', 'second']
}) 
*/

//1.先把所有入口模块抽取公共内容
//从first.js和second.js中抽取commons chunk
new webpack.optimize.CommonsChunkPlugin({
	name: 'common',
	filename: '[name].js',
	chunks: ['first','second']
}),

//2.再抽取第三方模块
new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	filename: '[name].js',
	//正则判断有哪些模块会被加入到vendor中
	minChunks: function (module,count) {
			console.log(module.resource,`引用次数${count}`);
			return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
			)
	}
}),
//3.最后抽出webpack运行的文件依赖内容
new webpack.optimize.CommonsChunkPlugin({
		name: 'runtime',
		filename: '[name].js'
}),