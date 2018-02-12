get, post, jsonp, put, delete

//拦截请求与响应

//全局定义
Vue.prototype.$http = axios;
this.$http.get().then()



//5-10  axios
var instance = axios.create(config)		     //实例可以将一些通用的config先配置好
instance.get()

axios.get(url, {}).then(res=>{}).catch(err=>{})
axios.post(url, {}).then(res=>{}).catch(err=>{})

//多线程
axios.all([fn1(), fn2()])
	.then(axios.spread((acc, perms)=>{ } ))

axios({
	method: 'post',
	url:
	data:{
		
	}
}).then()

//API
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

axios.all(iterable)
axios.spread(callback)

config = {
	method: 'get',
	url: '',
	baseURL:'',
	headers: {'X-Requested-With': 'XMLHttpRequest'},
	params: {
		id: 12345
	},
}


//基于全局Vue使用http Vue-Resource
Vue.http.get('/someUrl', [opts]).then(succ, error)
Vue.http.post('/someUrl', [body], [opts]).then(succ, error)

//在一个Vue实例中使用
this.$http.post();

this.$http.get('url')
	.then(response=>{
		//resolveCallback
		this.$set('gridData', response.data)
	}, response=>{
		//rejectCallback
	})
	.catch(response=>{
		//errorCallback
	});


/*
resource服务
get: {method: 'GET'},
save: {method: 'POST'},
query: {method: 'GET'},
update: {method: 'PUT'},
remove: {method: 'DELETE'},
delete: {method: 'DELETE'}
*/
var resource = this.$resource(apiUrl);
resource.get().then()
resource.save(vm.apiUrl, vm.item)
resource.update({id: vm.item.id}, vm.item)
