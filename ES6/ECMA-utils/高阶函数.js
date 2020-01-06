//函数在特定的时间内不被再调用后执行
function debounce(fn, delay){
	var timer;
	function debounced(...args){
		if(timer)clearTimeout(timer);
//		let callnow = !timer
//		timer = setTimeout(()=> (timer=null), delay)
//		if(callnow) fn.apply(this, arguments);
		timer = setTimeout(()=>{
			fn.apply(this, arguments)
		}, delay)
	}
	debounce.cancel = function(){
		if (timer !== undefined) {
			clearTimeout(timer);
			timer = null;
		}
	}
	return debounced;
}

//确保连续触发事件但是在 n 秒中只执行一次函数
function throttle(fn, delay){
	var timer;
	return function(){
		if(!timer){
			timer = setTimeout(()=>{
				clearTimeout(timer);
				timer = null
				fn.apply(this, arguments)
			}, delay)
		}
	}
}

//确保连续触发事件但是在 n 秒中只执行一次函数
function throttle (fn, wait) {
  let timer, flags = true;   // 是否首次调用

  return function() {
    if (flags) {    									// 如果是第一次调用不用延迟，直接执行即可
			fn.apply(this, arguments);
      flags = false;
      return false;
    }
    
    if (timer) return false;					// 如果定时器还在，说明上一次还没执行完，不往下执行
    timer = setTimeout(() => { 				// 延迟执行
      clearTimeout(timer);    				// 清空上次的定时器
      timer = null;           				// 销毁变量
      fn.apply(this, arguments);
    }, wait);
  }
}


var $input = document.getElementById("input");

$input.addEventListener('input', throttle((e)=>{
	var val = e.target.value;
	console.log(val)
},500), false)



//@mixin
const mixin = function(obj, mixins){
    const newObj = obj;

    newObj.prototype = Object.create(obj.prototype);

    for(let prop in mixins){
        if(mixins.hasOwnProperty(prop)){
            newObj.prototype[prop] = mixins[prop];
        }
    }

    return newObj;
}