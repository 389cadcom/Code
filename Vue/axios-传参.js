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
