//ES6
Babel(preset, plugin): 
babel-loader, babel-core
babel-preset-es2015, babel-preset-env
babel-plugin-transform-runtime, babel-runtime
babel-polyfill

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


[id]				ģ���ʶ��(module identifier)
[name]			ģ������ [hash:8]	  
[query]			ģ��� query�����磬�ļ��� ? ������ַ���
[hash]			ģ���ʶ��(module identifier)�� hash, ���α����һ��hash�汾		//Ĭ��20λ
[chunkhash]		chunk ���ݵ� hash(û�Ķ���û�б仯---�������ϻ���)

//��ǰchunk��һ��hash�汾,��ͬһ�α����У�ÿһ��chunk��hash���ǲ�һ����,
//���ҳ����ļ�û�з����ı䣬��ôchunk��hashҲ���ᷢ���ı䣬���δ�ı���ļ����ڻ����ж�ȡ
contenthash   //ExtractTextWebpackPlugin, �ļ����������8λ hash

js		-- chunkhash				//����js��Ĳ�ͬ���ݽ�������
img		-- hash							//ÿһ����Դ�������Լ���hash
css		-- contenthash			//extract�����contenthash
//[name].[chunkhash:5]
//publicPath: 'http://cdn.example.com/assets/[hash]'


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

��.extract-text-webpack-plugin
ExtractTextPlugin.extract({		//options: loader|object
	fallback: 'style-loader',
	use: 'css-loader',
	publicPath: ''
})
new ExtractTextPlugin({			//options: filename|object
	filename: 'style.css',
	allChunks: true
})	
//��ȡ�����ʽ
var extractVue = new ExtractTextPlugin('style/[name].css')
var extractSass = new ExtractTextPlugin('style/[name].css')


��.jquery���������		//externals�������� Webpack Ҫ�����Ĵ�����ʹ������Щ���ñ������ģ��

a).cdn��ʽ���룬ȫ��$���ã�eslint�ᱨ��('$' is not defined) //ע��: ���ܷ���</body>֮��

b).cdn��ʽ���룬import $ from 'jquery' | require('jquery')
//umd��ʽ������������ $.fn.green  ,jqueryδ��ʶ��
externals: {
	jquery: 'jQuery'		//�ѵ��������� jquery �滻�����л������ȫ�ֱ��� jQuery, webpackJsonp������module.exports = jQuery;
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
	//entry�ж�����ڣ�������Ŀ�
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