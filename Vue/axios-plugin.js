import axios from 'axios';

let AxiosPlugin = {}
AxiosPlugin.install = function (Vue, opts) {
  let instance = axios.create(opts);
  instance.interceptors.request.use(config => {
    //TODO 发送请求
    return config;
  }, error => {
    //TODO 请求错误处理
    return Promise.reject(error);
  })
  instance.interceptors.response.use(response => {
    //TODO 响应成功
    return response
  }, error => {
    //TODO 响应错误处理
    return Promise.reject(error);
  })

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
    all(maps){
      return instance.all(maps)
    }
  }
}

export default AxiosPlugin;
