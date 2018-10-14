//7.25 webpack4  
//css-loader@1.0.0  extract-text-webpack-plugin@last ==>  4.0 beta
//optimize-css-assets-webpack-plugin
//��ȡѹ����ʽ   
rules: [
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
				loader: 'css-loader',
				options: {										//TODO 4.x�޷�ѹ��
					minimize: true
				}
			}]
		}),
		//MiniExtractPlugin
		use: [ MiniExtractPlugin.loader, 'css-loader' ]
	}
]
//ѹ������
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

//���飬����
use: ExtractTextPlugin.extract({
	use: [{																				  //use: ['css-loader?minimize', 'sass-loader']
		loader: 'css-loader',
		options: {
			minimize:true,
			camelCase: true
		}
	},{
		loader: 'sass-loader',												//3.������ʽ
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
			use: 'css-loader'														//1.�ַ���ʽ,
			publicPath: '../'														//FIXME: ָ����publicPath·��, ���Ը������·�����õ�ͼƬ��Դ
		})
	},
  {
		test:/\.scss$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'sass-loader']					//2.������ʽ
		})
	}
]
//3.����->����(����--loader, options)
{
	test: /\.css$/,
	//use: ['style-loader', 'css-loader?minimize'], //1.�ַ���ʽ
	use: [
		{ loader: 'style-loader' },										//2.������ʽ
		{
			loader: 'css-loader',
			options: {
				modules: true
			}
		}
	]
}

//����ͼƬ��Դ:  publicPath, outputPath  
3.file-loader, url-loader
{
	test: /\.(jpe?g|png|gif)$/,
	use: [{
		loader: 'url-loader',
		options: {
			limit: 8192,						// С��8k��ͼƬ�Զ�ת��base64��ʽ�����Ҳ������ʵ��ͼƬ
      outputPath: 'images/'   // ͼƬ������ŵ�Ŀ¼
		}
	}]
}
{
	test: /\.(eot|ttf|woff|svg)$/,
	use: 'file-loader'
}

// html-withimg-loader postcss-loader autoprefixer


4.�������⡢��ʽ����
1).JS�е���
	import jquery from 'jquery'
	import 'vux/src/styles/1px.less'

2).��ʽ������
	@import '../../node_modules/weui/src/style/icon/weui-font.less';