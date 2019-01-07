//https://browser.server.nubia.cn/submit.html

var H5Uploader = (function (fromId, fileName, requestURI, locationURI) {

    var loading, locationHREF, btnVal;

    function sendXHR(fromId, fileName, requestURI, locationURI) {
        var fd = new FormData($("#" + fromId)[0]);
       /* if (!isArray(fileName)) {
            fd.append("fileToUpload", document.getElementById(fileName).files[0]);
        } else {
            for (var i = 0; i < fileName.length; i++) {
                fd.append("fileToUpload", document.getElementById(fileName[i]).files[0]);
            }
        }*/
        var xhr = new XMLHttpRequest();
        xhr.timeout = 60000;
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("loadstart", loadProgress, false);
        xhr.addEventListener("loadend", loadEnd, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.addEventListener("timeout", timeout, false);
        xhr.open("POST", requestURI);
        //设置成ajax请求
        xhr.setRequestHeader("X-Requested-With", 'ajax');
        xhr.setRequestHeader("Cache-Control","no-cache");//告诉proxy不能缓存请求内容或结果
        xhr.send(fd);
    }

    function uploadProgress(evt) {
    	var img = $('#uploadImgs div.pic').find('img')[0];
    	if(!img){
    		return;
    	}
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            $("div[name='percentDiv']").width(percentComplete + '%');
            $("span[name='percentSpan']").html(percentComplete + '%');
        } else {
        	top.layer.close(loading);
            resetProgressBar();
            var t = '图片上传失败';
            layer.open({
                content: '<div class="text"><p>' + t + '</p></div>',
                btn: ['返回'],
                shade: 0.2,
                shadeClose: false,
                yes: function (index) {
                	enableSubmit();
                    layer.close(index);
                }
            });
        }
    }

    function uploadComplete(evt) {
    	top.layer.close(loading);
    	var resultObj = evt.target;
    	var t, data;
    	if(resultObj.readyState == 4 && resultObj.status == 200){
    		data = $.parseJSON(evt.target.responseText);
    		if(!data){
    			t = '处理异常，未接收到返回消息！';
    			resetProgressBar();
    		}else{
    			if (data.code == 0) {
                    t = '提交成功！感谢您的反馈意见，<br>敬请关注！';
                } else {
                    t = "提交失败！"+data.message[0];
                    resetProgressBar();
                }
    		}
    	}else{
    		t = "提交失败，原因：" + resultObj.statusText;
    		resetProgressBar();
    	}
        layer.open({
            content: '<div class="text"><p>' + t + '</p></div>',
            btn: ['返回'],
            shade: 0.2,
            shadeClose: false,
            yes: function (index) {
            	resetProgressBar();
            	enableSubmit();
                layer.close(index);
                if(data && data.code == 0){
                	location.reload();
                }
            }
        });
    }

    function uploadFailed(evt) {
    	top.layer.close(loading);
        resetProgressBar();
        var t = '提交失败';
        layer.open({
            content: '<div class="text"><p>' + t + '</p></div>',
            btn: ['返回'],
            shade: 0.2,
            shadeClose: false,
            yes: function (index) {
            	enableSubmit();
                layer.close(index);
            }
        });
    }

    function uploadCanceled(evt) {
        //alert("The upload has been canceled by the user or the browser dropped the connection.");
    }

    function loadProgress() {
        loading = layer.open({
            type: 2,
            shade: 0.7,
            shadeClose: false
        });
    	var img = $('#uploadImgs div.pic').find('img')[0];
    	if(!img){
    		return;
    	}
        $("div[name='progressOuterDiv']").show();
        $("span[name='percentSpan']").show();
    }

    function loadEnd() {
    }

    function resetProgressBar() {
        $("div[name='percentDiv']").width(0 + '%');
        $("span[name='percentSpan']").html(0);
        $("div[name='progressOuterDiv']").hide();
        $("span[name='percentSpan']").hide();
    }

    function enableSubmit() {
    	var area = $('#contentInput').val();
    	$('#submitBtn').toggleClass('disabled', !area);
    }

    function isArray(obj) {
        return obj && typeof obj === 'object' && Array == obj.constructor;
    }

    function timeout(){
    	top.layer.close(loading);
		resetProgressBar();
		var t = '提交失败，请求超时';
        layer.open({
            content: '<div class="text"><p>' + t + '</p></div>',
            btn: ['返回'],
            shade: 0.2,
            shadeClose: false,
            yes: function (index) {
            	enableSubmit();
                layer.close(index);
            }
        });
	}
    return function (fromId, fileName, requestURI, locationURI, val) {
//		locationHREF = $.extend(true, {}, locationURI);
        locationHREF = locationURI;
        btnVal = val;
        sendXHR(fromId, fileName, requestURI, locationURI, enableSubmit);
    }
})();