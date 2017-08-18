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