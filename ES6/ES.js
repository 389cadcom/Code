//ES7 => es2016
Array.prototype.includes					//NaN, undefined
3**3															// ָ������

//ES8	=> es2017
async await,				//var [res1, res2] = await Promise.all([])
ArrayBuffer					//�����ڴ�-- Uint8Buffer, Int8Array, 

padStart(2, '0'), padEnd(), trimLeft, trimRight

values
entries
getOwnPropertyDescriptors

//��������β�������Ż�


//ES9   iter = arr[Symbol.iterator]();  iter.next()
1.�첽������Promise.prototype.finally

2.������չ�����

3.���������Ĳ�����

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


//ES5��ES6 ����ʵ�ֱȽ�
1.�������� == IIFE��ִ�к���

2.const 
Object.defineProperties(window, {
	favicon: {
		value: 3,
		enumerable: true,
		//writable: false,
		//configurable: false
	}
})

3.��������
let key = Date.now()
obj = {
	[key]: 'now'
}
obj[key + 'i'] = 'es5'

4.�⹹ => �ȶ����������飬ͨ�����ԡ�������ȡֵ

5. for..of  iterator ����
for( var _iter = [1,2,3][Symbol.iterator](), _step; !(_step = _iter.next()).done; ){
  console.log(_step.value);
}

6.����Ĭ��ֵ
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


7.//����Ĭ��ֵ��������������չ����
var y = []
y.push.apply(y, arguments) && y.shift()     //TODO 1

//������չ���������
function add(a, b){
  console.log(a, b);
}
add.apply(null, [4, 5])											//TODO 2

[].slice.call(arguments)										//TODO 3


8.ES5 class ->����

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
HelloWorld.prototype.constructor = HelloWorld;					//ָ����������
HelloWorld.sayHelloAll = Hello.sayHelloAll;

HelloWorld.prototype.echo = function echo() {
  alert(Hello.prototype.hello.call(this));
};

var hw = new HelloWorld();
hw.echo();




//1.��������    es5�������������Ǻ��� -> �հ�
var -> ��������
let -> �ȶ��壬��ʹ�ã���ʱ������
const ���Ƕ��󣬿����޸Ķ����ڲ�������ֵ

��ջ						����
ͬ������				�ص�

//2.�������ַ���
ƥ���ַ���λ��es5�� �Ƿ�����ӷ���es6

//3.����
argumentsʵ�Σ�Ĭ��ֵ���ܱ�argumentsʶ��

�������������в���δβ���������ڶ���������setter

Math.max.apply(null, arr)

Math.max(...arr)

//��ͷ����=>  ���������ɲ���С���ţ����ض��л��������ſ�ʡ��return

1.û��this, super, arguments, new.target��
5.����ʹ��news, û��ԭ��
7.��֧���ظ���������

const action = (type, a)=>({
	type,
	a
})

a = id => {id}

β�������Ż����ݹ�