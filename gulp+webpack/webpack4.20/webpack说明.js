entry				//配置入口资源

output			//配置编译后的资源

module			//资源处理
	rules

resolve			//配置资源别名/扩展名
	alias
	extensions

devtool			
devServer		//开发服务器

plugins			//插件

//转换器 loader
module: {
	rules: [
		{
			test: /.js$/,
			loader: 'babel-loader'
		},
		{
			test: /.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		},
		{
			test: /.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}
	]
}

//资源路径
filename, public, publicPath, contentBase