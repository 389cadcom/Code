import axios from 'axios'

let AxiosPlugin = {}
AxiosPlugin.install = function(Vue, options){
  let config = {

  }
  options = Object.assign(options, config)
  let instance = axios.create(options)

  //请求拦截
  instance.interceptors.request.use(config => {

    return config;
  }, error => {
    return Promise.reject(error)
  })
  //响应拦截
  instance.interceptors.response.use(response => {

    return response
  }, error => {
    return Promise.reject(error)
  })

  Vue.prototype.$axios = instance;
  Vue.prototype.$http = {
    get(){

    },
    post(){

    },
    all(){
      
    }
  }
}

export default AxiosPlugin
