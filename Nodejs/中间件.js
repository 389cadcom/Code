//解析
body-parser:
	bodyParser.json();											//application/json
	bodyParser.urlencoded({extend: false})	//application/x-www-form-urlencoded

//注：https://github.com/expressjs/body-parser
busboy and connect-busboy
multiparty
connect-multiparty							//multipart/form-data  formData.append();
formidable
multer													//multipart/form-data 上传数据 req.files


//node常用模块
fs-extra        //fs-promise丢用
iconv-lite      //中文解码
content-type    //headers类型处理 ContentType.parse(req.headers['content-type']);
jschardet				//识别编码   jschardet.detect(buf)
 
sqlite3
sqlite          //ES7 + sqlite
mysql
mongoose
 
markdown
excel-parser    //node读取excel  
ejsexcel        //.xls读取不了
node-xlsx
node-xlrd




Express 3									Express 4
express.bodyParser				body-parser + multer
express.compress					compression
express.cookieSession			cookie-session
express.cookieParser			cookie-parser
express.logger						morgan
express.session						express-session
express.favicon						serve-favicon
express.responseTime			response-time
express.errorHandler			errorhandler
express.methodOverride		method-override
express.timeout						connect-timeout
express.vhost							vhost
express.csrf							csurf
express.directory					serve-index
express.static						serve-static