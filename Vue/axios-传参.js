//三种传参方式  axios默认是 Request Payload

//JS拦截设置请求头部参数 --> 'bar=123&age=19'			application/x-www-form-urlencoded
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
//1.Form Data								'Content-type': 'application/x-www-form-urlencoded'

var params = new URLSearchParams()      
params.append('user', 1)
params.append('arr', [1,2,3])

params = qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });  

params = 'bar=123&age=19'

instance.post(url, params ).then( res =>{
  console.log(res)
})

//2.Query String						'Content-type': 'application/json'   
axios.get(url, {params: params}).then( res =>{
  console.log(res)
})

//3.Request Payload					'Content-Type':multipart/form-data 图片上传流
var formdata = new FormData()
formdata.append('age', 2)
axios.post(url, formdata ).then( res =>{
  console.log(res)
})



//拦截
instance.interceptors.request.use( config => {
    if(config.loading){     //显示遮罩层
      Vue.loading()
    }
    var client_secret = clientSecret.substring(0, clientSecret.lastIndexOf('-'))

    return new Promise((resolve, reject)=>{
      token = utils.getCookie('token');
      if (token) {
        resolve();
      } else {
        //正在请求更新token时，其他接口等待 TODO
        if (tokenLock && tokenTime < 30) {
          setTimeout(function () {
            tokenTime++;
            resolve()
          }, 500);
        } else {
          tokenLock = true;
          var params = {
            method: 'post',
            url: '/hfBeam-tims-api/oauth/token',
            data: qs.stringify({client_id, client_secret, grant_type})
          }
          //token请求
          axios(params).then( res => {
            if(res.status == 200){
              token = res.data.access_token;
              var expires_in = res.data.expires_in/3600
              utils.setCookie('token', token, expires_in)
            }
            return Promise.resolve(config);
          }).catch( err => {
            console.log(err);
          })
        }
      }
    }).then( res => {
      // console.log(res);
      if(!config.__retryCount){
        config = argsHandler(config);
      }
      return config;
    })
  },
  error => {
    console.log(JSON.stringify(error, null, 2));
    Vue.loading.close()
    Vue.$vux.toast.text('请求超时')
    return Promise.reject(error)
  }
)

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




