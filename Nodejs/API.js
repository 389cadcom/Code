1.process: env, argv, cwd()

//Buffer������
Buffer.from, alloc, write, slice, concat, compare
 //������������д�뻺����

//util
inherit, inspect, log, _extend

//url			-->����URL  url.parse(url, true)��ʽ��query����
parse, format, resolve, resolveObject


//querystring	-->����URL��������   //encodeURI, decodeURI
parse(url, '=', '&'), stringify(obj, '=', '&'), decode, encode, escape


//path			-->�����ļ�·�� parse --> {root, dir, base, ext, name}
join, normalize, parse, format

dirname, basename, extname
//����sep, delimiter, posix, win32


//����ģ��os, path, net, dns, domain 
//http://www.runoob.com/nodejs/nodejs-utitlity-module.html


//Stream
	fs.createReadStream(path, opts), fs.createWriteStream(path, {flag, encoding, fd, mode})


//�ļ���ȡ
fs:			//node-xlsx
	readFile(url, encoding, cb), writeFile(url, data, {encoding:'utf8'}, cb)	//�ļ��������뻺����

	read, write, ,											//���ϵؽ��ļ��е�һС�����ݶ��뻺����--buffer

	open, close, mkdir, readdir, rmdir

	exists, unlink, stat

//��:
	fs.read(fd, buf, 0, buf.length, 0, (err, bytes)=>{}
	fs.open('./res/note.txt', 'a', (err, fd)=>{
    fs.writeFile(fd, 'node.js\r\n', (err)=>{
        console.log(err);
    })
  })

//Web
http:		
	createServer -> get, post����

	1.Request: 
		�¼�: req.data, req.end
		����: req.url, req.method, req.headers
					params = url.parse(req.url, true).query

	2.Response: 
		������res.setHeader(), res.write(), res.end()

express
  req.params, req.query, req.body,



//demo-http
const http = require('http')
const fs = require('fs')
const url  = require('url')
const qs   = require('querystring')

var dir = __dirname + '/html'

const server = http.createServer(); 
server.on('request', (req, res)=>{
  if(req.url == '/favicon.ico') return;

  res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
  let params = url.parse(req.url, true)

  //TODO url.parse(req.url, true)
  var obj = {
    prototol: 'http',
    host: 'localhost:3000',
    port: '3000',
    hostname: 'localhost',
    auth: null,
    hash: null,
    search: null,
    query: {},
    path: '/',
    pathname: '/',
    href: 'http://localhost:3000/'
  }

  switch(params.pathname){
    case '/':
      res.end('Hello')
      break
    case '/index':
      sendHTML(dir + '/index.html', req, res);
      break;
    case '/login':
      sendHTML(dir + '/login.html', req, res);
      break;
    case '/login/check':
      if(req.method.toUpperCase() === 'POST'){
        var str = ''
        //��ȡpost����
        req.on('data', chunk => {
          str += chunk
        })
        req.on('end', ()=>{
          var query = qs.parse(str)
          console.log(query);
          res.write('Post:')
          res.end(str)
        })
      }else{
        var query = params.query
        console.log(query);
        res.write('Get:')
        res.end(params.search + ' ' + JSON.stringify(params.query))
      }
      break;
  }
})
function sendHTML(path, req, res){
  fs.readFile(path, (err, data)=>{
    if(err){
      res.writeHead(404, {'content-type': 'text/html;charset=utf8'})
      res.write('ҳ���Ҳ���');
      res.end()
      return;
    }
    res.write(data);
    res.end();
  })
}

server.on('error', function(err){
  console.log(err);
});

server.listen(3000, 'localhost')
console.log("Server runing 3000");