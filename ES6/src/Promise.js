/**
 * @authors lonves (lonves@qq.com)
 * @date    2017-02-13 15:13:07
 * 
 * 1.都为resolve, 返回值组成一个数组，传递给p的回调函数
 * 2.其中一个reject, 则第一个reject返回的值，传给p的回调函数
 */
 
//Iterator与Generator函数返回Iterator
var students ={
	//* [Symbol.iterator]() {
	[Symbol.iterator]: function* (){
		for (var i = 0; i < 10; i++) {
			yield i;
		}
	}
}
//while实现for of循环
var iterator = students[Symbol.iterator]();
var s = iterator.next();
while(!s.done){
	console.log(s.value);
	s = iterator.next();
}

//Promise与Generator结合使用
function getPromise(){
	return new Promise(function(resolve, reject){
		reject('foo');
	})
}

var g = function* (){
	try{
		var foo = yield getPromise();
		console.log(foo);
	}catch(e){
		console.log(e)
	}
}

var run = function(generator){
	var it = generator();
	var i = 0;

	function go(result){				
		console.log(i++, result)				//{ value: Promise { 'foo' }, done: false }
		if(result.done){
			return result.value;
		}

		//Promise异步操作
		var promise = result.value;
		promise.then(function(val){		//foo
			console.log('resolve:' + val);
			return go(it.next(val));
		}, function(err){
			return go(it.throw(err))
		})
	}

	//it.next()--> generator
	go(it.next());

}

//run(g)

var iter = function(){
	var i = 0;

	return {
		next: function(){
			return {value: i++, done: false};
		}
	}
}

//Generator返回Iterator
function* foo(x) {
  var y = 2 * (yield (x + 1));  // yield 语句在表达式中，需要将 yield 语句括起来，否则报错
  console.log(y)
  
  var z = yield (y / 3);		//NaN/3
  return (x + y + z);
}

var b = foo(5);
b.next() // { value:6, done:false }  调用第一次 next 开始执行，得到第一个 yield 的返回值 6。由于 next 参数为上一个 yield 语句的值，所以第一个 next 传入参数没有意义
b.next(12) // { value:8, done:false }  调用 next 方法时注入了数据，作为上一个 yield 语句的值，得到 var y = 2 * 12
b.next(13) // { value:42, done:true }  得到 var z = 13


//将Object转为含有Interator接口
function* objectEntries(){
	let keys = Object.keys(this);

	for(let key of keys){
		yield [key, this[key]]
	}
}
let jane = { first: 'Jane', last: 'Doe' };
jane[Symbol.iterator] = objectEntries;



//async函数
/*
1.async函数返回一个Promise对象
2.async函数内部抛出错误，会导致返回的Promise对象变为reject状态
 */
fetch('https://tc39.github.io/ecma262/').then(response=>{
	return response.json();
}).then(s=>{
	console.log(s)
})

async function getTitle(url) {
  let response = await fetch(url);					//Promise
  let html = await response.text();					//Promise

  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(v=>{
  console.log(v)
})