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


//编译
babel src --out-dir lib --presets=@babel/env


//bootstrap4配置
{
  "presets": [ "es2015", { "modules": false, "loose": true } ],
  "plugins": [ "transform-es2015-modules-strip" ]				//不编译import export
}

//babel7配置ES6
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",		// 为文件引入所需部分的polyfill。利用捆绑器只加载一次相同的polyfill。
      "modules": false					// 启用将ES6模块语法转换为其他模块类型，设置为false不会转换模块。
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "helpers": false
    }],
		["@babel/plugin-transform-regenerator"]  //async
  ]
}

parsets配置参数:
/*
targets.node			支持到哪个版本的 node
targets.browsers	支持到哪个版本的浏览器
loose							启动宽松模式，配合 webpack 的 loader 使用
modules						模块加载机制  "amd" | "umd" | "systemjs" | "commonjs" | false， 默认为 "commonjs". false 就不会转换eS6模块
									避免把import statements编译成CommonJS

debug							开启调试模式
include						包含哪些文件
exclude						排除哪些文件
useBuiltIns			  是否对 babel-polyfill 进行分解，只引入所需的部分

//loose:
normal mode 转换更贴近es6的写法，property都是通过Object.defineProperty进行定义
loose mode  转换更贴近es5的写法，性能更好一些，兼容性更好一些，但将这部份代码再转换成native es6比较麻烦
*/


plugins配置参数
{
  "plugins": ['transfrom-runtime', {options} ]
}
/*
helpers: boolean				默认true，使用babel的helper函数；
polyfill: boolean				默认true，使用babel的polyfill，但是不能完全取代babel-polyfill；
regenerator: boolean		默认true，使用babel的regenerator；
moduleName: string			默认babel-runtime，使用对应module处理。

babel-runtime/helpers/classCallCheck
babel-runtime/helpers/createClass
*/


//实践
1.动态加载 import(/*webpackChunkName: 'lodash'*/ 'lodash')
  需安装  babel-plugin-syntax-dynamic-import

2.在老版本浏览器使用 import()需polyfill(如：es6-promise 或 promise-polyfill),来shim Promise

import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
// 或
import 'es6-promise/auto';
// 或
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

3.使用 async, await  
	
	需安装:
	babel-plugin-runtime/regenerator
  babel-plugin-transform-runtime

	@babel/plugin-transform-regenerator
	@babel/plugin-transform-runtime
	@babel/runtime
