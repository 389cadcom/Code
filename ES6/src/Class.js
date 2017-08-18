'use strict';

class People{
	constructor(name){
		this.name = name;
	}
	get name(){
		return this._name.toUpperCase();
	}
	//给 this.name 赋值的时候会调用 set name
	set name(name){
		this._name = name;
	}
	sayName(){
		console.log(this.name);
	}
}

//子类
class LiLei extends People {
	constructor(name, age){
		super(name);
		this.age = age;
	}
	getSup(){
		console.log(super.name)
	}
}

var obj = Object.assign(LiLei.prototype, {
	toString(){
		console.log('tostring')
	},
	toValue(){
		console.log('toValue')
	}
})

var p = new People('tom');
// p.name = 'perty';
var l = new LiLei('LiLei', 34);
l.getSup()

console.log(l.hasOwnProperty('age'))							//定义在this本身
console.log(l.__proto__.hasOwnProperty('toValue'))				//原型对象

var keys = Object.keys(LiLei)						//类定义方法不可枚举
console.log(keys)


//通过闭包来实现私有属性。
var Animate = (function(){
	var p = new WeakMap();
	class Animate{
		constructor(name){
			let privateProperties = {
				name: name
			}
			p.set(this, privateProperties);
		}
		get name(){
			return p.get(this).name;
		}
		sayName(){
			console.log(this.name);
		}
	}
	return Animate
})();

var a = new Animate('cat');
a.sayName();
