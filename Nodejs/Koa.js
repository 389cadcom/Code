//Koa ��������Response Header�е�Set-Cookie
ctx.cookies.set(name, value, { expires: new Date(Date.now() + 9000), httpOnly: true })
ctx.cookies.set(name, value, { maxAge: 9000, httpOnly: true })

/*
	options����:
	expires		cookie����ʱ�䣬����ΪDate
	maxAge		ʵ��expires�Ĺ��ܣ�����cookie���ڵ�ʱ�䣬���ͺ��룬���ȼ�����expires
	signed		cookie ǩ��ֵ
	path      cookie ·��, Ĭ����'/'
	domain		cookie ����
	secure		ֻ�ܱ�HTTPSʹ��, Ĭ��false
	httpOnly	�������ɷ��� cookie, Ĭ���� true
	overwrite һ������ֵ����ʾ�Ƿ񸲸���ǰ���õ�ͬ���� cookie (Ĭ���� false). ����� true, ��ͬһ��������������ͬ���Ƶ����� Cookie������·�������Ƿ������ô�Cookie ʱ�� Set-Cookie ��ͷ�й��˵���
*/

//Nodeԭ������-- �ƹ�Koa�� response������ ����֧��
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
    
//2.Express��Ӧ
	res.statusCode = 200, res.status(200).json({})  
	res.get()                             //��ȡ����ֵ
	res.set(),  append(), header({})			//��Ӧͷ
	res.type(), redirect(), cookie()
	res.send(), sendFile(), render(), json(), jsonp(), download(), links()

	sendStatus(200)  === res.status(200).send('ok')
	sendStatus(403)  === res.status(403).send('Forbidden')
	sendStatus(404)  === res.status(404).send('Not Found')
	sendStatus(500)  === res.status(500).send('Internal Server Error')

//3.Express���� 
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