/*
 * @Author: Lonves 
 * @Date: 2017-10-12 09:22:50 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2017-10-12 20:05:57
 * 
 * Class的原型的方法都是不可枚举的  --> 不能使用prototype扩展属性？
 * Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的
 * class添加的属性、方法不可枚举
 */

class Person{
    constructor(name, sex, age){
        this.name = name;
        this.sex  = sex;
        this.age  = age;
    }
    tell(){                                     //继承属性
        console.log("tell");
    }
}
Object.assign(Person.prototype, {parent: 'parent'})

//class添加的属性、方法不可枚举
class Man extends Person{
    constructor(name, age){
        super(name, 'man', age);
    }
    say(){
        console.log("Hi");
    }
    
}

var man = new Man('boll', 23);
Object.defineProperty(man, 'z', {
    value: 'Z',
})
Object.defineProperties(man,{
    tall: {
        value: function(){console.log('tall')}
    },
    [Symbol('sym')]: {
        value: 1
    }
})
var set = new Set();

for(var v in man){
    set.add(v);
}

Object.assign(man, {x:1, y:2})

var set0 = new Set(Reflect.ownKeys(man))


var set1 = new Set([...set, ...set0])

console.log(Object.getPrototypeOf(man))
console.log(Object.getOwnPropertyNames(man))


console.log(Object.values(man));


