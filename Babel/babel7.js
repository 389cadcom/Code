@babel/core 
@babel/cli 
@babel/polyfill
@babel/runtime	 @babel/plugin-transform-runtime 
@babel/plugin-transform-regenerator

//@babel/plugin-transform-arrow-functions
@babel/preset-env					 
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

//babel7����ES6
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",		// Ϊ�ļ��������貿�ֵ�polyfill������������ֻ����һ����ͬ��polyfill��
      "modules": false					// ���ý�ES6ģ���﷨ת��Ϊ����ģ�����ͣ�����Ϊfalse����ת��ģ�顣
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "helpers": false
    }],
		["@babel/plugin-transform-regenerator"]  //async
  ]
}

parsets���ò���:
/*
targets.node			֧�ֵ��ĸ��汾�� node
targets.browsers	֧�ֵ��ĸ��汾�������
loose							��������ģʽ����� webpack �� loader ʹ��
modules						ģ����ػ���  "amd" | "umd" | "systemjs" | "commonjs" | false�� Ĭ��Ϊ "commonjs". false �Ͳ���ת��eS6ģ��
									�����import statements�����CommonJS

debug							��������ģʽ
include						������Щ�ļ�
exclude						�ų���Щ�ļ�
useBuiltIns			  �Ƿ�� babel-polyfill ���зֽ⣬ֻ��������Ĳ���

//loose:
normal mode ת��������es6��д����property����ͨ��Object.defineProperty���ж���
loose mode  ת��������es5��д�������ܸ���һЩ�������Ը���һЩ�������ⲿ�ݴ�����ת����native es6�Ƚ��鷳
*/


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


//ʵ��
1.��̬���� import(/*webpackChunkName: 'lodash'*/ 'lodash')
  �谲װ  babel-plugin-syntax-dynamic-import

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
