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

var p = new People('tom');
// p.name = 'perty';

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
