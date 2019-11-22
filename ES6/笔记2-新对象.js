/*
 ------------------------------�µ����ݽṹ---------------------------------
 Set, Map, WeakSet, WeakMap
 Symbol, Iterator, Generator, Promise, Proxy, Reflect
 Class, Module
*/

//һ.�����ݽṹSet, Map
1.Set		//ֵ����Ψһ,֧����ʽ����, ����һ������(������)��Ϊ��������ʼ��--����ȥ��
  constructor, size
  add, delete, has, clear
  keys, foreach
  
  [...set]		//��չ�����

  Set�ڲ�����NaN�����
  �����������ǲ����

  �ж��Ƿ����һ�������棺obj[key]     set.has(key)
  
  Array.from()��Set�ṹתΪ����
  Array.from(set, val=>val*2)		   //TODO ת����������--ʹ��map����

  ������ new Set([...set1, ...set2])
  ����:  new Set([...set1].filter(val=>set2.has(val)))
  �:	 [...set1].filter(val=>!set2.has(val))

  WeakSet:
  add, delete, has
  û��size���ԣ�û����������Ա


2.Map			//��ֵ�Զ�������Ϊ����   new Map([['name','Li'], [{a:'A'}, 'ABC']])
  size, 
  set(key, val), get(key), has(key), delete(key), clear

  ͬһ����θ�ֵ�����渲��ǰ��ֵ
  ��ȡһ��δ֪�ļ�������undefined
  
  //�������ã�������ͬһֵ����ʵ���ڴ��ַ�ǲ�һ����
  map.set(['a'], 555);			//��Ϊ��let a = ['a']
  map.get(['a'])				// undefined


  �������ݽṹת����
  1.��ά����    [...map]			new Map(arrs)
  2.����	    obj[key] = val;				//�������ַ���  for(let [key, val] of map)
				map.set(key, obj[key])		//for(let key of Object.keys(obj))
  3.JSON
	 ���������ַ���, ��תΪ����   ->   JSON.stringify(obj)		
	 �����з��ַ���, תΪ����JSON ->   JSON.stringify([...map]) 


//����Symbol, Iterator
//writable, configurable, enumerable



//06-26 ����Iterator�ӿ�
1.�⹹��ֵ		--> �������Set���н⹹��ֵ

2.��չ�����  ...set

3.yield*	Generator�����ڶ���Generator����

for...inѭ�������������ּ�������������ֶ���ӵ�����������������ԭ�����ϵļ�

for...of
Array.from()


//����Proxy, Reflect
new Proxy({}, {
	get(target, prop){
		return target[prop];
	}	
})

//����  Reflect	
Reflect.defineProperty(obj, "b", {value:'B'})	deleteProperty

Reflect.has(obj, name) 

//Ҫִ��һ������f����������һ�����args�� ��Ҫ��this
Reflect.apply(f, obj, args)			//f.apply(obj, args)

//�ɱ������ʽ�Ĺ��캯��
Reflect.consructor(F, args)

Reflect.get(obj, name)

Reflect.ownKeys()


//�ġ�Generator, Promise


//�塢import, export, module	  
exportҪô������������ǰ��Ҫô��һ��Ҫ�����ı�����һ��
/*
export ������ģ���ڲ��ı�������һһ��Ӧ��ϵ
û��ָ������Ľӿ�								ָ������ӿ�Ϊdefault�����

����														��ȷ��	
1.export default var a = 1;       var a = 1; export default a;  export {a}
  var a = 1;
	export a;												export var a = 1;    export {a}

2.export 1;												export default 1;    �������ֵ, ����default����; 

3.function f(){} 
  export f;												export {f}�� export default f
*/

//��ȷ
export var a = 1;								export default 1;
export {a}											export default a;

export function fn(){};					export {fn}
export default function(){}			export default function fn(){}   //��ͬ������������

//default���Ǳ���, ���Բ��ܸ������������  var, let, const
export default  ���������һ������default�ı����򷽷���ϵͳ������ȡ��������

//default����
//����
import a from './d';
// ��Ч�ڣ�����˵������������д���ļ�д����ͬһ����˼
import {default as a} from './d';

//����
export default function() {}
// ��Ч�ڣ�
function a() {};
export {a as default};


// import d from './d'
const  d = require('./d').default    //define(function(require, exports, module){  })

let { default:component } = xxx


�ࣺ
export default class{}

import MyClass from './MyClass';
let o = new MyClass();


ģ��̳У�
export * from './parent.js';

ģ�鱾�ʣ�
importʱ������ִ��ģ�飬ֻ������һ����̬��ֻ�����ã�ֻ������Ҫʱ���ŵ�ģ��ȥȡֵ


//ת����
es6-module-transpiler

compile-modules convert file1.js file2.js -o output.js