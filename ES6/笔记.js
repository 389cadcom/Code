

/*4-28*/
export default 本质是输出一个叫做default的变量或方法，系统允许你取任意名字

/*
报错：							  正确：	
1.export default var a = 1;       var a = 1; export default a;

2.export 1;						  export default 1;

3.function f(){} 
export f;						  export {f}
*/

类：
export default class{}

import MyClass from './MyClass';
let o = new MyClass();


模块继承：

export * from './parent.js';

模块本质：
import时，不会执行模块，只是生成一个动态的只读引用，只有真需要时，才到模块去取值

//REPL: babel-node
Modules aren't supported in the REPL

//正确:
babel-node module.js


//转码器
es6-module-transpiler

compile-modules convert file1.js file2.js -o output.js


class 

p[Symbol.iterator] is not a function

/*2017-2-14*/
1.箭头函数，函数默认变量，扩展运算符

2.class类

3.对象简洁属性写法，表达式计算属性名

4.字符串模板 ${var}

5.解构赋值

6.Set WeakSet, Map WeakMap

//http://blog.csdn.net/lihongxun945/article/details/48952017
7.Iterators + For of, Symbol

Generator +　yield + *

Promise => resolve reject then throw

代理Proxy



/*11.10*/
1.babel
  babel example.js -o compiled.js
  babel src -d dist
  babel src -d dist  -s

  babel-cli
  babel-node
  babel-register
  babel-core
  babel-polyfill

  babel-presets-es-2015
  babel-presets-stage-2015

  npm run build			//scripts: {build: ''}

 2.变量、常量
   不存在变量提升		//undefined、 a is not defined
   先声明后使用
   不能重复定义、声明

 3.变量的解构赋值
	
  从数组、对象中提取值，对变量进行赋值
  数组： 按序排列
  1.1.模式匹配			//let [a, ...b] = [1,2,3,4]
  1.2.不完全解构
  
  对象： 而对象的属性没有次序，变量必须与属性同名
  var {foo, bar}	 = {foo:'a', bar: 'b'};
  var {foo: baz} = {foo:'a', bar: 'b'};		//foo error, baz 'a'
  //foo是模式，不会被解构，baz是变量才会被赋值

  let foo;
  let {foo} = {foo: 1}		//报错 let,const不能重定义
  //({foo} = {foo:1})

  默认值--对象的属性值等于undefined
  var {x = 3} = {};
  var {x, y = 5} = {x:1};

  var {x=2} = {x:null}

  已声明的变量用于解构赋值，需加个小括号，因JS引擎会将{}解析成代码块
  var x;
  {x} = {x: 1}; //syntax error
  ({x} = {x:1});

  //对象属性解构
  let {log, sin, max} = Math;
  //数组本质是特殊对象，可以对数组进行对象属性解构
  let arr = [1,2,3]
  let {0: first, [arr.length-1]: last} = arr;

  字符串   //类似数组

  数值、布尔值解构，则会先转为对象

  函数参数解构
  var arr = [[1,2], [3,4]].map(([a, b])=>{
	return a + b;  
  });

  //默认值
  function move({x=0,y=0} = {}){ }		   //参数指定默认值
  move({})		//undefined触发函数参数的默认值

  function move({x, y} = {x:0, y:0}){ }	   //变量指定默认值
  move({})		//[undefined, undefined]

  括号问题：
  1.变量声明，不能带有括号
  2.函数参数中，模式不能带有括号	//也属于变量声明
  3.赋值语句中，整个模式不能使用

  赋值语句中的模式部份，可以使用括号。

  var [(b)] = [3];		// 报错
  [(b)] = [3];			//正常  严格模式中 b未定义报错


  作用：
  1.变换变量的值
  2.从函数返回多个值   //返回数组，对象再解板赋值
  3.函数参数的定义
  4.提取JSON数据	   //let {id, staus, data:number} = data;
  5.定义函数参数的默认值
  6.for of遍历Map结构
  7.模块的指定方法		//left {mth1, mth2} = require('mathod');

/*11-28*/
1.函数参数默认值
  arguments.length > 0 && arguments[0]!==undefined?arguments[0]:1;
2.构造赋值结合使用
  function f1({x=0, y=0} = {}){		//参数默认是空对象，但解构赋值的默认值
  
  }


