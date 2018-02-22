//隐藏_开头属性与非字符串类型属性
function hideUnderscore(obj){
  return new Proxy(obj, {
    ownKeys(target){
      //先调用Reflect.ownKeys() 得到缺省的键值列表
      //再使用filter过滤类型是 string 或以下划线开头的那些 key
      return Reflect.ownKeys(target).filter(key => {
        return typeof key !== "string" || key[0] !== "_";
      })
    }
  })
}
let objTarget = {
  name: 'proxy',
  grade: 7,
  _age: 20,
  _id: 1
}
let o = hideUnderscore(objTarget);
console.log(o, objTarget);
console.log(Object.keys(o));

//Function
function f(...args){
  return args.reduce((prev, next)=>prev + next);
}

let sum = new Proxy(f, {
  apply(target, thisArg, argumentList){                   // 在没有 “new” 调用的时候
    argumentList.forEach(arg => {                         // 检查每个参数类型
      if(typeof arg !='number'){
        throw new Error(`\'${arg}\' is not number`);
      }
    });
    Reflect.apply(target, thisArg, argumentList);
  },
  construct(target, argumentList, newTarget){             // 如果调用带 “new”
    throw new TypeError(`This function can't be called with new`)
  }
})
// console.log(sum(1,2, '3'))
// console.log(new sum(1,2))

class Person{
  constructor(name, year){
    if(typeof name !=='string' || typeof year !=='number'){
      throw new Error('Name must be string and year must be number.');
    }else{
      this.name = name;
      this.year = year;
    }
  }
}
//生成另一个类--退休人员
let Retired = new Proxy(Person, {
  apply(target, thisArg, argumentList){
    new Retired(...argumentList)                //没带new则实例化另一对象Retired
  },
  construct(target, argumentList, newTarget){
    if(argumentList[1] < 1957){
      return Reflect.construct(target, argumentList);
    }else{
      throw new Error('year must be before 1957.');
    }
  }
})

let p = new Retired('Jack', 1956);
console.log(p);