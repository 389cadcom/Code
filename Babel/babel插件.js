//���ò��babel-plugin-transfrom-runtime��Babel�ͻ�ʹ��babel-runtime���ߺ���
babel-plugin-transform-runtime	//�����Զ����,��Ҫ�Ĺ�����Ϊapi�ṩɳ��ĵ�Ƭ����
//babel-runtime --> core-js����ȡ, ʹ��require('babel-runtime/core-js/promise')

babel-runtime/core-js/set
babel-runtime/core-js/object/assign
babel-runtime/core-js/promise


babel-polyfill					//ͨ����дȫ��prototype�ķ�ʽʵ��, require('babel-polyfill') import 'babel-polyfill'   script����


//plugins
transform-modules-strip					//module: false, ȥ��import, export���� ==> BS4
transform-remove-strict-mode		// 'use strict'		


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
transform-exponentiation-operator						//�����������


//es2017	--es8
syntax-trailing-function-commas							//function���һ����������ʹ�ö���
transform-async-to-generator								//��async����ת����generator����
transform-decorators-legacy									//ES7 װ����


//es2018  --es9


/*
  Stage-X(0/1/2/3/4) ����׶�: չʾ�����󡢲ݰ�����ѡ������

*/

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



{
	"presets": [ ["env", { "modules":false }], "stage-2"],
	"plugins": [ "transform-runtime" ]
}



//plugins���  Ĭ��ֻת������䣬��ת��API

//Iterator��Generator��Set��Maps��Proxy��Reflect��Symbol��Promise��ȫ�ֶ���
//ȫ�ֶ����ϵķ���Object.assign, Array.from



//���˵��:
babel-plugin-transform-es2015-modules-strip	//���õ��롢����ģ��

babel-plugin-add-module-exports


babel-plugin-transfrom-runtime				



//babel-polyfill ֱ����ԭ���������ӷ��� (�µ�API������prototype�ϵķ���)

