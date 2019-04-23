//ES7 => es2016
Array.prototype.includes					//NaN, undefined
3**3															// 指数运算

//ES8	=> es2017
async await,				//var [res1, res2] = await Promise.all([])
ArrayBuffer					//共享内存-- Uint8Buffer, Int8Array, 

padStart(2, '0'), padEnd(), trimLeft, trimRight

values
entries
getOwnPropertyDescriptors

//函数参数尾部逗号优化


//ES9   iter = arr[Symbol.iterator]();  iter.next()
1.异步迭代、Promise.prototype.finally

2.对象扩展运算符

3.正则命名的捕获组

const promises = [
	new Promise(resolve => resolve(1)),
	new Promise(resolve => resolve(2)),
	new Promise(resolve => resolve(3)),
];

async function test() {
	for await (const p of promises) {
		console.log(p);
	}
}

str.match(/(?<year>\d{4})-(\d{2})-(\d{2})/)   



//ES10
BigInt()

String .matchAll, .trimStart(), .trimEnd()
Array .flat(Infinity), .flatMap(), .sort()

Object .fromEntries()
new Function .toString()

await import()


//ES6
set, map, promise, generator, Symbol, Proxy, Reflect

String, Number, Regexp, Math, Array, Object

//String
fromCodePoint

codePointAt, startsWith, endsWidth, includes, replace

//array
from, of

copyWithin, fill, find, findIndex, indexOf
entries, keys, values

//object
assign, is, keys, setPrototypeOf


//ES5与ES6 代码实现比较
1.块作用域 == IIFE自执行函数

2.const 
Object.defineProperties(window, {
	favicon: {
		value: 3,
		enumerable: true,
		//writable: false,
		//configurable: false
	}
})

3.计算属性
let key = Date.now()
obj = {
	[key]: 'now'
}
obj[key + 'i'] = 'es5'

4.解构 => 先定义对象或数组，通过属性、索引获取值

5. for..of  iterator 迭代
for( var _iter = [1,2,3][Symbol.iterator](), _step; !(_step = _iter.next()).done; ){
  console.log(_step.value);
}

6.函数默认值
function greet(msg='hello', name='world') { }

function greet(msg, name) {
	msg = msg || 'hello';
	name= name || 'world'
}
function greet() {
	//arguments.length <= 1 || arguments[1] === undefined ? 'dude' : arguments[1];
	var msg = arguments[0]=== undefined ? 'hello': arguments[0];
	var name= name || 'world'
}


7.//参数默认值，不定参数，拓展参数
var y = []
y.push.apply(y, arguments) && y.shift()     //TODO 1

//参数扩展运算符传参
function add(a, b){
  console.log(a, b);
}
add.apply(null, [4, 5])											//TODO 2

[].slice.call(arguments)										//TODO 3


8.ES5 class ->定义

function Hello(name) {
  this.name = name;
}

Hello.prototype.hello = function hello() {
  return 'Hello ' + this.name + '!';
};

Hello.sayHelloAll = function () {
  return 'Hello everyone!';
};

function HelloWorld() {
  Hello.call(this, 'World');
}

HelloWorld.prototype = Object.create(Hello.prototype);
HelloWorld.prototype.constructor = HelloWorld;					//指定构函数名
HelloWorld.sayHelloAll = Hello.sayHelloAll;

HelloWorld.prototype.echo = function echo() {
  alert(Hello.prototype.hello.call(this));
};

var hw = new HelloWorld();
hw.echo();




//1.块作用域    es5变量的作用域是函数 -> 闭包
var -> 变量提升
let -> 先定义，后使用；临时性死区
const 若是对象，可以修改对象内部的属性值

堆栈						队列
同步代码				回调

//2.正则与字符串
匹配字符的位置es5， 是否包含子符串es6

//3.函数
arguments实参；默认值不能被arguments识别

不定参数：所有参数未尾，不能用于对象字量的setter

Math.max.apply(null, arr)

Math.max(...arr)

//箭头函数=>  单个参数可不需小括号，返回多行或对象加括号可省略return

1.没有this, super, arguments, new.target绑定
5.不能使用news, 没有原型
7.不支持重复命名参数

const action = (type, a)=>({
	type,
	a
})

a = id => {id}

尾部调用优化：递归