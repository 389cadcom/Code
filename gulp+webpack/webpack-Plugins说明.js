new webpack.IgnorePlugin(/\.\/src\/jquery.js/)		
//���Դ���ļ�(·��Ϊrequire�м��ص�·��), ʹ��script����

//���buildĿ¼ʹ��CleanWebpackPugin�������Ϊ webpack.config.js ���ڵ�Ŀ¼Ϊ��Ŀ�ĸ�Ŀ¼, �����ø�Ŀ¼
new CleanWebpack(['dist/assets/js', 'dist/index.html'], {			//ɾ��ָ���ļ�
	root: path.resolve(__dirname, '../dist'),
	verbose: true																//����̨��ӡ��־
})

new PurifyCSS({
  verbose: true,
  minimize: true,
  paths: glob.sync([													//Ҫ��CSS Tree Shaking��·���ļ�
    path.resolve(__dirname, "./*.html"),
    path.resolve(__dirname, "./src/*.js")
  ])
});

//1.
new CopyWebpackPlugin([{
  from: __dirname + '/src/public',
	to: 'assets/'
}]);

//���ã���public ���������ȫ������������Ŀ¼
/*
from    ����Ҫ������ԴĿ¼           from: __dirname + ��/src/public��
to      ����Ҫ��������Ŀ��Ŀ¼       to: __dirname + ��/dist��
toType  file ���� dir         		 ��ѡ��Ĭ�����ļ�
force   ǿ�Ƹ�����ǰ�Ĳ��           ��ѡ Ĭ��false
context                         	 ��ѡ Ĭ��base context����specific context
flatten ֻ�����ļ������ļ���         Ĭ����false
ignore  ���Կ���ָ�����ļ�           ������ģ��ƥ��
*/

//2. �Զ�����HTML�ļ�
new HtmlTextPlugin({
	title: 'index Demo',										//<title><%= htmlWebpackPlugin.options.title %></title>
	template:  './index.html',
	filename: 'index.html',
	inject:"body",					//true | head | body
	//hash: true,						//?hash
	chunks: ['index', 'libs']
})
//����
/*
  title:	����title������   
  filename: �������html���ļ���   
  template:	Ҫʹ�õ�ģ���·��  
  inject:	��ģ��ע�뵽�ĸ���ǩ�� 'body',   
  favicon:	��html���һ��favicon  './images/favico.ico',   
  minify:	�Ƿ�ѹ��  {...} | false ������api�䶯��ԭ����ture|false ��л@onmiָ��) html-minifier
  hash:		�Ƿ�ʹ��hash true false ,     
  cache:	�Ƿ񻺴�,   
  showErrors:�Ƿ���ʾ����,  
  chunks:	ģ���Ӧ�����Ǹ��ڵ�(���entry�е����ģ��)
  xhtml:	�Ƿ��Զ��رϱ�ǩ Ĭ��false  
*/

//3.������DefinePlugin����ô������ı�ʶ���൱��ȫ�ֱ��������ҵ��������ֱ��ʹ�����õı�ʶ

//webpack.configconfig ��ʶ��ǰ�Ļ���
cross-env=devlopment  

//ҵ��������ֱ��ʹ�����õı�ʶ, webpack4 ʹ��mode: 'production'����
new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': "'production'"
	}
})

//4.ѹ������
new UglifyJsPlugin({
	beautify: true,
	compress: {warnings: false},
	output: {comments: true},
	mangle:{
		except:['$']
	}
})
//������ѹ��
new UglifyJsPlugin({
	beautify: true,
	mangle: false
});
/*
parse			����
compress		ѹ��
mangle			����   -- Ĭ��Ϊtrue��ָ��Ϊfalseʱ����ʾ�����л���ѹ��.
beautify		����
minify			��С��
CLI				�����й���
sourcemap		���������Դ���ӳ�䣬������ҳ����
AST				�����﷨��
name			���֣���������������������������
toplevel		����������
unreachable		���ɴ����
option			ѡ��
STDIN			��׼���룬ָ����������ֱ������
STDOUT			��׼���
STDERR			��׼�������
side effects	���������ã����������˷����⻹����������ã��������ȫ�ֱ���
*/

new UglifyJsPlugin({
	uglifyOptions: {
		compress: {
			warnings: false
		}
	},
	cache: true,
	parallel: true,           //�������߳�ѹ��
	sourceMap: true
})
new webpack.optimize.UglifyJsPlugin({
	mangle: { // �ų�����Ҫѹ���Ķ�������
		except: ['$', 'exports', 'require', 'module']
	},
	compress: {
		// http://lisperator.net/uglifyjs/compress
		warnings: false,    // warn about potentially dangerous optimizations/code
		conditionals: true, // optimize if-s and conditional expressions
		unused: true,       // drop unused variables/functions
		comparisons: true,  // optimize comparisons
		sequences: true,    // join consecutive statements with the "comma operato"
		dead_code: true,    // discard unreachable code ����δʹ�õĴ���
		evaluate: true,     // evaluate constant expressions
		join_vars: true,    // join var declarations
		if_return: true     // optimize if-s followed by return/continue
	},
	output: {
			// https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
			comments: false
	},
	sourceMap: false         //��������Ϣ��λ��ӳ�䵽ģ�顣������������ٶȡ����ڿ���������ʹ�á�
}),

//5.��ȡ���ô���
new CommonsChunkPlugin("common.js")
new CommonsChunkPlugin("common.js", ['index', 'login'])		//ֻ��ȡindex�ڵ��login�ڵ�
new CommonsChunkPlugin({
	name:'common',		//��Ҫ��׺
	chunks: ['index', 'login']
})

//6.����Ҫ�ֶ�����
webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	jq: 'jQuery',					// ���ñ���   alias: { jQuery$: path.resolve(__dirname, 'src/assets/js/jquery.js') }
	'window.jQuery': 'jquery'
})


//7.autoprefixer �������  webpack2 loader��֧��use
new webpack.LoaderOptionsPlugin({
	options: {
		postcss: function(){
			return [
				require("autoprefixer")({
					browsers: ['ie>=8','>1% in CN']
				})
			]
		}
	}
})

//8.ExtractTextWebpackPlugin, ���filename����ͬһ����(style.css), �����Ḳ��ǰ�����ʽ
ExtractTextPlugin.extract({
	use: ['css-loader'],
	fallback: 'style-loader'
})
new ExtractTextPlugin({
	filename: utils.assetsPath('css/[name].css'),
	allChunks: true														//�����ж����chunk��ѹ����һ���ļ�, false������첽���ص� CSS
})
//�����ʽ
let styleLess = new ExtractTextWebpackPlugin('css/style.css');
let resetCss = new ExtractTextWebpackPlugin('css/reset.css');

//9.���splitChunks.cacheGroups.commons ����ȡ������ʽ
commons: {						//������ʽstyle.css�Ǳ�������ȡ��commons
	name: 'commons',
	minSize: 0,
	minChunks: 2,
},

MiniCssExtractPlugin.loader
new MiniCssExtractPlugin({
	filename: "[name].css",
  chunkFilename: "[id].css"
})



//������Դ·����js, css, img	   filename, name
output:{
	path: util.assertPath('dist'),
	//publicPath: '',
	filename: 'js/[name].[chunkhash].js'				//util.assertPath('js/[name].[chunkhash].js')
}



//TODO ��ʽ����ͼƬ  ���·�����-- 
/**
	1.ͼƬλ�� dist/img/0.png, 
	2.��ʽλ�� dist/css/app.css
	3.background-image: url(img/0.png)  ���λ�� dist/css/img/0.png
	���:
		a.url-loader���� options.publicPath --> '../img'

		b.ExtractTextPlugin.extract��publicPath --> '../../'
		c.MiniCssTextPlugin���� options:{ publicPath --> '../../' }

		File, URL����options.publicPath����extract.options
*/
use: ExtractTextPlugin.extract({
	fallback: 'vue-style-loader',
	use: ['css-loader', 'sass-loader'],
	publicPath: '../../'												//TODO: ������������·����css�������������ͼƬ·��
})
new ExtractTextPlugin({
	filename: 'css/[name].[contenthash].css',		//util.assertPath('css/[name].[contenthash].css')
	allChunks: true															//TODO 
}}
//��ȡ�����ʽ
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
 ��ҳ����ͬһ����ʽ:
 ������������ʽbase.css, common.css  -> style.css
 new ExtractTextPlugin('style.css')

 //Err:ÿ�����һ����ʽ��������ʽ�ᱻ�ظ����
 new MiniCssExtractPlugin({
	filename: '[name].css'
 })
*/

//ͼƬ��Դ -- ���ʱwebpack��background url�����滻�������ļ���optionsָ����·��, ͬʱ��ͼƬ�ļ����Ƶ�optionsָ����·����
rules: {
	test: /\.(jpe?g|png|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		//publicPath: 'http://cdn.static.com',		//����CDN·��
		publicPath: '../images/',
		outputPath: util.assertPath('images'),		//ͼƬ������ŵ�Ŀ¼  --> �����dist·����Ŀ¼
		name: 'img/[name].[hash:7].[ext]'					//util.assertPath('img/[name].[hash:7].[ext]')
	}
}
new CopyWebpackPlugin([{
	from: path.resolve(__dirname, '../static'),
	to: 'static'																//config.build.assetsSubDirectory
}])


html-url-loader, html-withimg-loader					//����html��ͼƬ·��

image-webpack-loader													//ѹ��ͼƬ



//����·��--> /�����·�� --> ./
1. /static				 
2. static/img/logo.png
3. srcĿ¼	ʹ���������


//FixMe: 
1.@import url('../asserts/style.css')		//ֻ�ܳ�ȡ����ǰchunk
2.import '../assert/style.css'					//ͨ��CommonsChunkPlugin���õ�����������ʽ�У�/\.(css|less|scss)$/.test(module.resource) && count>=2


