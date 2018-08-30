//axios返回结构
res = {
	status: 200,
	statusText: "OK",
	datas: {},
	headers: {},
	request: {}
	config: {
		timeout,
		method,
		url,
		params
	}
}


//get -- params
//post-- data

//default
axios.defaults.baseURL = ''
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-urlencode';

//实例
var instance = axios.create({
	baseURL: '',
	timeout: 0
})
instance.defaults.headers.common['Authorization'] = 'Auth'

//1.Get
axios.get(url + 'views', {params: {id:1}}).then( res =>{
	if(res.status == 200){
		//console.table(res.data)
	}
})
//2.Post
axios.post(url + 'test', { id: 1 }).then( res => {
	//console.log(res.data)
})

//3.All
axios.all([
	axios.get(url + 'views'),
	axios.post(url + 'test')
])//.then(axios.spread(function (view, test){ }))
.then( all=>{
//	console.log(all[0], all[1])
})
//例
var urls = ['', '']
var request = urls.map(makeRequest)

function makeRequest(url){
	return axios.get(url)
}
axios.all(request)
	.then(axios.spread(res1, res2)=>{
	
	})

//4.config
axios({
	method: 'post',
	url: url + 'test',
	data: {	id: 1 }			//params: {id:1}
}).then(res=>{
	console.log(res);
})

//5.拦截设置instance
var instance = axios.create({
	baseURL: url,
	timeout: 5000,
	headers: {
		"X-Custom-Header": "foobar"
	}
})
//TODO 拦截请求头
instance.interceptors.request.use( config =>{
	return config;
}, error => {
	console.log(error)
	return Promise.reject(error)
})
//拦截响应成功
instance.interceptors.response.use( data =>{
	console.log('响应data', data)
	return data;
}, error => {
	return error;
})

//拦截请求
instance.get('views').then( res => {
//	console.log(res);
})




//三种传参方式

//设置请求头部
var instance = axios.create({
  header: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    var ret = ''
    for (var it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
})

var params = {user:'yu', age:2, arr: [1,2,3]}

//参数的格式                 编码类型  -- 序列化post方式的数据
//1.Form Data      'Content-type': 'application/x-www-form-urlencoded'
var data = new URLSearchParams()      
data.append('user', 1)
data.append('arr', [1,2,3])

//qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });

instance.post(url, params ).then( res =>{
  console.log(res)
})

//2.Query String  'Content-type': 'application/json'
axios.get(url, {params: params}).then( res =>{
  console.log(res)
})

//3.Request Payload  Content-Type:multipart/form-data 图片上传流
var formdata = new FormData()
formdata.append('age', 2)
axios.post(url, formdata ).then( res =>{
  console.log(res)
})