let priceTarget = {cate: 'Food'}
// Object.freeze(priceTarget);
// Object.preventExtensions(priceTarget)

//Reflect.set
let foodPrice = new Proxy(priceTarget, {    //使用set过滤新的对象成员
  set(target, key, value, receiver){          
    if(!target.hasOwnProperty(key)){
      if(isNaN(value)){
        throw new TypeError('Price must be number');
      }
    }
    return Reflect.set(target, key, value, receiver);
  }
})

foodPrice.egg = 2.5;
priceTarget.mike = 'p';
console.log(priceTarget.mike)

let obj = {a:'A'}
let o = new Proxy(obj, {                      //使用get检查对象的 key
  get(target, key, receiver){                 
    if(key in target){
      return Reflect.get(target, key, receiver);
    }
    throw new TypeError(`${key} not exist in target` )
  }
})
console.log(o.a);
// console.log(o.name);

let circleTarget = {
  radius: 10,
  PI: 3.14
}
let circle = new Proxy(circleTarget, {         //防止对象的成员被删除和修改
  set(target, key, value, receiver){
    if(key === 'PI'){
      throw new TypeError('PI cannot be change');
    }else{
      Reflect.set(target, key, value, receiver);
    }
  },
  deleteProperty(target, key){          
    let unArr = new Set(['PI', 'radius']);
    if(unArr.has(key)){
      throw TypeError('Pi and radius cannot be deleted');
    }
  }
})