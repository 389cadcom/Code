{
	"presets":[
		["env", {"modules": false}],
		"stage-2"
	],
	"plugins": ["transform-runtime", "syntax-dynamic-import"]
}
// looseģʽ����ض�����plugin
// normal mode��ת��������es6��д��������property����ͨ��Object.defineProperty���еġ�
// loose mode�������es5��д�������ܸ���һЩ�������Ը���һЩ

// ����JS��׼������ԭ�������API��shim��ʵ���Ͻ�����core-js��regenerator-runtime

polyfill ���м��������⣬������ͨ��polyfill�����������ʵ������������Ⱦȫ�ֻ���, ��дȫ��prototype�ķ�ʽʵ��
runtime  ����ʵ���������⣬�������������ⶼ�ܽ��������Ⱦȫ�ֻ���

polyfill�������Ҫ֧��ȫ�ֶ��󣨱��磺`Promise`������̬���������磺`Object.assign`������**ʵ������**�����磺`String.prototype.padStart`��

babel-runtime ���ṩ�˼��ݾɻ����ĺ�����ʹ�õ�ʱ����Ҫ�����Լ��ֶ�����
	//��ȡģ�鸴�ù��ߺ���,�ṩ���ߺ���,�����ظ�����
  ���磺 const Promise = require('babel-runtime/core-js/promise')
  ���ڵ����⣺
    1 �ֶ�����̫����
    2 ����ļ�����ͬһ��helper�����壩����ɴ����ظ������Ӵ������
/*
babel-runtime/core-js/set
babel-runtime/core-js/object/assign
babel-runtime/core-js/promise
*/

babel-plugin-transform-runtime��
    1 �Զ�����helper�����磬��������� Promise, Set, Map, Symbol��
    2 babel-runtime�ṩhelper(���ߺ���)���壬�������helper����ʹ�ã������ظ�
    3 ������ babel-runtime ���
		4.tranform-runtime��֧��ʵ�����ķ�������:Array.prototype.fill(), includes()


transform-runtime�����ʹ�ã�
  //ֱ���� .bablerc �ļ��У����һ�� plugins ��������ɣ�����
  "plugins": [
    "transform-runtime"
  ]

polyfill ʹ�ò���:  //��ֱ����ҳ����� polyfill.min.js
1.main.js
  require('babel-polyfill')
	's'.padStart(4)

  import '@babel/polyfill'

2.webpack.js
	entry: {
		app: ['babel-polyfill', './main.js']
	}
//��
{
	"presets": [
		["@babel/preset-env", 
		 {
			"target"": {
				"browsers": ["chrome 70"]
			},
			"useBuiltIns": "usage"				//�Ƿ����Զ�֧�� polyfill
		 }
		]	
	]
}

//plugins˵��
transform-modules-strip											//module: false, ȥ��import, export���� ==> BS4
transform-remove-strict-mode								// 'use strict'		

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



//plugins���  Ĭ��ֻת������䣬��ת��API

//Iterator��Generator��Set��Maps��Proxy��Reflect��Symbol��Promise��ȫ�ֶ���
//ȫ�ֶ����ϵķ���Object.assign, Array.from
