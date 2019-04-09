//检查包的版本信息--
npm-check
npm outdated


uglify-js@2, uglify-js@3 == uglify-es


app, vendor, manifest区别
/*
虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。
原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。
当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。

主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
*/


//只读
Object.defineProperty(Vue.prototype, '$xxx', { value: xxx });


//代理 devServer
proxy: {
	'/api': {
		target: 'http://api.csdn.com/api',
		changeOrigin: true,
		pathRewrite: {										//需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
			'^/api': ''											//将 ^/api替换为 ''
		}
	}
}
//ng
location /api {
	proxy_pass http://172.16.12.109:8083;
	proxy_redirect off;

}


//webpack4 使用环境变量 webpack --mode=production
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

//热更新、样式热更新   style-loader将样式添加到js文件中, css-hot-loader抽取样式热更新
//css 和 html 没有热更新的原因是没有进入到entry 入口，不在热跟新的检测范围内
//当webpack入口的js文件被修改，则会自动更新数据并刷新
devServer: {
	hot:true,
	host: 'localhost',
	port: 8080,
}
plugins: [
	new webpack.HotModuleReplacementPlugin(), //模块热更新
	new webpack.NamedModulesPlugin(),					//模块热更新
]

['css-hot-loader'].concat(ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: ['css-loader']
}))


//导出资源路径：js, css, img	   filename, name
output:{
	path: util.assertPath('dist'),
	//publicPath: '',
	filename: 'js/[name].[chunkhash].js'				//util.assertPath('js/[name].[chunkhash].js')
}

//样式引用图片  相对路径打包-- 
/**
	1.图片位于 dist/img/0.png, 
	2.样式位于 dist/css/app.css
	3.background-image: url(img/0.png)  相对位于 dist/css/img/0.png
	解决:
		a.url-loader设置 options.publicPath --> '../img'

		b.ExtractTextPlugin.extract的publicPath --> '../../'
		options.publicPath优于extract.options
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

 //Err:每个入口一个样式，共有样式会被重复打包
 new MiniCssExtractPlugin({
	filename: '[name].css'
 })
*/

//图片资源 -- 打包时webpack将background url内容替换成配置文件中options指定的路径, 同时将图片文件复制到options指定的路径下
rules: {
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
