function ES5(x,y) {
  this.x = x;
  this.y = y;
}
ES5.prototype = {
  toTell(){

  },
  toString(){

  }
}

class ES6 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get prop(){
    return "getter";
  }
  set prop(val){

  }
  toTell(){
    
  }
  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
/**
 * 1.ES5原型prototype是可枚举, ES6 prototype不可枚举；Object.assign添加属性、方法是可枚举
 * 2.Object.keys只获取自身可枚举(对象构造函数中)的属性
 * 3.实例的属性除非显式定义在其本身(this)，否则都是定义在原型上(prototype)
 */
Object.assign(ES6.prototype, {toSay(){}}, {toTotal(){}, z:'z'})
let p1 = new ES5(2, 3);
let p2 = new ES6(2, 3);

console.log(Object.getOwnPropertyNames(ES5.prototype))
console.log(Object.getOwnPropertyNames(ES6.prototype))
console.log(Object.keys(ES6.prototype))     
console.log(Object.keys(p1), Object.keys(p2))

console.log(p2.hasOwnProperty('z'), p2.__proto__.hasOwnProperty('z'));


//常量式定义
const MyClass = class Me{
  getName(){
    return Me.name;
  }
}
class SubClass extends MyClass{
  constructor(){
    super();                      //MyClass.prototype.constructor.call(this)
  }
}
let c = new SubClass();
console.log(c.getName())


console.log(Object.getPrototypeOf(c))