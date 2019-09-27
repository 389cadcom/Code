/*
express -e --css=sass

1.�����м����ӦHTTP���� (ע���м���ǰ�˳����أ��ھ�̬��Դ�м��֮�������־�м�����������رվ�̬��Դ�������־)
2.����·��ִ�в�ͬ��HTTP����
3.ͨ����ģ�崫�ݲ�������̬��ȾHTMLҳ��

node����·��������
obj = url.parse(req.url, true); query = qs.parse(obj.query)
if('/api/get' == obj.pathname)
*/

//Router	-->	  roter = express.Router() ����ģ�黯���ɹ��ص�·�ɾ��
router.METHOD()			//get, post, put...
router.all()
//router.param()		//v4.11���ã�·�����ò���
router.route()
router.use()			//·��ʹ���м��



//Application
app.locals				//���Ծ��ǳ��򱾵صı���, ���ᴩ����������������ڣ� req.app.locals  
app.mountPath			//�ӳ������·��ģʽ

admin.on('mount', app=>{ }) //�¼�

app.all(path,callback[,callback...])  //����·����֤��next()
app.use					//ʹ���м����
app.route				//����ͬһ��·�����·��ʵ��, ��ʽ�ṹ
app.post
app.get
app.param				//��·�ɲ�����ӻص�������  'users/:id' --> param('id')

app.set()				//env, trust proxy, view, view engine
app.engine()			//ע��ģ������ 1.app.set('views', )	2.app.engine('.html', ejs.renderFile); ��ejs.__express�ı���; 3.app.set('view engine', 'html')
app.get()

app.enable()/disable    //����app.set('foo', false)�͵���app.disable('foo')�ǵȼ� 
app.enabled()/disabled

app.render()			//��ȾHTML(ģ��)��ͼ����res.render()�ڲ���ʹ�õ�app.render()����Ⱦ��ͼ
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


//Request ->  url, method, headers�̳���Node http --> EventEmitter
req.app
req.route
req.subdomains			//����������������
req.fresh - req.stale	//����״̬

req.params
req.query
req.body

req.cookie
req.signedCookies

req.protocol
req.hostname / req.ip
req.host

req.baseUrl				//·��ʵ�����ص�Url				route.get('/', fn) -> app.use('/route', route)  ==> /route
req.path
req.originalUrl			//��req.baseUrl��req.path���

req.is()				//Content-Type�Ĳ���type������MIME type
req.get()				//��ȡָ������ͷ��
req.accepts()			//HTTPͷ��,ָ�������������Ƿ񱻽���
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages


//Response��Ӧ����		writeHead, setHeader, write, end�̳���Node http
res.app
res.locals				//ֻ����������������������Ч����ͼ��Ⱦ��ʹ��
	
res.header()
res.set()				    //����httpͷ���ֶ�, ����֮ǰ���õ�ͷ
res.append()			  //׷��ָ��HTTPͷ
res.get()				    //��ȡָ��
res.location()			//ֻ������Ӧ��Location HTTPͷ��������״̬�����close response

res.redirect()			//�ض�����Ӧ��Location HTTPͷ����������״̬��302
res.type()					//����Content-Type��MIME����

res.cookie()			//domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()

res.render()			//��Ⱦ��ͼģ��  path, locals, cb
res.send()
res.sendFile()			//�������HTML�ļ�  path.resolve(), options, cb
res.status()			//res.status(200).json({})
res.sendStatus()
res.json()				//����JSOP��Ӧ��res.status(500).json({err:'message'})
res.jsonp()
res.download()			//�����ļ�
res.end()


res.format()
res.links()


//�����м��
�����м��:		express.static()
Ӧ���м��:		app.use()		//next('route');
·���м��:		route.use()		//��·�ɹ�����Ӧ��
�����м��:		(err, req, res, next)	//�������м��������4������
�������м��