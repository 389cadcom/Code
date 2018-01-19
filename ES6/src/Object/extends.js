/*
 * @Author: lonves 
 * @Date: 2018-01-16 15:30:58 
 * 
 * super虽然代表了父类A的构造函数，但是返回的是子类B的实例
 * super 相当于A.prototype.constructor.call(this)
 */
class A {
  constructor() {
      if (new.target === A) {
        console.log('基类实例化');
      }
      console.log(new.target.name);
  }
}

class B extends A {
  constructor() {
      super();
      this.x = "X";
  }
}
var a = new A();
var b = new B();

//克隆一个对象，包括继承与属性
function clone(original) {
  var proto = Object.getPrototypeOf(original);
  return Object.assign(Object.create(proto), original)
}
var c = clone(b);
c.x = 1;

//console.log(c, b);


//Object.prototype.isPrototypeOf是否是另一对象的原型
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

console.log(o2.isPrototypeOf(o3));// true
console.log(o1.isPrototypeOf(o3));// true
 

console.log(Object.getOwnPropertyDescriptor(class { foo() {} }.prototype, 'foo'));

//Class自定义iterator接口
class GenClass{
  constructor(...args){
    this.args = args;
  }
  * [Symbol.iterator](){
    for (const arg of this.args) {
      yield arg;
    }
  }
}
//迭代器循环iterator
let iter = {
  index: 0,
  [Symbol.iterator](){return this},
  next(){
    this.index++;
    if (this.index<5) {
      return {value:this.index, done:false}
    }else{
      return {done:true}
    }
  }
}
var it = iter[Symbol.iterator]();


var h = new GenClass('a', 'b', 'c');
for (const k of h) {
  //console.log(k);
}
