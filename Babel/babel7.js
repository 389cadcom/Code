//http://www.mamicode.com/info-detail-2892561.html
//npx babel-upgrade --write  自动升级   
/**
	1.presets和plugins中的插件均不支持简写, 关字preset, plugin可省略
	2.@babel/preset-env 不支持stage-x，stage-x的相关插件需要在plugins中逐个声明
	3.要使用 @babel/node，就必须单独安装，并添加到依赖中
*/
{
	presets:[
		"@babel/preset-env"															//包含async,import() 动态导入
	],
	plugins: [
		["@babel/plugin-proposal-decorators", {"legacy": true}],		
		["@babel/plugin-proposal-class-properties", {"loose": true}],
	]
}


//ES2018--装饰器--  decorators 需要在class-properties之前
//@babel/plugin-proposal-decorators   (babel-plugin-transform-decorators-legacy    )
@withRouter
class App extend Component{

}

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


npm i -D @babel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime @babel/polyfill

babel-loader@8 requires Babel 7.x (the package '@babel/core')


//命令编译
babel src --out-dir lib --presets=@babel/env

babel index.js main.js -o es5.js --compact		// 转义es5, 组合一个文件


//bootstrap4配置
{
  "presets": [ "es2015", { "modules": false, "loose": true } ],
  "plugins": [ "transform-es2015-modules-strip" ]								//不编译import export
}

//babel7配置ES6 --  用户到polyfill，则会引用require('corejs/modules/es7.array.includes')
{
  "presets": [
    ["@babel/preset-env", {
			"corejs": 2,
      "useBuiltIns": "usage",		// 为文件引入所需部分的polyfill。利用捆绑器只加载一次相同的polyfill。
      "modules": false					// 启用将ES6模块语法转换为cjs其他模块类型，设置为false不会转换模块。
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
			"corejs": 2,
      "helpers": false
    }],
		["@babel/plugin-transform-regenerator"]  //async
  ],	
	"cacheDirectory": true										 //设置babel的cacheDirectory为true(打包性能提升很明显)
}

//@babel/plugin-transform-modules-commonjs
Object.dedineProperty(exports, '__esModule', {
	value: true
})
exports.default = 10

/*
parsets配置参数:
	targets.node			支持到哪个版本的 node
	targets.browsers	支持到哪个版本的浏览器 browserslist:[]
	loose							启动宽松模式，针对特定几个plugin
										normal | true, es6的写法，property都是通过Object.defineProperty进行定义, 更贴近es5的写法，__proto__ = X.prototype

	modules						模块加载机制  "amd" | "umd" | "systemjs" | "commonjs" | false, 
										默认为 "commonjs". false 就不会转换eS6模块  

	debug							开启调试模式
	include						包含哪些文件
	exclude						排除哪些文件
	useBuiltIns			  是否对 babel-polyfill 进行分解，只引入所需的部分


plugins配置参数
	helpers: boolean				默认true，使用babel的helper函数；
	polyfill: boolean				默认true，使用babel的polyfill，但是不能完全取代babel-polyfill；
	regenerator: boolean		默认true，使用babel的regenerator；
	moduleName: string			默认babel-runtime，使用对应module处理。

babel-runtime/helpers/classCallCheck		提取模块复用工具函数,提供工具函数,减少重复代码	_extend(), _classCallCheck()工具函数
babel-runtime/helpers/createClass

@babel/plugin-transform-runtime： 
	1 自动引入helper（比如，上面引入的 Promise, Set, Map, Symbol）
	2 babel-runtime提供helper(工具函数)定义，引入这个helper即可使用，避免重复
	3 依赖于 babel-runtime 插件
	4.tranform-runtime不支持实例化的方法，如:Array.prototype.fill(), includes()

	helpers: 是否使用 @babel-runtime/helpers 来代替内部的 helpers
　coresjs: 是否用 @babel-runtime/corejs 中的辅助方法来替换 Map / Set 等方法
　polyfill: 是否用 @babel-runtime 的辅助函数来代替 polyfill
*/


//plugins说明
babel-plugin-transform-es2015-modules-strip	//禁用导入、导出模块, 去除import, export声明 ==> BS4
babel-plugin-add-module-exports							//"addDefaultProperty": true   
																						//module.exports = exports['default']; 
																						//module.exports.default =     exports['default']


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
babel-plugin-transform-class-properties //class 的静态属性转化


//解析、转换、打印输出 ---
//babel7删除 state的预设
babel-upgrade						//官方迁移工具
npx babel-upgrade

-    "@babel/preset-stage-2": "^7.0.0",

+    "@babel/plugin-proposal-class-properties": "^7.0.0",
+    "@babel/plugin-proposal-decorators": "^7.0.0",
+    "@babel/plugin-proposal-export-namespace-from": "^7.0.0",
+    "@babel/plugin-proposal-function-sent": "^7.0.0",
+    "@babel/plugin-proposal-json-strings": "^7.0.0",
+    "@babel/plugin-proposal-numeric-separator": "^7.0.0",
+    "@babel/plugin-proposal-throw-expressions": "^7.0.0",
+    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
+    "@babel/plugin-syntax-import-meta": "^7.0.0",
//babel@7  取消 babel-preset-stage   
//说明: https://github.com/babel/babel/blob/master/packages/babel-preset-stage-0/README.md

//Stage-X(0/1/2/3/4) 五个阶段: 设想/展示、建议/征求、草案、候选、定案


//stage-4:
syntax-trailing-function-commas					// function最后一个参数允许使用逗号（ES8已经存在）
transform-async-to-generator						// 把async函数转化成generator函数（ES8已经存在）
transform-exponentiation-operator				// 编译幂运算符（ES7已经存在）

babel-preset-stage-3：									// 除了stage-4的内容，还包括以下插件：
transform-object-rest-spread						// 编译对象的解构赋值和不定参数
transform-async-generator-functions			// 将async generator function和for await编译为es2015的generator。


//stage-2：															//除了stage-3的内容，还包括以下插件：
syntax-dynamic-import										// 动态加载模块
transform-class-properties							// 编译静态属性(es2015)和属性初始化语法声明的属性(es2016)。
//transform-decorators									//已禁用的等待提案更新（可以在此期间使用旧版转换）
syntax-async-generators

//stage-1：
transform-class-constructor-call(弃用)	// 编译class中的constructor，在Babel7中会被移除
transform-export-extensions							// 编译额外的export语法，如export * as ns from "mod";

syntax-class-properties									// ES2017已存在
transform-object-rest-spread
syntax-object-rest-spread
transform-async-generator-functions
transform-class-properties


//stage-0：
transform-do-expressions								// 编译do表达式
transform-function-bind									// 编译bind运算符，即::
