//��д
toString = Object.prototype.toString,
hasOwn   = Object.prototype.hasOwnProperty,
push     = Array.prototype.push,
slice    = Array.prototype.slice,
trim     = String.prototype.trim,
indexOf  = Array.prototype.indexOf


//1.������ֵ
let variable = variable0 || "var";

//2.��ʽ���� (Ҫ���ض�����䣨��������ı�������Ҫʹ��()������{ }�����������塣��������ȷ�������Ե���������ʽ������ֵ)
const fn = num => (
	Math.PI * num
)
//3.�⹹��ֵ
const {store, form, loading, errors, entity} = this.props;

//4.����չ�������
const nums = [1,2,3, ...odd];
const {a, b, ...z} = {a:1, b:2, c:3, d:4}

let ary = arr.slice(), ary = Array.from(arr);

Array.apply( null, { length: 4 } );							//������
Array.from({length:4})

//5.λ����(�롢�򡢷ǡ���򡢷�������)  &, |, !, ^��~, >>
//
~~4.9 = 4		//ȡ��

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

//11.indexOf����-1;
!!~location.href.indexOf('http')

//6.λ���� NOT ʵ�����Ƕ�������,Ȼ��� 1; ������������ּ�1������
~true = -2
~false = -1


//7.��С|��ֵ
Math.max.apply(null, arr)
Math.min.apply(null, arr)

const max = (arr) => Math.max(...arr);

//8.���������ƶ�--����ٺϲ�
var arr = [1,2,3,4,5];
//����һ
arr1 = arr.slice(-1);
arr2 = arr.slice(0, -1);
arr1.concat(arr2);

moveArr = (arr, n)=>{	  //n ����-����, ����-����, 0-���ƶ�
	if(Math.abs(n)>arr.length) n = n%arr.length;
	return arr.slice(-n).concat(arr.slice(0, -n))
}

//9.����arr.slice�۷�, str.substr(4-RegExp.$1.length)
var rate = 1;
"�����������".slice(5 - rate, 10 - rate);
 
//10.ʮ����ָ��
1000 = 1e3
 


//12.���ﻯ
let add = a => b => a + b

let is = p => v => o => o.hasOwnProperty(p) && o[p] == v;	//�ж�һ��������ֵ

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
//with??
with({
  get a() {
    return Math.floor(Math.random()*4);
  }
}){
  for(var i=0;i<1000;i++){
    if (a == 1 && a == 2 && a == 3){
      console.log("after "+(i+1)+" trials, it becomes true finally!!!");
      break;
    }
  }
}

//�����ֻ��������ַ��������ݱ�� 0��
!!+0
~~0


//14.�������ȥ��
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

//16.������ͼƬ��˳����ʾ
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

//ģ������sleep
function sleep(milli){
	var start = Date.now();
	while(Date.now() < start + milli);
}


//��ʵ�ֺϲ�����, ����������   TODO: Object.assgin({})
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



function type(o){
    var s = Object.prototype.toString.call(o);
    //console.log(s.match(/\[object (.*?)\]/))
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();        //����ƥ��
}

//��type���������ϣ�����ר���ж�ĳ����������
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