"use strict";
1.未声明的变量赋值直接报错，而不是变成全局变量
2.函数默认的 this 将变成 undefined 而不是默认指向 window
3.对只读属性进行写操作，删除不可删除属性，对不可拓展的对象添加属性均会抛出异常
4.禁止使用 with 语句
5.重名的属性会报错，重名的函数参数会报错

//chrome列出内置方法
console.dir(Object)			// function Object()


//ECMA3
toString = Object.prototype.toString,
hasOwn   = Object.prototype.hasOwnProperty,
push     = Array.prototype.push,
slice    = Array.prototype.slice,
trim     = String.prototype.trim,
indexOf  = Array.prototype.indexOf,

//对象
var class2type = {}, toString = obj.toString;
"Boolean Number String Array Date RegExp Object Error".split(" ").forEach(function(item, i){
	class2type["[object "+ item +"]"] = item.toLowerCase();
})

function isType(obj){
	return obj == null ? String(obj) : class2type[toString.call(obj)];
}

全局对象 (global object) window
Object, Function, Array, String, Boolean, Number, Math, Date, RegExp, JSON
Error 对象： EvalError ，RangeError ，ReferenceError ，SyntaxError ，TypeError ，URIError

undefined, null, boolean, number, string




//ECMA5
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable

Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable

1.Object							 //value, writable, enumerable, configurable
   Object.create(proto [, propertiesObject ])	//proto继承属性，定义不可枚举属性，普通属性，Symbol属性
   //Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的

   Object.getPropertyOf				 //获取对象原型

   Object.getOwnPropertyNames		 //获取对象所有属性
   Object.keys						 //获取对象可枚举属性

   Object.getOwnPropertyDescriptor   //获取对象属性的描述信息
   Object.defineProperty			 //定义对象的一个属性并设置属性的控制状态
   Object.defineProperties			 //定义对象的一组属性并设置丰富的值控制

   Object.prventExtensions			 //禁止新的属性添加到对象
   Object.isExtensible				 //判断是否可以添加新属性

   Object.seal						 //禁止添加和删除属性
   Object.isSealed		
   
   Object.freeze					 //禁止现有属性和属性值的修改，并防止新特性的添加
   Object.isFrozen

eg:
if(typeof Object.create !== 'function'){
	Object.create = function(obj){
		function F(){}
		F.prototype = obj;

		return new F();
	}
}
var obj = {};
Objet.defineProperty(obj, "name", {
	get: function(){
		return name.toUpperCase()
	},
	set: function(n){
		name = n;	
	}
})

/*
property

1. value：			值，默认是undefined
2. writable：		是否是只读property，默认是false,有点像C#中的const
3. enumerable：		是否可以被枚举(for in)，默认false
4. configurable：	是否可以被删除，默认false     

同样可以像C#、Java一样些get/set，不过这两个不能和value、writable同时使用
5.get:返回property的值得方法，默认是undefined
6.set：为property设置值的方法，默认是undefined
bar:{
	get: function() { return bar; },
	set: function(value) { bar=value }
}
*/

//TODO JS定义getter, setter
var obj = {
	val:100,
	get getval(){
		return this.val;
	},
	set setval(x){
		this.val = x;
	}
}
obj2.__defineGetter__('name',function(){return this.val});
obj2.__defineSetter__('name',function(name){this.val = name;})


2.数组函数
  Array.isArray()    
	-->  Object.prototype.toString.call(arr) === '[object Array]';
	-->  {}.toString.apply(arr) === '[object Array]'

  indexOf, lastIndexOf, reduce, reduceRight
  every, some, forEach, map, filter


3.JSON
  JSON.parse(text[, reviver])			 
  JSON.stringify(obj[, replace])

  JSON.pare(obj, function(key, val){
	if(typeof val == 'string'){
		return parseInt(val);
	}else{
		return val;
	}
  })
eg:
var nums = {
  "first": 7,
  "second": 14,
  "third": 13
}
//改变值字符串化的方式，或是对我们选择的提供过滤，我们可以将其传给replacer函数
//space缩进个数
var luckyNums = JSON.stringify(nums, function(key, value){
  if (value == 13) {
    return undefined;
  } else {
    return value;
  }
}, space);


4.其他
String.prototype.trim()
Function.prototype.bind()

Date.now()




//函数库  underscore, lodash
  initial = slice.call(arr, 0, n)
  rest = slice.call(arr, n)
			 //去除前后一位 去不规范 数组扁平化  排除值		
  first, last, initial, rest, compact, flatten,    without

//并集  交集		 排除另一数组的值  去重   合并数据
union, intersection, difference,	   uniq,  zip		

//转为对象(list, vals)/[key, value], [key, value]
object

indexOf,  lastIndexOf, 

//将val插入list相应排序位置取得的索引号
sortedIndex(list, val)

//创建编号的列表
range


/**2016-06-27*/
集合函数
each, map, filter, some, every, reduce, reduceRight
find, where, findWhere, (matcher), reject

arr.map(Number)		//等价于
arr.map(item => Number(item))

invoke, contains, pluck, max, min
sortBy, groupBy, indexBy, countBy
shuffle, sample, toArray, size, partition


