/**
	基础方法 2018-8-15收集
*/
export default {
	//构造函数constructor判断, instanceof, {}.toString.call
	isArray(value){
		return value && typeof value === 'object' && value.constructor === Array;
		return value && typeof value === 'object' && value instanceof Array;
	},
	//判断对象类型
	toType(obj){
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}
}


var _extends = Object.assign || function(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
};