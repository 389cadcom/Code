/**
 * @authors lonves (lonves@qq.com)
 * @date    2017-02-13 15:13:07
 * 
 * 1.都为resolve, 返回值组成一个数组，传递给p的回调函数
 * 2.其中一个reject, 则第一个reject返回的值，传给p的回调函数
 * 3.resolve传入Promise对象，则直接解释内部的Promise.resolve
 */

//Promise与Generator结合使用
function getPromise(){
	return new Promise(function(resolve, reject){
		reject('foo');
	})
}
var g = function* (){
	try{
		var foo = yield getPromise();			//value--promise
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


//async声明的函数本质是返回Promise对象
const demo = async function () {
    return Promise.resolve('我是Promise');
    // 等同于 return '我是Promise'
    // 等同于 return new Promise((resolve,reject)=>{ resolve('我是Promise') })
}
demo.then(result=>{
    console.log(result) // 这里拿到返回值
})
