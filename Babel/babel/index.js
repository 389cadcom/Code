/**
 * 装饰器: 修改类、方法的行为
 */
const decorator = function(name){
  return function(target){
    target.prototype.url = name
  }
}


const log = function(target, name, descriptor){
  var fn = descriptor.value
  descriptor.value = function(){
    console.log(`打印参数日志: 方法名- ${name}, 参数-`,  arguments)
    return fn.apply(this, arguments)
  }

  return descriptor;
}

// 隐形传入class, 类似于('abc')(class)
// @decorator('http://mi.com')
class Test {
  //name = 'decorator'
  static PI = 3.14
  constructor(val){
    this.val = val
  }
}
Test.PI = 3.14

var test = new Test('decorator')
var num = test.print(4, 5)

console.log(test.url, num)