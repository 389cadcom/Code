import axios from 'axios';

let AxiosPlugin = {}
AxiosPlugin.install = function (Vue, opts) {
  let instance = axios.create(opts);

  //TODO 发送请求
  instance.interceptors.request.use(config => {
    return config;
  }, error => {
    return Promise.reject(error);
  })

	//TODO 响应成功
  instance.interceptors.response.use(response => {
    return response
  }, error => {
    return Promise.reject(error);
  })

	//添加到原型
  Vue.prototype.$axios = instance;
  Vue.prototype.$http = {
    get(url, data = {}, options = {}){
      let config = {
        ...options,
        ... {
          method: 'get',
          url   : url,
          params: data
        }
      }
      return instance(config);
    },
    post(url, data = {}, options = {}){
      let config = {
        ...options,
        ... {
          method: 'post',
          url   : url,
          data  : data
        }
      }
      return instance(config);
    },
    //并行
    all(arrs){
      return instance.all(arrs)
    }
  }
}

export default AxiosPlugin;


Vue.use(AxiosPlugin)
/*
使用例子:
this.$http.post(url, qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})
*/
1. Vue.$axios 
2. Vue.directive('', {
	bind(el, binding){},
	update(el, binding){},
})

3. Vue.mixin('', {
	
})
4. Vue.prototype.