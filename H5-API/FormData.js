//FormData --  异步上传二进制文件
https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects

//File, FileReader, FormData, Blob

1.File
	e.target.files, this.files[0]

2.FormData
	params = new FormData()
	params.append('userName', 'yu')


3.FileReader
	var reader = new FileReader();
	reader.onload = (e) => e.target.result
	reader.readAsDataURL(file)							//base64  ArrayBuffer  BinaryString | Binary 二进制  Text

	/image/g.test(file.type),	/video/g.test(file.type)
	
4.Blob(array[, options])									//size, type
	//new Blob([1,2,3],{type:'text/plain'});

	var blob = new Blob([file]),						//文件转化成二进制文件
			url  = URL.createObjectURL(blob)		//转为url

	var img = new Image()
	img.src = url
	img.onload = ()=>{
		URL.revokeObjectURL(this.src);				// 释放createObjectURL创建的对象
	}

	//file://URL
	//blob://URL			-->	URL.createObjectURL(file) 本地存储  
	//Data URL				--> FileReader  e.target.result			  data:[<mediatype>][;base64],<data>
	data:text/javascript;base64,SGVsbG8gV29ybGQ=
	data:image/png;base64,IBV

	//Blob 分片上传


//ajax
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