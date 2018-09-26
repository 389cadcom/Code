entry				//配置入口资源

output			//配置编译后的资源			filename, path, publicPath

module			//资源处理
	rules			//											test, include, exclude, loader | use

resolve			//配置资源别名/扩展名		@: path.resolve(__dirname, 'src')
	alias															
	extensions	

devtool			
devServer		//开发服务器						open, hot, historyApiFallback, proxy

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
				use: [
					{
						loader: 'css-loader',
						options: {  }
					}, 
						'sass-loader'
				]
			})
		}
	]
}

//资源路径
filename, path, publicPath, contentBase