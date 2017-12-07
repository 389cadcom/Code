/**
 * 类数组添加Iterator接口，直接引用数组iterator接口
 * 普通对象部属则无效
 * 
 * [...str] 使用扩展运算符转为数组, Array.from()
 */
var obj = {
    0:'a',
    1:'b',
    2:'c',
    length: 3,
    [Symbol.iterator]:[][Symbol.iterator]
}
// obj[Symbol.iterator] = [][Symbol.iterator];
for(var item of obj){
    console.log(item);
}


/**
 * 类部属一个Iterator接口写法
 * [Symbol.iterator]()
 * next()
 */
class RangIterator{
    constructor(start, stop){
        this.value = start;
        this.stop  = stop;
    }
    [Symbol.iterator](){            //链式结构
        return this;
    }
    next(){
        return this.value < this.stop ? 
            { value: this.value++, done: false }:
            { value: this.stop, done: true }
    }
}
let rang = new RangIterator(0, 3);


/**
 * 给对象值添加Iterator接口
 */
let obj = {
    data: ['Hello', 'World'],
    [Symbol.iterator](){
        let that = this, i = 0;
        return {
            next(){
                return i < that.data.length ?
                  { value: that.data[i++], done: false }:
                  { done: true }
            }
        }
    }
}


//结合Generator函数， 简单实现
//obj1[Symbol.iterator] = function* (){  }
let obj1 = {
    * [Symbol.iterator](){
        yield 'Hi';
        yield 'Bye';
    }
}

/*
 *Generator自定义为对象创建Iterator接口, 遍历键值
*/
function* entries(){
    let keys = Object.keys(this);
    for(let key of keys){
        yield [key, this[key]]
    }
}

let o = {a:'A', b:'B', c:'C'}
o[Symbol.iterator] = entries;

for(let key of o){
    console.log(key)
}