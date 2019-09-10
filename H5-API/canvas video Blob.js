muted="muted"  自动播放属性

<video @click="videoHandler(item)" :poster="$api.path + '/' + item.aliasName"
	x-webkit-airplay="true" playsinline webkit-playsinline="true" x5-playsinline="true"
	x5-video-player-fullscreen="false" preload="auto" width="100%" height="100%">
	<source :src="$api.path + '/' + item.imgUrl"/>
</video>


//图片转换
1. urlToImage()				//img.src
2. imageToCanvas()		//ctx.drawImage(img, 0, 0)
3. canvasToBlob()			//toBlob(cb, mini, quality)
4. canvasToDataURL		//canvas.toDataURL(mimiType, quality) 
5. fileToDataURL			//reader.readAsDataURL()  e.target.result
6. dataURLToImage			//base64  img.src
7. dataURLToFile			//Unit8Array(), charCodeAt(), new Blob([u8arr], {type:mimi_type})

function fileResizeToFile(file, quality, cb){
	filetoDataURL -> dataURLtoImage ->  imageToCanvas -> canvasToDataURL -> dataURLToFile
}


//等比例压缩图片 rate = (rateX < rateY) ? rateX : rateY
function compressImage(url){
  var maxWidth = 300, maxHeight = 200, size = {};
  var img = new Image()
  img.src = url;
  img.onload = function() {
    if(img.width == 0 || img.height == 0) return;
    var rateX = maxWidth / img.width,
        rateY = maxHeight / img.height;
    var rate = (rateX < rateY) ? rateX : rateY;       //选择比例小的一个
    
    if(rate <= 1){
      w = Math.ceil(img.width * rate);
      h = Math.ceil(img.height * rate)
    }
    img.width =  w;
    img.height = h
  }
  return img;
}



files[0].__proto__.proto__ = Blob

1.与base64互转

function blobToDataURL(blob){
	var reader = new FileReader()
	reader.onload= function(e){
		var data = e.target.result
	}
  reader.readAsDataURL(blob)
}


base64 = "data:image/png;Adldw"			//match(/data:([^;]+)/)		排除;
function dataURLtoBlob(data){
  var arr = data.split(','),
      mime = arr[0].match(/:(.*?);/)[1],				
      str  = atob(arr[1]),
      len  = str.length,
      u8arr = new Uint8Array(len);
  while(len--){
    u8arr[n] = str.charCodeAt(n);
  }
	//or
	for(var i=0; i<len; i++){
		u8arr[i] = str.charCodeAt(i)
	}
  return new Blob([u8arr], { type: mime });
}

//window.atob()：base64解码，ASCII转base64编码

//window.btoa()：base64转码，base64转ASCII