//1.
new CopyWebpackPlugin([{
    from: __dirname + '/src/public',
	to: 'assets/'
}]);
���ã���public ���������ȫ������������Ŀ¼
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
new HTMLPlugin({
	title: 'index Demo',
	template:  './index.html',
	filename: 'index.html',
	inject:"body",					//true | head | body
	//hash: true,					//?hash
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
  hash:		�Ƿ�hash�� true false ,     
  cache:	�Ƿ񻺴�,   
  showErrors:�Ƿ���ʾ����,  
  chunks:	ģ���Ӧ�����Ǹ��ڵ�
  xhtml:	�Ƿ��Զ��رϱ�ǩ Ĭ��false  
*/

//3.������DefinePlugin����ô������ı�ʶ���൱��ȫ�ֱ��������ҵ��������ֱ��ʹ�����õı�ʶ
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

//ExtractTextWebpackPlugin
ExtractTextPlugin.extract({
	use: [],
	fallback: 'style-loader'
})
new ExtractTextPlugin({
	filename: utils.assetsPath('css/[name].css'),
	allChunks: true				//�����ж����chunk��ѹ����һ���ļ�
})
//FixMe: 
1.@import url('../asserts/style.css')		//ֻ�ܳ�ȡ����ǰchunk
2.import '../assert/style.css'				//ͨ��CommonsChunkPlugin���õ�����������ʽ�У�/\.(css|less|scss)$/.test(module.resource) && count>=2

//8.webpack-dev-server
devServer: {
	// --���߷������������ṩ���ݡ���ֻ��������Ҫ�ṩ��̬�ļ�ʱ����Ҫ������ͼƬ����
	contentBase: path.join(__dirname, 'dist'),
	// contentBase: false,
	// --���߷������ۿ���devServer.contentBaseѡ���ṩ���ļ����ļ����Ľ���������ҳ�����¼��ء�
	watchContentBase: true,
	// --��������������gzipѹ��
	compress: true,
	port: 9997,
	host: '0.0.0.0',
	// --�����ʹ���ȸ��µı�־��Ȼ�󲢲��ṩ�ȸ��¹��ܣ���Ҫ����hotModule
	// hot:true, ������HotModuleReplacementPlugin����ΪAPI�޷���������webpack����
	// --hot������� ����ΪCLI���Է�������webpack���ã�
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