function uploadAndSubmit() {
  var form = document.forms['demoForm']

  if (form['file'].files.length > 0) {
    // 寻找表单域中的 <input type="file" ... /> 标签
    var file = form['file'].files[0]
		console.log(file.size, file.type, file.name)

    //TODO FileReader事件
    var reader = new FileReader()
    reader.onloadstart = function() {
      document.getElementById('bytesTotal').textContent = file.size
    }
    reader.onprogress = function(p) {
      document.getElementById('bytesRead').textContent = p.loaded
    }
    reader.onload = function() {
      console.log('load complete')
    }

    // 这个事件在读取结束后，无论成功或者失败都会触发
    reader.onloadend = function() {
      if (reader.error) {
        console.log(reader.error)
      } else {
        document.getElementById('bytesRead').textContent = file.size

        // 构造 XMLHttpRequest 对象，发送文件 Binary 数据
        if(!XMLHttpRequest.prototype.sendAsBinary){
          XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
            function byteValue(x) {
              return x.charCodeAt(0) & 0xff;
            }
            var ords = Array.prototype.map.call(datastr, byteValue);
            var ui8a = new Uint8Array(ords);
            this.send(ui8a.buffer);
          };
        }
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'upload.jsp?fileName=' + file.name  /*, async, default to true */)
        xhr.overrideMimeType('application/octet-stream')
        xhr.sendAsBinary(reader.result)
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              console.log('upload complete')
              console.log('response: ' + xhr.responseText)
            }
          }
        }
      }
    }

    reader.readAsBinaryString(file)
  }
}
