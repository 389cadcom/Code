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

//设置跨域访问
app.use(require('cors')());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin",  req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
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

var server = app.listen(3000, '10.206.16.118', ()=>{
    var address = server.address().address;
    var port    = server.address().port;

    console.log("地址: %s:%s", address, port);
})