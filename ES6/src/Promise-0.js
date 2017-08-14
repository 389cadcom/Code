let fetch = require('node-fetch');

function* gen() {
	let url = 'https://api.github.com/users/github';
	let result = yield fetch(url);
	console.log(result)
}

/* var g = gen();
var result = g.next();
//console.dir(result);
result.value.then(data=>{
	return data.json()
}).then(data=>{
	g.next(data)
}) */

var fs = require('fs');
var readFile = function(filename){
	return new Promise((resolve, reject)=>{
		fs.readFile(filename, (error, data)=>{
			if(error) reject(error);
			resolve(data)
		})
	})
}
function* gen(){
	var f1 = yield readFile('./src/module.js');
	//console.log(f1.toString())
}

var g = gen();
var r = g.next()
r.value.then(res=>{
	return Promise.resolve(res);
}).then(data=>{
	g.next(data)
})


//ES7 async需babel转码
/*var asyncFile = async function(){
	var f1 = await readFile('./src/module.js');
	console.log(f1.toString())
}

var r1 = asyncFile();

console.log(r1)
*/
