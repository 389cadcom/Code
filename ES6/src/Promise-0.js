/**
 * Promise
 * @authors Your Name (you@example.org)
 * @date    2017-05-09 17:38:21
 * @version $Id$
 */
//创建Promise
var isPromise = false
var promise = new Promise(function(resolve, reject) {
    // 进行一些异步或耗时操作
    if (isPromise ) {
        resolve("Stuff worked!");		//返回成功内容
    } else {
        reject("It broke");				//返回失败内容
    }
});

//绑定处理程序
promise.then(function(result) {
    console.log(result); 				// 打印成功内容
}, function(err) {
    console.log(err); 					// 打印失败内容
});


//Promise  提供一种信息机制，将回调代码掌控权拿回到自己的手
setTimeout(function(){
	console.log('Yay');
	setTimeout(function(){
		console.log('Whee Ya!')
	}, 1000)
}, 1000)

//Promise
var wait1000 = function(){
	return new Promise(function(resolve, reject){
		setTimeout(resolve, 1000)
	})
}
wait1000().then(function(){
	console.log('Yay');
	return wait1000()
}).then(function(){
	console.log('Whee Ya!')
})