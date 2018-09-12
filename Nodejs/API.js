/*
  module.exports 初始值为一个空对象 {}
  exports 是指向的 module.exports的引用
  exports 在module.exports被改变后，失效
  require() 返回的是module.exports 而不是 exports
*/

//1.全局对象
process: env.Path, argv, cwd(), module.exports, exports.x
	process.stdin.resume() | pause, //setEncoding
	process.stdout.write()					//stdin.on('data'),  end

//2.Buffer缓存区, 十六进制整数数组 0x41,  编码: utf8, ascii, hex, base64  String.fromCharCode(122), charCodeAt()
Buffer.from, 
alloc(size, fill), 

//创建缓冲区，写入缓冲区  write, slice, concat, compare
var buf = Buffer.alloc(255)
buf.write(str, offset, len)			  //返回写入字符长


//3.util常工具    原型继承--prototype
inherits, inspect, log, _extend, promiseify

//4.url		{URL, URLSearchParams }
parse, format, resolve, resolveObject
//-->解析URL  url.parse(url, true)格式化query内容


//querystring	-->解析URL参数内容   //encodeURI, decodeURI
parse(url, '=', '&'), stringify(obj, '=', '&'), decode, encode, escape


//path			-->解析文件路径 parse --> {root, dir, base, ext, name}
path.join, path.resolve, normalize, parse, format

dirname, basename, extname
//属性sep, delimiter, posix, win32


//工具模块os, path, net, dns, domain 
//http://www.runoob.com/nodejs/nodejs-utitlity-module.html


//Stream
	fs.createReadStream(path, opts), fs.createWriteStream(path, {flag, encoding, fd, mode})


//文件读取
fs:			//node-xlsx
	readFile(url, encoding, cb), writeFile(url, data, {encoding:'utf8'}, cb)	//将文件完整读入缓存区

	r: read(fd, buf, 0, buf.length, 0, (err, bytes)={}) 	//不断地将文件中的一小块内容读入缓存区--buffer
	w: write()
	fs.open(path, 'flag', (err, fd)=>{})
	close, mkdir, readdir, rmdir

	exists, unlink, stat

//例:
	fs.open('./res/note.txt', 'r', (err, fd)=>{								//r, r+ 文件不存在则发生异常  w文件不存在则报错
		var buf = Buffer.alloc(200)
		//读取fd文件内容到buf缓存区
		fs.read(fd, buf, 0, buf.length, 0, (err, len, bytes)=>{ //fd 打开文件的标识
		
		})
	})
	
	fs.open('./res/note.txt', 'a', (err, fd)=>{
    fs.writeFile(fd, 'node.js\r\n', (err)=>{
        console.log(err);
    })
  })

//Web
http:		
	createServer -> get, post请求

	1.Request:							//switch(params.pathname)
		事件: 'data', 'end', 'drain'												
		属性: req.url, req.method, req.headers 
					params = url.parse(req.url, true).query		//get 方式

					req.on('data', chunk => {									//post方式--请求数据写在了缓存区buffer, 数据写入触发data, 完全触发end
						body += chunk
					})
					req.on('end', ()=>{
						params = qs.parse(body)
					})

	2.Response: 
		方法：setHeader, res.writeHead(200, {}), res.write(), res.end()

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
        //读取post数据
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
      res.write('页面找不到');
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