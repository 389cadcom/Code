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

//1.post
fetch(url, {method: 'post',body: JSON.stringify(data)} ).then(res => {
	return res.json()		
).then( res => {
	
})

//2.图片
fetch(img).then(res => {
	if(res.ok){
		return res.json()		
	}else{
		throw new Error('Network response is no ok')	
	}
).then( res => {
	var url = URL.createObjectURL(res)

})