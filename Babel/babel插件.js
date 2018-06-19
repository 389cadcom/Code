//启用插件babel-plugin-transfrom-runtime，Babel就会使用babel-runtime工具函数
babel-plugin-transform-runtime	//工具自动添加,主要的功能是为api提供沙箱的垫片方案
//babel-runtime --> core-js中提取, 使用require('babel-runtime/core-js/promise')

babel-runtime/core-js/set
babel-runtime/core-js/object/assign
babel-runtime/core-js/promise


babel-polyfill					//通过改写全局prototype的方式实现, require('babel-polyfill') import 'babel-polyfill'   script引入


//plugins
transform-modules-strip					//module: false, 去除import, export声明 ==> BS4
transform-remove-strict-mode		// 'use strict'		


//babel-preset-es2015		20个插件

transform-es2015-template-literals      // => es2015模板
transform-es2015-literals								// => 编译整数(8进制/16进制)和unicode
transform-es2015-function-name          // => 函数name属性
transform-es2015-arrow-functions        // => 箭头函数
transform-es2015-block-scoped-functions // => 函数块级作用域
transform-es2015-classes                // => class类
transform-es2015-object-super           // => super提供了调用prototype的方式
transform-es2015-shorthand-properties   // => 对象属性的快捷定义，如obj = {      x, y }
transform-es2015-computed-properties    // => 对象中括号属性，如obj   = {['x]: 1}
transform-es2015-for-of                 // => 对象for          of遍历
transform-es2015-sticky-regex						// => 正则添加sticky属性
transform-es2015-unicode-regex					// => 正则添加unicode模式
check-es2015-constants                  // => const常量
transform-es2015-spread                 // => 对象扩展运算符属性，如...foobar
transform-es2015-parameters             // => 函数参数默认值及扩展运算符
transform-es2015-destructuring          // => 赋值解构
transform-es2015-block-scoping          // => let和const块级作用域
transform-es2015-typeof-symbol          // => symbol特性
transform-es2015-modules-commonjs       // => commonjs模块加载
transform-regenerator                   // => generator特性


//es2016	--es7
transform-exponentiation-operator						//编译幂运算符


//es2017	--es8
syntax-trailing-function-commas							//function最后一个参数允许使用逗号
transform-async-to-generator								//把async函数转化成generator函数
transform-decorators-legacy									//ES7 装饰器


//es2018  --es9


/*
  Stage-X(0/1/2/3/4) 五个阶段: 展示、征求、草案、候选、定案

*/

//stage-4:
syntax-trailing-function-commas			// function最后一个参数允许使用逗号（ES8已经存在）
transform-async-to-generator			// 把async函数转化成generator函数（ES8已经存在）
transform-exponentiation-operator		// 编译幂运算符（ES7已经存在）

babel-preset-stage-3：					// 除了stage-4的内容，还包括以下插件：
transform-object-rest-spread			// 编译对象的解构赋值和不定参数
transform-async-generator-functions		// 将async generator function和for await编译为es2015的generator。


//stage-2：								//除了stage-3的内容，还包括以下插件：
syntax-dynamic-import					// 动态加载模块
transform-class-properties				// 编译静态属性(es2015)和属性初始化语法声明的属性(es2016)。
//transform-decorators					已禁用的等待提案更新（可以在此期间使用旧版转换）


//stage-1：
transform-class-constructor-call(弃用)	// 编译class中的constructor，在Babel7中会被移除
transform-export-extensions				// 编译额外的export语法，如export * as ns from "mod";


//stage-0：
transform-do-expressions				// 编译do表达式
transform-function-bind					// 编译bind运算符，即::



{
	"presets": [ ["env", { "modules":false }], "stage-2"],
	"plugins": [ "transform-runtime" ]
}



//plugins插件  默认只转换新语句，不转换API

//Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象
//全局对象上的方法Object.assign, Array.from



//插件说明:
babel-plugin-transform-es2015-modules-strip	//禁用导入、导出模块

babel-plugin-add-module-exports


babel-plugin-transfrom-runtime				



//babel-polyfill 直接在原型链上增加方法 (新的API及对象prototype上的方法)

