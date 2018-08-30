//axios���ؽṹ
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

//ʵ��
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
//��
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

//5.��������instance
var instance = axios.create({
	baseURL: url,
	timeout: 5000,
	headers: {
		"X-Custom-Header": "foobar"
	}
})
//TODO ��������ͷ
instance.interceptors.request.use( config =>{
	return config;
}, error => {
	console.log(error)
	return Promise.reject(error)
})
//������Ӧ�ɹ�
instance.interceptors.response.use( data =>{
	console.log('��Ӧdata', data)
	return data;
}, error => {
	return error;
})

//��������
instance.get('views').then( res => {
//	console.log(res);
})




//���ִ��η�ʽ

//��������ͷ��
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

//�����ĸ�ʽ                 ��������  -- ���л�post��ʽ������
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

//3.Request Payload  Content-Type:multipart/form-data ͼƬ�ϴ���
var formdata = new FormData()
formdata.append('age', 2)
axios.post(url, formdata ).then( res =>{
  console.log(res)
})