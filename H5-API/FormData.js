//FormData
https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects

//File, FileReader, FormData, Blob

1.File
	e.target.files, this.files[0]


2.FileReader
	var reader = new FileReader();
	//readAsBinaryString							//Binary 二进制
	reader.readAsDataURL(file)				//base64
	reader.onload = function(){
		conosle.log(this.result)
	}


3.FormData
	params = new FormData()
	params.append('userName', 'yu')