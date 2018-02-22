//async函数
/*
1.async函数返回一个Promise对象
2.async函数内部抛出错误，会导致返回的Promise对象变为reject状态
3.await等特是Promise对象，不必写then()方法，直执返回值
 */
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        	resolve('test');
//          reject('want to sleep~');		//try...catch捕获reject
        }, second);
    })
}

async function test() {
	try{
		let result = await sleep(1000);
		console.log(result);
	}catch(err){
		console.log(err);
	}
}
//并发执行
async function testAll(){
	let p1 = sleep(1000);
	let p2 = sleep(1000);
	await Promise.all([p1, p2]);
	
	console.log('Promise Loading');
}

console.log(test().then(()=>{
	console.log((123))
}))


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

