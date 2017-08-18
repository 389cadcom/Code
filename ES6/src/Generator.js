/*
 * @Author: Lonves 
 * @Date: 2017-08-18 16:53:47 
 * @Last Modified by:   lonves.zheng 
 */

//Generator    yield 返回{done: , value: }
function* counter() {
    let i = 0;
    while (i < 10) {
        yield i++;
    }
}

/*
var s = counter();
for(var i=0; i<10; i++){
	console.log(s.next());
}
return false;
*/

//Generator函数传参
function* foo(x) {
    var y = 2 * (yield (x + 1));  // yield 语句在表达式中，需要将 yield 语句括起来，否则报错
    console.log(y)
    
    var z = yield (y / 3);		//NaN/3
    return (x + y + z);
  }
  
  var b = foo(5);
  b.next() 				// { value:6, done:false }  调用第一次 next 开始执行，得到第一个 yield 的返回值 6。由于 next 参数为上一个 yield 语句的值，所以第一个 next 传入参数没有意义
  b.next(12) 				// { value:8, done:false }  调用 next 方法时注入了数据，作为上一个 yield 语句的值，得到 var y = 2 * 12
  b.next(13)				// { value:42, done:true }  得到 var z = 13

//TODO g.next()传参问题
function* foo(x) {
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
