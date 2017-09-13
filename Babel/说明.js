1.不将import, export转换为module.exports = 
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

/* 设置babel的cacheDirectory为true(打包性能提升很明显)
var options = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime', 'add-module-exports', 'typecheck', "transform-decorators-legacy"],
    cacheDirectory: true
}
*/

/*------------------------------------------------------------------------------------------*/


//检测node对ES6支持程度
es-checker


//设置转码规则和插件
{
  "presets": ["es2015", "stage-2"],
  "plugins": ["transform-runtime"],
  "comments": false
}


//插件说明：
1.babel-plugin-transform-es2015-modules-strip	//禁用导入、导出插件

2.babel-register				//gulp配合ES6使用， 只会对require命令加载的文件转码

3.babel-core					//需要调用Babel的API进行转码，就要使用babel-core模块

4.babel-pill					//转换新在API， Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise， 以及Object.assin()定义的方法

5.babel-runtime					//提取模块复用工具函数

6.babel-plugin-transform-runtime		//减少重复代码，生成工具函数的代码


/*
删除 node_modules
rimraf node_modules
*/

//基于babel6.x转换ES6
1.安装
npm i babel-cli -g

2.插件			
npm i babel-preset-es2015		//transform-es2015-arrow-functions、transform-es2015-classes

3.执行
babel es6.js  --preset es2015

babel es6.js -o es5.js		    //--out-file

babel src -d lib		   //--out-dir 

//babel-node	REPL环境
Modules aren't supported in the REPL

//正确:	--编译模块文件
babel-node module.js;


插件：
1.新语法
babel-preset-es2015

2.ES7阶段				//ES7语法提案  展示、征求、草案、候选、定案
babel-preset-stage-0	


//preset-es2015 -es2016 -es2017 -latest, preset-react

/*
  五个阶段: 展示、征求、草案、候选、定案
  stage-0, stage-1, stage-2, stage-3, stage-4
*/

Stage 0：
Function Bind Syntax：函数的绑定运算符
String.prototype.at： 字符串的静态方法at

Stage 1：
Class and Property Decorators：Class的修饰器
Class Property Declarations：Class的属性声明
Additional export-from Statements：export的写法改进
String.prototype.{trimLeft,trimRight}：字符串删除头尾空格的方法

Stage 2：
Rest/Spread Properties：对象的Rest参数和扩展运算符

Stage 3
SIMD API：“单指令，多数据”命令集
Async Functions：async函数
Object.values/Object.entries：Object的静态方法values()和entries()
String padding：字符串长度补全
Trailing commas in function parameter lists and calls：函数参数的尾逗号
Object.getOwnPropertyDescriptors：Object的静态方法getOwnPropertyDescriptors

Stage 4：
Array.prototype.includes：数组实例的includes方法
Exponentiation Operator：指数运算符