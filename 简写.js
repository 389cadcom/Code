//


//字符截取
"★★★★★✰✰✰✰✰".substring(5-3, 10-3)

//简写
toString = Object.prototype.toString,
hasOwn   = Object.prototype.hasOwnProperty,
push     = Array.prototype.push,
slice    = Array.prototype.slice,
trim     = String.prototype.trim,
indexOf  = Array.prototype.indexOf

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}


//1.变量赋值
let variable = variable0 || "var";

//2.隐式返回 (要返回多行语句（例如对象文本），需要使用()而不是{ }来包裹函数体。这样可以确保代码以单个语句的形式进行求值)
const fn = num => (
	Math.PI * num
)
//3.解构赋值
const {store, form, loading, errors, entity} = this.props;

//4.数组展开运算符
const nums = [1,2,3, ...odd];
const {a, b, ...z} = {a:1, b:2, c:3, d:4}

let ary = arr.slice(), ary = Array.from(arr);

Array.apply( null, { length: 4 } );							//类数组
Array.from({length:4})

//5.位运算(与、或、非、异或、反、右移)  &, |, !, ^、~, >>
//
~~4.9 = 4		//取整

~~true == 1
~~false == 0
~~"" == 0
~~[] == 0
~~undefined ==0
~~!undefined == 1
~~null == 0
~~!null == 1
~~!0 = 1

4.9>>1 = 2

~~!location.href.indexOf('http')

//11.indexOf等于-1;
!!~location.href.indexOf('http')

//6.位运算 NOT 实质上是对数字求负,然后减 1; 逆运算就是数字加1后再求负
~true = -2
~false = -1


//7.最小|大值
Math.max.apply(null, arr)
Math.min.apply(null, arr)

const max = (arr) => Math.max(...arr);

//8.数组左右移动--拆分再合并
var arr = [1,2,3,4,5];
//右移一
arr1 = arr.slice(-1);
arr2 = arr.slice(0, -1);
arr1.concat(arr2);

moveArr = (arr, n)=>{	  //n 正数-右移, 负数-左移, 0-不移动
	if(Math.abs(n)>arr.length) n = n%arr.length;
	return arr.slice(-n).concat(arr.slice(0, -n))
}

//9.星星arr.slice折分, str.substr(4-RegExp.$1.length)
var rate = 1;
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
 
//10.十进制指数
1000 = 1e3
 


//12.柯里化
let add = a => b => a + b   add(a)(b)

let is = p => v => o => o.hasOwnProperty(p) && o[p] == v;	//判断一对象属性值

//13 Set([...set1, ...set2])
[...set1].filter(x=>set2.has(x))
[...set1].filter(x=>!set2.has(x))

//13.
var a = {
	i:1,
	toString(){
		return this.i++;
	}
}
if(a == 1 && a==2 && a==3){
	console.log("Hi");
}

//非数字或者数字字符串的内容变成 0呢
!!+0
~~0


//14.数组对象去重
function removeRepeat(arr, field){
    var s = [], result = {}, reSet = {}
    for(var v of arr){
        s.push(v[field])
    }
    for(var i=0,len=s.length;i<len;i++){
        if(!result[s[i]] && result[s[i]] !== 0) {
           result[s[i]] = i
        } else {
          reSet[i] = s[i];
        }
    }
    console.log(JSON.stringify(reSet))
    var i=0;
    for(var key in reSet){
        arr.splice(key-i, 1)
        i++;
    }
    return arr
}

//15.input propertychange
$('#filter').bind('input propertychange', function() {
	var filter = $(this).val();
	if (filter == "") {
		$scrollList.find('li a').show();
	} else {
		$scrollList.find('li a').each(function() {
			var shopName = $(this).text();
			if (shopName.indexOf(filter) != -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	}
});

//16.数组中图片按顺序显示
function loadImage(imgList,callback){
	if(!$.isArray(imgList) || !$.isFunction(callback)) return ;
	var imageData = [] ;
	$.each(imgList, function(i,src){
		var img = new Image() ;
		img.onload = function(){
			$(imageData.shift()).appendTo("body") ;
			if(!imageData.length){
				callback() ;
				return ;
			}
			this.onload = null ;
		} ;
		img.src= src ;
		imageData.push(img) ;
	})
}

//模拟休眠sleep
function sleep(milli){
	var start = Date.now();
	while(Date.now() < start + milli);
}

const delay = (ms=500) => new Promise((resolve, reject)=> setTimeout(resolve, ms))


//简单实现合并对象, 不定个参数   TODO: Object.assgin({})
funtion merge(root){
  for(var i=1; i<arguments.length; i++){
    for(var key in arguments[i]){
      if(!root.hasOwnProperty(key)){		
        root[key]=argument[i][key];
      }
    }
  }
  return root;
}
var merged=merge({name:'shokc'},{city:"shenzhen", name:'shokc'})


//判断对象类型
function type(o){
	var s = Object.prototype.toString.call(o);
	return s.match(/\[object (.*?)\]/)[1].toLowerCase();					//正则匹配, 分组
}

//在type函数基础上，加上专门判断某种类型数据
[
	'Null',
	'Undefined',
	'Object',
	'Array',
	'String',
	'Number',
	'Date',
	'Boolean',
	'Function',
	'AsyncFunction',
	'RegExp',
	'Error'
].forEach( t => {
	type['is'+ t] = function(o){
		return type(o) === t.toLowercase();
	}
})

//class2type
var class2type = {}, toString = Object.prototype.toString;	//({}).toString
"Boolean Number String Array Date RegExp Object Error".split(" ").forEach(function(item, i){
	class2type["[object "+ item +"]"] = item.toLowerCase();
})

function isType(obj){
	return obj == null ? String(obj) : class2type[toString.call(obj)];
}