//�������ض���ʱ���ڲ����ٵ��ú�ִ��
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

//ȷ�����������¼������� n ����ִֻ��һ�κ���
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

//ȷ�����������¼������� n ����ִֻ��һ�κ���
function throttle (fn, wait) {
  let timer, flags = true;   // �Ƿ��״ε���

  return function() {
    if (flags) {    									// ����ǵ�һ�ε��ò����ӳ٣�ֱ��ִ�м���
			fn.apply(this, arguments);
      flags = false;
      return false;
    }
    
    if (timer) return false;					// �����ʱ�����ڣ�˵����һ�λ�ûִ���꣬������ִ��
    timer = setTimeout(() => { 				// �ӳ�ִ��
      clearTimeout(timer);    				// ����ϴεĶ�ʱ��
      timer = null;           				// ���ٱ���
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