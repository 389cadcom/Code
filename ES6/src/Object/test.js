/*
 * @Author: lonves 
 * @Date: 2018-01-16 16:57:13 
 * 
 * Object定义属性，不同方式属性描述信息
 * 1.{}创建属性可枚举，原型是Object.prototype, desc默认为true
 * 2.Object.create(proto, {}), 原型是第一个参数(obj.__proto属性，desc为true)， desc默认为false
 * 3.Object.defineProperty(obj, 'a', desc)，原型为Object.prototype, desc默认为false
 * 4.构造函数或class创建，构造函数中属性, desc默认为true,  ES6规定原型的方法都是不可枚举
 * 5.Object.assign, 扩展属性或方法，desc默认为true   -->扩展对象属性Object.assign(Object.prototype, {})
 * 6.Object.prototype添加属性可枚举, 需通过hasOwnProperty过滤
 * 
 * 注意：Prototype中属性是obj.__proto__，使用Object.getOwnPropertyDescriptor(obj.__proto__, 'b')
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  
}
var obj = {x:"X", y:'Y'};
// Object.seal(obj)
Object.preventExtensions(obj)
// Object.freeze(obj)
delete obj.x
obj.z = '0'
console.log(Object.getOwnPropertyDescriptor(obj, 'x'));
console.log(obj);

/* class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  toString(){}
}

var obj = new Point(3, 10);
Object.assign(obj, {b:'B'})
Object.defineProperty(obj, 'c', {
  value: 'C',
  enumerable: false
})
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.keys(obj)) */


for (const key in obj) {
  //if (obj.hasOwnProperty(key)) {
    //const element = obj[key];
    //console.log(key);
  //}
}


//delete 只能删除自有属性，不能删除继承属性(原型链上的属性)
/* delete obj.toString;          //false
var x = 1;
console.log(delete this.x);   //false */