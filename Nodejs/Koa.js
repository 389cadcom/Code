//Koa 将其填入Response Header中的Set-Cookie
ctx.cookies.set(name, value, { expires: new Date(Date.now() + 9000), httpOnly: true })
ctx.cookies.set(name, value, { maxAge: 9000, httpOnly: true })

/*
	options设置:
	expires		cookie过期时间，类型为Date
	maxAge		实现expires的功能，设置cookie过期的时间，类型毫秒，优先级高于expires
	signed		cookie 签名值
	path      cookie 路径, 默认是'/'
	domain		cookie 域名
	secure		只能被HTTPS使用, 默认false
	httpOnly	服务器可访问 cookie, 默认是 true
	overwrite 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
*/

//Node原生方法-- 绕过Koa的 response处理是 不被支持
req.method, req.url, 

res.statusCode=404, res.writeHead(), res.setHeader() res.write(), res.end()

/****************************Koa***********************/
/*
	koa:  ctx.request, ctx.response
	node: ctx.req, ctx.res

	koa-router -> router.get('/', (ctx, next)=>{})
*/
app.env, proxy
app.use()
app.keys							//cookie
app.context.db = db()

app.listen											//http.createServer(app.callback()).listen(3000)
app.on('error', (err, ctx)=>{})


ctx.state, 
ctx.app, 
ctx.cookies.get


ctx.header
ctx.is('html'), ctx.get('user-agent'), ctx.accepts(), ctx.acceptsEncodings()
ctx.is('urlencoded')

ctx.headers
ctx.method
ctx.query
ctx.querystring

ctx.url
ctx.originalUrl
ctx.origin
ctx.href
ctx.path
ctx.host
ctx.hostname
ctx.protocol
ctx.ip
ctx.ips
ctx.is()
ctx.get()

ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsCharsets()
ctx.acceptsLanguages()


//ctx.response
ctx.type, ctx.set(), ctx.append(), ctx.remove(), ctx.body, ctx.redirect(), ctx.attachment()

ctx.status=
ctx.length=
ctx.type=
ctx.message=
ctx.headerSent

ctx.body=
ctx.redirect()
ctx.attachment()

ctx.set()
ctx.append()
ctx.remove()
ctx.lastModified=
ctx.etag=

ctx.throw(406, 'json, html, or text only');


/****************************Express***********************/
//1.Node http
    res.writeHead(), setHeader(), res.write(), res.end()
    req.url, method, headers
    
//2.Express响应
	res.statusCode = 200, res.status(200).json({})  
	res.get()                             //获取设置值
	res.set(),  append(), header({})			//向应头
	res.type(), redirect(), cookie()
	res.send(), sendFile(), render(), json(), jsonp(), download(), links()

	sendStatus(200)  === res.status(200).send('ok')
	sendStatus(403)  === res.status(403).send('Forbidden')
	sendStatus(404)  === res.status(404).send('Not Found')
	sendStatus(500)  === res.status(500).send('Internal Server Error')

//3.Express请求 
	req.query, body, params, cookie
	req.host,  hostname/ip, protocol, 
	req.originalUrl = baseUrl + path

	req.is(), get(), accepts(), acceptsEncoding, acceptsLanguages
	req.headers

//cookie
req.cookies,  res.cookie(name, value), res.clearCookie('') | req.signedCookies
req.session. , req.session.destroy(), req.session.key.destroy()
/*
if(req.cookies.islogin){
	req.session.islogin = req.cookies.islogin
}
if(req.session.islogin){
	res.locals.islogin = req.session.islogin;
}
*/