//Buffer
Buffer.from()


//util
inherit, inspect, log, _extend

//url			-->解析URL  url.parse(url, true)格式化query内容
parse, format, resolve, resolveObject


//querystring	-->解析URL参数内容
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


http:		
	createServer, get -> request

	//Request: url, method, headers

	//Response: writeHead, write, end

express