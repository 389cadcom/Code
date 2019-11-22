enctype="application/x-www-form-urlencoded"   
enctype="multipart/form-data"
enctype="application/json"

//content-type
blob = new Blob(['value=123'], {type:'applicatin/x-www-form-urlencoded'})
fd   = new FormData(); fd.append('value', 123)
params = new URLSearchParams({value: 123})


//Node + Express + post请求
function Axios(config){
	if(typeof config === 'string'){
		config = arguments[1] || {}
	}else{
		config = config || {}
	}

	config = Object.assign({}, defaults, {})
}

//post, put, patch   delete, get, head, options
Axios.prototype[method] = function(url, data, config) {			
	Object.assign(config, {
		method,
		url,
		data
	})
	return this.request(config)
}


//请求数据的三种方式区别， 默认请求方式  
Query string parameters	
	form ->get						//get提交表单
	$.get()								//get发送数据方式

	axios({
		url: url,
		method: 'get',
		params: data
	})
	axios.get(url +'?name=yu', {params: {age:10}})	//axios.get(url[, config])

	fetch(url + '?name=yu', {method:'get'})					//参数需拼接在url后面

	//node接收：req.query, req.params

//Post方式
表单Key-Value						  //Content-Type: application/x-www-form-urlencoded
	1.form ->post						//post提交表单
	2.$.post()							//post发送数据方式

	var params = new URLSearchParams()
	var data   = qs.stringify(data)
	3.axios({								//axios--formdata数据
		method: 'post',
		data: params
	})
	axios.post(url, data, config)		//axios.post(url[, data[, config]])
	
	4.fetch(url,{
		method: 'post',
		headers: {
			'content-type':'application/x-www-form-urlencoded'
		},
		body: 'age=10'
	})


	//TODO base64方式表单上传图片 FileReader转为base64  reader.readAsDataURL

	//注：Form Data的请求正文格式是用key=value&key1=value2格式
	//node接收:  req.body


//Post上传 multipart/form-data
文件上传流媒体					//Content-Type: multipart/form-data    enctype="multipart/form-data"
	form ->file						//表单上传控件方式
	axios({								//axios--formdata数据
		method: 'post',
		data: formdata
	})

	//图片上传参数
	let params = new FormData();
  params.append('file', files[0], 'image.png')
	//Request Header  -- Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryp3gmLrKfayrJbBUh

	var fd = new FormData($('#form')[0])				//<form>标签添加enctype="multipart/form-data"
	
	//$.ajax上传图片
	$.ajax({
		type:"post",
		url:"/hfBeam-portal-api/file/uploadFile",
		dataType: 'json',
		data: formdata,
		cache: false,										//上传文件不设置缓存
		processData: false,							//jq不要处理发送的数据
		contentType: false,							//jq不要设置Content-Type请求头
		success:function(res){
			console.log(res)
		},
	})

	//node流方式接收数据							bodyParser req.files
	var str = ''
	req.on('data', chunk => {
		str += chunk;
	})


//注：Request Payload的请求正文格式是json格式的字符串
//以JSON方式传入服务端   Content-Type: application/json
Request Payload					
	1.axios({												//axios post默认传参方式
		method:'post', url:url
	})	        
	2.wx.request()									//微信请求方式

	3.//jq传递json
	$.ajax({
		method: 'post',
		url: url,
		data: JSON.stringify(data),
		headers: {
			'content-type': 'application/json'
		}
	})

//TODO---API
//FormData:						append delete get getAll has set keys values forEach entries
//URLSearchParams: 


//原生获取参数  for...of --> FormData
var data = new FormData(document.getElementById('form')				//流：  multipart/form-data
data.append('user', 1)

var params = new URLSearchParams();														//表单：application/x-www-form-urlencoded



//Fetch  请设置请求头部Form Data
fetch(url,{												//fetch默认为text/plain, 参数是Request Payload形式
  method: 'post',
  headers: {
    'content-type':'application/json'				
  },
  body: JSON.strinfiy({age: 10})
})

	fetch({
  url: url,
  method: 'POST',
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded'				//模拟表单提交
  },
  body: "name=yu&user=1"
}).then( res => {
//console.log(res)
  return res.json()
}).then( data => {
  console.log(data)
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