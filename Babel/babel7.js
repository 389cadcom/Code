@babel/core 
@babel/cli 
@babel/polyfill
@babel/runtime	 @babel/plugin-transform-runtime  --> corejs: 2
@babel/plugin-transform-regenerator

//@babel/plugin-transform-arrow-functions
@babel/preset-env																	--> corejs:2
@babel/preset-react
@babel/preset-flow
@babel/preset-typescript


npm i -D  babel-loader @babel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime @babel/polyfill


//
babel-loader@8 requires Babel 7.x (the package '@babel/core')


//����
babel src --out-dir lib --presets=@babel/env


//bootstrap4����
{
  "presets": [ "es2015", { "modules": false, "loose": true } ],
  "plugins": [ "transform-es2015-modules-strip" ]				//������import export
}

//babel7����ES6 --  �û���polyfill���������require('corejs/modules/es7.array.includes')
{
  "presets": [
    ["@babel/preset-env", {
			"corejs": 2,
      "useBuiltIns": "usage",		// Ϊ�ļ��������貿�ֵ�polyfill������������ֻ����һ����ͬ��polyfill��
      "modules": false					// ���ý�ES6ģ���﷨ת��Ϊcjs����ģ�����ͣ�����Ϊfalse����ת��ģ�顣
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
			"corejs": 2,
      "helpers": false
    }],
		["@babel/plugin-transform-regenerator"]  //async
  ]
}

parsets���ò���:
/*
targets.node			֧�ֵ��ĸ��汾�� node
targets.browsers	֧�ֵ��ĸ��汾������� browserslist:[]
loose							��������ģʽ������ض�����plugin
									normal | true, es6��д����property����ͨ��Object.defineProperty���ж���, ������es5��д����__proto__ = X.prototype

modules						ģ����ػ���  "amd" | "umd" | "systemjs" | "commonjs" | false�� Ĭ��Ϊ "commonjs". false �Ͳ���ת��eS6ģ��
									�����import statements�����CommonJS

debug							��������ģʽ
include						������Щ�ļ�
exclude						�ų���Щ�ļ�
useBuiltIns			  �Ƿ�� babel-polyfill ���зֽ⣬ֻ��������Ĳ���


plugins���ò���
{
  "plugins": ['transfrom-runtime', {options} ]
}
/*
helpers: boolean				Ĭ��true��ʹ��babel��helper������
polyfill: boolean				Ĭ��true��ʹ��babel��polyfill�����ǲ�����ȫȡ��babel-polyfill��
regenerator: boolean		Ĭ��true��ʹ��babel��regenerator��
moduleName: string			Ĭ��babel-runtime��ʹ�ö�Ӧmodule����

babel-runtime/helpers/classCallCheck
babel-runtime/helpers/createClass
*/
babel-plugin-transform-runtime��
    1 �Զ�����helper�����磬��������� Promise, Set, Map, Symbol��
    2 babel-runtime�ṩhelper(���ߺ���)���壬�������helper����ʹ�ã������ظ�
    3 ������ babel-runtime ���
		4.tranform-runtime��֧��ʵ�����ķ�������:Array.prototype.fill(), includes()

		helpers: �Ƿ�ʹ�� @babel-runtime/helpers �������ڲ��� helpers
����coresjs: �Ƿ��� @babel-runtime/corejs �еĸ����������滻 Map / Set �ȷ���
����polyfill: �Ƿ��� @babel-runtime �ĸ������������� polyfill


//ʵ��
1.��̬���� import(/*webpackChunkName: 'lodash'*/ 'lodash')
  �谲װ  babel-plugin-syntax-dynamic-import							//��̬�﷨

2.���ϰ汾�����ʹ�� import()��polyfill(�磺es6-promise �� promise-polyfill),��shim Promise

import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
// ��
import 'es6-promise/auto';
// ��
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

3.ʹ�� async, await  
	
	�谲װ:
	babel-plugin-runtime/regenerator
  babel-plugin-transform-runtime

	@babel/plugin-transform-regenerator
	@babel/plugin-transform-runtime
	@babel/runtime



//plugins˵��
transform-modules-strip											//module: false, ȥ��import, export���� ==> BS4
babel-plugin-transform-es2015-modules-strip	//���õ��롢����ģ��
babel-plugin-add-module-exports



//babel-preset-es2015		20�����

transform-es2015-template-literals      // => es2015ģ��
transform-es2015-literals								// => ��������(8����/16����)��unicode
transform-es2015-function-name          // => ����name����
transform-es2015-arrow-functions        // => ��ͷ����
transform-es2015-block-scoped-functions // => �����鼶������
transform-es2015-classes                // => class��
transform-es2015-object-super           // => super�ṩ�˵���prototype�ķ�ʽ
transform-es2015-shorthand-properties   // => �������ԵĿ�ݶ��壬��obj = {      x, y }
transform-es2015-computed-properties    // => �������������ԣ���obj   = {['x]: 1}
transform-es2015-for-of                 // => ����for          of����
transform-es2015-sticky-regex						// => �������sticky����
transform-es2015-unicode-regex					// => �������unicodeģʽ
check-es2015-constants                  // => const����
transform-es2015-spread                 // => ������չ��������ԣ���...foobar
transform-es2015-parameters             // => ��������Ĭ��ֵ����չ�����
transform-es2015-destructuring          // => ��ֵ�⹹
transform-es2015-block-scoping          // => let��const�鼶������
transform-es2015-typeof-symbol          // => symbol����
transform-es2015-modules-commonjs       // => commonjsģ�����
transform-regenerator                   // => generator����


//es2016	--es7
transform-exponentiation-operator				//�����������


//es2017	--es8
syntax-trailing-function-commas					//function���һ����������ʹ�ö���
transform-async-to-generator						//��async����ת����generator����
transform-decorators-legacy							//ES7 װ����


//es2018  --es9
babel-plugin-class-properties           //class �ľ�̬����ת��


//babel@7  ȡ�� babel-preset-stage2

//Stage-X(0/1/2/3/4) ����׶�: չʾ�����󡢲ݰ�����ѡ������
//stage-4:
syntax-trailing-function-commas			// function���һ����������ʹ�ö��ţ�ES8�Ѿ����ڣ�
transform-async-to-generator			// ��async����ת����generator������ES8�Ѿ����ڣ�
transform-exponentiation-operator		// �������������ES7�Ѿ����ڣ�

babel-preset-stage-3��					// ����stage-4�����ݣ����������²����
transform-object-rest-spread			// �������Ľ⹹��ֵ�Ͳ�������
transform-async-generator-functions		// ��async generator function��for await����Ϊes2015��generator��


//stage-2��								//����stage-3�����ݣ����������²����
syntax-dynamic-import					// ��̬����ģ��
transform-class-properties				// ���뾲̬����(es2015)�����Գ�ʼ���﷨����������(es2016)��
//transform-decorators					�ѽ��õĵȴ��᰸���£������ڴ��ڼ�ʹ�þɰ�ת����


//stage-1��
transform-class-constructor-call(����)	// ����class�е�constructor����Babel7�лᱻ�Ƴ�
transform-export-extensions				// ��������export�﷨����export * as ns from "mod";


//stage-0��
transform-do-expressions				// ����do���ʽ
transform-function-bind					// ����bind���������::
