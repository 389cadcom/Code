/**
	Fetch-API, Headers, Request, Response, Body

	body:(包含的类型)
		ArrayBuffer
		ArrayBufferView (Uint8Array and friends)
		Blob/File
		string
		URLSearchParams
		FormData

	res.json(), res.text(), res.blob(), formData(), arrayBuffer()

*/	

//Ajax--blob

var xhr = new XMLHttpRequest();
xhr.open('get', url, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.responseType = 'blob';
xhr.onload = function() {
	if (this.status == 200) {
		console.log(this.response);
		callback(this.response);
	}
};
xhr.send();




//1.post
fetch(url, {method: 'post',body: JSON.stringify(data)} ).then(res => {
	return res.json()		
).then( res => {
	
})

//2.图片
var conf = {
	credentials: 'include',						//为了在当前域名内自动发送 cookie ， 必须提供这个选项
	method: type,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	mode: "cors",//请求的模式
	cache: "force-cache"
}
fetch(img).then(res => {
	if(res.ok){
		return res.json()		
	}else{
		throw new Error('Network response is no ok')	
	}
).then( res => {
	var url = URL.createObjectURL(res)

})