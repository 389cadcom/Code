/*
 * @Author: lonves 
 * @Date: 2018-01-16 16:22:19 
 * 
 * RegExp.$1, 
 * str.substr(4-RegExp.$1.length)
 * '00' + str.substr()
 */
Date.prototype.format = function(format){
	var conf = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds(),
		'S' : this.getMilliseconds(),
		'q+': Math.floor((this.getMonth()+3)/3),
		'w+': '日一二三四五六'.charAt(this.getDay())
	};
	if(/(y+)/.test(format)){
		format = format.replace(RegExp.$1, (this.getFullYear()+'').substr(4-RegExp.$1.length));	//4-4, 4-2
	}
	for(var k in conf){
		var reg = new RegExp('(' + k + ')');
		if(reg.test(format)){
			var str = RegExp.$1.length==1 ? conf[k]: ('00' + conf[k]).substr(conf[k].toString().length);
			format = format.replace(RegExp.$1, str)
		}
	}
	return format
}
var date = new Date()
console.log(date.format('yyyy/MM/dd hh:mm:ss'))