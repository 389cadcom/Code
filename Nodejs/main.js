var express     = require('express');
var querystring = require('querystring');
var bodyParser  = require('body-parser');
var multipart   = require('connect-multiparty');
var proxy       = require('http-proxy-middleware');

var proxyConfig = require('./proxy.config.js');

var app = express();
app.use(express.static('res'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//注意 * 不能满足带有cookie的访问,Origin 必须是全匹配
//设置跨域访问
app.use(require('cors')());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin",  req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);			//允许带有cookie访问
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

console.log("Env:" + process.env.NODE_ENV);

const createProxySetting = function (url) {
    return {
      target: url,
      changeOrigin: true,
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      onProxyReq: function (proxyReq, req) {
        if (req.method === 'POST' && req.body) {
          const bodyData = querystring.stringify(req.body)
          proxyReq.write(bodyData)
        }
      }
    }
}


//路由
proxyConfig.forEach(item =>{
    console.log(item.url)
    app.get(item.url, proxy(createProxySetting(item.target)));
})

//错误处理
app.get('/users/:id', (req, res)=>{
  const userId = req.params.id;
  if(!userId){
    res.sendStatus(400).json({err: 'Missing id'});
  }

  
  //Users api类
  /* Users.get(userId, (err, user)=>{
    if(err){
      res.sendStatus(500).json(err);
    }
    res.send(user);
  }) */
})
app.get('/api', (req, res)=>{
  var query = req.query;
  console.log(query);
  // res.setHeader("Content-Type", "application/json")
  res.json({api:'get'});
})

//获取multipart/form-data方式传递数据
app.post('/api', multipart(), (req, res)=>{
  var body = req.body;
 // body = querystring.parse(body);
  console.log(body);

  res.send(JSON.stringify({api:'send'}));
})

//流方式
app.post('/post', (req, res)=>{
  var str = "";
  req.on("data",function(chunk){
    str += chunk;
  })
  req.on('end', ()=>{
    console.log(str)
  });
  res.send({name:1})  
})

/*
//下载  输入流
//res.download(path)
let readStream = fs.createReadStream(path); 
res.writeHead(200, {
	'Content-Type': 'application/force-download',
	'Content-Disposition': 'attachment; filename=name.png'
});
readStream.pipe(res);


fs.readFile(__dirname + '/data.txt', function (err, data) {
 res.writeHead(200,{
		 'Content-Type': 'application/octet-stream',
		 'Content-Disposition': 'attachment; filename=data.txt',
		 'Accept-Length': 1024,
 });
 res.end(data);
});
*/


/*----------------------请求头部--10.15--------------*/
//TODO 跨域设置
app.get('/get-cookie', (req, res)=>{
  console.log('get:', req.query)
  req.session.time = Date.now()
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.json({result:'ok'})
})

//Ajax--若header里面包含自定义字段，浏览器是会先发一次options请求
//请求通过，则继续发送正式的post请求，不通过则返回错误 ---  Request header field content-type is not allowed 
app.options('/post', (req, res) => {
  console.log(req.headers)
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization,X-Requested-With");
  res.header('Access-Control-Allow-Credentials', 'true')

  if (req.session.time) {
    res.json({ result: 'ok' })
  } else {
    res.json({ result: 'error' })
  }
})
//正式发送的post请求
app.post('/post', (req, res) => {
  console.log(req.headers['content-type'])
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')

  res.json({ result: 'ok' })
})

//前端设置跨域,请求自动带上cookie
axios.defaults.withCredentials = true

$.ajax({
	url: '',
	type: 'post',
	dataType : 'json',
	crossDomain: true,						//跨域设置
	xhrFields: {									//跨域请求自动带上cookie
		withCredentials: true
	},
	headers: {										//传递json类型参数
		'Accept': "application/json; charset=utf-8",
		'Content-Type':'application/json'
	}
})