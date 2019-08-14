/**
 * 2019/7/29
 * debounce(抖动)
 * search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
 * window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
 */
export const debounce  = (fn, delay = 200) => {
  let timer
  return function() {
    let $this = this;
    if(timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      fn.apply($this, arguments)
    }, delay)
  }
}

/**
 * throttle(节流)
 * 鼠标不断点击触发，mousedown(单位时间内只触发一次)
 * 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
 */
export const throottle = (fn, interval = 200) => {
  let last, timer;
  return function() {
    let $this = this, now = Date.now()

    if(last && now - last < interval){      //TODO
      clearTimeout(timer)
      timer = setInterval(() => {
        last = now;
        fn.apply($this, arguments)
      }, interval);
    }else{
      last = now;
      fn.apply($this, arguments)
    }
  }
}


//抽取数组对象的值
export const flatten = (arys, key) => {
  return arys.reduce((flat, item)=> flat.concat(item[key]), []);
}

//工具方法
class Utils {
  constructor() {
    this.instance=null;
    this.$API = $API;
  }
  static getInstance(){
    if(!this.instance){
      this.instance = new Utils()
    }
    return this.instance;
  }
  //打印
  log(data){
    console.log(JSON.stringify(data, null, 2))
  }
  /**
   * 
   * @param {时间戳}   datetime 
   * @param {时间格式} format 
   */
  dataFormat(datetime, format='yyyy-MM-dd'){
    var date = new Date(datetime);
    var map = {
      'M+': date.getMonth()+1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'S' : date.getMilliseconds(),
      // 'q+': Math.floor((date.getMonth()+3)/3), 
    }
    if(/(y+)/i.test(format)){
      var year = date.getFullYear() + ''
      format = format.replace(RegExp.$1, year.substr(4 - RegExp.$1.length))
    }
    if(/(w+)/i.test(format)){
      var week = '星期' + '日一二三四五六'.charAt(date.getDay())
      format = format.replace(RegExp.$1, week)
    }
    for(var k in map){
      var reg = new RegExp('(' + k + ')', 'i')
      if(reg.test(format)){
        var temp = (map[k]+'').padStart(2, 0);
        format = format.replace(RegExp.$1, temp)
      }
    }
    return format;
  }
}


let utils = Utils.getInstance()
export default utils;