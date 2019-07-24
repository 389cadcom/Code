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


function getJSON(url) {
    var promise = new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();

        function handler(res) {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status == 200) {
                resolve(xhr.response)
            } else {
                reject(new Error(xhr.statusText));
            }
        }
    })
    return promise;
}

var promies = [1, 2].filter(id => {
    return getJSON('../libs/' + id + '.json');
})

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


