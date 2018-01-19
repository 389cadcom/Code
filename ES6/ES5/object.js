
var obj = {a:'A', b:'B', [Symbol('h')]:3, say:function(){}};
Object.defineProperty(obj, 'c', {value:'C'})

// console.log(Object.getOwnPropertyNames(obj))
// console.log(Object.keys(obj))


//prototype原型
//prototype继承属性，不可枚举属性，普通属性，Symbol属性
var obj1 = Object.create(obj,{
    foo:{
        value:'foo',
        writable:true
    },
    bar: {
        value: 'bar',
        configurable: false
    }
})
obj1[Symbol('h')] = "symbol"
 

console.log( Object.assign({},'say', 'hi') )
