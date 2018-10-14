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
			use: 'css-loader'														//1.字符型式,
			publicPath: '../'														//FIXME: 指定了publicPath路径, 可以根据相对路径引用到图片资源
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

//引入图片资源:  publicPath, outputPath  
3.file-loader, url-loader
{
	test: /\.(jpe?g|png|gif)$/,
	use: [{
		loader: 'url-loader',
		options: {
			limit: 8192,						// 小于8k的图片自动转成base64格式，并且不会存在实体图片
      outputPath: 'images/'   // 图片打包后存放的目录
		}
	}]
}
{
	test: /\.(eot|ttf|woff|svg)$/,
	use: 'file-loader'
}

// html-withimg-loader postcss-loader autoprefixer


4.第三方库、样式引用
1).JS中导入
	import jquery from 'jquery'
	import 'vux/src/styles/1px.less'

2).样式中引用
	@import '../../node_modules/weui/src/style/icon/weui-font.less';