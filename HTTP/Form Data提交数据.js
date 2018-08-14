enctype="application/x-www-form-urlencoded"   
enctype="application/json"
enctype="multipart/form-data"
Node + Express + post请求


//发送数据到服务器
Query string parameters	
	form ->get						//get提交表单
	$.get()								//get发送数据方式
	//node接收：req.query, req.params

Form Data								//Content-Type: application/x-www-form-urlencoded
	form ->post						//post提交表单
	$.post()							//post发送数据方式
	var params = new URLSearchParams()  params.append()
	var data   = qs.stringify(data)


	//注：Form Data的请求正文格式是用key=value&key1=value2格式
	//node接收:  req.body

//以流方式传入服务端
Request Payload					//Content-Type: multipart/form-data;
	form ->file						//表单上传控件方式		-- enctype="multipart/form-data"   formenctype="multipart/form-data" 
	axios({method, ulr})	//默认传参方式
	wx.request()					//微信请求方式


	//Request Header  -- Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryp3gmLrKfayrJbBUh
	//注：Request Payload的请求正文格式是json格式的字符串
	//node接收
	  var str = ''
		req.on('data', chunk => {
			str += chunk;
		})



//原生Ajax  --> new XMLHttpRequest()  默认 Content-Type: text/plain;charset=UTF-8
//GET:	--> 默认Query String 
var url = 'https://www.easy-mock.com/mock/5ae9d1dd0a492d2535b91366/hfBeam-tims-api/views?user=1'
var xhr = new XMLHttpRequest()
xhr.open('get', url)
xhr.onreadystatechange = function(e){
  if(xhr.status == 200 && xhr.readyState == 4){
		console.log(xhr.response, xhr.responseText)
	}
}
xhr.send(null)


//POST:		--> 默认Request Payload, 若不指定请求头RequestHeader, Content-Type是text/plain;charset=UTF-8
var xhr = new XMLHttpRequest()
xhr.open('open', url)
//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode')  
xhr.onreadystatechange = function(res){
  console.log(res)
}
xhr.send(JSON.stringify(data))			//Request Payload
//xhr.send('name=yu&user=1')				//Form Data	 --> xhr.setRequestHeader()  --> Content-Type: 'application/x-www-form-urlencode'