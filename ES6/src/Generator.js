'use strict';

//Iterator  for...of
var students = {
    [Symbol.iterator]() {
    	let i = 0;
		return {
			next(){
				return {done: i>10, value:i++}
			}
		}
    }
};
/*students[Symbol.iterator] = function() {}
var iterator = students[Symbol.iterator]();
var s = iterator.next();
while (!s.done) {
    console.log(s.value);
    s = iterator.next();
}
*/

for (let n of students) {
    //console.log(n)
}



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

function* fibo() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}
let g = fibo();
for (var i = 0; i < 10; i++) {
    //console.log(g.next());
}

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
