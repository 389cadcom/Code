//H5 --ie 10+    enctype="multipart/form-data"
fd = new FormData($('form')[0])

fd = new FormData()
fd.append('photo', file)
var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
var blob = new Blob([content], { type: "text/xml"});
fd.append(blob)

var request = new XMLHttpRequest();
request.open("POST", "http://foo.com/submitform.php");
request.send(formData);

fr = new FileRender();
fr.readAsDataURL(file)
fr.onload = function(e){
	var url = this.result	//e.target.result
}


//Response Header
Access-Control-Allow-Headers: Content-Type,Accept
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Encoding: gzip
Content-Type: application/json;charset=UTF-8
Date: Thu, 17 May 2018 13:10:58 GMT
Set-Cookie: JSESSIONID=D2B90AFDDA082482979C48263A365350; Path=/; HttpOnly
Strict-Transport-Security: max-age=31536000
Transfer-Encoding: chunked
Vary: Accept-Encoding

//Request Header
Accept: */
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 2783
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryRtH44EPPALGuzNue
Cookie: JSESSIONID=9502FB067889B110CC2589E85BE8A670
Host: browser.server.nubia.cn
Origin: http://browser.server.nubia.cn
Referer: http://browser.server.nubia.cn/submit.html
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1
X-Requested-With: ajax


//Request Payload    
------WebKitFormBoundaryRtH44EPPALGuzNue
Content-Disposition: form-data; name="content"

afafa
------WebKitFormBoundaryRtH44EPPALGuzNue
Content-Disposition: form-data; name="feedback_type"

1
------WebKitFormBoundaryRtH44EPPALGuzNue
Content-Disposition: form-data; name="qq"

123@123.com
------WebKitFormBoundaryRtH44EPPALGuzNue
Content-Disposition: form-data; name="photo"; filename="logo.png"
Content-Type: image/png


------WebKitFormBoundaryRtH44EPPALGuzNue
Content-Disposition: form-data; name="phone_model"


------WebKitFormBoundaryRtH44EPPALGuzNue
Content-Disposition: form-data; name="version_name"


------WebKitFormBoundaryRtH44EPPALGuzNue
Content-Disposition: form-data; name="phone_number"


------WebKitFormBoundaryRtH44EPPALGuzNue--

