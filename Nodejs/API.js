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

//console
log, info, warn, error, dir, time, timeEnd, trace, assert

//module
id, exports, parent, child, loaded


//����ģ��os, path, net, dns, domain 
//http://www.runoob.com/nodejs/nodejs-utitlity-module.html


//Buffer

//Stream


fs:
	createReadStream(url).pipe(), createWriteStream

	readFile(url, encoding, cb), writeFile(url, data, cb)

	open, close, mkdir, readdir, rmdir

	read, write, unlink, 

//��:
	fs.read(fd, buf, 0, buf.length, 0, (err, bytes)=>{}
	fs.open('./res/note.txt', 'a', (err, fd)=>{
    fs.writeFile(fd, 'node.js\r\n', (err)=>{
        console.log(err);
    })
  })

http:		
	createServer -> get, post����

	//Request: url, method, headers
	params = url.parse(req.url, true).query

	//Response: writeHead, write, end

	//req.data, req.end�¼�

express
  req.params, req.query, req.body,