/*
                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
http://user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----  ---------  --------   ---- -------- ------------- -----
protocol     auth  hostname   port pathname  search|query     hash


node½âÎö£º
		   url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
              querystring.parse(queryString)["foo"]    |
                                            |
                         querystring.parse(queryString)["hello"]
*/



headers{
  host: 'localhost:3000',
  connection: 'keep-alive',
  pragma: 'no-cache',
  'cache-control': 'no-cache',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
  'accept-encoding': 'gzip, deflate, sdch',
  'accept-language': 'zh-CN,zh;q=0.8',
  cookie: 'SID=s%3AwbtOKr7pp5GD8vZztL6pGvgOAzg1LTQH.BwM%2BgWVfVZ%2B0eJQn1akr%2Bz%2BR5Ve8Y%2FhqQtdtZgJg%2FV8' 
}

Request{
    Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/;q=0.8
	Accept-Encoding:gzip, deflate, sdch
	Accept-Language:zh-CN,zh;q=0.8
	Cache-Control:no-cache
	Connection:keep-alive
	Cookie:SID=s%3AwbtOKr7pp5GD8vZztL6pGvgOAzg1LTQH.BwM%2BgWVfVZ%2B0eJQn1akr%2Bz%2BR5Ve8Y%2FhqQtdtZgJg%2FV8
	Host:localhost:3000
	Pragma:no-cache
	Upgrade-Insecure-Requests:1
	User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36
}