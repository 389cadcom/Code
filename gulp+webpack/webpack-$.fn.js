/*
babel7
@babel/core @babel/preset-env
babel-loader@last
*/


//cross-env	��������������  process.env.NODE_ENV
1.sourcemap, �ȸ���(HotModuleReplacementPlugin)
2.ѹ��(UglifyJsPlugin),													//mode: "production"
3.·��(output.publicPath), css-loader@0.28.0		//minimize��autoprefixer����

//webpack  --config webpack.config.js  --color --progress 
webpack				//#�����������webpack����
webpack -w 			//#�ṩwatch������ʵʱ���д������watch
webpack -p			//#�Դ������ļ�����ѹ��
webpack -d			//#�ṩSourceMaps���������
webpack --colors	//#����������ɫ�����磺���ú�ɫ��ʾ��ʱ�ϳ��Ĳ���
webpack --profile	//#����������ݣ����Կ���ÿһ���ĺ�ʱ
webpack --display-modules //#Ĭ������� node_modules �µ�ģ��ᱻ���أ������������������ʾ��Щ�����ص�ģ��
webpack --display-error-details //#��ʾ���������Ϣ

--progerss��				����ִ�����̣��аٷֱȽ�����
--display-modules�� ������д����ģ���г���
--display-reasons�� ��Ѵ����ԭ���г���

chunkFilename ������أ��첽��ģ���ʱ��Ҳ����·�������أ��������ļ���û�б�����entry��

[id]				ģ���ʶ��, id��Ψһ��ʾ�������ظ�����0��ʼ��
[name]			ģ������, ����·�������ص�ʱ������Լ����� //import(/*webpackChunkNames: ''*/ './compoent.vue')
[query]			ģ��� query�����磬�ļ��� ? ������ַ���
[hash]			ÿ���޸��κ�һ���ļ��������ļ�����hash�������ı�		//Ĭ��20λ
[chunkhash]	ֻ�б��޸��˵��ļ����ļ�����hashֵ�޸�

//css��chunkhash �޸���js��css�ļ�����hashֵȷʵ�б䣬���޸�css�ļ��Ļ����ᷢ��css�ļ�����chunkhashֵ��Ȼû�仯
[contenthash]   //ExtractTextWebpackPlugin@3x, �ļ����������8λ hash

js		-- chunkhash				//����chunks--js��Ĳ�ͬ���ݽ�������
img		-- hash							//ÿһ����Դ�������Լ���hash
css		-- contenthash			//extract�����contenthash
//[name].[chunkhash:5]

publicPath: 'http://cdn'  //ͼƬ��js��cssǰ׺·��


һ.webpack.optimize.CommonsChunkPlugin  //�����ö����(entry)--����ʽ  4.x  splitChunks, runtimeChunk

//�ַ�����ʽ-- Ĭ�ϻ��������ڽڵ�Ĺ���������ȡ����
CommonsChunkPlugin('common.js')
								 
//��ѡ�����ȡ��������
CommonsChunkPlugin('common.js', ['main', 'print'])

//���󴫲�--��ѡ����ȡ
CommonsChunkPlugin({
	name:'common',
	//filename: 'common.js',
	chunks: ['main', 'print', 'user']
})



��.jquery���������					//externals�������� Webpack Ҫ�����Ĵ�����ʹ������Щ���ñ������ģ��

a).cdn��ʽ���룬ȫ��$���ã�eslint�ᱨ��('$' is not defined) //ע��: ���ܷ���</body>֮��

b).cdn��ʽ���룬import $ from 'jquery' | require('jquery')
//umd��ʽ������������ $.fn.green  ,jqueryδ��ʶ��
externals: {
	jquery: 'jQuery'		//�ѵ��������� jquery �滻�����л������ȫ�ֱ��� jQuery, webpackJsonp ģ��������module.exports = jQuery;
}

//�������뱾���ļ������ܶ���externals(�ų�����Ŀ�����build.js)
c).���ñ�����alias�� --> ���룺import $ from jquery
  resolve: {
		alias: {
			@: './src',
			vue$: 'vue/dist/vue.esm.js',
			jquery: path.resolve(__dirname, '/static/js/jquery')
		}
	}
d.��c�Ļ����ϣ����� plugins������ import ȫ�ּ�����(����ʹ��$, jQuery�Զ�����require('jquery')--aliasָ��·��)
  plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
e).�������������� webpack.optimize.CommonsChunkPlugin
	//entry�ж�����ڣ��������bundle��
  entry: {   
		common: ['jquery']
	}
	

/*
����bootstrap.min.js�ļ���
��main.js��import����
import 'bootstrap/js/bootstrap.min.js'
import 'jquery.peity.min.js'

��mounted������ʹ��
$("span.pie").peity("pie", {
	fill: ["#1ab394", "#d7d7d7", "#ffffff"]
})
*/


// @1
use: [{
		loader: 'expose-loader',
		options: '$'
	}, {
		loader: 'expose-loader',
		options: 'jQuery'
}]
// @2
externals: {
	jquery: 'jQuery'				
},
// @3
new webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery'
}),