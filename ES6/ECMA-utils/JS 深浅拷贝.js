/*�Ƿ���������ȡ��һ������Ŀ���ʵ�壬����������
  
	������ʶ---��������					 --ջ�ڴ�
	������ʶ---��������					 --���ڴ桢ָ�����õ�ַ
	ǳ������ʵ��-����&&����			 
	�����ʵ��-����&&����			 --slice(), concat ֻ��һ�㸴��
	�����ʵ��- ES6��չ�����  --[...arr], [...obj], Object.assign({}, {})Ҳֻ��һ�㸴��
	�����ʵ��-JSON�ķ���			 --undefined, function, Regexp, symbol �ᶪ��

	JSON.parse(JSON.stringify(o))
  $.extend(true, {}, obj)			 --jQuery
	_.cloneDeep(obj)						 --loadsh
*/


//�����ж�
arr.constructor === Array
obj.constructor === Object
({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]   //�������



//����ݹ鷽�� 
function deepClone(source){
	const results = source.constructor === Array ? [] : {}
	for(let key in source){
		if(source.hasOwnProperty(key)){
		   if(source[key] && typeof source[key] === 'object'){	//�������ͣ��ٵݹ�
			    //results[key] = source[key].constructor === Array ? [] : {};
					results[key] = deepClone(source[key]);
			 }else{
					results[key] = source[key]												//��������
			 }
		}
	}
	return results;
}

//�ж�����
function deepClone(obj){
	var type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	var result;
	
	if(type == 'object'){
		result = {}
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				result[key] = deepClone(obj[key])					//�ݹ�����
			}
		}
	}else if(type === 'array'){
		result = []
		for(var i=0; i<obj.length; i++){
			result[i] = deepClone(obj[i])								//�ݹ�����
		}
	}else{
		return obj;
	}
	return result;
}

