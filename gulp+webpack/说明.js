//һ.��װ�汾
npm i webpack@1.x  webpack-dev-server@1.x

//��.����������
webpack --watch   //�����䶯���Զ����
webpack --color
webpack -p		  //ѹ�������ű�������ǳ��ǳ���Ҫ��
webpack -d		  //����mapӳ���ļ�����֪��Щģ�鱻���մ����������

--progress	--color
--display-error-details

//�Զ������: cross-env NODE_ENV=development
console.log(process.env.NODE_ENV);

webpack entry.js build.js  --module-bind "css=style-loader!css-loader"	//����ģʽ



//��.ģʽ	module��{loaders:[])
1.@6.x ��汾Ҫһ��  npm install babel-core babel-preset-es2015 babel-loader
/*
test��  һ��ƥ��loaders��������ļ�����չ����������ʽ�����룩
loader��loader�����ƣ����룩
include/exclude:�ֶ���ӱ��봦����ļ����ļ��У������β���Ҫ������ļ����ļ��У�����ѡ����
query�� Ϊloaders�ṩ���������ѡ���ѡ��
*/


2.style-loader!css-loader?modules

//1.��ʽloader
A.����ϲ���JS�ļ�
{test: /\.css$/, loader: "style-loader!css-loader" }   

B:��ȡ�����ļ�
{test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},

plugins:[
  new ExtractTextPlugin('css/[name].css'),
]

C:���ļ���ȡ



//��.���	plugins:[]
1.��������������������������������� 
vendor
CommonChunkPlugin(chunkName, fileName)

2.��������������������
webpack.ProvidePlugin

3.����ȫ�ֱ��� 
//import $ from 'jquery'  var $ = require('jquery');
externals:{
	$: 'jquery'
}


/**
����jquery��jquery���
*/
1.���jquery���û�в����κ�ģ�黯������ֱ������cdn�ϵ�jQuery���������ò��������Ϳ�������ʹ�á�

2.