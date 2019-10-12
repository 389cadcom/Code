/* 
解析:
url.parse(href)
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
│  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash │
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

参数解析:
querystring.stringify({age:1, name:'yu'})
querystring.parse('age=1&name=yu')
*/


/*
 req.headers,  req.get('accept')

 */
//cookie, 安全、传输、缓存、客户端、实体、杂项
Request { 
	host: 'localhost:3000',
  connection: 'keep-alive',

  'cache-control': 'max-age=0',
  'upgrade-insecure-requests': '1',
  'user-agent':
   'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.8,application/signed-exchange;v=b3',
  'sec-fetch-site': 'none',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'if-none-match': 'W/"cf-sMq3uu/Hzh7Qc54TveG8DxiBA2U"' 
}
Cookie: access=WX--oy4fd0rnjn86yEOECio0MnmzxJrM; phone=13275015015; JSESSIONID=160C45297F012EA9705FCF6CA4052919

//安全
Upgrade-Insecure-Requests: 1
Origin: http://wx.hfsic.com

//传输
Host: wx.hfsic.com
Connection: keep-alive

//客户端
User-Agent:  MicroMessenger/6.7.3.1360(0x2607033D) NetType/WIFI Language/zh_CN Process/tools
Accept: application/xml;q=0.9,image/webp,image/apng,image/wxpic,image/sharpp,image/apng,image/tpg,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,en-US;q=0.9

//缓存
If-None-Match: "5d9c3fab-331"
If-Modified-Since: Tue, 08 Oct 2019 07:50:03 GMT

//实体
Content-Length: 0
Content-Type: application/x-www-form-urlencoded

//杂项
accessToken: 7798687e-798a-404e-89fc-64b5e5cc31c8
nonce: nCas4NhsMqrAdiKX5HR61D8Ps5bDMXLd
timestamp: 1570583569049
sign: F2D5A86703782FAD7C9B190BA198BC31
Referer: http://wx.hfsic.com/special


/**
	res.writeHeads(200, {}), res.setHead()
	res.set(multi), res.header(), res.append(), res.type()

	res.header("Access-Control-Allow-Origin",  req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);			
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
*/
//安全、传输、缓存、实体、杂项
Response {
	Connection: keep-alive
	'Content-Length': 5
	'Content-Type': application/json; charset=utf-8
	Date: Wed, 09 Oct 2019 01:19:05 GMT
	ETag: W/"5-5UDN0TKLKyHimpVAXDAbkxO3w0Y"
	'X-Powered-By': Express
}
//安全
Access-Control-Allow-Origin: http://wx.hfsic.com
Access-Control-Allow-Credentials: true								//可以带cookies
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff

//传输
Transfer-Encoding: chunked
Connection: keep-alive

//缓存
Date: Wed, 09 Oct 2019 01:12:46 GMT
Expires: 0
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Vary: Origin
Vary: Access-Control-Request-Method
Vary: Access-Control-Request-Headers

//实体
Content-Type: application/json;charset=UTF-8
'Content-Length': 5

//杂项
Server: nginx/1.13.3

