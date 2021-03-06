(function(){
	function init(host_name, path_name, query_str){
		var host_name = host_name || document.location.hostname || document.location.host || document.location.href.match(/http:\/\/([^\/]+)/i) && document.location.href.match(/http:\/\/([^\/]+)/i)[1];
		var path_name = path_name || document.location.pathname || document.location.href.match(/http:\/\/[^\/]+(.*)/i) && document.location.href.match(/http:\/\/[^\/]+(.*)/i)[1];
		var query_str = query_str || document.location.search || document.location.href.match(/.*(\?.*)/) && document.location.href.match(/.*(\?.*)/)[1];
		var isSinaCn = host_name && host_name.match(/.*\.?sina\.cn/i) !== null;
		var isDetail = path_name && path_name.match(/.*(\.d\.html)/i);
		var isAriticle = query_str && query_str.match(/from=qudao&?/i);
		var spec = host_name && host_name.match(/lives.sina.cn/i);
		var extra_class = 'main';
		if(query_str && query_str.indexOf('wm=3206') != -1){
			return;
		}
		pageUid = host_name+path_name;
		if(isAriticle){
			pageUid += query_str;
		}
		if(isSinaCn){
			$('.promotion_cover').remove();
			if(isDetail && !isAriticle || spec){
				extra_class = 'share';
				$('body').css('margin-top','60px');
				setTimeout(function(){
					window.scrollTo(0,1);
				},100);
			}
			if(extra_class == 'main' && !enable_disp(pageUid)){
				return ;
			}
			$('body').append('<div class="promotion_cover '+extra_class+'" id="promotionCover"><div href="#" class="cover_content"><img src="http://mjs.sinaimg.cn/wap/module/promote_float/201503271400/images/logo.jpg"/><p class="title">新浪新闻</p><p class="subtitle">安装新浪新闻，随时知晓天下事</p><a class="action_btn" href="javascript:void(0);">打开</a></div><a class="close_btn" href="javascript:void(0);"><i class="r"></i><i class="l"></i></a></div>');
			setTimeout(function(){
				$('#promotionCover').on('click',function(e){
					var dom = e.target,
						domPath = dom.path,
						maxLoop=5;
					if(domPath){
						for(var i=0, len=domPath.length; i < len; i++){
							if(!maxLoop || domPath[i] == this || domPath[i] == window || match_action(domPath[i])){
								break;
							}
							maxLoop--;
						}
					}else{
						while(maxLoop){
							if(!maxLoop || dom == this || dom == window || match_action(dom)){
								break;
							}
							dom = dom.parentElement;
							maxLoop--;
						}
					}
				});
			}, 500);
		}
	}
	var RedirectToNative = {
	   /**
		 * iosNativeUrl: string 必选 ios app上自定义的url scheme） 如 taobao://home(淘宝首页) etao://item?nid=xxx（一淘商品详情页）
		 * androidNativeUrl: string 必选 android app自定义的url scheme
		 * iosInstallUrl: string 必选 ios app store里的安装地址
		 * androidInstallUrl: string 必选 android app的apk地址
		 * package: string 可选 默认com.taobao.taobao android的包名，如淘宝为com.taobao.taobao，etao为com.taobao.etao
		 * iosOpenTime: int 可选默认800ms， 启动ios客户端所需时间，一般ios平台整体性能不错，打开速度较快
		 * androidOpenTime: int 可选默认2000ms，启动android客户端所需时间，android系统性能参差不齐所需启动时间也不齐，和android客户端本身启动时间也有关，比如3.0版本启动一淘客户端就平均比淘宝客户端要慢200ms
		 */
		init: function(config) {
			var self = this;
				self.platform = self._UA();
			// pc下 什么都不处理  pc访问下可能href可以链接去其他地址
			if(!self.platform) return;
			if (self.platform == 'ios') {
			  self.installUrl = config.iosInstallUrl;
			  self.nativeUrl = config.iosNativeUrl;
			  self.openTime = config.iosOpenTime || 800;
			} else {
			  self.installUrl = config.androidInstallUrl;
			  self.nativeUrl = config.androidNativeUrl;
			  self.openTime = config.androidOpenTime || 3000;
			}
			//只有android下的chrome要用intent协议唤起native
			if (self.platform != 'ios' && !!navigator.userAgent.match(/Chrome/i)) {
				self._hackChrome();
			} else {
				self._gotoNative();
			}
		},
		/**
		 * _hackChrome 只有android下的chrome要用intent协议唤起native
			 * https://developers.google.com/chrome/mobile/docs/intents
		 * @return {[type]} 
		 */
		_hackChrome: function() {
		  var self = this;
		  var startTime = Date.now();
		  var paramUrlarr = self.nativeUrl.split('://'),
			  scheme = paramUrlarr[0],
			  schemeUrl = paramUrlarr[1];
          var oImg = new Image();
              oImg.src = self.schemejc;
		  window.location = 'intent://' + schemeUrl + '#Intent;scheme=' + scheme + ';end';
		  setTimeout(function() {
			  self._gotoDownload(startTime);
		  }, self.openTime);
		},
		/**
		 * [_gotoNative 跳转至native，native超时打不开就去下载]
		 * @return 
		 */
		_gotoNative: function() {
			var self = this;
			var startTime = Date.now(),
				doc = document,
				body = doc.body,
				iframe = doc.createElement('iframe');
				iframe.id = 'J_redirectNativeFrame';
				iframe.style.display = 'none';
				iframe.src = self.nativeUrl;

			//运行在head中
			if(!body) {
				setTimeout(function(){
					doc.body.appendChild(iframe);
				}, 0);
			} else {
				body.appendChild(iframe);
			}
			
			setTimeout(function() {
				doc.body.removeChild(iframe);
				self._gotoDownload(startTime);
				/**
				 * 测试时间设置小于800ms时，在android下的UC浏览器会打开native app时并下载apk，
				 * 测试android+UC下打开native的时间最好大于800ms;
				 */
			}, self.openTime);
		},
		/**
		 * [_gotoInstall 去下载]
		 * @param  {[type]} startTime [开始时间]
		 * @return 
		 */
		_gotoDownload: function(startTime) {
			var self = this;
			var endTime = Date.now();
			if (endTime - startTime < self.openTime + 500) {
				window.location = self.installUrl;
			}
		},
		/**
		 * [_UA 检测平台]
		 * @return string [ios|android| ]
		 */
		_UA: function() {
			var ua = navigator.userAgent;
			var a = ua.match(/Android/i);
			
			// ios
			//if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			if (ua.match(/iphone|ipod/ig)){
				return 'ios';
			} else if (ua.match(/Android/i)) {
				return 'android';
			} else {
				return '';
			}
		}
	}

	function today(){
		var dateObj = new Date();
		return dateObj.toDateString();
	}

	function enable_disp(uid){
		var PCRecord = null;
		try{
			PCRecord = JSON.parse(localStorage['sina_pro_cover']);
		}catch(err){
			PCRecord = null;
		}
		if(PCRecord && PCRecord[uid]){
			if(PCRecord[uid] == today()){
				return false
			}
			delete PCRecord[uid]
		}
		localStorage['sina_pro_cover'] = JSON.stringify(PCRecord);
		return true;
	}
	function set_disable_record(uid){
		var PCRecord = localStorage['sina_pro_cover'];
		try{
			PCRecord = JSON.parse(PCRecord);
		}catch(err){
			PCRecord = {}
		}
		if(Object.prototype.toString.call(PCRecord) != '[object Object]'){
			PCRecord = {};
		}
		PCRecord[uid] = today();
		localStorage['sina_pro_cover'] = JSON.stringify(PCRecord);
	}

	function is_weixn(){

	    var ua = navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i)=="micromessenger")  {
	        return true;
	    } else {
	        return false;
	    }
	}
	function open_or_download_app() {
		if(is_weixn()){
	        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sina.news';
		}
		var jumpConfig = {
			iosInstallUrl: 'http://sina.cn/j/d.php?k=82',
			androidInstallUrl: 'http://sina.cn/j/d.php?k=82',
			iosNativeUrl: 'sinanews://news.sina.cn',
			androidNativeUrl: 'sinanews://news.sina.cn',
		};
		RedirectToNative.init(jumpConfig);
	} 

	function sendTrack(){
		$.ajax({
			type: 'GET',
			url: 'http://open.api.sina.cn/count/appview',
			dataType: 'jsonp',
		});
	}

	function match_action(dom){
		switch(dom.className){
			case 'close_btn':
				$('#promotionCover').remove();
				set_disable_record(pageUid);
				return true;
			break;
			case 'action_btn':
				var now = (new Date()).valueOf();
				if((now - loading) > clickInternal){
					loading = now;
					sendTrack();
					open_or_download_app();
				}
				return true;
			break;
			default:
			return false;
		}

	}
	var loading = 0;
	var clickInternal = 10000;
	var pageUid = null;
	setTimeout(function(){init()}, 100);
})()