/*
 1. async function f(){}
 2. var f = async () => {}
 3. 
*/

//TODO demo1 返回promise
function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

//async函数返回Promise对象, 遇到await就会先返回，等到异步操作完成，再执行函数体内后面的语句
async function test() {
    for (let i = 0; i < 5; i++) {
        await delay(3000).then(()=>console.log('delay'));
        console.log(`i=${i}`);
    }
}

//执行
//test();


//TODO demo2 返回Promise
function delay(ms){
	return new Promise((resolve, reject)=>{
		setTimeout(resolve, ms);
	})
}
//异步函数，不能在同步方法中使用 await
async function delayLog(item){
	await delay(6000);
	
	console.log(item);
}
//循环中异步处理 item
async function processArray(array){
	for(let item of array){
		await delayLog(item);
	}

	//并发 forEach, Promise.all
	/* array.forEach( async (item) => {
		await delayLog(item);
	}); */
	//并发，数组处理
	/* let promises = array.map(delayLog);
	await Promise.all(promises); */

	console.log('done');
}
processArray([1, 2, 3]).then( ()=> console.log('finish!') )
console.log('Sync');



//TODO 读取一组URL，然后按照读取的顺序输出结
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}


//TODO demo3
async function f() {
	//reject内部处理则会执行后续的Promise
	try {
		await Promise.reject('出错了');
	} catch (error) {
		console.log(error);
	}
	await Promise.reject('error').catch(e => console.log(e));

	return await Promise.resolve('Hi');
}


//TODO demo4
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();

  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"