import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import utils from './utils.js'

var client_id = utils.AES('webApp')
var nonce     = utils.getNum()

var tokenOpts = {
  url: '/api-auth/oauth/client/token',
  method: 'post',
  headers: {
    client_id    : client_id,
    client_secret: client_id,
  }
}

axios.defaults.timeout = 35000          //超时时间
axios.defaults.withCredentials=false
axios.defaults.retry = 2                //重新请求次数
axios.defaults.retryDelay = 3000        //延迟重新请求


//单例、拦截设置
let instance = axios.create({})


//安全验证参数
function paramsHandler(config){

  var headers = {}, opts = {access_token: token, nonce, timestamp : Date.now()}
  if(config.upload){            //上传模式
    headers = opts
  }else{
    headers = { ...opts, ...config.data, ...config.params }
  }

  var sign = Object.keys(headers).sort().map( key => key +  '=' + headers[key]).join('&')
  // console.log('签名:', sign)
  headers.sign = utils.SM3(sign);
  config.headers = { ...config.headers, ...opts,  sign:headers.sign}

  if(!config.upload && config.method=='post'){
    config.data = qs.stringify(config.data)
  }
  //console.log( config.data );
  return config;
}

var tokenLock = false, tokenTime = 0, token;
function checkToken () {
  var promise = new Promise((resolve, reject)=>{
    token = utils.getCookie('token');
    if(token){
      // console.log('cookie:' + token);
      resolve(token)
    }else{
      //请求等待
      if(tokenLock && tokenTime < 30){
        console.log('wait....');
        setTimeout(function() {
          tokenTime++;
          checkToken().then( resolve(token) )
        }, 500);
      }else{
        tokenLock = true;
        //请求token
        axios( tokenOpts ).then( res =>{
          tokenLock = false;
          tokenTime = 0;

          if(res.status == 200){
            token = res.data.access_token;
            utils.setCookie('token', token, res.data.expires_in/3600)
          }
          resolve(token)
        }).catch( error => {
          reject(error)
        })
      }
    }
  })

  return promise;
}



//设置全局请求头部
//TODO token初始会加载多次??  2019-4-25
instance.interceptors.request.use( async (config) => {
    if(config.loading){
      Vue.$vux.loading.show()
    }
    await checkToken()

    if(!config.__retryCount){               //再次请求不签名
      config = paramsHandler(config);
    }
    return config;
    /* checkToken().then(()=>{
      console.log(token)

      if(!config.__retryCount){               //再次请求不签名
        config = paramsHandler(config);
      }
      return config;
    }) */

    /* token = utils.getCookie('token');
    if(!token){                               //请求token
      return axios( tokenOpts ).then( res =>{
        if(res.status == 200){
          token = res.data.access_token;
          utils.setCookie('token', token, res.data.expires_in/3600)
        }
        return Promise.resolve(config);
      }).then( result => {
        if(!config.__retryCount){             //再次请求不签名
          config = paramsHandler(config);
        }
        return config;
      })
    }else{
      if(!config.__retryCount){               //再次请求不签名
        config = paramsHandler(config);
      }
      return config;
    } */
  }, error =>{
    console.log(JSON.stringify(error, null, 2));
    Vue.$vux.toast.text('请求超时')
    return Promise.reject(error)
  }
)

//设置错误重新请求
instance.interceptors.response.use( data => {
    Vue.$vux.loading.hide()
    return data;
  }, error => {
    var conf = error.config;
    if(!conf || !conf.retry) return Promise.reject(error);

    //重新加载初始值, 超过次数断开请求
    conf.__retryCount = conf.__retryCount || 0;
    if(conf.__retryCount >= conf.retry){
      Vue.$vux.toast.text('接口请求出错:' + conf.url)
      return Promise.reject(error);
    }
    conf.__retryCount += 1;

    //创建延迟的处理函数
    var backoff = new Promise( (resolve, reject) => {
      setTimeout(function() {
        resolve()
      }, conf.retryDelay || 1);
    })
    //TODO return
    return backoff.then( () => {
      return instance(conf);
    }).catch( err => {
      console.log('backoff:', err);
      Vue.$vux.loading.hide()
    })
  }
)

//响应成功, 关闭loading, 处理返回结果
function getAxios(config){
  var promise = instance(config);

  return promise.then( res => {
    if(res && res.status == 200){
      let result = res.data;
      //返回失败处理
      if (result.ret && result.code != 200) {
        Vue.$vux.toast.text(result.msg)
      }
      Vue.$vux.loading.hide()

      return Promise.resolve(result)
    }else{
      return Promise.reject(res)
    }
  }).catch(err => {
    if (err) {
      console.log('请求错误-->URL: ' + config.url)
      console.log(JSON.stringify(err, null, 2))
    }
    return Promise.reject(err)
  })
}


//导出接口
export default {
  get(url, params = {}){
    return getAxios({
      url: url,
      method: 'get',
      loading: true,
      params: params,
    })
  },
  //全局遮罩
  post(url, params = {}){
    return getAxios({
      url: url,
      method: 'post',
      loading: true,
      data: params,
    })
  },
  //不用遮罩
  ajax(url, params, method='post'){
    var options = {
      url: url,
      method: method,
      loading: false,
    }
    if(method == 'post'){
      options.data   = params
    }else{
      options.params = params
    }
    return getAxios(options)
  },
  all(arr){
    return axios.all(arr);
  },
  upload(url, params = {}){
    /*
      var formdata = new FormData()
      for(var key in params){
        formdata.append(key, params[key], 'img.png')
      }
    */
    return getAxios({
      method: 'post',
      url: url,
      data: params,
      loading: true,
      upload: true,
      headers: {
        // 'Content-Type': 'multipart/form-data'
      }
    })
  }
}
