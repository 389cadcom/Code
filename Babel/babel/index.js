/**
 * 装修器--增强类、类属性方法功能
 * 关注业务逻辑层面的代码, 如数据处理、数据校验、发送请求，改善业务逻辑和UI混杂一起状态
 * 父组件则是UI层
 * 
 * enhance = compose(log, enumer)  -->  log(enumer(fn))
 * @enhance
 * 
 * 装饰器: 修改类、方法的行为
 */
const methods = {
	logger(){
		console.log('打印')
	}
}
//将方法混入原型链
function mixins(obj){
	return function(target){
		Object.assign(target.prototype, obj)
	}
}


const decorator = function(name){
  return function(target){
    target.prototype.url = name
  }
}

//打印方法名及参数
const log = function(target, name, descriptor){
  var method = descriptor.value
  descriptor.value = function(){
    console.log(`打印参数日志: 方法名- ${name}, 参数-`,  arguments)
    return method.apply(this, arguments)
  }

  return descriptor;
}
const enumer = function(target, name, descriptor){
  descriptor.enumerable = true;
  return descriptor;
}


// 隐形传入class, 类似于Decorator('abc')(class)
@decorator('http://mi.com')
class Test {
  static PI = 3.14
  constructor(val){
    this.val = val
  }
  @enumer
  @log
  print(a,b){
    return a+b
  }
}

var test = new Test('decorator')
// var num = test.print(4, 5)
var desc = Object.getOwnPropertyDescriptor(Test.prototype, 'print')

console.log(test)


//高阶组件
const WithComponent = URL => WrappedComponent => class HOC{
  render(h) {
    return `
      <div>
        <p>{URL}</p>
        <WrappedComponent {...this.props} />
      </div>
    `
  }
}