{
	"presets":[
		["env", {"modules": false}],
		"stage-2"
	],
	"plugins": ["transform-runtime", "syntax-dynamic-import"]
}
// loose模式针对特定几个plugin
// normal mode的转换更贴近es6的写法，许多的property都是通过Object.defineProperty进行的。
// loose mode则更贴近es5的写法，性能更好一些，兼容性更好一些

// 区别：JS标准新增的原生对象和API的shim，实现上仅仅是core-js和regenerator-runtime

polyfill 所有兼容性问题，都可以通过polyfill解决（包括：实例方法）、污染全局环境, 改写全局prototype的方式实现
runtime  除了实例方法以外，其他兼容新问题都能解决、不污染全局环境

polyfill：如果想要支持全局对象（比如：`Promise`）、静态方法（比如：`Object.assign`）或者**实例方法**（比如：`String.prototype.padStart`）

babel-runtime ：提供了兼容旧环境的函数，使用的时候，需要我们自己手动引入
	//提取模块复用工具函数,提供工具函数,减少重复代码
  比如： const Promise = require('babel-runtime/core-js/promise')
  存在的问题：
    1 手动引入太繁琐
    2 多个文件引入同一个helper（定义），造成代码重复，增加代码体积
/*
babel-runtime/core-js/set
babel-runtime/core-js/object/assign
babel-runtime/core-js/promise
*/

babel-plugin-transform-runtime：
    1 自动引入helper（比如，上面引入的 Promise, Set, Map, Symbol）
    2 babel-runtime提供helper(工具函数)定义，引入这个helper即可使用，避免重复
    3 依赖于 babel-runtime 插件
		4.tranform-runtime不支持实例化的方法，如:Array.prototype.fill(), includes()


transform-runtime插件的使用：
  //直接在 .bablerc 文件中，添加一个 plugins 的配置项即可！！！
  "plugins": [
    "transform-runtime"
  ]

polyfill 使用步骤:  //或直接在页面添加 polyfill.min.js
1.main.js
  require('babel-polyfill')
	's'.padStart(4)

  import '@babel/polyfill'

2.webpack.js
	entry: {
		app: ['babel-polyfill', './main.js']
	}
//或
{
	"presets": [
		["@babel/preset-env", 
		 {
			"target"": {
				"browsers": ["chrome 70"]
			},
			"useBuiltIns": "usage"				//是否开启自动支持 polyfill
		 }
		]	
	]
}

//plugins说明
transform-modules-strip											//module: false, 去除import, export声明 ==> BS4
transform-remove-strict-mode								// 'use strict'		

babel-plugin-transform-es2015-modules-strip	//禁用导入、导出模块
babel-plugin-add-module-exports



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
transform-exponentiation-operator				//编译幂运算符


//es2017	--es8
syntax-trailing-function-commas					//function最后一个参数允许使用逗号
transform-async-to-generator						//把async函数转化成generator函数
transform-decorators-legacy							//ES7 装饰器


//es2018  --es9


//Stage-X(0/1/2/3/4) 五个阶段: 展示、征求、草案、候选、定案

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



//plugins插件  默认只转换新语句，不转换API

//Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象
//全局对象上的方法Object.assign, Array.from
