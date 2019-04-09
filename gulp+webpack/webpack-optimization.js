/** JS Tree Shaking, Css Tree Shanking, Split Code
 *
 * 1. ��Ե�ҳӦ����ȡ����������Ҫͨ������ָ��������
 * 2. ����ָ����������ͨ������д����ʵ�֣�������ͨ��webpack������ʵ�֡��������: ./src/page.js
			const page = () => import(/* webpackChunkName: 'page' */ "./src/page")
 */

//�ְ�  https://segmentfault.com/a/1190000015919928#articleHeader9   �����

/*
	������⣺vendor --> vue, vue-router, vuex, axios
	UI�⣺		UI		 --> mint-ui, vux
	���÷���:	common -->	
											��Ҫ		·�ɱ�ȫ�� state --> Ĭ��app.js
											�Ǳ�Ҫ	
	��Ƶ���:				 --> echarts

	ҵ�����:				 --> page = () => import(/* webpackChunkName: "home" /'@/pages/home.vue')

splitChunks: {
  chunks: 'async', 								��ѡֵ��initial(��ʼ��)��async(������ؿ�)��all(ȫ����)��Ĭ��Ϊasync;
  minSize: 30000,									��ʾ��ѹ��ǰ����Сģ���С
  minChunks: 1,										��ʾ�����ô�����Ĭ��Ϊ1��
  maxAsyncRequests: 5,						���İ���(�첽)���ش�����Ĭ��Ϊ5
  maxInitialRequests: 3,					���ĳ�ʼ�����ش���
  automaticNameDelimiter: '~', 		��������ӷ�
  name: true,
	cacheGroups: {}									������
	
	priority:												��������ȼ���
	test:														������Ĺ��򣬱�ʾ���������ĵķ��뵱ǰ�����飬ֵ������function��boolean��string��RegExp��Ĭ��Ϊ�գ�
	reuseExistingChunk: 						��ʾ����ʹ���Ѿ����ڵĿ飬��������������Ŀ��Ѿ����ھ�ʹ�����еģ����ٴ���һ���µĿ顣
 }
}

	async  : 1 ֻ���ȡ�첽�����ģ����: const $ = () => import('jquery'), ͬ������ģ�鱻������ļ���

	all		 : 2 ͬ�����첽����ģ�鶼�������ȡ-- �Զ��幫��������������һ����(�����ڹ�ͬʹ��commons)
	initial: 3 ��ͬһ�����ͬģ����أ��ֿ��Ż�����첽�ͷ��첽ģ��--���������, ͬ�����ش��һ��, �첽���ش��һ��

	Ĭ������initial , allģʽ�Ὣ��������node_modules��ģ����䵽һ����vendors�Ļ�����(���ȼ�Ϊ��)
	�����ظ������������εĴ��룬�ᱻ���䵽default�Ļ�����
	�Զ����������ȼ�Ϊ0

	����node_moduleģ�� Ĭ��С��30k�����ȡΪ�����ļ�������css��js; �ᱻ���������ʹ������ҳ�� bundle
*/

optimization: {
	minimize: true,																	// [new UglifyJsPlugin({...})]
	minimizer: [																		//��mode�����й�  mode > minimizer
		new UglifyJsPlugin({													//Uglify-js��֧��es6�﷨(uglify-es)����ʹ��terser-webpack-plugin���
			cache: true,
			parallel: true,
			sourceMap: true,
			uglifyOptions: {
				warnings: false,													// ��UglifyJsɾ��û���õ��Ĵ���ʱ���������
				output: {
					comments: false,												// ɾ�����е�ע��
					beautify: false													// ����յ����
				},
				compress: {
						drop_console: true,										// ɾ�����е� `console` ���
						collapse_vars: true,									// ��Ƕ�����˵���ֻ�õ�һ�εı���
						reduce_vars: true,										// ��ȡ�����ֶ�ε���û�ж���ɱ���ȥ���õľ�ֵ̬
				}
			}
		}),
		new OptimizeCssAssetsPlugin()									//css
	],
	//��Ե�������ͨ������priority�ȱ������ȡ���������ȡʣ��ҵ���й�������
	splitChunks: {
		chunks: "initial",														//Ĭ�ϣ�����initial, all ��node_modules�ķ��䵽vendors�Ļ�����, �ظ����η��䵽default�Ļ�����
		cacheGroups: {																//�Զ������ȼ�Ϊ0, Ĭ�ϴ����vendors�����ȼ�Ϊ����
			vendor: {                                   //ֻ�����ʼʱ�����ĵ����� vue + vue-router + vuex + axios
				name: 'vendor',
				chunks: 'initial',
				priority: -10,
				test: /[\\/]node_modules[\\/]/,
			},
			vux: {                                      //��node_modules�����ϼ�������
				name: 'vux-UI',
				priority: 10,															//Ȩ��Ҫ���� vendor �� app ��Ȼ�ᱻ����� vendor ���� app
				test: /node_modules\/vux/,
			},
			commons: {                                  //��ȡ���� �Զ���������� (ע�⣺���ǳ�ʼʱʹ��--App, Home�����ʹ��)
				name: 'commons',
				minChunks: 2,															//�������������ε� chunk �����뵽commons
				priority: -20,
			},
			echarts: {																	//��echarts���е����Ż������ȼ��ϸ�
				name: 'echarts',
				chunks: 'all',
				priority: 30,
				test: function(module){
					var context = module.context
					return context && context.includes('echarts') || context.includes('zrender')
				}
			},
			styles: {																		//��ʽ��ȡ���
				name: 'styles',
				test: /\.css/,
				chunks: 'initial',
				enforce: true															
			},
			default: {//cacheGroups��д�̳����ã�				
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	},
	runtimeChunk: {
		name: 'runtime.js'
	}
}

//webpack4�Ż�
minimize						 --> webpack.optimize.UglifyJsPlugin()
concatenateModules   --> webpack.optimize.ModuleConcatenationPlugin()
noEmitOnErrors			 --> webpack.optimize.NoEmitOnErrorsPlugin()      //�������ʱ����ӡ�����Դ


pulugins: [
	// ���moment���԰�����
	new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/,	/^\.\/(zh-cn)$/),

	//�����html�ļ�����js, chunks
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, src, 'index.html'),
		filename: 'index.html',
		chunk: ['index', 'vendor'],
		hash: true,
		minify: {
			removeAttributeQuotes:true//ѹ�� ȥ����������
		}
	}),

	new webpack.ProvidePlugin({
		_: 'lodash'
	})
]


//11-27��
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

//1.�Ȱ��������ģ���ȡ��������
//��first.js��second.js�г�ȡcommons chunk
new webpack.optimize.CommonsChunkPlugin({
	name: 'common',
	filename: '[name].js',
	chunks: ['first','second']
}),

//2.�ٳ�ȡ������ģ��
new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	filename: '[name].js',
	//�����ж�����Щģ��ᱻ���뵽vendor��
	minChunks: function (module,count) {
			console.log(module.resource,`���ô���${count}`);
			return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
			)
	}
}),
//3.�����webpack���е��ļ���������
new webpack.optimize.CommonsChunkPlugin({
		name: 'runtime',
		filename: '[name].js'
}),