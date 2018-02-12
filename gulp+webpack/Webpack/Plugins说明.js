//1.
new CopyWebpackPlugin([{
    from: __dirname + '/src/public',
	to: 'assets/'
}]);
���ã���public ���������ȫ������������Ŀ¼
/*
from    ����Ҫ������ԴĿ¼           from: __dirname + ��/src/public��
to      ����Ҫ��������Ŀ��Ŀ¼       from: __dirname + ��/dist��
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

//6.
webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery'
})


//7.autoprefixer �������
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