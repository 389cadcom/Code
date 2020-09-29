/**
原型链: 
	 Function.prototype.__proto__ === Object.prototype
	 Person.prototype.__proto__   === Object.prototype

隐式原型:
	 Function.__proto__						=== Function.prototype
	 Object.__proto__							=== Function.prototype
	 Person.__proto__						  === Function.prototype

构造函数__proto__指向函数原型(含内置构造函数)
	 Person.__proto__ === Function.prototype


1. Person.prototype.conctructor == Person == p.constructor
2. p.__proto__ === Person.prototype


Object.getOwnPropertyDescriptors(Person.prototype) //挂载原型上的属性、方法

Object.getOwnPropertyDescriptors(Person)					 //Function上的属性、方法 name, prototype, length, __proto__

Object.getOwnPropertyDescriptors(p)								 //constructor中实例的属性


//可枚举的属性--enumerable, 
Object.keys(t), Object.keys(Person.prototype)			//ES6定义的方法都是不可枚举的

Person.prototype.log = function(){}								//ES5定义的可枚举


class A {
  static NUM = 3.14;								//静态属性
  prop = 'props'										//实例属性
  constructor(name){
    this.name = name								//构造函数实例属性
  }
  print(){													//原型方法--不可枚举
   
  }
}
*/


//2019-8 有条件对象属性
var sex = ''
var params = {
  name: 'lonve',
  age: 3,
  ... sex && {sex:sex}
}


//判断类型
Object.prototype.toString.call()
({}).toString.call(arr).match(/\s(\[a-zA-Z]+)/)	// 


//1.对象转为Map
new Map(Object.entries(obj))
fn = o => Object.keys(o).reduce((map, k) => map.set(k, o[k]), new Map())	//fn(obj)


//2.有条件的对象属性
var sex = '1'
var params = {
  name: 'lonve',
  age: 3,
  ... sex && {sex:sex}
}

//3.解构原始数据--提取两个部份, 用户及其他信息
const rawUser = {
 name: 'John',
 surname: 'Doe',
 email: 'john@doe.com',
 displayName: 'SuperCoolJohn',
 joined: '2016-05-05',
}

let user = {}, userDetails = {};
({ name: user.name, surname: user.surname, ...userDetails } = rawUser);