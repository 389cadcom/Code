entry				//���������Դ

output			//���ñ�������Դ

module			//��Դ����
	rules

resolve			//������Դ����/��չ��
	alias
	extensions

devtool			
devServer		//����������

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
				use: ['css-loader', 'sass-loader']
			})
		}
	]
}

//��Դ·��
filename, public, publicPath, contentBase