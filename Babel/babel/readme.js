/**
 * node       index  / nodemon
 * babel-node index
 * tsc-node
 */


//ES2020  globalThis, String.property.matchAll, import(), BigInt, Promise.allSettled
var obj = {first: {second: '2'}}
//可选链 
var two = obj?.first?.second

console.log(two)

//空位合并操作符
var a= '', b= 2
c = a??b


//ES2016  Array.property.include , 2**2

//ES2017  async await, Object.values/entries - 不含继承可遍历属性, Object.getOwnPropertyDescriptors, paddingStart/End

//ES2018  for await of, 对象扩展符...,  Promise.property.finally(), 正则FIXME:(命名捕获、断言)

//ES2019  Array.property.flat/flatMap, Object.fromEnties(), String.property.trimStart/End


var arr = [1, 2, [3, 4, [5, 6]]]
arr.flat(2).flatMap(item => item * 2)

var obj = {a: 21, b:22, c: 23}  //获取值大于23对象

Object.entries(obj).filter( ([a, b]) => b >21)    //数组解构

let obj1 = {}
for (let [name, age] of arr) {                    //数组解构
  obj1[name] = age
}


//深层解构、解构重命名、export default解构失败问题
let {first: other } = node
let { loc: { start }} = node;
var arr = [[1, 2], [3, 4]]

//二维将数组转化为对象
arr.map( item => {
  let [x, y] = item
  return {x, y}
})


//必须传值的解构参数 -- 参数默认值
function setCooke(name, value, {secure, path, domain, expires} = {}){

}