/** JS Tree Shaking, Css Tree Shanking, Split Code
 *
 * 1. 针对单页应用提取公共代码需要通过代码分割和懒加载
 * 2. 代码分割和懒加载是通过代码写法来实现，并不是通过webpack配置来实现。更多请见: ./src/page.js
			const page = () => import(/* webpackChunkName: 'page' */ "./src/page")
 */
 module.exports = {
	output: {
		path: path.resolve('dist'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].[chunk].js'
	}
}


//分包  https://segmentfault.com/a/1190000015919928#articleHeader9   花裤叉

//初始化依赖： main.js, App.vue, Home.vue
/*
	基础类库：vendor --> vue, vue-router, vuex, axios
	UI库：		UI		 --> mint-ui, vux
	公用方法:	common -->	
											必要		路由表、全局 state --> 默认app.js
											非必要	
	低频组件:				 --> echarts

	业务组件:				 --> page = () => import(/* webpackChunkName: "home" */'@/pages/home.vue')
//*/
/**
	chunks:							表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
	minSize:						表示在压缩前的最小模块大小，默认为0；
	minChunks:					表示被引用次数，默认为1；
	maxAsyncRequests:		最大的按需(异步)加载次数，默认为1；
	maxInitialRequests:	最大的初始化加载次数，默认为1；
	name:								拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
	cacheGroups:				缓存组
	priority:						表示缓存的优先级；
	test:								缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
	reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。

	条件：(小于 30kb 的情况下会被打包到具体使用它的页面 bundle)
		模块被重复引用或者来自node_modules中的模块
		在压缩前最小为30kb
		在按需加载时，请求数量小于等于5
		在初始化加载时，请求数量小于等于3

	initial: 3 若同一库给不同模块加载，分开优化打包异步和非异步模块--公有组件包, 同步加载打包一个, 异步加载打包一个
	all		 : 2 同步、异步加载都被打包抽取-- 公有组件包，被异步加载的库另外打一个包(多个入口共同使用)

	async  : 1 默认方式--只打包异步导入的模块  如: const $ = () => import('jquery'), 同步被并入入口文件中

	默认(initial, all--default)打包块vendors（优先级为负）
  自定义打包块优先级为0
*/

//说明： https://juejin.im/post/5b99b9cd6fb9a05cff32007a
//来自node_module模块 默认小于30k不会抽取为公共文件，包括css和js
//splitChunk默认值,  minimizer配置
optimization: {
	minimize: true,																	// [new UglifyJsPlugin({...})]
	minimizer: [																		//与mode设置有关  mode > minimizer
		new UglifyJsPlugin(
			cache: true,
			parallel: true,
			sourceMap: false
		})
		new OptimizeCssAssetsPlugin()									//css
	],
	splitChunks: {
		chunks: "async",															//默认，其他initial, all 自node_modules的分配到vendors的缓存组, 重复两次分配到default的缓存组
		minSize: 30000,
		minChunks: 1,
		maxAsyncRequests: 5,													//异步请求的chunks不应该超过此值
		maxInitialRequests: 3,												//entry文件请求的chunks不应该超过此值（请求过多，耗时）
		automaticNameDelimiter: '~',									//自动命名连接符
		name: true,
		cacheGroups: {																//自定组优先级为0, 默认打包块vendors（优先级为负）
			commons: {
				name: 'commons',
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			},
			styles: {
				name: 'styles',
				test: /\.css/,
				chunks: 'initial',
				enforce: true															//TODO
			},
			default: {//cacheGroups重写继承配置，				
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	}
}

//打包第三方、自定义公共方法
//案例
optimization: {
	minimize: true,																	// [new UglifyJsPlugin({...})]
	minimizer: [
		new UglifyJsPlugin(
			cache: true,
			parallel: true,
			sourceMap: false
		})
	],
	splitChunks: {
		chunks: "all",
		cacheGroups: {
			vendor: {                                   //只打包初始时依赖的第三方 vue + vue-router + vuex + axios
				name: 'vendor',
				chunks: 'initial',
				priority: 10,
				test: /node_modules/,
			},
			vux: {                                      //单独将 UI 拆包
				name: 'vux-UI',
				priority: 20,															//权重要大于 vendor 和 app 不然会被打包进 vendor 或者 app
				test: /node_modules\/vux/,
			},
			commons: {                                  //抽取公用 自定义与第三方   注意：不是初始时使用--App, Home中组件使用
				name: 'commons',
				minChunks: 2,      
				priority: 5,
			},
			echarts: {																	//对echarts进行单独优化，优先级较高
				name: 'echarts',
				chunks: 'all',
				priority: 30,
				test: function(module){
					var context = module.context
					return context && context.includes('echarts') || context.includes('zrender')
				}
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

optimization: {
	minimizer: true,
	providedExports: true,
	usedExports: true,

	//识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
	//依赖于optimization.providedExports和optimization.usedExports
	sideEffects: true,
	concatenateModules: true,
	noEmitOnErrors: true,

	splitChunks: {
		chunks: 'initial',				//'all'|'async'|'initial'(全部|按需加载|初始加载)的chunks
	},
	
	//提取webpack运行时的代码
	runtimeChunk: {
		name: 'manifest'
	}
}

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