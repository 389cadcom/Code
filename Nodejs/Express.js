/*
express -e --css=sass

1.设置中间件响应HTTP请求 (注：中间件是按顺序加载，在静态资源中间件之后加载日志中间件，这样来关闭静态资源请求的日志)
2.定义路由执行不同的HTTP请求
3.通过向模板传递参数来动态渲染HTML页面

node请求路径解析：
obj = url.parse(req.url, true); query = qs.parse(obj.query)
if('/api/get' == obj.pathname)
*/

//Router	-->	  roter = express.Router() 创建模块化、可挂载的路由句柄
router.METHOD()			//get, post, put...
router.all()
//router.param()		//v4.11弃用，路由配置参数
router.route()
router.use()			//路由使用中间件



//Application
app.locals				//属性就是程序本地的变量, 将贯穿程序的整个生命周期， req.app.locals  
app.mountPath			//子程序挂载路径模式

admin.on('mount', app=>{ }) //事件

app.all(path,callback[,callback...])  //所有路径验证，next()
app.use					//使用中间件，
app.route				//避免同一个路径多个路由实例, 链式结构
app.post
app.get
app.param				//给路由参数添加回调触发器  'users/:id' --> param('id')

app.set()				//env, trust proxy, view, view engine
app.engine()			//注册模板引擎 1.app.set('views', )	2.app.engine('.html', ejs.renderFile); 是ejs.__express的别名; 3.app.set('view engine', 'html')
app.get()

app.enable()/disable    //调用app.set('foo', false)和调用app.disable('foo')是等价 
app.enabled()/disabled

app.render()			//渲染HTML(模板)视图；在res.render()内部，使用的app.render()来渲染视图
app.params()
app.path()				//req.baseUrl
app.listen()			//(port, [hostname], [backlog], [callback])
/*
app.listen = function() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
};
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
*/


//Request ->  url, method, headers继承自Node http --> EventEmitter
req.app
req.route
req.subdomains			//域名的子域名数组
req.fresh - req.stale	//请求状态

req.params
req.query
req.body

req.cookie
req.signedCookies

req.protocol
req.hostname / req.ip
req.host

req.baseUrl				//路由实例挂载的Url				route.get('/', fn) -> app.use('/route', route)  ==> /route
req.path
req.originalUrl			//是req.baseUrl和req.path组合

req.is()				//Content-Type的参数type给定的MIME type
req.get()				//获取指定请求头部
req.accepts()			//HTTP头部,指定的内容类型是否被接受
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages


//Response响应请求		writeHead, setHeader, write, end继承自Node http
res.app
res.locals				//只在这次请求的生命周期中有效，视图渲染中使用
	
res.header()
res.set()				    //设置http头部字段, 重置之前设置的头
res.append()			  //追加指定HTTP头
res.get()				    //获取指定
res.location()			//只设置响应的Location HTTP头，不设置状态码或者close response

res.redirect()			//重定向，响应的Location HTTP头，并且设置状态码302
res.type()					//设置Content-Type的MIME类型

res.cookie()			//domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()

res.render()			//渲染视图模板  path, locals, cb
res.send()
res.sendFile()			//对外输出HTML文件  path.resolve(), options, cb
res.status()			//res.status(200).json({})
res.sendStatus()
res.json()				//发送JSOP响应，res.status(500).json({err:'message'})
res.jsonp()
res.download()			//下载文件
res.end()


res.format()
res.links()


//五种中间件
内置中间件:		express.static()
应用中间件:		app.use()		//next('route');
路由中间件:		route.use()		//将路由挂载至应用
错误中间件:		(err, req, res, next)	//错误处理中间件必需有4个参数
第三方中间件