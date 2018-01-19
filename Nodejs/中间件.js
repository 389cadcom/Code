//解析
body-parser:
	bodyParser.json();						//application/json
	bodyParser.urlencoded({extend: false})	//application/x-www-form-urlencoded

//注：https://github.com/expressjs/body-parser
busboy and connect-busboy
multiparty
connect-multiparty							//multipart/form-data  formData.append();
formidable
multer										//multipart/form-data 上传数据 req.files


//node常用模块
fs-extra        //fs-promise丢用
iconv-lite      //中文解码
content-type    //headers类型处理
 
sqlite3
sqlite          //ES7 + sqlite
mysql
mongoose
 
markdown
excel-parser    //node读取excel
ejsexcel        //.xls读取不了
node-xlrd