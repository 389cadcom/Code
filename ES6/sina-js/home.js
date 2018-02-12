/**
 * 手机新浪网-浪首基础函数
 * @author		张晶磊(jinglei@) 赵轩昂(xuanang@)
 * @date		2015-3-12
 * @modify		xuanang@staff.sina.com.cn
 */

//trim函数
function trim(str){
	var newStr = str.replace(/^\s*$/g, '');
	return newStr;
};

//事件绑定函数
function bindEvent(obj, ev, fn){
	//通过document 判断是否是IE
	//是IE
	if(!document.addEventListener){
		obj.attachEvent(ev,fn);   //鼠标点击时触发此事件
	}
	//非IE浏览器，火狐
	else{
		obj.addEventListener(ev,fn,false);
	}
};

//事件解绑函数
function delEvent(obj, ev, fn){
	//通过document 判断是否是IE
	//是IE
	if(!document.removeEventListener){
		obj.detachEvent(ev,fn);   //鼠标点击时触发此事件
	}
	//非IE浏览器，火狐
	else{
		obj.removeEventListener(ev,fn,false);
	}
};

//添加样式函数
function addClass(obj, sClass){
	var re=new RegExp('\\b'+sClass+'\\b');

	if(obj.length>1){
		for(var i=0;i<obj.length;i++){
			if(!re.test(obj[i].className)){
				if(obj[i].className){
					obj[i].className+=' '+sClass;
				}
				else{
					obj[i].className=sClass;
				}
			}
		}
	}
	else{
		if(!re.test(obj.className)){
			if(obj.className){
				obj.className+=' '+sClass;
			}
			else{
				obj.className=sClass;
			}
		}
	};
	return obj;
};

//移除样式函数
function removeClass(obj,sClass){
	var re=new RegExp('\\b'+sClass+'\\b', 'g');

	if(obj.length>1){
		for(var i=0;i<obj.length;i++){
			obj[i].className=obj[i].className.replace(re, '').replace(/\s+/g, ' ');
		}
	}
	else{
		obj.className=obj.className.replace(re, '').replace(/\s+/g, ' '); 
	};
	return obj;
};

//script方式异步加载
function createScript(url){
	var head = document.getElementsByTagName('head')[0],
		script = document.createElement('script');

	script.src = url;
	script.charset = 'utf-8';
	head.appendChild(script);
}

//ajax方式异步get数据
function _ajax(url, success, failure){

    var xhr = null;
    if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xhr = new XMLHttpRequest();
    }
    xhr.onreadystatechange = function(){
    	if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
    		success(JSON.parse(xhr.responseText));
    	}else{ 
    		failure();
    	}
    }
    xhr.open('get', url, false); 
    xhr.send(null);
}

//获取窗口宽度
function getWinWidth(){
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
};

//获取窗口高度
function getWinHeight(){
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
};

//文档滚动条的高度
function getWinScrollHeight(){
	return document.documentElement.scrollTop || document.body.scrollTop;
};


/**
 * 手机新浪网-浪首静态交互功能
 * @author		张晶磊(jinglei@) 赵轩昂(xuanang@)
 * @date		2015-3-12
 * @modify		xuanang@staff.sina.com.cn
 */

/** 新闻列表展开 **/
function newsMore(){
	var newsMoreBtn = document.querySelectorAll('.j_newsBtn');

	for (var i=0; i<newsMoreBtn.length; i++) {
		bindEvent(newsMoreBtn[i], 'click', function(){
			var news = this.parentNode.previousElementSibling || this.parentNode.previousSibling,
			    more = this.nextElementSibling || this.nextSibling,
			    children = news.querySelectorAll('.hide');

			for(var i = 0; i < children.length; i++){
			    removeClass(children[i], 'hide'); 
			}
			removeClass(this, 'show');
			addClass(this, 'hide');	
			removeClass(more, 'hide');
			addClass(more, 'show');
		});
	}
}

/** 图片等高 **/
function picHeight(){
	var newsPicDt = document.querySelectorAll('.j_newspic_dt'),
		newsPicDd = document.querySelectorAll('.j_newspic_dd');

    var picWidth = Math.ceil((getWinWidth() - 24 -4)/2),
        picHeight = Math.floor(picWidth*3/4)-5,
        initPicDom = document.querySelectorAll('.news_pic_items a'),
        initNewsPicDD = document.querySelectorAll('.j_newspic_dd a');

	if(newsPicDt && newsPicDd){
		for(var i = 0; i < newsPicDt.length; i++){ 
			newsPicDt[i].style['height'] = newsPicDd[i].offsetHeight -4 +'px';
		}
        for(var i = 0; i < initNewsPicDD.length; i++){
            initNewsPicDD[i].style['height'] = picHeight  +'px';
        }
	}


    for(var i = 0; i < initPicDom.length; i++){
        initPicDom[i].style['height'] = picHeight +'px';
    }
}

/** 返回顶部+图片延时加载 **/
function scrollTop(){
	var topBtn = document.querySelector('.j_topBtn'),
		wHeight = getWinHeight(),
		pHeight = wHeight*1.5,
		sHeight = getWinScrollHeight(),
		removeTimer,
		aNavTab = document.querySelectorAll('.news_module');
   
    function imgLoad(){ 
    	var curIndex = getCurIndex(), 
    	    images = aNavTab[curIndex] ? aNavTab[curIndex].querySelectorAll('img') : [],
    	    images_1 = aNavTab[curIndex - 1] ? aNavTab[curIndex - 1].querySelectorAll('img') : [],
		    images1 = aNavTab[curIndex + 1] ? aNavTab[curIndex + 1].querySelectorAll('img') : [];
		if(images.length > 0){ 
			for(var i = 0; i < images.length; i++){ 
				if(images[i].getAttribute('data-src') && images[i].getAttribute('data-src') != images[i].src){  
					images[i].src = images[i].getAttribute('data-src');
				}
			}
		}
		if(images1.length > 0){ 
			for(var i = 0; i < images1.length; i++){ 
				if(images1[i].getAttribute('data-src') && images1[i].getAttribute('data-src') != images1[i].src){  
					images1[i].src = images1[i].getAttribute('data-src');
				}
			}
		}
		if(images_1.length > 0){ 
			for(var i = 0; i < images_1.length; i++){ 
				if(images_1[i].getAttribute('data-src') && images_1[i].getAttribute('data-src') != images_1[i].src){  
					images_1[i].src = images_1[i].getAttribute('data-src');
				}
			}
		}
		picHeight();			// 图片等高 
    }
    imgLoad();

	bindEvent(window, 'scroll', function(event){
		// 超过三屏并且判断上滑
		if(getWinScrollHeight() > pHeight && getWinScrollHeight() < sHeight){
			addClass(topBtn, 'showbtn');
			if (removeTimer) {
				clearTimeout(removeTimer);
			};
			removeTimer = setTimeout(function(){
				removeClass(topBtn, 'showbtn');	
			},3000);
		}else{
			removeClass(topBtn, 'showbtn');
		}
		imgLoad();
		sHeight = getWinScrollHeight();
	});

	bindEvent(topBtn, 'click', function(){
		window.scrollTo(0,0);
	});
		 

}

/*iRoller组件*/
var IRoller = function(id){ 
	this.wrap = document.getElementById(id);
	this.rollItem = this.wrap.children;
	this.len = this.rollItem.length;
	this.currentNum = 0;
	this._height = this.wrap.offsetHeight;
	this.interval = 3000;
	this.timer = null;
	this.firstInit = true;
    if(this.wrap.children.length < 2){
    	return;
    }else if(this.wrap.children.length == 2){ 
    	this.wrap.appendChild(this.rollItem[0].cloneNode(true));
        this.wrap.appendChild(this.rollItem[1].cloneNode(true));
        this.rollItem = this.wrap.children;
	    this.len = this.rollItem.length;
    }
    this.round = function(alt){ 
    	if(this.currentNum + alt < 0){ 
			return this.currentNum + alt + this.len;
		}else if(this.currentNum + alt > this.len - 1){
		    return this.currentNum + alt - this.len;
		}else{ 
			return this.currentNum + alt;
		}
    };
    this.translate = function(slide, dist, speed){ 
		var ua = navigator.userAgent.toLowerCase(),
		    style = slide && slide.style;

		// 指定对象过渡持续的时间(默认值是0，意味着不会有效果)
        style.webkitTransitionDuration = 
        style.MozTransitionDuration = 
        style.msTransitionDuration = 
        style.OTransitionDuration = 
        style.transitionDuration = speed + 'ms';

        style.webkitTransitionTimingFunction = 
        style.MozTransitionTimingFunction = 
        style.msTransitionTimingFunction = 
        style.OTransitionTimingFunction = 
        style.transitionTimingFunction = 'ease-in-out';

        // 定义3D转换，沿着X轴移动元素
        if (ua.indexOf('gt-') != -1) {
            style.webkitTransform = 'translateY(' + dist + 'px)';
        } else {
            //style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
            style.webkitTransform = 'translate3d(0, ' + dist + 'px, 0)';
        }
        style.msTransform = 
        style.MozTransform = 
        // 定义2D转换，沿着X轴移动元素
        style.OTransform = 'translateY(' + dist + 'px)';
	};
    this.setAnimation = function(){ 
    	var _this = this;
    	for(var i = 0; i < _this.len; i++){ 
    		if(i == _this.round(-1)){
    		    if(_this.firstInit){
    		    	_this.translate(_this.rollItem[i], - _this._height, 0);
    		    }else{ 
    		    	_this.translate(_this.rollItem[i], - _this._height, 1000);
    		    } 
    			_this.rollItem[i].style['z-index'] = 5;
    		}else if(i == _this.round(1)){ 
    			if(_this.firstInit){
    		    	_this.translate(_this.rollItem[i], _this._height, 0);
    		    }else{ 
    		    	_this.translate(_this.rollItem[i], _this._height, 1000);
    		    } 
    			_this.rollItem[i].style['z-index'] = 5;
    		}else if(i == _this.currentNum){ 
    			if(_this.firstInit){
    		    	_this.translate(_this.rollItem[i], 0, 0);
    		    }else{ 
    		    	_this.translate(_this.rollItem[i], 0, 1000);
    		    } 
    			_this.rollItem[i].style['z-index'] = 5;
    		}else{ 
    			_this.translate(_this.rollItem[i], _this._height, 0);
    			_this.rollItem[i].style['z-index'] = 1;
    		}
    	}
    };
    this.init = function(){ 
    	var _this = this;
    	_this.setAnimation();
    	_this.timer = setInterval(function(){ 
    		_this.currentNum = _this.round(1);
    		_this.firstInit = false;
    		_this.setAnimation();
    	}, _this.interval);
    };
    this.init();
}

/*swipe组件*/
var Swiper = function(ele, tab, config){ 
	this.wrap = ele;
	this.tabs = tab ? tab.children : null;
    this.currentNum = config.startIndex || 0; 
    this.auto = config.auto && true;
    this.interval = config.interval || 3000;
    this.speed = config.speed || 300;
    this.maxHeight = config.maxHeight || Infinity;   
    this.callback = config.callback || null;
    this.circular = config.circular || false;

    this.innerWrap = this.wrap.children[0];
	this.items = this.innerWrap.children;
    this.len = this.items.length;

    if(this.len == 0){ 
    	return;
    }else if(this.len == 1){ 
        this.wrap.style['height'] = this.items[0].offsetHeight;
        this.wrap.style['width'] = this.items[0].offsetWidth;
        return;
    }else if(this.len == 2 && this.circular){ 
    	//只有两个item的情况只有需要循环切换的时候才复制为4个
    	this.innerWrap.appendChild(this.items[0].cloneNode(true));
        this.innerWrap.appendChild(this.items[1].cloneNode(true));
        this.len = 4;
    }
    this._width = 0; 
    this._height = 0;
    this.X = 0;
    this.curX = 0;
    this.Y = 0;
    this.curY = 0;
    this.direction = 0;
    this.eventInit = false;
    this.firstInit = false;
	this.slideTimer = null;
	this.timerCleared = false;
	this.isScrolling = false;
	this.isValidSlide = false;
    this.init();
}

Swiper.prototype = { 
	init : function(){ 
		var _this = this;
		_this.wrap.style['position'] = 'relative';
		_this.innerWrap.style['position'] = 'relative';
		_this._width = _this.wrap.getBoundingClientRect().width || _this.wrap.offsetWidth; 
        _this._height = Math.min(_this.items[_this.currentNum].getBoundingClientRect().height || _this.items[_this.currentNum].offsetHeight, _this.maxHeight);
		_this.innerWrap.style['width'] = _this._width + 'px';
		_this.innerWrap.style['height'] = _this._height + 'px';
		for(var i = 0; i < _this.len; i++){
			_this.items[i].style['position'] = 'absolute';
			_this.items[i].style['left'] = '0';
			_this.items[i].style['top'] = '0';
		}
		_this.firstInit = true;
		_this.gotoPage(_this.currentNum);
		if(!_this.eventInit){
			_this.addEvent();
			_this.eventInit = true;
		}
		if(_this.auto && !_this.timerCleared){ 
			_this._stop();
			_this.slideTimer = setInterval(function(){ 
				_this.gotoPage(_this.round(1));
			}, _this.interval);
			_this.timerCleared = false;
		}
	},
	touchX : function(e){
		if(e.touches){
			return e.touches[0].pageX;
		}else{
			return e.pageX; 
		}
	},
	touchY : function(e){
		if(e.touches){
			return e.touches[0].pageY;
		}else{
			return e.pageY; 
		}
	},
	setAnimation : function(){ 
        var items = this.items,
            tabs = this.tabs,
            len = this.len,
            speed = this.speed,
            w = this._width,
            n1 = this.round(1),
            n_1 = this.round(-1), 
            n = this.currentNum;

        for(var i = 0; i < len; i++){
        	if(this.circular){ 
                //可循环时只规定中间三组位置，其余叠放
        		if(i == n1){
	            	if(!this.firstInit && !this.timerCleared){
	            		this.translate(items[i], w, speed);
	            	}else{ 
	            		this.translate(items[i], w, 0);
	            	}
	            	items[i].style['display'] = 'block';
	            }else if(i == n_1){ 
	            	if(!this.firstInit && !this.timerCleared){
	            		this.translate(items[i], - w, speed);
	            	}else{ 
	            		this.translate(items[i], - w, 0);
	            	}
	            	items[i].style['display'] = 'block';
	            }else if(i == n){ 
	            	if(!this.firstInit && !this.timerCleared){
	            		this.translate(items[i], 0, speed);
	            	}else{ 
	            		this.translate(items[i], 0, 0);
	            	}
	            	items[i].style['display'] = 'block';
	            }else{ 
	            	items[i].style['display'] = 'none';
	            	this.translate(items[i], - w, speed);
	            }
        	}else{ 
        		//不可循环时需要按照顺序错开摆放所有元素位置
        		if(!this.firstInit){
	            		this.translate(items[i], (i - n) * w, speed);
	            	}else{ 
	            		this.translate(items[i], (i - n) * w, 0);
	            	}
            	items[i].style['display'] = 'block';
        	}
        }
        this.firstInit = false;
        if(this.maxHeight === Infinity)this.innerWrap.style['height'] = this.items[n].offsetHeight + 'px';
	},
	translate : function(slide, dist, speed){ 
		var ua = navigator.userAgent.toLowerCase(),
		    style = slide && slide.style;

		// 指定对象过渡持续的时间(默认值是0，意味着不会有效果)
        style.webkitTransitionDuration = 
        style.MozTransitionDuration = 
        style.msTransitionDuration = 
        style.OTransitionDuration = 
        style.transitionDuration = speed + 'ms';

        style.webkitTransitionTimingFunction = 
        style.MozTransitionTimingFunction = 
        style.msTransitionTimingFunction = 
        style.OTransitionTimingFunction = 
        style.transitionTimingFunction = 'ease-in-out';

        // 定义3D转换，沿着X轴移动元素
        if (ua.indexOf('gt-') != -1) {
            style.webkitTransform = 'translateX(' + dist + 'px)';
        } else {
            //style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
            style.webkitTransform = 'translate3d(' + dist + 'px, 0, 0)';
        }
        style.msTransform = 
        style.MozTransform = 
        // 定义2D转换，沿着X轴移动元素
        style.OTransform = 'translateX(' + dist + 'px)';
	},
	switchTab : function(){
	    var tabs = this.tabs,
	        n = tabs ? this.currentNum % tabs.length : undefined;

		if(tabs && tabs.length > 0){ 
        	for(var i = 0; i < tabs.length; i++){ 
        		if(i == n){ 
        			addClass(tabs[n], 'on');
        		}else{
        			removeClass(tabs[i], 'on');
        		}
        	}
        }
	},
	slide : function(x){ 
		var _this = this,
		    w = _this._width,
		    n = _this.currentNum,
		    items = _this.items,
		    n1 = _this.round(1),
		    n_1 = _this.round(-1);
		if((!this.circular && n1 != -1 && n_1 != -1) || this.circular){ 
	        this.translate(items[n], x, 0);
	        this.translate(items[n1], w + x, 0);
	        this.translate(items[n_1], - w + x, 0);
		}
	},
	round : function(alt){ 
		if(this.circular){ 
			if(this.currentNum + alt < 0){ 
				return this.currentNum + alt + this.len;
			}else if(this.currentNum + alt > this.len - 1){
			    return this.currentNum + alt - this.len;
			}else{ 
				return this.currentNum + alt;
			}
		}else{ 
			if(this.currentNum + alt < 0 || this.currentNum + alt > this.len - 1){
			    return -1;
			}else{ 
				return this.currentNum + alt;
			}
		}
	},
	addEvent : function(){ 
        var slide = this.innerWrap,
            tabs = this.tabs,
            _this = this;

        bindEvent(slide, "touchstart", function(e){_this._touchstart(e);});
        bindEvent(slide, "touchmove", function(e){_this._touchmove(e);});
        bindEvent(slide, "touchend", function(e){_this._touchend(e);});
        bindEvent(window, "resize", function(){_this.init();});
        if(tabs && tabs.length > 0){
        	for(var i = 0; i  < tabs.length; i++){ 
	        	tabs[i].index = i;
	        	bindEvent(tabs[i], "click", function(){
	        		_this.gotoPage(this.index);
	        	});
	        }
	    }
	},
    _stop : function(){ 
    	if(!this.timerCleared){ 
        	clearInterval(this.slideTimer);
        	this.timerCleared = true;
        }
    },
	_touchstart : function(e){ 
        this.X = this.touchX(e);
        this.Y = this.touchY(e);
        this.isScrolling = undefined;
	},
	_touchmove : function(e){
		var _this = this,
		    deltaX,
		    deltaY;

    	_this.curX = _this.touchX(e);
    	_this.curY = _this.touchY(e);
        deltaX = _this.curX - _this.X;
        deltaY = _this.curY - _this.Y;
        if (typeof _this.isScrolling == 'undefined') {
            _this.isScrolling = !!(_this.isScrolling || Math.abs(deltaX) < Math.abs(deltaY));
        }
    	if(!_this.isScrolling){ 
    		e.preventDefault();
    		_this._stop();
    		_this.slide(deltaX);
    	}
	},
	_touchend : function(e){ 
		var _this = this,
		    slide = _this.innerWrap,
		    deltaX = 0,
		    deltaY = 0;
        
        if(_this.curX == 0){ 
        	_this.curX = _this.X;
        }
        if(_this.curY == 0){ 
        	_this.curY = _this.Y;
        }
        deltaX = _this.curX - _this.X;
        deltaY = _this.curY - _this.Y;
    	_this.curX = 0;
    	_this.curY = 0;
    	if(Math.abs(deltaX) > Math.abs(deltaY)){
    		if(Math.abs(deltaX) > 30){ 
    			_this.isValidSlide = true;
                _this.direction = deltaX > 0 ? 1 : 0;
	    	}else{ 
	    		_this.isValidSlide = false;
	    	}
	        if(_this.isValidSlide){
	        	var index = _this.direction == 1 ? _this.round(-1) : _this.round(1);
	        	_this.gotoPage(index);
	        }else{ 
	        	_this.setAnimation();
	        }
    	}
        delEvent(slide, "touchstart", function(e){_this._touchstart(e);});
        delEvent(slide, "touchmove", function(e){_this._touchmove(e);});
	},
	gotoPage : function(index){ 
		if(index != -1){ 
			this.currentNum = index;
	    	this.setAnimation();
	    	this.switchTab();
	    	this.callback(this.items[index], index, this.direction);
		}
	},
	kill : function(){
		var _this = this,
		    slide = _this.wrap,
		    tabs = _this.tabs;

        // 取消幻灯片
        this._stop();

        // 重置slide
        var pos = this.len;
        while (pos--) {
            var item = this.items[pos];
        	item.style['-webkit-transition-duration'] = '0s';
        	item.style['display'] = 'block';
    	    item.style['-webkit-transform'] = 'translate3d(0, 0, 0)';
        }

        delEvent(slide, "touchstart", function(e){_this._touchstart(e);});
        delEvent(slide, "touchmove", function(e){_this._touchmove(e);});
        delEvent(slide, "touchend", function(e){_this._touchend(e);});
        delEvent(window, "resize", function(){_this.init();});
        if(tabs && tabs.length > 0){
        	for(var i = 0; i  < tabs.length; i++){ 
	        	tabs[i].index = i;
	        	delEvent(tabs[i], "click", function(){
	        		_this.gotoPage(this.index);
	        	});
	        }
	    }
    }
};

/*iScroll组件*/
var IScroller = function(id){ 
	this.wrap = document.getElementById(id);
	this.parentW = 0;
	this.scrollItem = this.wrap.children;
    this.len = this.scrollItem.length;
    this._width = this.scrollItem[0].offsetWidth; 
    this._height = this.scrollItem[0].offsetHeight;
    this.actualW = this._width * this.len;
    this.currentPos = 0; 
    this.X = 0;
    this.curX = 0;
    this.Y = 0;
    this.curY = 0;
	this.isScrolling = false;
    this.init();
}

IScroller.prototype = { 
	init : function(){ 
		var _this = this;
		this.parentW = this.wrap.offsetWidth;
		_this.wrap.style['width'] = _this.actualW + 'px';
		_this.wrap.style['height'] = _this._height + 'px';
		if(_this.actualW > _this.parentW){
			_this.addEvent();
		}else{ 
			this.currentPos = 0;
		}
		_this.setAnimation();
	},
	touchX : function(e){
		if(e.touches){
			return e.touches[0].pageX;
		}else{
			return e.pageX; 
		}
	},
	touchY : function(e){
		if(e.touches){
			return e.touches[0].pageY;
		}else{
			return e.pageY; 
		}
	},
	setAnimation : function(){ 
        var _this = this,
            wrap = _this.wrap;
        wrap.style['-webkit-transition'] = '-webkit-transform 0.3s ease-in-out';
        wrap.style['-webkit-transform'] = 'translate3d('+ _this.currentPos +'px, 0, 0)';
	},
	slide : function(x){ 
		var _this = this,
            wrap = _this.wrap;
		wrap.style['-webkit-transition-duration'] = '0s';
        wrap.style['-webkit-transform'] = 'translate3d('+ (_this.currentPos + x) +'px, 0, 0)';
	},
	addEvent : function(){ 
        var slide = this.wrap,
            _this = this;

        bindEvent(slide, "touchstart", function(e){_this._touchstart(e);});
        bindEvent(slide, "touchmove", function(e){_this._touchmove(e);});
        bindEvent(slide, "touchend", function(e){_this._touchend(e);});
	},
	_touchstart : function(e){ 
        this.X = this.touchX(e);
        this.Y = this.touchY(e);
        this.isScrolling = undefined;
	},
	_touchmove : function(e){
		var _this = this,
		    deltaX,
		    deltaY;

    	_this.curX = _this.touchX(e);
    	_this.curY = _this.touchY(e);
        deltaX = _this.curX - _this.X;
        deltaY = _this.curY - _this.Y;
        if (typeof _this.isScrolling == 'undefined') {
            _this.isScrolling = !!(_this.isScrolling || Math.abs(deltaX) < Math.abs(deltaY));
        }
    	if(!_this.isScrolling){ 
    		e.preventDefault();
    		_this.slide(deltaX);
    	}
	},
	_touchend : function(e){ 
		var _this = this,
		    slide = _this.wrap,
		    deltaX = 0,
		    deltaY = 0;
        
        if(_this.curX == 0){ 
        	_this.curX = _this.X;
        }
        if(_this.curY == 0){ 
        	_this.curY = _this.Y;
        }
        deltaX = _this.curX - _this.X;
        deltaY = _this.curY - _this.Y;
    	_this.curX = 0;
    	_this.curY = 0;
    	if(Math.abs(deltaX) > Math.abs(deltaY)){
    		if(_this.currentPos + deltaX > 0){ 
    			_this.currentPos = 0;
    		}else{
        	    _this.currentPos = Math.max(_this.currentPos + deltaX, _this.parentW - _this.actualW);
        	}
        	_this.setAnimation();
    	}
        delEvent(slide, "touchstart", function(e){_this._touchstart(e);});
        delEvent(slide, "touchmove", function(e){_this._touchmove(e);});
	}
};

/*滚动新闻初始化*/
function rollInit(){ 
	var rolls = document.querySelectorAll('.j_roll');
	for(var i = 0; i < rolls.length; i++){ 
		rolls[i].id = 'iRoll' + i;
		var obj = new IRoller('iRoll' + i);
	}
}

/*类似猜你喜欢这样的异步加载模块，
 *统一在异步内容渲染成功后才对其实施swipe对象初始化，
 *而在以下的全页静态资源初始化时，如果尚未完成上述初始化，则置为null
*/

/*焦点图初始化*/
function slideStyleInit(){ 
	var slide = document.querySelector('.j_imgSlide'),
	    wrap = slide.children[0],
	    height = Math.ceil(getWinWidth() / 2);

	slide.style['height'] = height + 'px';
	wrap.style['height'] = height + 'px';
}

function tabInit(tabs, items){
	if(tabs.length > 0 && tabs.length === items.length){
		for(var i = 0; i < tabs.length; i++){ 
			tabs[i].index = i;
			if(i == 0){ 
				addClass(tabs[i], 'on');
		        removeClass(items[i], 'hide');
			}else{ 
				removeClass(tabs[i], 'on');
			    addClass(items[i], 'hide');
			}

			bindEvent(tabs[i], 'click', function(){
				var tabs = this.parentNode.children;
				    //item = this.parentNode.nextElementSibling || this.parentNode.nextSibling;
				    //items = item.children[0].children;
				for(var i = 0; i < tabs.length; i++){
					if(i == this.index){ 
						addClass(tabs[i], 'on');
						removeClass(items[i], 'hide');
					}else{ 
						removeClass(tabs[i], 'on');
						addClass(items[i], 'hide');
					}
				}
			});
		}
	}
}

function moduleInit(){ 
	var modules = document.querySelectorAll('.j_newsModule'),
	    tabs = document.querySelectorAll('.j_navTab');

    for(var i = 0; i < modules.length; i++){ 
    	tabInit(tabs[i].children, modules[i].children[0].children);
    }
}

/*iScroll初始化*/
function iScrollInit(){ 
	var scrolls = document.querySelectorAll('.j_scroll');
	for(var i = 0; i < scrolls.length; i++){ 
		scrolls[i].id = 'iScroll' + i;
		var obj = new IScroller('iScroll' + i);
	}
}

/*获取当前tab栏的index*/
function getCurIndex(){ 
	var aNavTab = document.querySelectorAll('.news_module'),
	    firstTabTop = document.querySelectorAll('.j_newsModule')[0].offsetTop;

	for(var i = 0; i < aNavTab.length; i ++){
		if (aNavTab[i].getBoundingClientRect().top <= 0 && aNavTab[i].getBoundingClientRect().bottom >= 87 && getWinScrollHeight() > firstTabTop){
			return i;
		}
	}
	return -1;
}	

/** TAB悬浮 **/
function tabNav(){
	var aNavTab = document.querySelectorAll('.j_navTab'),
		aNewsModule = document.querySelectorAll('.j_newsModule'),
		tabFixed = document.querySelector('.news_tab_fixed'),
		aNav = document.querySelectorAll('.news_module');			
    
    /*tab悬浮*/
	function fnTabFixed(){
        var curIndex = getCurIndex();
        if(curIndex !== -1){                
            addClass(tabFixed,'fixed_show');
        	tabFixed.innerHTML = aNavTab[curIndex].innerHTML;
			var sudaclickAttr = aNavTab[curIndex].getAttribute("data-sudaclick");
			if(sudaclickAttr){
				tabFixed.setAttribute("data-sudaclick",sudaclickAttr);
			}else{
				tabFixed.removeAttribute("data-sudaclick");
			}
			var tabs = tabFixed.children;
			for(var i = 0; i < tabs.length; i++){ 
				tabs[i].index = i;
				tabs[i].tab = aNavTab[curIndex].children[i];
				tabs[i].item = aNewsModule[curIndex].children[0].children[i];
				bindEvent(tabs[i], 'click', function(){
					var tabs = this.parentNode.children,
					    _tab = this.tab,
					    _tabs = _tab.parentNode.children;
					    item = this.item,
					    items = item.parentNode.children;

					for(var i = 0; i < tabs.length; i++){ 
						if(i == this.index){ 
							addClass(tabs[i], 'on');
							addClass(_tabs[i], 'on');
							removeClass(items[i], 'hide');
						}else{ 
							removeClass(tabs[i], 'on');
							removeClass(_tabs[i], 'on');
							addClass(items[i], 'hide');
						}
					}
					window.scrollTo(0, aNav[curIndex].offsetTop);
				});
			}
        }else{ 
        	removeClass(tabFixed,'fixed_show');
        }
	}
	fnTabFixed();

	bindEvent(window,'scroll',function(){
		fnTabFixed();
	});
}

/** 绑定事件 **/
setTimeout(function(){
	rollInit();             // 滚动新闻
	slideStyleInit();       // 焦点图样式初始化，swiper待异步广告加载后生成
	moduleInit();           // 模块滑动
	iScrollInit();          // 内容组滑动
	tabNav();               // tab导航悬浮
	scrollTop();			// 返回顶部+图片延时加载
	//屏幕自适应检测
	window.addEventListener('resize',function(){
		picHeight();		// 图片等高检测
		slideStyleInit();
	});
}, 300);

(function(){
    function bindEventForApp(obj, ev, fn){
        if(!document.addEventListener){
            obj.attachEvent(ev,fn);
        }
        else{
            obj.addEventListener(ev,fn,false);
        }
    };
    function init(host_name, path_name, query_str){
        var host_name = host_name || document.location.hostname || document.location.host || document.location.href.match(/http:\/\/([^\/]+)/i) && document.location.href.match(/http:\/\/([^\/]+)/i)[1];
        var path_name = path_name || document.location.pathname || document.location.href.match(/http:\/\/[^\/]+(.*)/i) && document.location.href.match(/http:\/\/[^\/]+(.*)/i)[1];
        var query_str = query_str || document.location.search || document.location.href.match(/.*(\?.*)/) && document.location.href.match(/.*(\?.*)/)[1];
        var isSinaCn = host_name && host_name.match(/.*\.?sina\.cn/i) !== null;
        var isDetail = path_name && path_name.match(/.*(\.d\.html)/i);
        var isAriticle = query_str && query_str.match(/from=qudao&?/i);
        var spec = host_name && host_name.match(/lives.sina.cn/i);
        var extra_class = 'main';
        pageUid = host_name+path_name;
        if(isAriticle){
            pageUid += query_str;
        }
        if(isSinaCn){
            var promotion_coverDom = document.querySelector('.promotion_cover');
            if(promotion_coverDom){
                document.body.removeChild(promotion_coverDom);
            }
            if(isDetail && !isAriticle || spec){
                extra_class = 'share';
                document.body.style['margin-top'] = 60+'px';
                setTimeout(function(){
                    window.scrollTo(0,0);
                },100);
            }
            if(extra_class == 'main' && !enable_disp(pageUid)){
                return ;
            };

            var styleEle = document.createElement('link');
            styleEle.href='http://mjs.sinaimg.cn/wap/module/promote_float/201503271544/css/index.min.css';
            styleEle.rel='stylesheet';
            styleEle.type='text/css';
            document.head.appendChild(styleEle);
            var createBottomDownloadNode = document.createElement("div");
            createBottomDownloadNode.innerHTML = '<div class="promotion_cover '+extra_class+'" id="promotionCover"><div href="#" class="cover_content"><img src="http://mjs.sinaimg.cn/wap/module/promote_float/201503271400/images/logo.jpg" /><p class="title">新浪新闻</p><p class="subtitle">安装新浪新闻，随时知晓天下事</p><a class="action_btn" href="javascript:void(0);">打开</a></div><a class="close_btn" href="javascript:void(0);"><i class="r"></i><i class="l"></i></a></div>';
            document.body.appendChild(createBottomDownloadNode.childNodes[0]);
            setTimeout(function(){
                var promotionCover = document.querySelector("#promotionCover");
                bindEventForApp(promotionCover,'click',function(e){
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
            //window.location = 'intent://' + schemeUrl + '#Intent;scheme=' + scheme + ';end';
            //setTimeout(function() {
            self._gotoDownload(startTime);
            //}, self.openTime);
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
            androidNativeUrl: 'sinanews://news.sina.cn'
        };
        RedirectToNative.init(jumpConfig);
    }

    function sendTrack(){
        if(!document.getElementById("download_send_track_fix")){
            var iframe = document.createElement('iframe');
            iframe.id = 'download_send_track_fix';
            iframe.style.cssText = "display:none;width:0px;height:0px;";
            iframe.src = "http://open.api.sina.cn/count/appview";
            document.body.appendChild(iframe);
        }
    }

    function match_action(dom){
        switch(dom.className){
            case 'close_btn':
                var promotionCoverDom = document.querySelector('#promotionCover');
                document.body.removeChild(promotionCoverDom);
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
})();