async nextHandler(){
		//�첽��ȡͼƬbase64
		let readFileAsync = (file) => new Promise(resolve => {
			var reader = new FileReader()
			reader.onload = (e) => resolve(e.target.result)
			reader.readAsDataURL(file)
		})

		//��������
		var arr = this.uploadFiles.reduce((flat, curr)=>flat.concat(curr), [])
		var maps = []
		for(var i=0; i<arr.length; i++){
			var obj = {}, file = arr[i]

			obj.fileName    = file.name.split('.')[0]
			obj.fileType    = file.name.split('.')[0]
			obj.fileContent = await readFileAsync( file )
			maps.push(obj)
		}
		console.log(maps);

		//�ϴ�
		var params = {
			pagemode: 'serverV3P5',
			action: 'uploadify',
			attachment: JSON.stringify(maps)
		}
		console.log(params);
/*         this.$api.getOnline(params).then( res => {
			console.log(res);
		}) */
		// this.$router.replace('/online-step4')
}