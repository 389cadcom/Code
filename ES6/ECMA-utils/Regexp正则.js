//https://www.tuicool.com/articles/3UnY32A

//1.元字符
( [ { \ ^ $ | ) * ? + .

/\?/	--> 	new RegExp("\\?")

//2.特殊字符  ASCII, Unicode  

\x61			ASCII   十六进制			'about'.match(/\x61/)
\141			ASCII		八进制			  /\141/.test('about')
\u0062		Unicode 十六进制			/\\u0062/.test('about')

//3.排除选择	范围选择
		[^ab]			[a-zA-Z]

//4.预定义	\t \n \r 

.		 =>   [^\n\r]						除换行与回车外所有字符
\d	 =>   [0-9]							数字
\D	 =>		[^0-9]						非数字
\s	 =>   [\t\n\r\f\x0B]		空白字符--制表、换行、回车、换页
\S	 =>		[^\t\n\r\f\x0B]		非空白字符
\w	 =>		[a-zA-Z0-9_]			单词字符--字母、数字、下划线
\W	 =>		[^a-zA-Z0-9_]			非单词字符


//5.量词  
?				//{0,1}  0或1次  
*				//{0, }  0或N次
+				//{1, }  1或N次
{n}			//N次
{n, m}	//最少N次，不超M次
{n,}		//最少N次

//6.贪婪、惰性、支配量词
//a.贪婪匹配，先看整个字符是否匹配，然后一个个吐出来，直到匹配为止，默认都是贪婪匹配
//b.懒惰匹配，先看第一个字符是否匹配，能少吃绝不多吃，直接匹配成功为止
//c.支配量词，只尝试匹配整个字符，不匹配不再尝试，一刀切 --- 浏览器不兼容

贪婪							懒惰						支配量			//支配量浏览器不支持d
?									??							?+					0或1次
*									*?							*+					0或多次
+									+?							++					0或多次
{n}								{n}?						{n}+				N次
{n, m}						{n,m}?					{n,m}+			n-m次
{n, }							{n,}?						{n,}+				最少n次

//7.分组、反向引用--存储分组的特殊值  RegExp.$1, $2

trim = /^\s*(.*?)\s*$/			// '  abc  '.replace(/^\s*(.*?)\s*$/, '$1')

'1234 5678'.replace(/(\d{4})\s*(\d{4})/, '$2 $1')			//'5678 1234'


//8.非捕获性分组 -- 无需存储开销RegExp.$1, RegExp.$2
在左括号内加?: 型式

'1234 5678'.replace(/(?:\d{4})\s*(\d{4})/, '$2 $1')	//'$2 5678'

//匹配去除HTML标签
"<a href>地楼</b> >华安</a>".replace(/<(?:.|\s)*?>/g, '')


//9.其他
//a.边界-- ^, $, \b, \B



//10.断言

function formatPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

姓名显示最后一个字，其余用星号代替
'实打实的'.replace(/(?<=.).(?=.)/g, '*')				//后发断言， 先行断言

return new Array(str.length).join('*') + str.substr(-1);

nickname.replace(/^(.).+(.|\s)$/, '$1**$2')

//将参数转为对象， 对象转参数见--> 数组 Object.keys().map((key)=> k + '=' + params[k])
var url = decodeURI(location.search)
var reg = /([^?=&]+)=([^&]*)/gi, o = {};
url.replace(reg, (str, a, b)=>{
  o[a] = b;
})
console.log(o)

var ary = url.match(reg)
var o = ary.reduce((prev, curr)=>{
  var a = curr.split('=')
  //console.log(prev, a)
  prev[a[0]] = a[1];
  return prev
}, {})