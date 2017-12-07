/*
express -e --css=sass

1.�����м����ӦHTTP����
2.����·��ִ�в�ͬ��HTTP����
3.ͨ����ģ�崫�ݲ�������̬��ȾHTMLҳ��
*/

//Router	-->	  roter = express.Router()
router.METHOD()			//get, post, put
router.all()
//router.param()		//v4.11���ã�·�����ò���
router.route()
router.use()			//·���м��



//Application
app.locals				//���Ծ��ǳ��򱾵صı���, ���ᴩ�����������������
app.mountPath			//req.app.locals  res.locals ����ֻ����������������������Ч

admin.on('mount', app=>{ }) //�¼�

app.all(path,callback[,callback...])  //����·����֤��next()
app.use					//ʹ���м��
app.route				//����ͬһ��·�����·��ʵ��, ��ʽ�ṹ
app.post
app.get
app.param				//��·�ɲ�����ӻص�������  'users/:id' --> param('id')

app.set()				//env, trust proxy, view, view engine
app.get()
app.enable()/disable   //����app.set('foo', false)�͵���app.disable('foo')�ǵȼ� 
app.enabled()/disabled


app.render()			//��ȾHTML(ģ��)��ͼ����res.render()�ڲ���ʹ�õ�app.render()����Ⱦ��ͼ
app.engine()			//ע��ģ������	app.engine('.html', ejs.renderFile);  ������ejs.__express�ı���
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


//Request  url, 
req.app
req.route
req.subdomains			//����������������
req.fresh - req.stale

req.params
req.query
req.body

req.cookie
req.protocol
req.hostname / req.ip

req.originalUrl			//��req.baseUrl��req.path���
req.baseUrl				//·��ʵ�����ص�Url
req.path

req.is()				//MIME type
req.get()				//��ȡָ������ͷ��
req.accepts()			//HTTPͷ��,ָ�������������Ƿ񱻽���
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages

//Response
res.app
res.locals				//����
	
res.set()				//����httpͷ���ֶ�, ����֮ǰ���õ�ͷ
res.append()			//׷��ָ��HTTPͷ
res.get()				//��ȡָ��
res.location()			//ֻ������Ӧ��Location HTTPͷ��������״̬�����close response
res.redirect()			//��Ӧ��Location HTTPͷ����������״̬��302
res.download()
res.type()				//����Content-Type��MIME����

res.cookie()			//domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()

res.json()
res.jsonp()

res.send()
res.sendFile()
res.status()
res.sendStatus()
res.render()
res.end()

res.format()
res.links()
