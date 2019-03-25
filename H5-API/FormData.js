//FormData --  异步上传二进制文件
https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects

//FileList, File, FileReader, URL.createObjectURL, Blob, 

//DataTransfer, FormData, URLSearchParams 

//H5只拍照, 不能从图库中选择
<input type="file" capture="camera" @change="uploadHandler" type="file" accept="image/*" multiple />


1.File
	e.target.files, this.files[0]						//file.name, file.size, file.type, file.lastModified

	//dragenter, dragover, drop							e.preventDefault() e.stopPropagation()
	var dt = e.e.originalEvent.dataTransfer
	var files = dt.files[0]

2.FormData																//通过表单创建formdata、上传文件--附加File或Blob类型的文件
	params = new FormData()
	params.append('userName', 'yu')
	params.append('myfile', myBlob, 'input.txt')


3.FileReader															//无法解析视频文件
	var blob = new Blob(['Hi'], {type: 'text/plain'})
	var reader = new FileReader();
	reader.onload = (e) => e.target.result
	reader.readAsDataURL(file)							//(file,blob) DataURL  ArrayBuffer  BinaryString | Binary 二进制  readAsText

	/image/g.test(file.type),	/video/g.test(file.type),  /audio/g.test(file.type)
	
4.Blob(array[, options])									//size, type
	//new Blob([1,2,3],{type:'text/plain'});

	var blob = new Blob([file]),						//文件转化成二进制文件
			url  = URL.createObjectURL(blob)		//转为url

	var img = new Image()
	img.src = url
	img.onload = ()=>{
		URL.revokeObjectURL(img.src);				 // 释放createObjectURL创建的对象
	}

	//file://URL
	//blob://URL			-->	URL.createObjectURL(file) 本地存储  
	//Data URL				--> FileReader  e.target.result			  data:[<mediatype>][;base64],<data>
	data:text/javascript;base64,SGVsbG8gV29ybGQ=
	data:image/png;base64,IBV

	//base64编码、解码 btoa, atob  btoa不支持中文特殊字符, encodeURIComponent   -- decodeURIComponent
	var base64 = e.target.result
	var str = base64.replace(/^[^,]+,/, '')	//上传图片base64需去除  data:image/jpeg;base64,  split(',')[1]
	console.log(atob(str));									// mimiType = base64.match(/:(.*?);/)[1]


//Blob 分片上传


//Download
function getAjax(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.responseType = 'blob';
	xhr.onload = function() {
		if (this.status == 200) {
			callback(this.response);
		}
	};
	xhr.send();
}
let reader = new FileReader();
reader.addEventListener('loadend', function() {
	console.log(reader.result);       //data:image/png;base64
});

getAjax('https://cdn.segmentfault.com/v-5c4ec07f/global/img/user-64.png', function(blob) {
  reader.readAsDataURL(blob);

  let url = URL.createObjectURL(blob);					// 生成下载用的URL对象, 再生成一个a标签
  let elem = document.createElement('a');
  elem.href = url;
  elem.download = 'download.png';								//download指定下载名称
  elem.text = '下载文件';
  document.getElementsByTagName('body')[0].appendChild(elem);
	}
);


//Ajax
var xhr = new XMLHttpRequest();    			//创建一个新的XHR对象 
xhr.open('GET','res/img/1.png');        //指定要获取内容的URL
xhr.responseType = 'blob';        			//以Blob的形式
xhr.onload = function(){         				//onload 比onreadystatechange更容易
  console.log(xhr.response);  					//response返回的就是Blob对象    
  //blob--url
  var img = document.getElementById("img")
  img.src = URL.createObjectURL(xhr.response)
}                                
xhr.send(null);                    			//发送请求

var xhr = new XMLHttpRequest();
xhr.open("POST", "url");
xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
xhr.sendAsBinary(binaryString)


var fd = new FormData(document.querySelector("form"));
fd.append("CustomField", "This is some extra data");
$.ajax({
  url: "stash.php",
  type: "POST",
  data: fd,
  processData: false,  // 不处理数据
  contentType: false   // 不设置内容类型
});