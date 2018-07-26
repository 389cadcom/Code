var es3 = {a:'A', b: 'B', say(){}}
// console.log(Object.getOwnPropertyDescriptor(es3, 'say'));

var es5 = Object.create(null, {a:{value:'A', writable: false}, b: {value: 'B'}, say:{ value:function(){} }})

// console.log(es5.a);


class ES6 {
  constructor(a, b){
    this.a = a;
    this.b = b;
  }
  say(){
    console.log('ES2015');
  }
}
var es6 = new ES6('A', 'B');
// Object.freeze(es3)

console.log(Object.isSealed(es3));
console.log(Object.isFrozen(es3));
console.log(Object.isExtensible(es3));
es3.c = 'C'
console.log(es3);