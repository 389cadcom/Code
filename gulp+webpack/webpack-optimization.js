/** JS Tree Shaking, Css Tree Shanking, Split Code
 *
 * 1. ��Ե�ҳӦ����ȡ����������Ҫͨ������ָ��������
 * 2. ����ָ����������ͨ������д����ʵ�֣�������ͨ��webpack������ʵ�֡��������: ./src/page.js
			const page = () => import(/* webpackChunkName: 'page' */ "./src/page")
 */
 module.exports = {
	output: {
		path: path.resolve('dist'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].[chunk].js'
	}
}


//�ְ�  https://segmentfault.com/a/1190000015919928#articleHeader9   �����

//��ʼ�������� main.js, App.vue, Home.vue
/*
	������⣺vendor --> vue, vue-router, vuex, axios
	UI�⣺		UI		 --> mint-ui, vux
	���÷���:	common -->	
											��Ҫ		·�ɱ�ȫ�� state --> Ĭ��app.js
											�Ǳ�Ҫ	
	��Ƶ���:				 --> echarts

	ҵ�����:				 --> page = () => import(/* webpackChunkName: "home" */'@/pages/home.vue')
//*/
/**
	chunks:							��ʾ��ʾ��ķ�Χ����������ѡֵ��initial(��ʼ��)��async(������ؿ�)��all(ȫ����)��Ĭ��Ϊall;
	minSize:						��ʾ��ѹ��ǰ����Сģ���С��Ĭ��Ϊ0��
	minChunks:					��ʾ�����ô�����Ĭ��Ϊ1��
	maxAsyncRequests:		���İ���(�첽)���ش�����Ĭ��Ϊ1��
	maxInitialRequests:	���ĳ�ʼ�����ش�����Ĭ��Ϊ1��
	name:								��ֳ����������(Chunk Names)��Ĭ���ɿ�����hashֵ�Զ����ɣ�
	cacheGroups:				������
	priority:						��ʾ��������ȼ���
	test:								������Ĺ��򣬱�ʾ���������ĵķ��뵱ǰ�����飬ֵ������function��boolean��string��RegExp��Ĭ��Ϊ�գ�
	reuseExistingChunk: ��ʾ����ʹ���Ѿ����ڵĿ飬��������������Ŀ��Ѿ����ھ�ʹ�����еģ����ٴ���һ���µĿ顣

	������(С�� 30kb ������»ᱻ���������ʹ������ҳ�� bundle)
		ģ�鱻�ظ����û�������node_modules�е�ģ��
		��ѹ��ǰ��СΪ30kb
		�ڰ������ʱ����������С�ڵ���5
		�ڳ�ʼ������ʱ����������С�ڵ���3

	initial: 3 ��ͬһ�����ͬģ����أ��ֿ��Ż�����첽�ͷ��첽ģ��--���������, ͬ�����ش��һ��, �첽���ش��һ��
	all		 : 2 ͬ�����첽���ض��������ȡ-- ��������������첽���صĿ������һ����(�����ڹ�ͬʹ��)

	async  : 1 Ĭ�Ϸ�ʽ--ֻ����첽�����ģ��  ��: const $ = () => import('jquery'), ͬ������������ļ���

	Ĭ��(initial, all--default)�����vendors�����ȼ�Ϊ����
  �Զ����������ȼ�Ϊ0
*/

//˵���� https://juejin.im/post/5b99b9cd6fb9a05cff32007a
//����node_moduleģ�� Ĭ��С��30k�����ȡΪ�����ļ�������css��js
//splitChunkĬ��ֵ,  minimizer����
optimization: {
	minimize: true,																	// [new UglifyJsPlugin({...})]
	minimizer: [																		//��mode�����й�  mode > minimizer
		new UglifyJsPlugin(
			cache: true,
			parallel: true,
			sourceMap: false
		})
		new OptimizeCssAssetsPlugin()									//css
	],
	splitChunks: {
		chunks: "async",															//Ĭ�ϣ�����initial, all ��node_modules�ķ��䵽vendors�Ļ�����, �ظ����η��䵽default�Ļ�����
		minSize: 30000,
		minChunks: 1,
		maxAsyncRequests: 5,													//�첽�����chunks��Ӧ�ó�����ֵ
		maxInitialRequests: 3,												//entry�ļ������chunks��Ӧ�ó�����ֵ��������࣬��ʱ��
		automaticNameDelimiter: '~',									//�Զ��������ӷ�
		name: true,
		cacheGroups: {																//�Զ������ȼ�Ϊ0, Ĭ�ϴ����vendors�����ȼ�Ϊ����
			commons: {
				name: 'commons',
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			},
			styles: {
				name: 'styles',
				test: /\.css/,
				chunks: 'initial',
				enforce: true															//TODO
			},
			default: {//cacheGroups��д�̳����ã�				
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	}
}

//������������Զ��幫������
//����
optimization: {
	minimize: true,																	// [new UglifyJsPlugin({...})]
	minimizer: [
		new UglifyJsPlugin(
			cache: true,
			parallel: true,
			sourceMap: false
		})
	],
	splitChunks: {
		chunks: "all",
		cacheGroups: {
			vendor: {                                   //ֻ�����ʼʱ�����ĵ����� vue + vue-router + vuex + axios
				name: 'vendor',
				chunks: 'initial',
				priority: 10,
				test: /node_modules/,
			},
			vux: {                                      //������ UI ���
				name: 'vux-UI',
				priority: 20,															//Ȩ��Ҫ���� vendor �� app ��Ȼ�ᱻ����� vendor ���� app
				test: /node_modules\/vux/,
			},
			commons: {                                  //��ȡ���� �Զ����������   ע�⣺���ǳ�ʼʱʹ��--App, Home�����ʹ��
				name: 'commons',
				minChunks: 2,      
				priority: 5,
			},
			echarts: {																	//��echarts���е����Ż������ȼ��ϸ�
				name: 'echarts',
				chunks: 'all',
				priority: 30,
				test: function(module){
					var context = module.context
					return context && context.includes('echarts') || context.includes('zrender')
				}
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

optimization: {
	minimizer: true,
	providedExports: true,
	usedExports: true,

	//ʶ��package.json�е�sideEffects���޳����õ�ģ�飬������tree-shake
	//������optimization.providedExports��optimization.usedExports
	sideEffects: true,
	concatenateModules: true,
	noEmitOnErrors: true,

	splitChunks: {
		chunks: 'initial',				//'all'|'async'|'initial'(ȫ��|�������|��ʼ����)��chunks
	},
	
	//��ȡwebpack����ʱ�Ĵ���
	runtimeChunk: {
		name: 'manifest'
	}
}

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