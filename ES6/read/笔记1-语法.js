//一.let, const
1.不存在变量提升		//undefined、 a is not defined
2.先声明后使用
3.不能重复定义、声明

//二.字符串模板  变量注入
let str = `${this.baseUrl}/query?${this.query}`


//三.箭头函数
1.一个参数，一行语句： let f = a => 'hello';
2.无参				   let f = ()=> 'hello';
3.多个参数:
	let f = (a, b)=>{
		return a + b;
	}
4.无法通过apply或call改变上下文(this)

5.顶层使用箭头函数上下文指向window或global


//四.对象字面量语法
let obj = {
	
}
return {
	[n] : n,                             //动态计算属性名
	[ `${n}^2` ]: Math.pow(n, 2)        
}


//五.解构赋值	-- 从数组、对象中提取值，对变量进行赋值

//数组--按序排列
var [x, y] = [1,2];
var [a, ...b] = [1,2,3,4]

//对象--对象的属性没有次序，变量必须与属性同名
var {foo, bar}	 = {foo:'a', bar: 'b'};
var {foo: baz} = {foo:'a', bar: 'b'};		//foo error, baz 'a'	foo是模式，不会被解构，baz是变量才会被赋值

//默认值，对象属性默认等于undefined, 若数组(解构)的成员值不全等于undefined，进行解构，默认值不生效
var [a] = [];			//a === undefined
var [b = 1] = [];		//b === 1
var [c = 2] = [null];	//c == null

var {x}   = {};
var {y = 1} = {};
var {z = 2} = {z:null}

//已声明的变量用于解构赋值，需加个小括号，JS引擎会将{}解析成代码块
let a;
{x} = {x:1}			//syntax error
({x} = {x:1})

//对象属性解构
var {min, max, log} = Math;


//数组本质是特殊对象，可以对数组进行对象属性解构
var ary = [1, 2, 3, 4]
var {0:first, [ary.length-1]:last} = ary;

//字符串、数值、布尔值解构，则会先转为对象

//函数参数解构 -- 用于二维数组
var arr = [ [1,2], [3,4] ];
ary = arr.map([x, y]=>{
	return x + y;
})


//六.函数参数
1.默认值
function fn(x=1, y=2){		
	
}
//var x = arguments.length > 0 && arguments[0]!==undefined ? arguments[0] : 1;

//结合解构赋值使用
function fn({x=1, y=2}={}){

}
2.后续参数, 需放入最后
//...args
var args = [].slice.apply(arguments)
var args1 = [].slice.apply(arguments, 1)

//严格模式，arguments.callee, arguments.caller被禁用


/*
  括号问题：
  1.变量声明，不能带有括号
  2.函数参数中，模式不能带有括号	//也属于变量声明
  3.赋值语句中，整个模式不能使用

  赋值语句中的模式部份，可以使用括号。

  var [(b)] = [3];				// 报错
  [(b)] = [3];					//正常  严格模式中 b未定义报错


  作用：
  1.变换变量的值
  2.从函数返回多个值			//返回数组，对象再解板赋值
  3.函数参数的定义
  4.提取JSON数据				//let {id, staus, data:number} = data;
  5.定义函数参数的默认值
  6.for of遍历Map结构	
  7.模块的指定方法				//left {mth1, mth2} = require('mathod');
 */
