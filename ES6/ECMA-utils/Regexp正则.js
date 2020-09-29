//匹配script
reg = /<script>(.|\s)+/

//https://c.runoob.com/front-end/854
//https://www.tuicool.com/articles/3UnY32A

//1.元字符--必须使用反斜杠“\”来转义字符
( ) [ ] { \ ^ $ | * ? + .

/\?/	--> 	new RegExp("\\?")

//2.特殊字符  ASCII, Unicode  

\x61			ASCII   十六进制			'about'.match(/\x61/)
\141			ASCII		八进制			  /\141/.test('about')
\u0062		Unicode 十六进制			/\\u0062/.test('about')

//3.排除选择	范围选择
[^ab]					[a-zA-Z]

[a-fA-F0-9]										//十六进制数字的字符串


//4.预定义	\t \n \r 


\d	 =>   [0-9]							数字
\D	 =>		[^0-9]						非数字
\s	 =>   [\n\r\t\f\v]			空白字符--换行、回车、制表、换页
\S	 =>		[^\t\n\r\f\v]			非空白字符,  字母、数字、下划线、特殊字符
\w	 =>		[a-zA-Z0-9_]			单词字符--字母、数字、下划线
\W	 =>		[^a-zA-Z0-9_]			非单词字符

\b	 =>		[^a-zA-Z0-9_]			单词边界，指[a-zA-Z_0-9]之外的字符				
\B	 =>		[^a-zA-Z0-9_]			非单词边界

"12w-eefd&efrew".match(/\b\w+\b/g)														 //匹配的东西前端或未端不能为英文字母阿拉伯字数字或下横线


.		 =>   [^\n\r]						除换行与回车外所有字符						//谨慎使用“.” 运算符，因为通常类或反义字符类


//5.量词  
abc?				//{0,1}  0或1次    
abc*				//{0, }  0或N次
abc+				//{1, }  1或N次
abc{n}			//c一定要N次
abc{n, m}		//c最少N次，不超M次
abc{n,}			//c最少N次
a(bc)*			//a后面跟零个或多个重复的bc序列的字符串

//或运算符
a(b|c|d)
a[bcd]
a[b-d]
a[^b-d]									//在中括号中，^被用作表达式的否定

//6.贪婪、惰性、支配量词
		//a.贪婪匹配，先看整个字符是否匹配，然后一个个吐出来，直到匹配为止，默认都是贪婪匹配
		//b.懒惰匹配，先看第一个字符是否匹配，能少吃绝不多吃，直接匹配成功为止  {n}?
		//c.支配量词，只尝试匹配整个字符，不匹配不再尝试，一刀切 --- 浏览器不兼容

贪婪							懒惰						支配量			//支配量浏览器不支持
?									??							?+					0或1次
*									*?							*+					0或多次
+									+?							++					0或多次
{n}								{n}?						{n}+				N次
{n, m}						{n,m}?					{n,m}+			n-m次
{n, }							{n,}?						{n,}+				最少n次

/<.+?>/						//匹配<和>内包含的任何一个或多个字符
/<[^<>]+>/				//匹配<和>中包含的一次或多次除<或>以外的任何字符


//7.分组、捕获--存储分组的特殊值  RegExp.$1, RegExp.$2     反向引用 \1  \2
a(bc)								//括号表示一个值为bc的捕获组
a(?:bc)*						//?:禁用捕获组
a(?<foo>bc)					//?<foo>给小组命名 


trim = /^\s*(.*?)\s*$/			// '  abc  '.replace(/^\s*(.*?)\s*$/, '$1')   '  abc  '.replace(/^\s*|\s*$/g, '')

//置换
'1234 5678'.replace(/(\d{4})\s*(\d{4})/, '$2 $1')			//'5678 1234'


reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/	// 分组命名	



//8.非捕获性分组 -- 无需存储开销RegExp.$1, RegExp.$2			存在完整匹配中，只是不在子组中
a(?:bc)*			//禁用捕获组--不保存$1, $2
?!						//排除					
	

//大小字母
/^[A-Za-z]+$/					//全由大、小写字母组合
     
/![A-Za-z]+$/					//不全是大写和小写字母组成

/(?![a-zA-Z]+$)/			//TODO 



//非捕获性分组无法存储
'1234 5678'.replace(/(?:\d{4})\s*(\d{4})/, '$2 $1')	//'$2 5678'


//获取html标签
/<(.*)>.*<\/\1>/

//html处理
//点击 <a href="id">华安地楼</a>
reg = /<a id=["|'](.*?)["|']>(.*?)<\/a>/g     //s1, s2

"<a href='xxx'>地楼</b> >华安</a>".replace(/<(?:.|\s)*?>/g, '')										//去除所有标签

var html = "<p><a href='xxx'>lonve</a></p><hr/><p>by <em>保留指定标签</em></p>";	//排除指定标签		
html.replace(/<(?!hr)(?:.|\s)*?>/ig,"")				//保留hr标签
html.replace(/<(?=a)(?:.|\s)*?>/ig,"")				//去除a标签
html.replace(/style=["|'](*?)["|']/,"")				//去除style样式




//先符合子表达式的条件
//否定断言
//9.前瞻--先行断言											  以(?=reg)子表达式在匹配中用来限制前面表达式的匹配--限制条件
'a1b3c5'.replace(/\w(?=\d)/g, 'xox')								//匹配字符条件跟数字  --a1, b3, c5
'a1b3c5'.replace(/\w(?!\d)/g, 'xox')								//匹配字符条件不跟数字--1b, 2c, 5


str = 'happy happily'
s = str.match(/happ(?=ily)/)											  //获得以 happ 开头的副词--happily
s = str.match(/happ(?!=ily)/)												//过滤所有以 happ 开头的副词, 负前向查找--happ

str = 'abcdefg'
reg = /abc(?=def)/																	//向前先行断言--匹配一个位置，index=3 这个位置的后面就是括号内的子模式
reg1 = /(?=abcdef)abc/															//向后先行断言--找到一个位置后，以这个位置开始匹配



//后瞻--后行断言 ES2018实现								以(?<=reg)符合这个子表达式的位置出发开始查找--限制条件

reg = /<(.*)>.*<\/\1>/

str = '<title>document</title>'
reg = /(?<=<title>).*(?=<\/title>)/				//后行断言(?<=<title>)、先行断言(?=<\/title>)
str.match(reg)

//匹配所有标签、排除
'<div><h2>title</h2><p>content</p></div>'
reg = /(?<=<)[a-z0-9](?=>)/g															 //['div', 'h2', 'p']
reg = /(?<=<)[^<>/](?=>)/g	


//姓名显示第一、最后一个字，其余用星号代替--(断言排除第一个，最后一个字符)

'实打实的'.replace(/(?<=.).(?=.)/g, '*')				//先行断言,  后发断言   '实**的'

nickname.replace(/^(.).+(.|\s)$/, '$1**$2')			//反向引用


str.charAt() + new Array(str.length).join('*') + str.substr(-1)


//将参数转为对象， 对象转参数见--> 数组 Object.keys().map((key)=> k + '=' + params[k])
var url = decodeURI(location.search)
var reg = /([^?=&]+)=([^&]*)/gi, o = {};
url.replace(reg, (str, a, b)=>{
  o[a] = b;
})


var ary = url.match(reg)
var o = ary.reduce((prev, curr)=>{
  var a = curr.split('=')
  //console.log(prev, a)
  prev[a[0]] = a[1];
  return prev
}, {})



//10.其他
//a.边界-- ^, $, \b, \B

//11.
dataURI = 'data:image/png;base64,iVBC'
var type   = dataURI.match(/data:([^;]+)/)[1];			//image/png
var base64 = dataURI.replace(/^[^,]+,/, '');			  //iVBC        [^,]--匹配未包含的任意字符


//12.匹配html标签
var imgReg = /<video.*?(?:>|\/>)/gi									//匹配video标签
var srcReg = /src=['|"]?([^'|"]*)['"]?/i						//匹配video文本中src内容

html.replace(/<(.|\s)*?>/g, '')											//去除html标签
var html = "<p><a href='http://www.cnblogs.com/rubylouvre/'>Ruby Louvre</a>by <em>司徒正美</em></p>";
reg1 = /<(.|\s)*?>/																	//惰性--只匹配最少字符
reg1 = /<(.|\s)+>/g																	//贪婪-匹配全部html


//13 千分位隔符
str = '12345678'
reg = /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g				//str.replace(reg, s => s + ',')			//先行断言需跟(\d{3})+    一个或多个3位数及小数点值

reg = /(\d{1,3})(?=(\d{3})+$)/g							//str.replace(reg, '$1,')

reg = /\B(?=(\d{3})+$)/g


//千分号
var result = val.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/,$/, '').split('').reverse().join('')  //小数点不能匹配

str.replace(/\d{1,3}(?=(\d{3}+(\.\d+)?$))/g, '$1,')								//子条件后面必须跟着三位数或小数


