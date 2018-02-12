[path], [name], [ext]

[hash], [chunkhash]  [contenthash]


//һ.��װ�汾
npm i webpack@1.x  webpack-dev-server@1.x

//
webpack --config	//#ִ���Զ���webpack.config

webpack				//#�����������webpack����
webpack -w 			//#�ṩwatch������ʵʱ���д������watch
webpack -p			//#�Դ������ļ�����ѹ��
webpack -d			//#�ṩSourceMaps���������
webpack --colors	//#����������ɫ�����磺���ú�ɫ��ʾ��ʱ�ϳ��Ĳ���
webpack --profile	//#����������ݣ����Կ���ÿһ���ĺ�ʱ
webpack --display-modules //#Ĭ������� node_modules �µ�ģ��ᱻ���أ������������������ʾ��Щ�����ص�ģ��
webpack --display-error-details //#��ʾ���������Ϣ


//��������: cross-env NODE_ENV=development
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([])
}

//��.��ڡ�����
entry, output


//��.������		module��{loaders:[])
1.babel@6.x ��汾Ҫһ��  npm install babel-core babel-preset-es2015 babel-loader

�����ַ�ʽʹ�� loader:
/*
ͨ��webpack.config.js����
ʹ�� require �������ʾʹ��
ͨ�� webpack CLI					webpack entry.js build.js  --module-bind "css=style-loader!css-loader"	
*/
/*
test:		һ���������������
exclude:	һ���ų�������
include:	Ҫ��Loaderת���ĵ����ļ���·������
loader:		һ����"��"���� loader���ַ���
loaders:	һ��loader�ַ���������
options:
query��		Ϊloaders�ṩ���������ѡ���ѡ��
*/

//ע��loader/query���Ժ�options������ͬһ��ʹ�ã����ǲ�Ҫʹ��use��options��ͬһ��ʹ��
{test: /\.css$/, use: 'css-loader'}
{test: /\.css$/, loader: 'css-loader'��options: { modules: true }}
{test: /\.css$/, use: {
    loader: 'css-loader',
    options: {
      modules: true
    }
}}

//������ļ�С�����ƣ����Է��� data URL   8k = 8192
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,		
    loader: 'url-loader',
    options: {
        limit: 8192,
        name: 'fonts/[name].[hash:7].[ext]'
    }
}

//#��Դ�ļ�����
1.����srcĿ¼��ͼƬ��ͨ��file-loader��������dist��Ŀ¼
loader: 'file-loader',
options: {
	name: 'assets/[name].[ext]?[hash:4]'
	publicPath: 'assets/',                 //�Զ��幫��·��
    outputPath: 'images/'                  //??
}
2.����static��Դ



//��.���	plugins:[]
1.��������������������������������� 
vendor
CommonChunkPlugin(chunkName, fileName)

2.��������������������
webpack.ProvidePlugin

3.����ȫ�ֱ��� 
//import $ from 'jquery';
//var $ = require('jquery');
externals:{
	jquery: 'window.jQuery',		//factory(require('jquery'))
	$: 'jquery'
}

/**
����jquery��jquery���
*/
1.���jquery���û�в����κ�ģ�黯������ֱ������cdn�ϵ�jQuery���������ò��������Ϳ�������ʹ�á�

2.����ģ��UMD��ʽ������Ҫ����ȫ�ֽӿ�externals
//a.������     b.����ȫ�ֽӿ�		c.������������


//#������
1.��package.json ������--open --hot����
2.����webpack.config.js�����ã������webpack.HotModuleReplacementPlugin:

module.exports = {
    devServer: {
        historyApiFallback: true,		// ����� 404 ��Ӧ�����Ϊ index.html
        hot: true,						// ���� webpack ��ģ�����滻����
        inline: true					// ��������ģʽ
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}


//��.����(Resolve)������·��
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.join(__dirname, 'src')
  },
  extensions: ['.js', '.vue', '.css']
}

import tab from '@/components/tab'