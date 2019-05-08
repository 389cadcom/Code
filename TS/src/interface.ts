/**
  接口是代码的一种规范、约束和规定。
  
  对象型接口 ：对对象的规范
  函数型接口 ：对函数的规范
  可索引(数组型)接口:对数组(or对象)的规范
  类类型接口: 对类的规范
  其他接口：泛型接口、继承接口的接口 等。
 */

//TODO 对象型
interface Ifactory {
  name:string;
  birthday:string;
  run():void;
}
class Factory implements Ifactory {
  name: string;  
  birthday: string;

  run(): void {
    console.log('factory running')
  }
}
var f:Ifactory = new Factory()
f.run()

interface IConfig {
  type: string,
  url: string,
  data?: string,
  dataType?: string,
}
function getAjax(config:IConfig){
  var xhr = new XMLHttpRequest()
  xhr.open(config.type, config.url)
  if(config.data){
    xhr.send(config.data)
  }else{
    xhr.send()
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var result = xhr.responseText
      if(config.dataType == 'json'){
        result = JSON.parse(result)
      }
      console.log(result)
    }
  }
}


//TODO 函数型接口
interface ICalctwo {
  (a:number, b:number):number
}

var arr:number[] = [1, 3, 5, 7, 9]

//实现的函数
var add:ICalctwo = function(a:number, b:number):number{
  return a + b
}
var multiply:ICalctwo = function(a:number, b:number):number{
  return a * b;
}

//处理函数
function calcArr(arr:number[], callback:ICalctwo, count):number{
  var total = count
  arr.forEach( item => {
    total = callback(total, item)
  })

  return total;
}

var plus = calcArr(arr, add, 0)       //相加结果
var mul  = calcArr(arr, multiply, 1)  //相乘结果



//TODO 可索引(数组)、类类型
interface IUserarr {
  [index:number]:string           //定义索引key为number类型，索引值为string类型
}

var ary:IUserarr = ['Luly', 'Rot', 'Even']
ary = {1:'Luly', 2:'Rot', 3:'Even'}



//类类型--对类的规范，与抽象类相似，接口只能含有抽象方法、成员属性，实现类必须实例所有抽象方法及成员属性
interface IAnimate {
  name:string,
  eat(food:string):void
}

class BigCat implements IAnimate {
  name: string;  
  constructor(name:string) {
    this.name = name
  }
  eat(food: string): void {
    console.log('cat eat ' + food)
  }
}