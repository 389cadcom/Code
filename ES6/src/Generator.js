/*
 * @Author: Lonves 
 * @Date: 2017-08-18 16:53:47 
 * @Last Modified by:   lonves.zheng 
 */

//Generator    yield 返回{done: , value: }
function fn(a,b){
  return a + b
}

function* gen(x) {
  let y = yield fn(x,100) + 3;
  yield y;
  //console.log(y)
  return 200
}

//第二次next(), 代码由上次暂停处开始执行，此时 yield 表达式的值并不是使用刚刚计算的结果，而是使用 g.next 的参数
/* var g = gen(1);
console.log(g.next())           //执行第一个yield并返回
console.log(g.next(2))          //重置第一个yield值, 使用上次执行的值==>g.next(g.next().value)
console.log(g.next()) */

/* for(let v of g){
    console.log(v);
} */


//Generator函数传参
function* foo(x) {
    var y = 2 * (yield (x + 1));  // yield 语句在表达式中，需要将 yield 语句括起来，否则报错
    console.log(y)
    
    var z = yield (y / 3);		//NaN/3
    return (x + y + z);
  }
  
  var b = foo(5);
  b.next() 				    // { value:6, done:false }  调用第一次 next 开始执行，得到第一个 yield 的返回值 6。由于 next 参数为上一个 yield 语句的值，所以第一个 next 传入参数没有意义
  b.next(12) 				// { value:8, done:false }  调用 next 方法时注入了数据，作为上一个 yield 语句的值，得到 var y = 2 * 12
  b.next(13)				// { value:42, done:true }  得到 var z = 13

//TODO g.next()传参问题
function* foo1(x) {
    var y = 2 * (yield(x + 1)); // yield 语句在表达式中，需要将 yield 语句括起来，否则报错

    console.log("x:" + x)
    console.log("y:" + y)

    yield y;

    var z = yield(y / 2); //NaN/3

    yield z;

    console.log(x, y, z)
}
/*
var foo = foo(1);							//设置x = 5;
let one = foo.next();
console.log("one:", one)

foo.next(2);

foo.next();*/

//yield* Generator函数嵌套一个Generator函数
//Generator里面调用另外的Generator需要使用: yield* 函数()
function* foo() {
    yield 0;
    yield 1;
}
function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}
for (let v of bar()){
    console.log(v);
};



var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            //TODO yield配合*使用？？
            yield* flat(item);
        } else {
            yield item;
        }
    }
};