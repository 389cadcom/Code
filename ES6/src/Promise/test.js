//https://segmentfault.com/a/1190000015057278#articleHeader1

async function async1(){
    console.log('async1 start')
    await async2()											//async 返回Promise
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')


//await 等待Promise的异步返回, 只存在于“异步”的情况

async function test1(){
	var result = await setTimeout(()=>{
		console.log('延迟一秒')
	}, 1000)
	console.log('test1 end')
	
	return result;
}

test1().then( res => {
	console.log('输出', res)
})