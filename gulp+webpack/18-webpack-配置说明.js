//ES6
Babel(preset, plugin): 
babel-loader, babel-core
babel-preset-es2015, babel-preset-env

babel-plugin-transform-runtime, babel-runtime

babel-polyfill


//cross-env	��������������
1.sourcemap, �ȸ���(HotModuleReplacementPlugin)
2.ѹ��(UglifyJsPlugin), 
3.·��(output.publicPath), css-loader--minimize��autoprefixer����


//webpack
id			  Chunk ��Ψһ��ʶ����0��ʼ
name		  Chunk �����ƣ� filename: '[name]/entry.js'
hash		  Chunk ��Ψһ��ʶ�� Hash ֵ�����α����һ��hash�汾
chunkhash	  Chunk ���ݵ� Hash ֵ
			  //��ǰchunk��һ��hash�汾,��ͬһ�α����У�ÿһ��chunk��hash���ǲ�һ����, �������α����У����ĳ��chunk����û�з����仯
[hash:8]	  //Ĭ��20λ
contenthash   //ExtractTextWebpackPlugin, �ļ����������8λ hash

//plugins
1.webpack.optimize.CommonsChunkPlugin  //�����ö����(entry)--����ʽ

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
2.extract-text-webpack-plugin

ExtractTextPlugin.extract({		//options: loader|object
	use: 'css-loader',
	fallback: 'style-loader',
	publicPath: ''
})
new ExtractTextPlugin({			//options: filename|object
	filename: 'style.css',
	allChunks: true
})	
var extractVue = new ExtractTextPlugin('style/[name].css')
var extractSass = new ExtractTextPlugin('style/[name].css')


3.jquery���������		//Externals�������� Webpack Ҫ�����Ĵ�����ʹ������Щ���ñ������ģ��
a.script��ʽ���룬ȫ��$���ã�eslint�ᱨ��('$' is not defined)
b.script��ʽ���룬���externals:{jquery: 'jQuery'} ���ã�Ҫʹ��ʱimport $ from 'jquery'
  externals: {
	jquery: 'jQuery'		//�ѵ��������� jquery �滻�����л������ȫ�ֱ��� jQuery, JSON������module.exports = jQuery;
  }

c.���� alias��import �������ʹ��
    resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			jquery: path.resove(__dirname, '/static/js/jquery')
		}
	}
d.��c�Ļ����ϣ����� plugins������ import ȫ�ֿ���
    plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
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