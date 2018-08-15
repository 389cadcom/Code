/*是否是真正获取了一个对象的拷贝实体，而不是引用
  
	基础认识---基本类型					 --栈内存
	基础认识---引用类型					 --堆内存、指针引用地址
	浅拷贝的实现-对象&&数组			 
	深拷贝的实现-对象&&数组			 --slice(), concat 只对一层复制
	深拷贝的实现- ES6扩展运算符  --[...arr], [...obj], Object.assign({}, {})也只对一层复制
	深拷贝的实现-JSON的方法			 --undefined, function, Regexp, symbol 会丢弃

	JSON.parse(JSON.stringify(o))
  $.extend(true, {}, obj)			 --jQuery
	_.cloneDeep(obj)						 --loadsh
*/


//类型判断
arr.constructor === Array
obj.constructor === Object
({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]   //正则分组



//深拷贝递归方法 
function deepClone(source){
	const results = source.constructor === Array ? [] : {}
	for(let key in source){
		if(source.hasOwnProperty(key)){
		   if(source[key] && typeof source[key] === 'object'){	//引用类型，再递归
			    //results[key] = source[key].constructor === Array ? [] : {};
					results[key] = deepClone(source[key]);
			 }else{
					results[key] = source[key]												//基本类型
			 }
		}
	}
	return results;
}

//判断类型
function deepClone(obj){
	var type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	var result;
	
	if(type == 'object'){
		result = {}
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				result[key] = deepClone(obj[key])					//递归属性
			}
		}
	}else if(type === 'array'){
		result = []
		for(var i=0; i<obj.length; i++){
			result[i] = deepClone(obj[i])								//递归属性
		}
	}else{
		return obj;
	}
	return result;
}

