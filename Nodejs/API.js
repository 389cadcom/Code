//Buffer
Buffer.from()


//util
inherit, inspect, log, _extend

//url			-->����URL  url.parse(url, true)��ʽ��query����
parse, format, resolve, resolveObject


//querystring	-->����URL��������
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


http:		
	createServer, get -> request

	//Request: url, method, headers

	//Response: writeHead, write, end

express