//Node-JSONP返回
var server = http.createServer(function(req, res){
	if(~req.url.indexOf('callback')){		//简易处理JSONP
		var obj = {
			text: 'JSONP'
		}
		var callback = req.url.split('callback=')[1];
		var json = JSON.stringify(obj);
		res.end(callback + `(${json})`);	//返回给前端的是拼接好的 JSON 对象
	}
})

//CORS
var xhr = new XMLHttpRequest(); 
xhr.withCredentials = true					//传 cookie 的时候前端要设置的
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if(xhr.status > = 200 && xhr.status < 300 || xhr.status == 304){
			console.log(xhr.responseText);
		}
	}
}
xhr.open('get', 'http://127.0.0.1:3001', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');	//前端设置请求头部
xhr.send()
//Access-Control-Allow-Origin
//res.setHeader('Access-Control-Allow-Origin', '*')	//设置允许所有来源请求或指定来源


//服务端
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3001') // 必填：接受域的请求
  res.setHeader('Set-Cookie', ['type=muyy'])							// 下发 cookie
  res.setHeader('Access-Control-Allow-Credentials', true)				// 选填：是否允许浏览器传cookie 到服务端，只能设置为 true
  res.end('date from cors')
})
