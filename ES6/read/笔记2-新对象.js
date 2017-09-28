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
  Array.from(set, val=>val*2)		   //TODO

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
  1.多维数组    [...map]			new Map(arrs)
  2.对象	    obj[key] = val;     map.set(key, obj[key])   //键都是字符串  for(let [key, val] of map)
  3.JSON
	 键名都是字符串, 先转为对象   ->   JSON.stringify(obj)		
	 键名有非字符串, 转为数组JSON ->   JSON.stringify([...map]) 


//二、Symbol, Iterator

//6-29
类 -> 语法糖模板

writable, configurable, enumerable



//06-26 调用Iterator接口
1.解构赋值		--> 对数组和Set进行解构赋值

2.扩展运算符  ...set

3.yield*

for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键

for...of
Array.from()


//06-9
0.Iterator 
  keys, values, entries

1.Set	


2.Map	//数组对象作为参数   new Map([['name','Li'], [{a:'A'}, 'ABC']])
  size, set(key, val), get(key), has(key), delete(key), clear

  同一键多次赋值，后面覆盖前面值
  读取一个未知的键，返回undefined
  
  //对象引用，表面是同一值，但实际内存地址是不一样的
  //改为：let a = ['a']
  map.set(['a'], 555);
  map.get(['a']) // undefined

  与其数据结构转换：
  1.多维数组    [...map]			new Map(arrs)
  2.对象	    obj[key] = val;     map.set(key, obj[key])
  3.JSON
	 键名都是字符串, 先转为对象   ->   JSON.stringify(obj)		
	 键名有非字符串, 转为数组JSON ->   JSON.stringify([...map]) 