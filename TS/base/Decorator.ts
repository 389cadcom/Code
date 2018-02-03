//1.类装饰器： 密封类--不可扩展、不可删除，可修改
function sealed(constructor: Function){
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}


//2.方法装饰器
// target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// propertyKey: 成员的名字
// descriptor: 成员的属性描述符 {value: any, writable: boolean, enumerable: boolean, configurable: boolean}
const validate = function(target:any, propertyKey:string, descriptor:PropertyDescriptor){
  //保存原来方法
  let method = descriptor.value;
  // 重写原来的方法
  descriptor.value = (newValue: string) => {
    if(!newValue){
      console.log("新名为空!");
      throw new Error('name is invalid')      //判断名字是否为空
    }else{
      return method();
    }
  }
}

//3.访问器装饰： 密封类--不可扩展、不可删除，可修改 TODO
function god(name: string){
  return function(target: any, propertyKey:string, descriptor: PropertyDescriptor){
    let method = descriptor.get;
    console.log('val:' + method());
    descriptor.get = () => {
      return name + method();
    }
  }
}

//4.属性装修器
function prop(target, propertyKey:string){
  propertyKey += ':key'
}

export default class Hello{
  @prop
  id:string
  private _name: string

  set name(value:string){
    this._name = value;
  }

  @validate
  changeName(newName:string){
    this._name = newName;
  }
}