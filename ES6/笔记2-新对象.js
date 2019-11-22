/*
 ------------------------------新的数据结构---------------------------------
 Set, Map, WeakSet, WeakMap
 Symbol, Iterator, Generator, Promise, Proxy, Reflect
 Class, Module
*/

//一.新数据结构Set, Map
1.Set		//值都是唯一,支持链式操作, 接受一个数组(类数组)作为参数，初始化--数组去重
  constructor, size
  add, delete, has, clear
  keys, foreach
  
  [...set]		//扩展运算符

  Set内部两个NaN是相等
  两个对象总是不相等

  判断是否包括一个键上面：obj[key]     set.has(key)
  
  Array.from()将Set结构转为数组
  Array.from(set, val=>val*2)		   //TODO 转换成新数组--使用map方法

  并集： new Set([...set1, ...set2])
  交集:  new Set([...set1].filter(val=>set2.has(val)))
  差集:	 [...set1].filter(val=>!set2.has(val))

  WeakSet:
  add, delete, has
  没有size属性，没法遍历它成员


2.Map			//键值对二数组作为参数   new Map([['name','Li'], [{a:'A'}, 'ABC']])
  size, 
  set(key, val), get(key), has(key), delete(key), clear

  同一键多次赋值，后面覆盖前面值
  读取一个未知的键，返回undefined
  
  //对象引用，表面是同一值，但实际内存地址是不一样的
  map.set(['a'], 555);			//改为：let a = ['a']
  map.get(['a'])				// undefined


  与其数据结构转换：
  1.二维数组    [...map]			new Map(arrs)
  2.对象	    obj[key] = val;				//键都是字符串  for(let [key, val] of map)
				map.set(key, obj[key])		//for(let key of Object.keys(obj))
  3.JSON
	 键名都是字符串, 先转为对象   ->   JSON.stringify(obj)		
	 键名有非字符串, 转为数组JSON ->   JSON.stringify([...map]) 


//二、Symbol, Iterator
//writable, configurable, enumerable



//06-26 调用Iterator接口
1.解构赋值		--> 对数组和Set进行解构赋值

2.扩展运算符  ...set

3.yield*	Generator函数内定义Generator函数

for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键

for...of
Array.from()


//三、Proxy, Reflect
new Proxy({}, {
	get(target, prop){
		return target[prop];
	}	
})

//反射  Reflect	
Reflect.defineProperty(obj, "b", {value:'B'})	deleteProperty

Reflect.has(obj, name) 

//要执行一个函数f，并给它传一组参数args， 还要绑定this
Reflect.apply(f, obj, args)			//f.apply(obj, args)

//可变参数形式的构造函数
Reflect.consructor(F, args)

Reflect.get(obj, name)

Reflect.ownKeys()


//四、Generator, Promise


//五、import, export, module	  
export要么放在声明变量前，要么跟一组要导出的变量在一起
/*
export 必须与模块内部的变量建立一一对应关系
没有指定对外的接口								指定对外接口为default或变量

报错：														正确：	
1.export default var a = 1;       var a = 1; export default a;  export {a}
  var a = 1;
	export a;												export var a = 1;    export {a}

2.export 1;												export default 1;    将后面的值, 赋给default变量; 

3.function f(){} 
  export f;												export {f}， export default f
*/

//正确
export var a = 1;								export default 1;
export {a}											export default a;

export function fn(){};					export {fn}
export default function(){}			export default function fn(){}   //视同匿名函数加载

//default已是变量, 所以不能跟变量声明语句  var, let, const
export default  本质是输出一个叫做default的变量或方法，系统允许你取任意名字

//default解释
//导入
import a from './d';
// 等效于，或者说就是下面这种写法的简写，是同一个意思
import {default as a} from './d';

//导出
export default function() {}
// 等效于：
function a() {};
export {a as default};


// import d from './d'
const  d = require('./d').default    //define(function(require, exports, module){  })

let { default:component } = xxx


类：
export default class{}

import MyClass from './MyClass';
let o = new MyClass();


模块继承：
export * from './parent.js';

模块本质：
import时，不会执行模块，只是生成一个动态的只读引用，只有真需要时，才到模块去取值


//转码器
es6-module-transpiler

compile-modules convert file1.js file2.js -o output.js