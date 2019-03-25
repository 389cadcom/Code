//String, Number、Boolean拆箱、装箱 --> JS引擎遇到这三种基础数据类型，自动为其构建对象 new String('abc')


//TODO 函数返回对象时--原型、构造函数状况

//构造函数、原型、对象  --> Person, Person.prototype, p
1.Person的prototype成员			      -> Person.prototype
2.Person.prototype的constructor		  -> Person
3.p.__proto__    -> Person.prototype;
  p.constructor  -> Person

//Child.prototype = new Parent();			//原型继承 Child.prototype.constructor === Parent
//Child.prototype.constructor = Child;		//重置构造函数
Child = Object.create(Parent.prototype, {
	constructor: {
		value: Child,
		configurable:true,							//该属性能否被删除或者改变特征值
		enumerable: true,								//该属性能否枚举
		writable: true									//该属性能否被重新赋值
	}
})

1.child.__proto__ = Child.prototype
2.child.__proto__.__proto__ = Child.prototype.__proto__ = Parent.prototype
3.child.__proto__.__proto__.__proto__ = Parent.prototype.__proto__ = Object.prototype
  

//原型对象的 constructor 原本是指向这个构建函数Person, 但Person.prototype指向一个全新的对象，constructor 被指向了 Object
Person.prototype = {		
	constructor: Person				
}		

function f(){}
//JS引擎默认执行了以下语句
f.prototypep = Object.create(Object.prototype, {
	constructor: {
		value: f,
		configurable: true,
		enumerable: true,
		writable: true
	}
})


var obj = {_msg:'1'};
//2.Object.defineProperty
Object.defineProperty(obj, 'msg', {				//属性特性默认为false
	get: function(newVal, oldVal){
		return this._msg;
	},
	set: function(newVal, oldVal){
		this._msg = newVal;
	}
})
var txt = document.getElementById("txt");		//双向绑定
txt.value = obj.msg;
txt.onchange = function(){
	obj.msg = this.value;
}

//API
Object.defineProperty
Object.defineProperties
Object.getOwnPropertyDescriptor
Object.getOwnPropertyNames
Object.getOwnPropertySymbols

Object.create
Object.assign					//将源对象（source）的所有可枚举属性，
								//复制到目标对象（target）, 混合继承-- Object.assign(base.prototype, ...mixins); function(...mixins){  }
Object.keys
Object.values
Object.entries

Object.setPrototypeOf				
Object.getPrototypeOf			//用来从子类上获取父类

Object.isExtensible				//'use strict'环境
Object.isFrozen
Object.isSealed
Object.preventExtensions		//禁扩展, 可册除，可修改
Object.seal						//密封 不可扩展、不可删除，可修改 -- 成员属性configurable设置为false
Object.freeze					//冻结，不可删除，不可修改，不可扩展 -- 不是深层冻结
								//属性不能再指向任何其它对象或者持有基础数据类型的值，但属性指向的对象还是个普通的对象，还可以读写、增减


//实例属性,
obj.hasOwnProperty				//该实例对象自身是否具有该属性 
obj.propertyIsEnumerable		//检测到是自身属性(不包括继承的属性)且属性是可枚举性为 true
obj.isPrototypeOf
obj.valueOf						//返回此对象的基础数据类型的值
obj.toString

obj1.hasOwnProperty === obj2.hasOwnProperty

Object.prototype.hasOwnProperty('hasOwnProperty')
String.prototype.hasOwnProperty('substr')


//检查是否是原型方法
function isPrototypeVal(obj, key){
	return key in obj && !obj.hasOwnProperty(key);
}


//Reflect
Reflect.set(target, key, value, receiver);
Reflect.get(target, key, receiver);
Reflect.ownKeys(obj)


//成员特性
//Object.getOwnPropertyDescriptor(obj, 'property')
/**
 desc  == {value: "A", writable: false, enumerable: false, configurable: false}
 desc1 == { get:function(){}, set:function(){}, enumerable: false, configurable: false}

 Object.keys()只遍历对象的自有成员，for...in把对象继承成员也获取了，只要此成员的[[Enumerable]]为true，与obj.hasOwnProperty()使用
*/

1.value：				此成员的值，不论是基础数据类型还是对象、函数；缺省为undefined
2.enumerable：			缺省为true，标识此成员是否可以被枚举
3.configurable：		缺省为true，标识此成员的特性是否可以被修改
4.writable：			缺省为true，标识此成员是否可以被赋以新的值(在非 strict 模式下不能对其赋值)
//注：value和writable两个特性只有 data property 才有，accessor property 没有。这是因为 accessor property 的值和是否可写都是由它的 getter 和 setter 


//1.{} ES3创建属性可枚举，原型是Object.prototype, desc默认为true

//2.Object.create(proto, {}), 原型是第一个参数(obj.__proto属性，desc为true)， desc默认为false

//3.Object.defineProperty(obj, 'a', desc)，原型为Object.prototype, desc默认为false

//4.class创建，构造函数中属性, desc默认为true, 其他定义方法desc为false --> ES6规定原型的方法都是不可枚举的
Object.getOwnPropertyDescriptor(class { foo() {} }.prototype, 'foo').enumerable;

//5.Object.assign, 扩展属性或方法，desc默认为true  
Object.assign(Object.prototype, {})


//注意：Prototype中属性是obj.__proto__，使用Object.getOwnPropertyDescriptor(obj.__proto__, 'b')


//克隆一个对象，包括继承属性
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assing(Object.create(originProto), origin);
}


car2 = Object.create({year:2017})	//原型继承，不可枚举，不可遍历


//Eg:
//'use strict'
var obj = {
	int: 0
};
	
obj.int = 10;
console.log(obj.int);				// 10
console.log(Object.getOwnPropertyDescriptor(obj, 'int')); 	// ES5定义，属性特性都是true
console.log(obj.propertyIsEnumerable("int"));				// true 自身且属性是可枚举

Object.defineProperty(obj, "int", {	// 这个 property descriptor 包括两个特性
	enumerable: false,
  	writable: false,
	configurable: true				//默认为true, 成员是否可以用操作符delete删除
});
console.log(obj.propertyIsEnumerable("int"));		// false

obj.int = 20;						// TypeError 在 strict 模式下报错
console.log(obj.int);				// 在非 strict 模式下赋值失败，但是没有出错！

/*Object.defineProperty(myNum, "int", {
	configurable: false
});	*/								// “开弓没有回头箭”--设置configurable后, (enumerable,writable)不能由false改为true

Object.defineProperty(obj, "int", {
	writable: true
});			
obj.int = 20;
console.log(obj.int);			//20


//构造函数与原型
new.target 判断构建函数的调用方法
function Person(){
	if(!new.target)
		throw new TypeError("Constructor Person requires 'new'")
}
//构造函数判断添加new
function Person(name){
	if(this instanceof Person){
		this.name = name;
	}else{
		return new Person(name)
	}
}



//自定义对象私有变量方式
//1.IIFE自执行函数
var obj = (function(){
	//private
	return {				//返回的结果对象
		//public
	}
}())

//2.构造函数隐藏对象成员		-->  构建函数创建的两个对象并没有共享一个方法的存储
function Person(name, birthYear){
	var currentYear = 2018;
	function older(){
		currentyear++;
	}

	return {
		name: name,
		older: older,
		get age(){
			return currentYear - birthYear;
		}
	}
}
var p  = new Person('jack', 1987);
var p1 = Person('jack', 1987);
p1.older();										//调用执行私有变量

//3.混合型式--IIFE + 构造函数
var Person = (function(){
	var currentYear = 2018;								// 静态“成员”，其实是匿名函数的内部变量

	function _Person(name, birthYear){
		this.name = name;

		Object.defineProperty(this, 'birthYear', {		// 只读成员
			//value: birthYear,
			get: function(){
				return birthYear;
			},
			enumerable: true
		})
	}
	_Person.odler = function(){							// 对象的的静态方法
		return currentYear++;
	}

	_Person.prototype.getAge = function(){				// 原型方法
		return currentYear - this.birthYear;
	}
	return _Person;
}())



//Mixins
//浅复制--只拷贝对象不存在的属性，只是在原有对象上新加了一个指针
function mixin(target, source){								
	for(var prop in source){
		if(source.hasOwnProperty(prop) && !(prop in target)){
			target[prop] = source[prop];
		}
	}
	return target;
}
