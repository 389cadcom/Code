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

//Nodeԭ������
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

//cookie   Koa ��������Response Header�е�Set-Cookie
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