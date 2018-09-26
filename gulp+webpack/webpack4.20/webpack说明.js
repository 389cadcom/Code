entry				//���������Դ

output			//���ñ�������Դ			filename, path, publicPath

module			//��Դ����
	rules			//											test, include, exclude, loader | use

resolve			//������Դ����/��չ��		@: path.resolve(__dirname, 'src')
	alias															
	extensions	

devtool			
devServer		//����������						open, hot, historyApiFallback, proxy

plugins			//���

//ת���� loader
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

//��Դ·��
filename, path, publicPath, contentBase