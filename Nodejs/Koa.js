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

//Node原生方法
req.method, req.url, req.

res.statusCode, res.writeHead(), res.setHeader() res.write(), res.end()

/****************************Koa***********************/
//Node: crx.req, ctx.res.on('data'),  ctx.request.body

ctx.header
ctx.is('html'), ctx.get('user-agent'), ctx.accepts(), ctx.acceptsEncodings()
ctx.is('urlencoded')

ctx.hostname, ctx.host, ctx.origin, ctx.ip, ctx.protocol, socket
ctx.path, ctx.href, ctx.url

ctx.query, ctx.querystring, ctx.params


//ctx.response
ctx.type, ctx.set(), ctx.append(), ctx.remove()
ctx.status, ctx.langth, 

ctx.body, ctx.redirect(), ctx.attachment()

//cookie   Koa 将其填入Response Header中的Set-Cookie
ctx.cookies.get, ctx.cookies.set

ctx.throw(406, 'json, html, or text only');



/****************************Express***********************/
req.protocol, req.host, req.hostname, req.path

req.headers, req.get, req.accepts(), 

req.query, req.body. req.params

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

res.header(), res.set(), res.append(), res.type()

res.status(200)
res.send(), res.sendFile(), res.render(), res.json(), res.attachment(), res.download()