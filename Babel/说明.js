/* ����babel��cacheDirectoryΪtrue(�����������������)
var options = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime', 'add-module-exports', 'typecheck', "transform-decorators-legacy"],
    cacheDirectory: true
}

*/

 //��������---�����������ƴ��һ����ɶ��������


//Ĭ��ֻת���﷨����ת���µ�API
1.babel-core							//����API������Babel��API����ת�룬��Ҫʹ��babel-coreģ��

2.babel-node							//REPL������ֱ��ִ���нű�  �磺babel-node src/test.js

3.babel-doctor

4.babel-polyfill						//Ϊ��ǰ�����ṩһ����Ƭ

5.babel-runtime	(_extend, callback)     //��ȡģ�鸴�ù��ߺ���,�ṩ���ߺ���,�����ظ�����	_extend()�� _classCallCheck()���ߺ���
//babel-plugins-transform-runtime

6.babel-register						//��дrequire����, ��import����require��import���ŵ�����������跽�����߱���������Ҫ��������ģ�飬���������



//����
babel es6.js  --preset es2015

babel es6.js -o es5.js												//--out-file

babel src -d lib															//--out-dir 

babel index.js main.js -o es5.js --compact		// ת��es5, ���һ���ļ�


//ִ�нű� node  babel-node
node  test.js, 
babel-node test.js

//babel-node	REPL����
Modules aren't supported in the REPL

//��ȷ:	ֱ��ִ�нű��ļ�
babel-node module.js;

