/*
  module.exports ��ʼֵΪһ���ն��� {}
  exports ��ָ��� module.exports������
  exports ��module.exports���ı��ʧЧ
  require() ���ص���module.exports ������ exports
*/

//1.ȫ�ֶ���
process: env.Path, argv, cwd(), module.exports, exports.x
	process.stdin.resume() | pause, //setEncoding
	process.stdout.write()					//stdin.on('data'),  end

//2.Buffer������, ʮ�������������� 0x41,  ����: utf8, ascii, hex, base64  String.fromCharCode(122), charCodeAt()
Buffer.from, 
alloc(size, fill), 

//������������д�뻺����  write, slice, concat, compare
var buf = Buffer.alloc(255)
buf.write(str, offset, len)			  //����д���ַ���


//3.util������    ԭ�ͼ̳�--prototype
inherits, inspect, log, _extend, promiseify

//4.url		{URL, URLSearchParams }
parse, format, resolve, resolveObject
//-->����URL  url.parse(url, true)��ʽ��query����


//querystring	-->����URL��������   //encodeURI, decodeURI
parse(url, '=', '&'), stringify(obj, '=', '&'), decode, encode, escape


//path			-->�����ļ�·�� parse --> {root, dir, base, ext, name}
path.join, path.resolve, normalize, parse, format

dirname, basename, extname
//����sep, delimiter, posix, win32


//����ģ��os, path, net, dns, domain 
//http://www.runoob.com/nodejs/nodejs-utitlity-module.html


//Stream
	fs.createReadStream(path, opts), fs.createWriteStream(path, {flag, encoding, fd, mode})


//�ļ���ȡ
fs:			//node-xlsx
	readFile(url, encoding, cb), writeFile(url, data, {encoding:'utf8'}, cb)	//���ļ��������뻺����

	r: read(fd, buf, 0, buf.length, 0, (err, bytes)={}) 	//���ϵؽ��ļ��е�һС�����ݶ��뻺����--buffer
	w: write()
	fs.open(path, 'flag', (err, fd)=>{})
	close, mkdir, readdir, rmdir

	exists, unlink, stat

//��:
	fs.open('./res/note.txt', 'r', (err, fd)=>{								//r, r+ �ļ������������쳣  w�ļ��������򱨴�
		var buf = Buffer.alloc(200)
		//��ȡfd�ļ����ݵ�buf������
		fs.read(fd, buf, 0, buf.length, 0, (err, len, bytes)=>{ //fd ���ļ��ı�ʶ
		
		})
	})
	
	fs.open('./res/note.txt', 'a', (err, fd)=>{
    fs.writeFile(fd, 'node.js\r\n', (err)=>{
        console.log(err);
    })
  })

//Web
http:		
	createServer -> get, post����

	1.Request:							//switch(params.pathname)
		�¼�: 'data', 'end', 'drain'												
		����: req.url, req.method, req.headers 
					params = url.parse(req.url, true).query		//get ��ʽ

					req.on('data', chunk => {									//post��ʽ--��������д���˻�����buffer, ����д�봥��data, ��ȫ����end
						body += chunk
					})
					req.on('end', ()=>{
						params = qs.parse(body)
					})

	2.Response: 
		������setHeader, res.writeHead(200, {}), res.write(), res.end()

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