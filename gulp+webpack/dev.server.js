Hammer.JS, lazy.js


 
 ( ) autoprefixer devDep                        7.2.6    ❯  9.1.5   https://github.com/postcss/autoprefixer#readme
 ( ) babel-loader devDep                        7.1.5    ❯  8.0.4   https://github.com/babel/babel-loader
 ( ) css-loader devDep                          0.28.11  ❯  1.0.0   https://github.com/webpack-contrib/css-loader
 ( ) file-loader devDep                         1.1.11   ❯  2.0.0   https://github.com/webpack-contrib/file-loader
 ( ) html-webpack-plugin devDep                 2.30.1   ❯  3.2.0   https://github.com/jantimon/html-webpack-plugin
 ( ) optimize-css-assets-webpack-plugin devDep  3.2.0    ❯  5.0.1   http://github.com/NMFR/optimize-css-assets-webpack-plugin
 ( ) ora devDep                                 1.4.0    ❯  3.0.0   https://github.com/sindresorhus/ora#readme
 ( ) postcss-import devDep                      11.1.0   ❯  12.0.0  https://github.com/postcss/postcss-import#readme
 ( ) postcss-loader devDep                      2.1.6    ❯  3.0.0   https://github.com/postcss/postcss-loader#readme
 ( ) postcss-url devDep                         7.3.2    ❯  8.0.0   https://github.com/postcss/postcss-url#readme
 ( ) uglifyjs-webpack-plugin devDep             1.3.0    ❯  2.0.1   https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 ( ) url-loader devDep                          0.5.9    ❯  1.1.1   https://github.com/webpack-contrib/url-loader
 ( ) vue-loader devDep                          13.7.3   ❯  15.4.2  https://github.com/vuejs/vue-loader
 ( ) vue-style-loader devDep                    3.1.2    ❯  4.1.2   https://github.com/vuejs/vue-style-loader#readme
 ( ) webpack devDep                             3.12.0   ❯  4.20.2  https://github.com/webpack/webpack
 ( ) webpack-bundle-analyzer devDep             2.13.1   ❯  3.0.2   https://github.com/webpack-contrib/webpack-bundle-analyzer
 ( ) webpack-dev-server devDep                  2.11.3   ❯  3.1.9   https://github.com/webpack/webpack-dev-server#readme

//只读
Object.defineProperty(Vue.prototype, '$xxx', { value: xxx });

//检查
npm-check
npm outdated

//代理 devServer
proxy: {
	'/api': {
		target: 'http://api.csdn.com/api',
		changeOrigin: true,
		pathRewrite: {
			'^/api': ''
		}
	}
}
//ng
location /api {
	proxy_pass http://api.csdn.com/api;

}


//webpack使用环境变量
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


//导出路径：js, css, img  extract-text-webpack-plugin@next版本-->出现报contenthash错误  
output:{
	path: 'dist',
	filename: 'js/[name].[chunkhash].js'				//util.assertPath('js/[name].[chunkhash].js')
}

//样式引用图片
use: ExtractTextPlugin.extract({
	use: ['css-loader', 'sass-loader'],
	fallback: 'vue-style-loader',
	publicPath: '../../'												//TODO: 若打包设置相对路径， css中引用图片路径设置
})

new ExtractTextPlugin({
	filename: 'css/[name].[contenthash].css',		//util.assertPath('css/[name].[contenthash].css')
	allChunks: true
}}
new MiniCssExtractPlugin({
	filename: 'css/[name].[contenthash].css'
})


rules: {
	test: /\.(jpe?g|png|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		name: 'img/[name].[hash:7].[ext]'					//util.assertPath('img/[name].[hash:7].[ext]')
	}
}

new CopyWebpackPlugin({
	from: path.resolve(__dirname, '.../static'),
	to: 'static'																//config.build.assetsSubDirectory
})

//绝对路径--> /、相对路径 --> ./
1./static				 
2.static/img/logo.png


//分包 -- https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc
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

	initial: 若同一库给不同模块加载，分开优化打包异步和非异步模块--同步加载打包一个, 异步加载打包一个
	all		 : 则打同步、异步加载打包在一起
	async  : 

	默认打包块vendors（优先级为负）
  自定义打包块优先级为0
*/
optimization: {
	minimize: true,																	// [new UglifyJsPlugin({...})]
	splitChunks: {
		chunks: "all",
		cacheGroups: {
			vendor: {                                   //只打包初始时依赖的第三方 vue + vue-router + vuex + axios
				name: 'vendor',
				chunks: 'initial',
				priority: 10,
				test: /[\\/]node_modules[\\/]/,
			},
			vux: {                                      //单独将 UI 拆包
				name: 'vux-UI',
				priority: 20,															//权重要大于 vendor 和 app 不然会被打包进 vendor 或者 app
				test: /[\\/]node_modules[\\/]vux[\\/]/,
			},
			commons: {                                  //抽取公用 自定义与第三方   注意：不是初始时使用--App, Home中组件使用
				name: 'commons',
				minChunks: 2,      
				priority: 5,
			}
		}
	},
	runtimeChunk: {
		name: 'runtime.js'
	}
}
splitChunks: {
	chunks: 'all',
	cacheGroups: {
		commons: {					//自定义打包块优先级为0
			name: "commons",
			minChunks: 2,
		},
		libs: {
			name: 'libs',
			test: /vue/,
			chunks: 'initial',
			priority: 10
		}
	}
}
optimization: {
	splitChunks: {
		chunks: 'all',
		cacheGroups: {
			vendor: {												// 抽离第三方插件
					test: /node_modules/,				// 指定是node_modules下的第三方包
					chunks: 'initial',
					name: 'vendor',							// 打包后的文件名，任意命名    
					priority: 10								// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
			},
			utils: {												// 抽离自己写的公共代码，utils这个名字可以随意起
					chunks: 'initial',
					name: 'utils',							// 任意命名
					minSize: 0									// 只要超出0字节就生成一个新包
			},
			commons: {                      //抽取公用 自定义与第三方   注意：不是初始时使用--App, Home中组件使用
				name: 'commons',
				minChunks: 2,      
				priority: 5,
			}
		}
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
]



/*
	10.10日
	extract-text-webpack-plugin					//optimization -> splitChunks -> cacheGroups设置打包 css
	mini-css-extract-plugin							//按需加载chunk打包 css

*/

import List from '@/pages/list.vue'

const Me = () => import(/* webpackChunkName: "bundler" */ '@/pages/me.vue')