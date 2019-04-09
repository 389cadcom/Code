new webpack.IgnorePlugin(/\.\/src\/jquery.js/)		
//���Դ���ļ�(·��Ϊrequire�м��ص�·��), ʹ��script����

//���buildĿ¼ʹ��CleanWebpackPugin�������Ϊ webpack.config.js ���ڵ�Ŀ¼Ϊ��Ŀ�ĸ�Ŀ¼, �����ø�Ŀ¼
new CleanWebpack(['dist/assets/js', 'dist/index.html'], {			//ɾ��ָ���ļ�
	root: path.resolve(__dirname, '../dist'),
	verbose: true
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

//2.
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




//FixMe: 
1.@import url('../asserts/style.css')		//ֻ�ܳ�ȡ����ǰchunk
2.import '../assert/style.css'					//ͨ��CommonsChunkPlugin���õ�����������ʽ�У�/\.(css|less|scss)$/.test(module.resource) && count>=2


//8.webpack-dev-server					����ڵ�js�ļ����޸ģ�����Զ��������ݲ�ˢ���������ʹ��style-loader����ʽ��ӵ�js�ļ���
devServer: {
	// --���߷������������ṩ���ݡ���ֻ��������Ҫ�ṩ��̬�ļ�ʱ����Ҫ������ͼƬ����
	contentBase: path.join(__dirname, 'dist'),			//����publicPath
	// contentBase: false,
	// --���߷������ۿ���devServer.contentBaseѡ���ṩ���ļ����ļ����Ľ���������ҳ�����¼��ء�
	watchContentBase: true,
	// --��������������gzipѹ��
	compress: true,
	port: 9997,
	host: '0.0.0.0',
	// hot:true, plugins����new HotModuleReplacementPlugin()����ΪAPI�޷���������webpack����
	//--open --hot package.json���ò���Ҫ���� hotModule
	hot: true,
	// --�ڹ���ʧ�ܵ�����£�������ģ���滻�������devServer.hot������ˢ��ҳ����Ϊ���ˡ�
	hotOnly: true,
	// --devtool����̨��ʾ��Ϣ
	clientLogLevel: 'none', //none, info, (warning,error һֱ�У�
	// --�ӳٱ��룬�����첽ģ�飬ֻ��������ʱ�Ż���룬�������в���Ҫ
	lazy: true,
	filename: "bundle.js",
	// --Ϊ���������������ͷ
	headers: {
		"X-Custom-Foo": "bar"
	},
	// --ʹ��HTML5 History APIʱ��ϵͳ���ܻ����index.html��ҳ��ȡ��404��Ӧ
	historyApiFallback: true,
	/*historyApiFallback: {
	   rewrites: [
		 { from: /^\/$/, to: '/views/landing.html' },
		 { from: /^\/subpage/, to: '/views/subpage.html' },
		 { from: /./, to: '/views/404.html' }
	   ]
	}*/
	https: true, //ʹ��httpsЭ��
	// --�ڿ��������������ֲ�ͬģʽ֮���л�(--inline, --iframe)��Ĭ������£���ʹ������ģʽ����Ӧ�ó�������ζ��һ���ű������뵽���İ����Դ���ʵʱ���¼��أ����ҹ�����Ϣ����ʾ�����������̨�С�
	inline: true,
	// --����webpack����ǵ���Ϣ
	noInfo: true,
	// --ʹ�ô�����Ҫ http-proxy-middleware  �����,���Ӻ�̨�ӿڵ�ʱ��ʹ��
	proxy: {
		"/api": "http://localhost:3000"
	    /*"/api": {
			target: "http://localhost:3000",
			pathRewrite: {"^/api" : ""},
			secure: false
	    }*/
	},
	public: "myapp.test:80",
	// --Ҳ�Ǿ�̬�ļ���Ŀ¼�� �൱�� output.publicPath
	publicPath: "/assets/",
	// --���ð������ܺ󣬳��˳�ʼ������Ϣ֮����κ����ݶ���д�����̨����Ҳ��ζ������webpack�Ĵ���򾯸治�ɼ���
	quiet: true
}

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
