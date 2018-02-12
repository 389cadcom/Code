//一.let, const
1.不存在变量提升		//undefined、 a is not defined
2.先声明后使用
3.不能重复定义、声明

//给常量定义的是对象，只要该对象指向在内存中的地址不发生改变， 数据可以随便改的(这涉及到计算机的传值和传址)

//二.字符串模板  变量注入
let str = `${this.baseUrl}/query?${this.query}`


//三.箭头函数
1.一个参数，一行语句： let f = a => 'hello';
2.无参				   let f = ()=> 'hello';	// f = _=>{}  使用下划线代替()
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

//七.Object扩展					
1.对象简洁写法
2.属性表达表	
	继承属性		//prototype
	不可枚举属性	//Object.defineProperty		Object.getOwnPropertyNames(obj)
	Symbol属性		//[Symbol()]				Object.getOwnPropertySymbol(obj)				
	自身属性		//							Object.keys()
3.方法的name属性   //特：new Function() 与 bind() 创建函数
4.Object.is		   // == 自动转换数据类型， === NaN, +0 -0
5.Object.assign    //会忽略enumerable为false的属性
	用途：
	a.给对象添加属性、方法    Object.assign(this, {x, y})
	b.浅克隆对象			  Object.assign({}, obj)		  //深克隆，比如Lodash的_.defaultsDeep方法
	c.合并多个对象			  Object.assign({}, obj)	//相同属性会被覆盖
	d.指定默认值			  let options = Object.assign({}, DEFAULTS, options);

//es7
6.Object.values
7.Object.entries	//用途将对象转为真正的Map结构  -->ES5扩展entries  Generator | for of
8. Rest解构赋值		//let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };


/*
1.for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。

2.Object.keys(obj)
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。

3.Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

4.Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。

5.Reflect.ownKeys(obj)
Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

for...in +  Reflect.ownKeys遍历属性(->继承不可枚举属性??)
1.继承属性，
2.自身属性
3.Symbol属性
4.不可枚枚举属性

TODO：合并去重、覆盖
*/	

//Class内容				
1.Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的
2.class的原型的方法都是不可枚举的

Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable

//ES6 class原型
Object.getOwnPropertyNames(Man.prototype)		//man 实例化则获取this.x属性


//八、函数Function
1.call, apply, bind								//调用后立即执行原函数， bind返回已经绑定好this的函数, 需另外执行
	a.处理伪组件		[].slice.call(obj), [].slice.bind(obj)()
	b.继承				person.call(this, name)
	c.取最大、小值		Math.min.apply(this, arr)
	d.合并数组			[].push.apply(arr1, arr2);