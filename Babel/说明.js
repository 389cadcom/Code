1.����import, exportת��Ϊmodule.exports = 
options: {
	presets: [
		['es2015'], {modules: false}
	]
}
query: {
	"presets": [
		["env", { "modules": false }]
	]
}

/* ����babel��cacheDirectoryΪtrue(�����������������)
var options = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime', 'add-module-exports', 'typecheck', "transform-decorators-legacy"],
    cacheDirectory: true
}
*/

/*------------------------------------------------------------------------------------------*/


//���node��ES6֧�̶ֳ�
es-checker


//����ת�����Ͳ��
{
  "presets": ["es2015", "stage-2"],
  "plugins": ["transform-runtime"],
  "comments": false
}


//���˵����
1.babel-plugin-transform-es2015-modules-strip	//���õ��롢�������

2.babel-register				//gulp���ES6ʹ�ã� ֻ���require������ص��ļ�ת��

3.babel-core					//��Ҫ����Babel��API����ת�룬��Ҫʹ��babel-coreģ��

4.babel-pill					//ת������API�� Iterator��Generator��Set��Maps��Proxy��Reflect��Symbol��Promise�� �Լ�Object.assin()����ķ���

5.babel-runtime					//��ȡģ�鸴�ù��ߺ���

6.babel-plugin-transform-runtime		//�����ظ����룬���ɹ��ߺ����Ĵ���


/*
ɾ�� node_modules
rimraf node_modules
*/

//����babel6.xת��ES6
1.��װ
npm i babel-cli -g

2.���			
npm i babel-preset-es2015		//transform-es2015-arrow-functions��transform-es2015-classes

3.ִ��
babel es6.js  --preset es2015

babel es6.js -o es5.js		    //--out-file

babel src -d lib		   //--out-dir 

//babel-node	REPL����
Modules aren't supported in the REPL

//��ȷ:	--����ģ���ļ�
babel-node module.js;


�����
1.���﷨
babel-preset-es2015

2.ES7�׶�				//ES7�﷨�᰸  չʾ�����󡢲ݰ�����ѡ������
babel-preset-stage-0	


//preset-es2015 -es2016 -es2017 -latest, preset-react

/*
  ����׶�: չʾ�����󡢲ݰ�����ѡ������
  stage-0, stage-1, stage-2, stage-3, stage-4
*/

Stage 0��
Function Bind Syntax�������İ������
String.prototype.at�� �ַ����ľ�̬����at

Stage 1��
Class and Property Decorators��Class��������
Class Property Declarations��Class����������
Additional export-from Statements��export��д���Ľ�
String.prototype.{trimLeft,trimRight}���ַ���ɾ��ͷβ�ո�ķ���

Stage 2��
Rest/Spread Properties�������Rest��������չ�����

Stage 3
SIMD API������ָ������ݡ����
Async Functions��async����
Object.values/Object.entries��Object�ľ�̬����values()��entries()
String padding���ַ������Ȳ�ȫ
Trailing commas in function parameter lists and calls������������β����
Object.getOwnPropertyDescriptors��Object�ľ�̬����getOwnPropertyDescriptors

Stage 4��
Array.prototype.includes������ʵ����includes����
Exponentiation Operator��ָ�������