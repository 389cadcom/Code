//1.同源策略限制
协议、域名、端口其中一个不相同，就属于跨域
不能获取Cookie、LocalStorage; 不能获取DOM节点; 不能进行一般Ajax通信

//2.JSONP跨域--动态加载script标签来完成目标url的请求，不好确认是否请求失败，script 标签的 onerror 事件还未得到浏览器广泛的支持
script, img, iframe标签不受同源策略限制

//3.CORS 跨域-- 与后端进行 Ajax 通信时, 通过自定义 HTTP 头部设置从而决定请求或响应是否生效
{
	'Access-Control-Allow-Origin':'http://localhost:8081',
	'Access-Control-Allow-Credentials': 'true'							//withCredentials: true
}


//ajax与浏览的get请求, 浏览器会添加默认的请求头 'text/html, application/xhtml+xml; q=0.9,image/webp'
var xhr = new XMLHttpRequest();
xhr.open('post', 'http://127.0.0.1');
xhr.setRequestHeader("Content-type", "application/json");
var data = {id:5, name: "yin"};
xhr.send(JSON.stringify(data));

xhr.send('name=yufeng&age=20');

//FormData
var form = $('form')[0];
var formData = new FormData(form);
formData.append("id", 5);
xhr.send(formData)

//jq--前端
$.ajax({
	url: 'http://127.0.0.1',
	method:'post',
	headers: {
		'Accept': "application/json; charset=utf-8",
		'Content-Type':'application/json', 
	},
	contentType: 'application/json',
	data: JSON.stringify({name:'yufeng'}),
	dataType: 'json',
	success: function(){
		
	}
})


//报文格式 (Fiddler抓包--Inspector Raw选项)
//1.请求报文格式
方法 URL HTTP/版本号
请求首部字段...

body(post请求参数方式)

//2.响应报文格式
HTTP/版本号 状态码 状态描述
响应首部字段...

body

//安全、传输、客户端、缓存、实体、杂项
req.get('accept')
res.writeHeads(200, {}), res.setHeader()

res.set(), res.header(), res.append(), res.type()


//Eg: https://www.tuicool.com/articles/uuUb6ja
//Request Headers 请求首部字段
accept							   	// 客户端能够处理的媒体类型		text/html
accept-charset	 				// 客户端能够支持的字符集		GB2312
accept-encoding 				// 客户端能够支持的内容编码格式  gzip, deflate
accept-language 				// 客户端能够支持的语言	        zh-cn, en
user-angent				 			// 发起请求的浏览器和代理名称等信息发送给服务端	navigator.userAgent

referer							   	// 请求是从哪个页面发起的		document.referer
X-Requested-With 				// ajax请求

//Response Headers 响应首部字段
Accept-Ranges 					// 告知客户端自己能够处理范围请求: bytes, none
age								   		// 告知客户端，源服务器（而不是缓存服务器）在多久之前创建了响应
etag							   		// 实体资源的标识
server							 		// 当前使用的HTTP服务器应用程序的相关信息

//实体首部字段
allow
content-encoding				//告知客户端，服务器对资源内容的编码
content-language				//告知客户端，服务器对资源使用的自然语言
content-length					//告知客户端资源长度
content-type						//告知客户资源的媒体类型
expries									//告知客户端资源的失效日期。可用于对缓存的处理
last-modifies						//告知客户端资源最后一次修改的时间。

//通用报文字段
date										//创建HTTP报文日期和时间
cache-control						//控制缓存行为 max-age=2592000 --> 60*60*24*30
connection							//管理持久连接，设置其值为Keep-Alive可实现长连接。
Transfer-Encoding				//规定了传输报文主题时使用的传输编码，如Transfer-Encoding: chunked

//响应状态码
xhr.status >=200 && xhr.status < 300 || xhr.status == 304

//3开头的重定向, 浏览器会自动重定向
301		永久重定向
302		资源暂时转移  //短链接转长链接
304		没有修改，引用本地缓存
307		临时重定向

//客户端错误
400		请求无效--参数缺失、参数格式无效
401		没有认证，没有登陆验证之类的错误
403		禁止/拒绝服务--如：不允许访问某个目录
404		文件不存在

//服务端错误
500		内部服务器出错
502		网关错误
504		网关超时
	
600		服务器没有返回响应头部，只返回实体内容(不太常用的状态码)