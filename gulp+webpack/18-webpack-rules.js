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
			use: 'css-loader'														//1.�ַ���ʽ
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


2.devServer		//Ĭ��ʵʱԤ��--socketˢ����ҳ
//����			webpack  --config webpack.dev.js
--hot			//ֻ������������� DevServer ����ȥ�����ļ��������鵽ģ�����滻
--watch			//DevServerĬ�Ͽ����� webpack  --watch��������ģʽ��entry Ϊ���ȥ�ݹ������ entry ���������ļ�
--devtool source-map   //�������Դ���  chrome source
--open			//�Զ���ҳ��

devServer: {
	proxy: { // ������˷���ӿ�
      '/api': 'http://localhost:3000'
    },
	open: true,
	https: false,
	historyApiFallback:true
}

//������е�·��ʱ������һ��HTML �ļ�  http://webpack.wuhaolin.cn/2����/2-6DevServer.html
historyApiFallback: {
  // ʹ������ƥ������·��
  rewrites: [
    // /user ��ͷ�Ķ����� user.html
    { from: /^\/user/, to: '/user.html' },
    { from: /^\/game/, to: '/game.html' },
    // �����Ķ����� index.html
    { from: /./, to: '/index.html' },
  ]
}


3.resolve		//���ñ��� alias, ʡ�Ժ�׺ extensions
alias:
react$ ֻ�������� react ��β�ĵ������
//��ֻ��� import 'react' �ؼ����滻�� import '/path/to/react.min.js'


4.�������⡢��ʽ����
1).JS�е���
	import jquery from 'jquery'
	import 'vux/src/styles/1px.less'

2).��ʽ������
	@import '../../node_modules/weui/src/style/icon/weui-font.less';