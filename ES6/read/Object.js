//对象

Object.defineProperty(obj, 'a', {value: 'Hi'})


//对象的属性名指定为一个Symbol值
Object.defineProperty(obj, sym, {value: 'H'});


Object.getOwnPropertySymbols()

Object.getOwnPropertyNames()


//新建一个对象 ES6
obj = Object.assign({}, obj, {a:1, b:2})