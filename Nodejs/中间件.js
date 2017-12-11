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