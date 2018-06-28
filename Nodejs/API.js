//Buffer缓存区
Buffer.from, alloc, write, slice, concat, compare
 //创建缓冲区，写入缓冲区

//util
inherit, inspect, log, _extend

//url			-->解析URL  url.parse(url, true)格式化query内容
parse, format, resolve, resolveObject


//querystring	-->解析URL参数内容   //encodeURI, decodeURI
parse(url, '=', '&'), stringify(obj, '=', '&'), decode, encode, escape


//path			-->解析文件路径 parse --> {root, dir, base, ext, name}
join, normalize, parse, format

dirname, basename, extname
//属性sep, delimiter, posix, win32

//console
log, info, warn, error, dir, time, timeEnd, trace, assert

//module
id, exports, parent, child, loaded


//工具模块os, path, net, dns, domain 
//http://www.runoob.com/nodejs/nodejs-utitlity-module.html


//Buffer

//Stream


fs:
	createReadStream(url).pipe(), createWriteStream

	readFile(url, encoding, cb), writeFile(url, data, cb)

	open, close, mkdir, readdir, rmdir

	read, write, unlink, 

//例:
	fs.read(fd, buf, 0, buf.length, 0, (err, bytes)=>{}
	fs.open('./res/note.txt', 'a', (err, fd)=>{
    fs.writeFile(fd, 'node.js\r\n', (err)=>{
        console.log(err);
    })
  })

http:		
	createServer -> get, post请求

	//Request: url, method, headers
	params = url.parse(req.url, true).query

	//Response: writeHead, write, end

	//req.data, req.end事件

express
  req.params, req.query, req.body,