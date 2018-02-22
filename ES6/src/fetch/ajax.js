function ajax(url, options){
    return new Promise((resolve, reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        xhr.responseType = 'json';					//IE10/11不兼容
        xhr.onreadystatechange = function( ){
            if(xhr.readyState ==4 && xhr.status == 200){
                resolve(xhr.response)				//responseText, responseXML
            }
        }
        if(options.method == 'get'){
        	url = url + '?' + options.data;
        }
        xhr.open(options.method, url, true);
        if(options.method=='post'){
        	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        }
        xhr.send(options.data);
        
    })
} 
ajax('http://10.206.16.118:8000/test', {
	method: 'get',
	data: 'a=1&b=2'
}).then(data=>{
	console.log(data);
})

//Fetch
fetch('http://10.206.16.118:8000/test', {
	method: 'post',
	body: 'a=1&b=2',
	body: JSON.stringify({ a: 'lisposter', b: 'souche.com'}),
	body: new FormData(document.querySelector('#form')),
	headers: { 						// headers: fetch事实标准中可以通过Header相关api进行设置
        'Content-Type': 'application/x-www-form-urlencoded' // default: 'application/json'
    }
}).then(res=>{
	var data = res.text();	
    return data;
}).then(data=>{
    console.log(data)
})

//TODO ES6 -> fetch
/* async function getTitle(url) {
    //TODO node不支持fetch函数
    let response = await fetch(url);
    console.log(response)
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
} */
//getTitle('https://tc39.github.io/ecma262/').then(v=>console.log(v))