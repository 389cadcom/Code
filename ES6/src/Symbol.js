typeof Symbol('foo');                   //symbol
typeof Symbol.iterator                  //symbol

Symbol.for(132) === Symbol.for(132)

var foo = Symbol.for('123');

console.log(Symbol.keyFor(foo))


var s1 = Symbol('foo');
var obj = {
    [s1] : 'Abcdefg'
}

var keys = Object.getOwnPropertySymbols(obj);

for(var v of keys){
    console.log(obj[v])
}

//反射
console.log(Reflect.ownKeys(obj))