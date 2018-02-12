var qApiSrc = {
		lower: 'http://3gimg.qq.com/html5/js/qb.js',
		higher: 'http://jsapi.qq.com/get?api=app.share'
	},
	bLevel = {
		qq: {
			forbid: 0,
			lower: 1,
			higher: 2
		},
		uc: {
			forbid: 0,
			allow: 1
		}
	},
	UA = navigator.appVersion,
	isqqBrowser = (UA.split('MQQBrowser/').length > 1) ? bLevel.qq.higher : bLevel.qq.forbid,
	isucBrowser = (UA.split('UCBrowser/').length > 1) ? bLevel.uc.allow : bLevel.uc.forbid,
	version = {
		uc: '',
		qq: ''
	},
	platform_os,
	shareBasePath = 'http://mjs.sinaimg.cn/wap/module/share/201505211740/',
	localhref = window.location.href,
	cur_domain = localhref.split('//')[1].split('/')[0].split('.')[0],
	isWeixin = false,
	__colleid = __colleid || __docConfig.__colleid,
	__collekey = __collekey || __docConfig.__collekey;
window.ishare = true;

if (typeof(__docConfig) == 'undefined' || !window.__docConfig) {
	window.__docConfig = {
		__domain: cur_domain,
		__docId: '',
		__docUrl: localhref.split('?')[0],
		__cmntId: '',
		__cmntTotal: 0,
		__isGetUserInfo: '',
		__surveyId: '',
		__flvId: '',
		__mainPic: '',
		__cmntListUrl: '',
		__gspsId: '',
		__tj_ch: 'news',
	}
}
if (typeof(__userConfig__) == 'undefined' || !window.__userConfig__) {
	window.__userConfig__ = {
		__uid: '',
		__unick: '',
		__uface: '',
		__isLogin: false
	};
}
if (typeof(readConfig) == 'undefined' || !window.readConfig) {
	window.readConfig = {
		isArt: true,
		share: {
			sharenum: 0,
			hotnum: 10000,
			imgid: 'j_ishare_pic',
			shorttitle: '',
			content: '',
			targeturl: 'http://o.share.sina.cn/ajshare?vt=4',
			shareurl: localhref,
			isdoc: 1
		},
		originpic: '',
	};
}
cur_domain = __docConfig.__domain || cur_domain;

function MyShareClass() {
	var _floatstatus = {
			login: 0,
			platlist: 1,
			share: 2,
			fade: 3
		},
		_platforms = {
			sweibo: ['SinaWeibo', '新浪微博'],
			friend: ['WechatFriends', '微信好友'],
			fsircle: ['WechatTimeline', '微信朋友圈']
		},
		_opConfig = {
			voteNum: 0,
			voteStatus: false,
			favorStatus: false
		},
		_favorConfig = {
			isInit: false,
			isAdd: true
		},
		_contentConfig = {
			contentRows: [4, 6],
			contentMax: 88,
			basePath: shareBasePath,
			cssPath: shareBasePath + 'css/addShare.min.css',
			userInfoUrl: 'http://interface.sina.cn/wap_api/wap_get_user_info.d.api?jsoncallback=',
			animate: ['platformShow', 'sinaShow'],
			headimgsrc: 'images/headimg.png',
			shareimgsrc: 'http://u1.sinaimg.cn/upload/2014/12/08/101778.png'
		},
		_shareContent = {
			iTitle: '',
			iContent: '',
			iImgsrc: '',
			iUrl: '',
			iBackurl: '',
			isdoc: 0
		},
		_platBox = {
			findClass: {
				shareIcon: 'j_splat_ico',
				shareContentZone: 'j_icontent',
				shareBtn: 'j_shareBtn',
				platforms_big: 'j_platforms_big',
				sinaShareContent: 'j_sinaShareContent',
				praiseBtn: 'j_vote_btn',
				submitBtn: 'j_isunbmit',
				addFavor: 'j_iadd_btn',
				sinaInfo: 'sinaInfo',
				forbid: 'forbid',
				opPraise: 'op_praise '
			},
			findId: {
				sharefloat: 'j_sharebox',
				floatCross: 'j_sharecross',
				shareContentid: 'j_ishare_content',
				sharetitle: 'j_shareTitle',
				sharecnum: 'j_ishare_num',
				spicid: 'j_ishare_pic',
				userInfo: 'j_sinaInfo',
				userName: 'j_user_name',
				userImg: 'j_user_img',
				shareImg: 'j_ishare_img',
				insertDom: ['j_com_pics_op', 'j_com_art_op', ]
			}
		},
		_ucPlatName = {
			iweibo: 'kSinaWeibo',
			ifriend: 'kWeixin',
			ifcircle: 'kWeixinFriend',
			asweibo: 'SinaWeibo',
			afriend: 'WechatFriends',
			afcircle: 'WechatTimeline'
		},
		_loginLayer,
		self = this,
		waplogin = (typeof(WapLogin) == 'function') ? (new WapLogin()) : this;
	personal_url = 'http://my.sina.cn/?vt=4',
		_fromPlat = {
			qqfriend: "qqfriend",
			qqweichat: "qqweichat",
			ucfriend: "ucfriend",
			ucweichat: "ucweichat"
		},
		_frompre = readConfig.share.shareurl.indexOf('?') >= 0 ? '&' : '?',
		_shareDocUrl = __docConfig.__docUrl ? __docConfig.__docUrl : localhref;

	function myfunction(obj, title, content, url, platform) {
		if (isucBrowser) {
			var getPos = {
				getTop: function(e) {
					var offset = e.offsetTop;
					if (e.offsetParent != null) offset += getPos.getTop(e.offsetParent);
					return offset;
				},
				getLeft: function(e) {
					var offset = e.offsetLeft;
					if (e.offsetParent != null) offset += getPos.getLeft(e.offsetParent);
					return offset;
				},
				getCss3offsetTop: function(e) {
					var css3offset = getComputedStyle(e, null).webkitTransform;
					if (css3offset == "none") {
						var css3offsetTop = 0;
					} else {
						var css3offsetTop = parseInt(css3offset.split(",")[5].replace(")", ""))
					}
					if (e.parentNode.tagName != "BODY") css3offsetTop += getPos.getCss3offsetTop(e.parentNode);
					return css3offsetTop;
				},
				getCss3offsetLeft: function(e) {
					var css3offset = getComputedStyle(e, null).webkitTransform;
					if (css3offset == "none") {
						var css3offsetLeft = 0;
					} else {
						var css3offsetLeft = parseInt(css3offset.split(",")[4])
					}
					if (e.parentNode.tagName != "BODY") css3offsetLeft += getPos.getCss3offsetLeft(e.parentNode);
					return css3offsetLeft;
				},
				getNodeInfoById: function(e) {
					var myNode = document.getElementById(e);
					if (myNode) {
						var pos = [getPos.getLeft(myNode) + getPos.getCss3offsetLeft(myNode), getPos.getTop(myNode) + getPos.getCss3offsetTop(myNode), myNode.offsetWidth, myNode.offsetHeight]
						return (pos)
					} else {
						return ""
					}
				}
			}
			if (typeof(ucweb) != "undefined") {
				var UCBrowserText = ucweb.startRequest("shell.page_share", [title, content, url, platform, '', '我们正在看【' + title + '】，一起来看吧', getPos.getNodeInfoById(obj)]);
			} else if (typeof(ucbrowser) != "undefined") {
				if (platform == _platforms.sweibo[0]) {
					platform = _ucPlatName.iweibo;
				} else if (platform == _platforms.friend[0]) {
					platform = _ucPlatName.ifriend;
					url += _frompre + "from=" + _fromPlat.ucfriend;
				} else if (platform == _platforms.fsircle[0]) {
					platform = _ucPlatName.ifcircle;
					url += _frompre + "from=" + _fromPlat.ucweichat;
				}
				ucbrowser.web_share(title, content, url, platform, '', '@手机新浪网', obj);
			} else {}
		} else if (isqqBrowser && !isWeixin) {
			if (platform == _platforms.friend[0]) {
				platform = 1;
				url += _frompre + "from=" + _fromPlat.qqfriend;
			} else if (platform == _platforms.fsircle[0]) {
				platform = 8;
				url += _frompre + "from=" + _fromPlat.qqweichat;
			} else {
				platform = "";
			}
			var shareObj = {
					"url": url,
					"title": title,
					"description": content,
					"img_url": _shareContent.iImgsrc,
					"img_title": title,
					"to_app": platform,
					"cus_txt": "请输入此时此刻想要分享的内容"
				},
				success = -1;
			if (typeof(browser) != "undefined") {
				if (typeof(browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher)
					success = browser.app.share(shareObj);
			} else if (typeof(window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
				window.qb.share(shareObj);
			} else {}
		} else {}
		_shareLayerStatus(_floatstatus.fade);
		return;
	}
	this.login = function(login, callback, cbparam, cbparam1) {
		var argsnum = arguments.length;
		if (window["SINA_OUTLOGIN_LAYER"] && !login) {
			_loginLayer = window["SINA_OUTLOGIN_LAYER"];
			_loginLayer.set('sso', {
				entry: 'wapsso'
			}).init();
			_loginLayer.show();
			_loginLayer.register("login_success",
				function(re) {
					self.updateUserInfo(re);
					switch (argsnum) {
						case 2:
							callback();
							break;
						case 3:
							callback(cbparam);
							break;
						case 4:
							callback(cbparam, cbparam1);
							break;
						default:
							window.location.href = window.location.href;
							break;
					}
				});
			_loginLayer.register("layer_hide",
				function() {
					if (typeof(callback) != 'undefined') {
						callback = null;
					}
				});
		}
		return;
	}
	this.updateUserInfo = function(re) {
		if (typeof(re) != 'undefined' && typeof(re.nick) != 'undefined') {
			if (typeof(__userConfig__) == 'undefined' || !window.__userConfig__) {
				window.__userConfig__ = {};
			}
			__userConfig__.__isLogin = true;
			__userConfig__.__unick = re.nick;
			__userConfig__.__uface = re.portrait;
			__userConfig__.__uid = re.uid;
			if (!window.globalConfig || typeof(globalConfig) != 'undefined') {
				globalConfig = {};
			}
			globalConfig.isLogin = true;
			if ($('#loginImg').find('img').length > 0) {
				$('#loginImg').find('img').attr('src', portrait);
			}
			return;
		}
	}

	function _sinaShare() {
		var url = readConfig.share.targeturl,
			oPost_url = '',
			tj_ch = __docConfig.__tj_ch ? __docConfig.__tj_ch : 'news';
		if (!!url == false) {
			return false;
		}
		if (url.indexOf('?') == -1) {
			url = url + '?';
		}
		var csrftime = parseInt(new Date().getTime() / 1000),
			codeStr = csrftime + "85e47ac07ac9d6416" + __userConfig__.__uid,
			csrfcode = hex_md5(codeStr),
			ititle = encodeURIComponent(_shareContent.iTitle),
			icontent = encodeURIComponent(_shareContent.iContent),
			iimage = encodeURIComponent(_shareContent.iImgsrc),
			iurl = encodeURIComponent(_shareContent.iUrl + "&wm=3049_all&from=qudao");
		oPost_url = url + "&csrftime=" + csrftime + "&csrfcode=" + csrfcode + "&title=" + ititle + "&content=" + icontent + "&pic=" + iimage + "&url=" + iurl + "&isdoc=" + _shareContent.isdoc + "&jsoncallback=shareCallback&tj_ch=" + tj_ch;
		_jsonp(oPost_url);
		_shareLayerStatus(_floatstatus.fade);
		return;
	}
	window.shareCallback = function(data) {
		var remindTxt = '';
		switch (data.code) {
			case -3:
				remindTxt = '分享失败!';
				break;
			case -2:
				remindTxt = '未登录!';
				break;
			case -1:
				remindTxt = '请求非法！';
				break;
			case 1:
				remindTxt = '分享成功！';
				break;
			default:
				remindTxt = '未知状态码 ' + data.code;
				break;
		}
		_showRemind(remindTxt, true);
		_sudaLog('public_sinashare_success');
	}
	var _aTimer = null;

	function _creatRemind() {
		var arr = [];
		if ($('.re_box').length < 1) {
			arr.push('<section>');
			arr.push('<div class="re_box">');
			arr.push('<div class="resault_f re_simple">收藏失败!</div>');
			arr.push('<div class="resault_f re_notice">');
			arr.push('<div>');
			arr.push('<p>您已收藏，请到个人中心查看</p>');
			arr.push('</div>');
			arr.push('<span class="re_cancel">知道了</span>');
			arr.push('<span class="re_ok" data-url="' + personal_url + '">去看看</span>');
			arr.push('</div>');
			arr.push('</div>');
			arr.push('</section>');
			$('body').append(arr.join(''));
			_remindListner();
		}
		return;
	}

	function _showRemind(txt, isTrue) {
		if ($('.re_box').length <= 0) {
			_creatRemind();
		}
		if (_aTimer)
			clearTimeout(_aTimer);
		if ($('.resault_f').eq(0).hasClass('showFadeAnimate')) {
			$('.resault_f').eq(0).html('').hide().removeClass('showFadeAnimate');
		}
		if ($('.resault_f').eq(1).hasClass('showAnimate')) {
			$('.resault_f').eq(1).find('p').html('');
			$('.resault_f').eq(1).hide().removeClass('showAnimate');
		}
		if (typeof(isTrue) == 'undefined') {
			return;
		} else if (isTrue) {
			$('.resault_f').eq(0).show().html(txt).addClass('showFadeAnimate');
			_aTimer = setTimeout(function() {
					$('.resault_f').eq(0).html('').hide().removeClass('showFadeAnimate');
				},
				5000);
		} else if (!isTrue) {
			$('.resault_f').eq(1).show().addClass('showAnimate').find('p').html(txt);
		}
	}

	function _remindListner() {
		$('.re_cancel').each(function() {
			$(this).on('click',
				function() {
					_showRemind();
				});
		});
		$('.re_ok').each(function() {
			$(this).on('click',
				function() {
					_showRemind();
					window.location.href = $(this).data('url');
				});
		});
	}

	function _creatOperate() {
		var arr = [],
			isArt = 1,
			comment = [],
			originpic = [];
		var commentnum = __docConfig.__cmntTotal || 0;
		comment.push(__docConfig.__cmntListUrl ? __docConfig.__cmntListUrl : 'javascript:void(0)');
		comment.push(commentnum > 10000 ? (parseInt(commentnum / 10000) + '万') : commentnum);
		originpic.push(readConfig.originpic ? readConfig.originpic : 'javascript:void(0)');
		if (readConfig.isArt) {
			isArt = 1;
			if (isqqBrowser || isucBrowser) {
				arr.push('<div class="platforms_small">');
				arr.push('<ul>');
				arr.push('<li class="shareText"> 分享</li>');
				arr.push('<li>');
				arr.push('<ul>');
				arr.push('<li></li>');
				arr.push('<li><span class="' + _platBox.findClass.shareIcon + ' splat_ico sina_samll" data-platform="' + _platforms.sweibo[0] + '"  data-sudaclick="public_sinaweibo"></span></li>');
				arr.push('<li><span class="' + _platBox.findClass.shareIcon + ' splat_ico friend_small" data-platform="' + _platforms.friend[0] + '"  data-sudaclick="public_wechatfriends"></span></li>');
				arr.push('<li><span class="' + _platBox.findClass.shareIcon + ' splat_ico fcircle_small" data-platform="' + _platforms.fsircle[0] + '" data-sudaclick="public_wechattimeline"></span></li>');
				arr.push('<li></li>');
				arr.push('</ul>');
				arr.push('</li>');
				arr.push('</ul>');
				arr.push('</div>');
				arr.push('<div class="share_op">');
				arr.push('<ul>');
			} else {
				arr.push('<div class="share_op">');
				arr.push('<ul>');
				arr.push('<li><span class="share_ico art_share ' + _platBox.findClass.shareBtn + '" data-sudaclick="public_new_share">分享</span></li>');
			}
			arr.push('<li><a href="' + comment[0] + '" class="share_ico art_comment" data-sudaclick="public_comment">' + comment[1] + '</a></li>');
			arr.push('<li><a class="share_ico op_praise art_praise" data-sudaclick="public_praise">赞</a></li>');
			arr.push('<li class="favor"><a class="share_ico art_collect ' + _platBox.findClass.addFavor + '" href="javascript:void(0);"  data-sudaclick="public_favor">收藏</a></li>');
			arr.push('</ul>');
			arr.push('</div>');
		} else {
			isArt = 0;
			arr.push('<ul >');
			arr.push('<li><a id="weibo_share" href="javascript:void(0);" class="share_ico pic_share ' + _platBox.findClass.shareBtn + '" data-sudaclick="picShare">分享</a></li>');
			arr.push('<li><a id="comment" href="' + comment[0] + '" class="share_ico pic_comment " data-sudaclick="public_comment">' + comment[1] + '</a></li>');
			arr.push('<li><a id="updown" href="javascript:void(0);" class="share_ico op_praise pic_praise" data-sudaclick="public_praise">赞</a></li>');
			arr.push('<li><a id="down" href="' + originpic[0] + '" class="share_ico pic_original" target="_blank" data-sudaclick="public_origin">原图</a></li>');
			arr.push('</ul>');
		}
		setTimeout(function() {
				$('#' + _platBox.findId.insertDom[isArt]).append(arr.join(''));
			},
			2000);
		return;
	}

	function _jsonp(url) {
		var head = document.getElementsByTagName('head')[0],
			script = document.createElement('script');
		script.src = url;
		script.charset = 'utf-8';
		head.appendChild(script);
	}

	function _addVoteInit() {
		if (typeof __pkeys != 'undefined' && typeof __pValue != 'undefined') {
			var sUrl_init = 'http://data.api.sina.cn/api/count/count.php?act=',
				backurl = __docConfig.__docUrl || localhref.split('?')[0] || '',
				params = '&backurl=' + backurl + '&tj_ch=' + cur_domain + '&ch=&type=1&pkey=' + __pkeys + '&p=' + __pValue + '&channel=' + cur_domain + '&jsonpcallback=',
				sUrl1 = sUrl_init + 'show' + params + 'getPraise',
				sUrl3 = sUrl_init + 'add' + '&tj_type=praise' + params + 'addPraise',
				$oPraiseBtns = $('.' + _platBox.findClass.opPraise);
			if ($oPraiseBtns.length > 0) {
				$oPraiseBtns.data('url', sUrl1).data('status', 0);
				_jsonp(sUrl1);
			}
			$oPraiseBtns.each(function() {
				$(this).on('click tap',
					function() {
						_showRemind();
						var clickObj = $(this);
						if (clickObj.hasClass('on') || clickObj.data('loading') == 'yes') {
							return;
						} else {
							$(this).data('url', sUrl3).data('status', 1);
							_jsonp(sUrl3);
						}
					});
			});
		}
	}
	window.getPraise = function(data) {
		var count = data.count > 0 ? (data.count > 10000 ? (parseInt(data.count / 10000) + '万') : data.count) : '赞';
		$('.' + _platBox.findClass.opPraise).html(count).data('loading', 'no');
		_opConfig.voteNum = data.count;
	};
	window.addPraise = function(data) {
		if (data.status == 0) {
			$('.' + _platBox.findClass.opPraise).each(function() {
				if ($('.' + _platBox.findClass.opPraise).data('loading') == 'no') {
					var count = data.count > 0 ? (data.count > 10000 ? (parseInt(data.count / 10000) + '万') : data.count) : '赞';
					$('.' + _platBox.findClass.opPraise).text(count).addClass('on');
					_opConfig.voteNum = data.count;
				}
			});
		} else {}
	};

	function _addFavorInit() {
		favorEvent($('.' + _platBox.findClass.addFavor).eq(0), _favorConfig.isInit);
		$('body').on("click tap",
			function() {});
		document.addEventListener('click',
			function(ev) {
				var obj = getEvent().target;
				if ($(obj).hasClass(_platBox.findClass.addFavor)) {
					_showRemind();
					favorEvent($(obj), _favorConfig.isAdd);
				}
			},
			false);
	}

	function favorEvent(obj, isTrue) {
		if (typeof __colleid != 'undefined' && typeof __collekey != 'undefined') {
			var uid = __userConfig__.__uid || '',
				docid = __docConfig.__gspsId || '',
				backurl = __docConfig.__docUrl || localhref.split('?')[0] || '',
				jsoncallback = '',
				isTrue = (typeof(isTrue) != 'undefined') ? (isTrue ? _favorConfig.isAdd : _favorConfig.isInit) : _favorConfig.isAdd;
			if (__userConfig__.__isLogin) {
				if (obj.hasClass('on')) {
					if (isTrue && _favorConfig.isAdd) {
						var remindTxt = '您已收藏，请到个人中心查看';
						_showRemind(remindTxt, false);
					}
					return;
				}
				if (!isTrue && !_favorConfig.isInit) {
					jsoncallback = '&op=isFav&jsoncallback=initFavorCallback';
				} else {
					jsoncallback = '&tj_type=favor&jsoncallback=addFavorCallback';
				}
				var url = 'http://o.my.sina.cn/favorite?uid=' + uid + '&docid=' + docid + '&backurl=' + backurl + '&tj_ch=' + cur_domain + '&ch=&csrftime=' + __colleid + '&csrfcode=' + __collekey + '&channel=' + cur_domain + jsoncallback;
				_jsonp(url);
			} else if (isTrue && _favorConfig.isAdd) {
				_shareLayerStatus(_floatstatus.login, favorEvent, obj, true);
			}
		}
	}
	window.addFavorCallback = function(data) {
		var add = $('.' + _platBox.findClass.addFavor).eq(0);
		add.data('loading', 'no');
		if (data && data.code == 1) {
			add.addClass('on');
			add.addClass('on').html('已收藏');
			var remindTxt = '您已收藏，请到个人中心查看';
			_showRemind(remindTxt, false);
		} else if (data && data.code == 2) {
			document.location.href = data.data;
		} else {
			var remindTxt = '收藏失败!';
			_showRemind(remindTxt, true);
		}
	};
	window.initFavorCallback = function(data) {
		var add = $('.' + _platBox.findClass.addFavor).eq(0);
		if (data && data.code == 1 && data.data.id) {
			add.addClass('on').html('已收藏');
		}
	};

	function _creatShareFloat() {
		var arr = [],
			userInfo = [],
			contentNum = [];
		contentNum.push((_contentConfig.contentMax - readConfig.share.content.length < 0) ? 'notice' : '');
		contentNum.push(_contentConfig.contentMax - readConfig.share.content.length);
		if (typeof(__userConfig__) != 'undefined') {
			if (typeof(__userConfig__.__uface) != 'undefined' && typeof(__userConfig__.__unick) != 'undefined') {
				userInfo.push(__userConfig__.__uface ? __userConfig__.__uface : _contentConfig.basePath + _contentConfig.headimgsrc);
				userInfo.push(__userConfig__.__unick ? __userConfig__.__unick : '新浪用户');
			} else {
				userInfo.push(_contentConfig.basePath + _contentConfig.headimgsrc);
				userInfo.push('新浪用户');
			}
		} else {
			userInfo.push(_contentConfig.basePath + _contentConfig.headimgsrc);
			userInfo.push('新浪用户');
		}
		arr.push('<section>');
		arr.push('<div class="shareBg" id="' + _platBox.findId.sharefloat + '">');
		arr.push('<div class="sharebox">');
		arr.push('<div class="float_cross fTitle" id="' + _platBox.findId.floatCross + '" data-sudaclick="public_share_close"></div>');
		arr.push('<div class="shareTitle fTitle" id="' + _platBox.findId.sharetitle + '">分享至微博</div>');
		arr.push('<div class="shareZone">');
		arr.push('<div class="platforms_big ' + _platBox.findClass.platforms_big + '">');
		arr.push('<ul>');
		arr.push('<li>');
		arr.push('<span class="' + _platBox.findClass.shareIcon + ' splat_ico sina_big" data-platform="' + _platforms.sweibo[0] + '" data-sudaclick="public_sinaweibo"></span>');
		arr.push('<p>' + _platforms.sweibo[1] + '</p>');
		arr.push('</li>');
		arr.push('<li>');
		arr.push('<span class="' + _platBox.findClass.shareIcon + ' splat_ico friend_big" data-platform="' + _platforms.friend[0] + '" data-sudaclick="public_wechatfriends"></span>');
		arr.push('<p>' + _platforms.friend[1] + '</p>');
		arr.push('</li>');
		arr.push('<li>');
		arr.push('<span class="' + _platBox.findClass.shareIcon + ' splat_ico fcircle_big" data-platform="' + _platforms.fsircle[0] + '" data-sudaclick="public_wechattimeline"></span>');
		arr.push('<p>' + _platforms.fsircle[1] + '</p>');
		arr.push('</li>');
		arr.push('</ul>');
		arr.push('</div>');
		arr.push('<div class="sinaShareContent ' + _platBox.findClass.sinaShareContent + '">');
		arr.push('<div class="sinaInfo" id="' + _platBox.findId.userInfo + '">');
		arr.push('<span class="user_img" id="' + _platBox.findId.userImg + '">');
		arr.push('<img src="' + userInfo[0] + '"  style="width:100%;height:100%;"\/>‘');
		arr.push('</span>');
		arr.push('<span class="user_name" id="' + _platBox.findId.userName + '">' + userInfo[1] + '</span>');
		arr.push('</div>');
		arr.push('<div class="icontent ' + _platBox.findClass.shareContentZone + '">');
		arr.push('<textarea class="ishare_content" id="' + _platBox.findId.shareContentid + '">' + (readConfig.share.content ? readConfig.share.content : readConfig.share.shorttitle) + '</textarea>');
		arr.push('<span class="ishare_img">');
		arr.push('<img class="shareimg_style" src="' + (__docConfig.__mainPic ? __docConfig.__mainPic : _contentConfig.shareimgsrc) + '" id="' + _platBox.findId.shareImg + '" style="width:32px;height:32px"/>');
		arr.push('</span>');
		arr.push('<span class="ishare_num"><span class="  ' + contentNum[0] + '" id="' + _platBox.findId.sharecnum + '">' + contentNum[1] + '</span>字</span>');
		arr.push('</div>');
		arr.push('<button class="isubmit ' + _platBox.findClass.submitBtn + '" data-sudaclick="public_sinashare_submit">立即分享</button>');
		arr.push('</div>');
		arr.push('</div>');
		arr.push('</div>');
		arr.push('</div>');
		arr.push('</section>');
		$('body').append(arr.join(''));
		_initFloatListner();
		return;
	}

	function _initFloatListner() {
		_addFloatShareListner();
		_addCloseListner();
		_addContentListner(true);
		_addSubmitListner();
		$('.shareBg').css("height", (bodyHeight + 50) + "px");
	}

	function getEvent() {
		if (document.all) return window.event;
		func = getEvent.caller;
		while (func != null) {
			var arg0 = func.arguments[0];
			if (arg0) {
				if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
					return arg0;
				}
			}
			func = func.caller;
		}
		return null;
	}
	this.wantShare = function(isTrue) {
		if (isTrue) {
			_updata();
		}
		if ($('.shareBg').length <= 0) {
			_creatShareFloat();
		}
		_showRemind();
		if ((isqqBrowser > bLevel.qq.lower || isucBrowser) && !isWeixin) {
			_shareLayerStatus(_floatstatus.platlist);
		} else {
			_goSinaShare();
		}
	}

	function _addFloatShareListner() {
		$('.' + _platBox.findClass.shareIcon).on('click',
			function() {});
	}

	function _addShareListner() {
		window.addEventListener('click',
			function(ev) {
				var tarObj = ev.target || getEvent().target,
					obj = _updata($(tarObj));
				if (($(tarObj).hasClass(_platBox.findClass.shareBtn) || $(tarObj).parents('.j_share_btn').length > 0 || $(tarObj).parents('.' + _platBox.findClass.shareBtn).length > 0) && window.ishare) {
					_preventEvent(ev);
					self.wantShare();
				} else if ($(tarObj).hasClass(_platBox.findClass.shareIcon)) {
					if ($('.shareBg').length <= 0) {
						_creatShareFloat();
					}
					_showRemind();
					if (obj._platform == _platforms.sweibo[0]) {
						_goSinaShare();
					} else if (isucBrowser) {
						$('#j_comment_nav').hide();
						setTimeout(function() {
								myfunction(obj._obj, obj._title, obj._content, localhref, obj._platform);
							},
							300);
						setTimeout(function() {
								$('#j_comment_nav').show();
							},
							600);
					} else {
						myfunction(obj._obj, obj._title, obj._content, localhref, obj._platform);
					}
				}
				var loginMask = $('#ST_outLogin_mask'),
					shareFloat = $('#j_sharebox');
				if (loginMask.length > 0 && shareFloat.length > 0 && shareFloat.css('display') != 'none') {
					if (loginMask.css('display') != 'none') {
						_hideFloatCross(true);
					} else if (loginMask.css('display') == 'none') {
						_hideFloatCross(false);
					}
				}
			});
	}

	function _hideFloatCross(isTrue) {
		if (isTrue) {
			$('#j_sharecross').hide();
		} else {
			$('#j_sharecross').show();
		}
	}

	function _updata(pobj) {
		var objr = {
			_obj: _platBox.findId.spicid,
			_title: readConfig.share.shorttitle ? readConfig.share.shorttitle : $('title').html(),
			_content: readConfig.share.content ? readConfig.share.content : $("title").html(),
			_url: _shareDocUrl ? _shareDocUrl : __docConfig.__docUrl,
			_platform: pobj ? pobj.data('platform') : ''
		};
		_shareContent.iTitle = objr._title;
		_shareContent.iContent = objr._content;
		_shareContent.iImgsrc = __docConfig.__mainPic ? __docConfig.__mainPic : ($('#' + objr._obj).attr('src') ? $('#' + objr._obj).attr('src') : _contentConfig.shareimgsrc);
		_shareContent.iUrl = objr._url;
		_shareContent.iBackurl = objr._url;
		_shareContent.isdoc = readConfig.share.isdoc ? readConfig.share.isdoc : 0;
		return objr;
	}

	function _goSinaShare() {
		var leavenum = _contentConfig.contentMax - _shareContent.iContent.length;
		$("#" + _platBox.findId.shareContentid).text(_shareContent.iContent);
		$('#' + _platBox.findId.sharecnum).html(leavenum);
		if (leavenum < 0) {
			$('#' + _platBox.findId.sharecnum).addClass('notice');
			$('.' + _platBox.findClass.submitBtn).addClass(_platBox.findClass.forbid);
		} else {
			$('#' + _platBox.findId.sharecnum).removeClass('notice');
			$('.' + _platBox.findClass.submitBtn).removeClass(_platBox.findClass.forbid);
		}
		$('#' + _platBox.findId.shareImg).attr('src', _shareContent.iImgsrc);
		_shareLayerStatus(_floatstatus.share);
	}

	function _addCloseListner() {
		$('#' + _platBox.findId.floatCross).on('click ',
			function() {
				_shareLayerStatus(_floatstatus.fade);
			});
		return;
	}
	var inputTop = '',
		bodyHeight = document.documentElement.clientHeight;

	function _addContentListner(flag) {
		var $sinaShare = $('.' + _platBox.findClass.sinaShareContent),
			$contentzone = $('.' + _platBox.findClass.shareContentZone),
			$contentedit = $('#' + _platBox.findId.shareContentid),
			$userInfo = $('.' + _platBox.findClass.sinaInfo),
			$sharefloat = $('#' + _platBox.findId.sharefloat),
			$leavenum = $('#' + _platBox.findId.sharecnum),
			$submitbtn = $('.' + _platBox.findClass.submitBtn);
		var touchEvent = function() {
			if ($sinaShare.css('display') == 'block') {
				var $contentVal = document.getElementById(_platBox.findId.shareContentid).value,
					$leaveval = _contentConfig.contentMax - $contentVal.length;
				$leavenum.html($leaveval);
				if ($leaveval < 0 || $leaveval == _contentConfig.contentMax) {
					$leavenum.addClass('notice');
					$submitbtn.addClass(_platBox.findClass.forbid);
				} else {
					$leavenum.removeClass('notice');
					$submitbtn.removeClass(_platBox.findClass.forbid);
				}
				_shareContent.iContent = $contentVal;
			}
		};
		if (!flag) {
			$contentzone.css({
				height: '140px'
			});
			$contentedit.attr('rows', _contentConfig.contentRows[1]);
		} else {
			$('#' + _platBox.findId.shareContentid).on('click tap',
				function() {
					var txt = $contentedit.html();
					_showRemind();
					$contentedit.focus();
				}).on('keyup', touchEvent).focus(function() {
				$contentzone.css({
					height: '85px'
				});
				$(this).attr('rows', _contentConfig.contentRows[0]);
				$('.sharebox').css({
					'margin-top': '40px'
				});
				$('.shareBg').css("height", (bodyHeight + 50) + "px");
			}).blur(function() {
				$(this).attr('rows', _contentConfig.contentRows[1]);
				$('.sharebox').css({
					'margin-top': '10px'
				});
				$('.shareBg').css("height", (bodyHeight + 10) + "px");
			});
			document.addEventListener('touchend', touchEvent, false);
		}
		return;
	}

	function _addSubmitListner() {
		$('.' + _platBox.findClass.submitBtn).each(function() {
			$(this).on('click',
				function() {
					_showRemind();
					if (!$(this).hasClass(_platBox.findClass.forbid))
						_sinaShare();
				})
		});
		return;
	}
	var handler = function(event) {
		event.preventDefault();
	};

	function _wrapScrollListner(cStatus) {
		var bodyListener = document.body;
		if (cStatus) {
			$(document.body).css({
				"overflow": "hidden",
				"position": "absolute",
				"top": "0px"
			});
		} else {
			$(document.body).css({
				"overflow": "auto",
				"position": "relative"
			});
		}
		return;
	}
	var curTop = document.body.scrollTop,
		oMeta = document.getElementsByName('viewport')[0],
		mateContent = {
			hide: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui",
			show: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
		},
		isScrollTop = false;

	function _shareLayerStatus(sStatus, callback, arg1) {
		sStatus = sStatus ? sStatus : _floatstatus.login;
		switch (sStatus) {
			case _floatstatus.login:
				loginStatus(callback, arg1);
				break;
			case _floatstatus.platlist:
				if (!isScrollTop) {
					curTop = document.body.scrollTop;
				}
				oMeta.content = mateContent.hide;
				setTimeout(function() {
						window.scrollTo(0, 1);
					},
					200);
				isScrollTop = true;
				_hideBody(true);
				_showBg(_platBox.findId.sharefloat, true);
				_showEle(_platBox.findId.floatCross, true);
				_showEle(_platBox.findId.sharetitle, false);
				floatZoneStatus('.' + _platBox.findClass.platforms_big, true, _floatstatus.platlist);
				floatZoneStatus('.' + _platBox.findClass.sinaShareContent, false, _floatstatus.share);
				break;
			case _floatstatus.share:
				if (__userConfig__.__isLogin) {
					if (!isScrollTop) {
						curTop = document.body.scrollTop;
					}
					oMeta.content = mateContent.hide;
					setTimeout(function() {
							window.scrollTo(0, 1);
						},
						200);
					isScrollTop = true;
					_hideBody(true);
					_showBg(_platBox.findId.sharefloat, true);
					_showEle(_platBox.findId.floatCross, true);
					_showEle(_platBox.findId.sharetitle, true);
					updateUserInfo();
					if ($('#j_user_img').find('img').attr('src') == window.location.href || $('#j_user_img').find('img').attr('src') == "") {
						_getUserInfo();
					}
					floatZoneStatus('.' + _platBox.findClass.platforms_big, false, _floatstatus.platlist);
					floatZoneStatus('.' + _platBox.findClass.sinaShareContent, true, _floatstatus.share);
				} else {
					myLogin(__userConfig__.__isLogin, _shareLayerStatus, _floatstatus.share);
				}
				break;
			case _floatstatus.fade:
				oMeta.content = mateContent.show;
				_hideBody(false);
				_showBg(_platBox.findId.sharefloat, false);
				_showEle(_platBox.findId.floatCross, true);
				floatZoneStatus('.' + _platBox.findClass.platforms_big, false, _floatstatus.platlist);
				floatZoneStatus('.' + _platBox.findClass.sinaShareContent, false, _floatstatus.share);
				_addContentListner(false);
				favorEvent($('.' + _platBox.findClass.addFavor), false);
				if (isScrollTop) {
					document.body.scrollTop = curTop;
				}
				isScrollTop = false;
				break;
			default:
				break;
		}
		return;
	}

	function myLogin(login, callback, cbparam, cbparam1) {
		if (!__userConfig__.__isLogin) {
			waplogin.login(login, callback, cbparam, cbparam1);
		}
	}

	function _preventEvent(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
		return false;
	}

	function _hideBody(isTrue) {
		var bodyObj = $(document.body),
			body = bodyObj.children();
		for (var o = 0; o < body.length; o++) {
			if (body[o].tagName != 'SCRIPT' && body[o].tagName != 'NOSCRIPT' && $(body[o]).find('.shareBg').length <= 0) {
				if (isTrue && $(body[o]).css('display') != 'none') {
					$(body[o]).data('show', 'show');
					$(body[o]).hide();
				} else if (!isTrue) {
					if ($(body[o]).data('show') == 'show' && $(body[o]).css('display') == 'none') {
						$(body[o]).show();
					} else {
						$(body[o]).data('show', '');
					}
				}
			}
		}
	}

	function updateUserInfo() {
		$('#' + _platBox.findId.userImg).find('img').attr('src', __userConfig__.__uface);
		$('#' + _platBox.findId.userName).html(__userConfig__.__unick);
	}

	function floatZoneStatus(obj, pStatus, isZoneFlag) {
		var oBox = $(obj),
			tBox = (isZoneFlag == _floatstatus.platlist) ? oBox.find('li') : oBox,
			flag = pStatus ? 1 : 0,
			animation = pStatus ? _contentConfig.animate[0] : '',
			pDisplay = pStatus ? 'block' : 'none';
		if (pStatus) {
			oBox.css({
				'opacity': 0
			});
			setTimeout(function() {
					oBox.css({
						'opacity': flag
					});
				},
				250);
			tBox.css({
				'-webkit-animation-name': animation,
				'opacity': flag,
				'display': pDisplay
			});
			if (tBox != oBox) {
				oBox.css({
					'display': pDisplay
				});
			}
		} else {
			tBox.css({
				'-webkit-animation-name': animation,
				'opacity': flag,
				'display': pDisplay
			});
			oBox.css({
				'opacity': flag,
				'display': pDisplay
			});
		}
		return;
	}

	function _showBg(obj, flag) {
		var $sBox = $('#' + obj),
			$sBoxDisplay = $sBox.css('display');
		if ($sBoxDisplay == 'none' && flag)
			$sBox.show(3000);
		else if ($sBoxDisplay != 'none' && !flag)
			$sBox.hide('fast');
		return;
	}

	function _showEle(obj, flag) {
		if (!flag)
			$('#' + obj).hide();
		else {
			$('#' + obj).show();
		}
		return;
	}

	function loginStatus(callback, arg1) {
		_showBg(_platBox.findId.sharefloat, false);
		if (typeof(callback) != 'undefined' && typeof(arg1) != 'undefined') {
			myLogin(__userConfig__.__isLogin, callback, arg1);
		} else if (typeof(callback) != 'undefined') {
			myLogin(__userConfig__.__isLogin, callback);
		} else {
			myLogin(__userConfig__.__isLogin);
		}
	}

	function _getUserInfo() {
		var url = _contentConfig.userInfoUrl + 'userCallback';
		_jsonp(url);
		return;
	}
	window.userCallback = function(re) {
		__userConfig__.__uface = re.result.data.userface;
		__userConfig__.__unick = re.result.data.uname;
		$('#' + _platBox.findId.userImg).find('img').attr('src', __userConfig__.__uface);
		$('#' + _platBox.findId.userName).html(__userConfig__.__unick);
		return;
	}

	function _sudaLog(sudaName) {
		var obj = {
			'name': sudaName,
			'type': '',
			'title': '',
			'index': '',
			'href': ''
		};
		if (typeof(window.suds_count) == 'function' || window.suds_count) {
			window.suds_count && window.suds_count(obj);
		}
	}

	function _creatDOM() {
		$('head').append('<link rel="stylesheet" type="text/css" href="' + _contentConfig.cssPath + '"></link>');
		_creatOperate();
		return;
	}

	function _initUserInfo() {
		if (checkLogin()) {
			getUserInfo(function(rs) {
				__userConfig__.__isLogin = true;
				__userConfig__.__uface = rs.userface;
				__userConfig__.__unick = rs.uname;
				__userConfig__.__uid = rs.uid;
			});
		}
	}
	this.init = function() {
		_creatDOM();
		setTimeout(function() {
				_initUserInfo();
				_addFloatShareListner();
				_addShareListner();
				_addVoteInit();
				_addFavorInit();
			},
			2200);
		return;
	}
	return;
}

function isloadqqApi() {
	var share = new MyShareClass();
	if (isqqBrowser) {
		var qjsrc = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher,
			qj = document.createElement('script'),
			body = document.getElementsByTagName('body')[0];
		qj.onload = function() {
			share.init();
		};
		qj.setAttribute('src', qjsrc);
		body.appendChild(qj);
	} else {
		share.init();
	}
	return;
}

function getPlantform() {
	ua = navigator.userAgent;
	if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
		return 'iPhone';
	}
	return 'Android';
}

function is_weixin() {
	var ua = UA.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

function getVersion(str) {
	var arr = str.split('.'),
		version = parseFloat(arr[0] + '.' + arr[1]);
	return version;
}

function init() {
	platform_os = getPlantform();
	version.qq = isqqBrowser ? getVersion(UA.split('MQQBrowser/')[1]) : 0;
	version.uc = isucBrowser ? getVersion(UA.split('UCBrowser/')[1]) : 0;
	isWeixin = is_weixin();
	if ((isqqBrowser && version.qq < 5.4 && platform_os == 'iPhone') || (isqqBrowser && version.qq < 5.3 && platform_os == 'Android')) {
		isqqBrowser = bLevel.qq.forbid;
	} else if (isqqBrowser && version.qq < 5.4 && platform_os == 'Android') {
		isqqBrowser = bLevel.qq.lower;
	} else if (isucBrowser && ((version.uc < 10.2 && platform_os == 'iPhone') || (version.uc < 9.7 && platform_os == 'Android'))) {
		isucBrowser = bLevel.uc.forbid;
	}
	isloadqqApi();
	return;
}
setTimeout(function() {
		init();
	},
	300);
(function() {
	var hexcase = 0;
	var b64pad = "";
	var chrsz = 8;
	window.hex_md5 = function(s) {
		return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	}

	function b64_md5(s) {
		return binl2b64(core_md5(str2binl(s), s.length * chrsz));
	}

	function str_md5(s) {
		return binl2str(core_md5(str2binl(s), s.length * chrsz));
	}

	function hex_hmac_md5(key, data) {
		return binl2hex(core_hmac_md5(key, data));
	}

	function b64_hmac_md5(key, data) {
		return binl2b64(core_hmac_md5(key, data));
	}

	function str_hmac_md5(key, data) {
		return binl2str(core_hmac_md5(key, data));
	}

	function md5_vm_test() {
		return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
	}

	function core_md5(x, len) {
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return Array(a, b, c, d);
	}

	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function core_hmac_md5(key, data) {
		var bkey = str2binl(key);
		if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
		var ipad = Array(16),
			opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
		return core_md5(opad.concat(hash), 512 + 128);
	}

	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}

	function bit_rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	}

	function str2binl(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz)
			bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
		return bin;
	}

	function binl2str(bin) {
		var str = "";
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += chrsz)
			str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
		return str;
	}

	function binl2hex(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
				hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
		}
		return str;
	}

	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
				else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
			}
		}
		return str;
	}
})()