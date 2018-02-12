/**
 * @浪首异步加载模块
 * @author xuanang@staff.sina.com.cn
 * @date 2015-03-20
 */

(function(){
    
    /**
	 * @浪首猜你喜欢模块
	 * @modify xuanang@staff.sina.com.cn
	 * @date 2015-03-20
	 */

	// 已读记录存储名
	var READMEMNAME = 'cn.udv.s.readMem',
        CURPAGENAME = 'cn.udv.s.guessPage',
        // 已读记录存储url数
        READMEMLEN = 10,
        // 每页条数
        LISTNUM = 8,
        // 分页数
        PAGENUM = 5,
        // 最少保留条数
        MINNUM = LISTNUM,
        // 当前页
        currentPage = 0,
        rawInterestData,
        // 组合后的用户喜欢数据
        interestData,
        // 滑动实例
        swipeGuess = null,
        pageshowFlag = false,
        // 数据类型，默认为guess,超时为top
        datatype = 'guess',
        uid = typeof uid == 'undefined' ? '' : uid,
        hash = typeof hash == 'undefined' ? '' : hash,
        app = {
            // 本地存储对象
            localStorage: (function(){
                var win = window,
                    localStorageName = 'localStorage',
                    isLocalStorageNameSupported = function(){
                        try {
                            return ((localStorageName in win) && win[localStorageName]);
                        } catch (err) {
                            return false;
                        }
                    },
                    lStorage = {
                        set: function(){},
                        get: function(){return '';}
                    };

                if (isLocalStorageNameSupported() && win['JSON']) {
                    lStorage = {
                        set: function(key, val){
                            val = JSON.stringify(val);
                            try {
                                // 防 safri QUOTA_EXCEEDED_ERR
                                localStorage.setItem(key, val);
                            } catch(e) {}
                        },
                        get: function(key){
                            var val = localStorage.getItem(key);
                            return JSON.parse(val);
                        }
                    };
                }

                return lStorage;
            })(),
            /**
             * 过滤栏目间的重复数据，包括标题及链接重复
             * @param  {Object} data 接口返回的数据
             * @return {Object}      过滤完的数组
             */
            filterRepeated: function(data){
                // 全部数据字符串
                // 已读数据
                var readMem = app.localStorage.get(READMEMNAME) || [],
                    dataStr = readMem.join('|');
                var newData = [];
                var repeatedData = [];
                var  filtUrlAndTit = function(arr){
                        var j,
                            url = '',
                            title = '',
                            item = null,
                            len = arr.length;

                        for (j = 0; j < len; j++) {
                            item = arr[j];
                            item._url = trim(item.surl || '') || item.url;
                            item._title = trim(item.stitle || '') || item.title.replace('- 手机新浪网', '');
                            if (!item || (item && (!item._url || !item._title))) {
                                continue;
                            }

                            url = item._url;
                            title = item._title;
                            // URL不在全部字符串里才添加回该数组内
                            if (dataStr.indexOf(url) == -1) {
                                newData.push(item);
                                dataStr += '|' + url;
                            }else{
                                repeatedData.push(item);
                            }
                        }
                    };
                filtUrlAndTit(data);
                // 如果过滤完的数据少于 LISTNUM条，则从已读数据中取足 LISTNUM 条，保证至少一页
                if(newData.length<LISTNUM){
                    newData = newData.concat(repeatedData.slice(0,LISTNUM-newData.length));
                }
                return newData;
            }
        }

    // 当前页
	currentPage = parseInt(app.localStorage.get(CURPAGENAME)) || 0;

	function rebuildInterestData(data){
        var arraySlice = function(data, listNum, pageNum) {
            var len = data.length,
                index = 0,
                to, i, pages = [];
            pageNum = pageNum || Infinity;
            listNum = listNum || len;
            for (i = 0; i < pageNum; i++) {
                to = index + listNum;
                if (to > len) {
                    break;
                }
                pages.push(data.slice(index, to));
                index += listNum;
            }
            return pages;
        };
        var pages = arraySlice(data, LISTNUM, PAGENUM);
        return pages;
    }

	/**
	 * 获取指定页的-猜你喜欢数据
	 * @method	getPageData
	 * @param {Object} cookie的名字
	 * @return {String} cookie的值
	 * @return
	 */
	function getLikeData(){
        var i,
            j,
            page = [],
            html = [],
            length = 0,
            pageNum = 0,
            item = null,
            len = interestData.length,
            url,
            urlArg = '',
            lnkPro = datatype === 'guess' ? 'title' : 'timeout';

        for (i = 0; i < len; i++) {
            page = interestData[i];
            length = page.length;

            if (length == LISTNUM) {
                html.push('<div class="news_items_module"><ul class="news_items morelistbox">');

                for (j = 0; j < length; j++) {
                    item = page[j];
                    url = item._url;
                    if(url.indexOf('?')===-1){
                        url += '?';
                    }else{
                        url += '&';
                    }
                    html.push('<li><a href="' + url + urlArg + '">' + item._title + '</a></li>');
                }
                html.push('</ul></div>');
                pageNum++;
            }
        }
        interestData.length = pageNum;
        // 如果currentPage大于等于pageNum时，定位到当前首页
        if(currentPage >= pageNum){
            currentPage = 0;
        }

        return html.join('');
    }


	/**
	 * 猜你喜欢初始化，获取第一批喜欢数据。
	 * @method	interestInit
	 * @param
	 * @return
	 */
	function interestInit(){
		var	listWrap = document.getElementById('j_interest_tpl');
	    if (listWrap.length == 0) {
			return;
		}
		var innerWrap = listWrap.children[0],
		    btnWrap = document.getElementById('j_update_interest'),
		    loading = document.getElementById('j_like_loading'),
	        activeClz = 'on',
	        html = getLikeData(),
	        total = interestData.length,
            btns = (function(){
                if (total > 1) {
                    var i,
                        clz = '',
                        pageHtml = '',
                        htmlArr = [];

                    for (i = 0; i < total; i++) {
                        clz = (i == currentPage) ? ('class="' + activeClz + '"') : '';
                        htmlArr.push('<li ' + clz + '><i></i></li>');
                    }

                    pageHtml = htmlArr.join('');
                    btnWrap.innerHTML = pageHtml;
                }

                var list = btnWrap.children;

                return {
                    list: list
                }
            })();

        if (total > 1) {
	        btnWrap.style['display'] = 'block';
	    } else {
	        btnWrap.style['display'] = 'none';
	    }
        innerWrap.removeChild(loading);
		innerWrap.innerHTML = html;

        // 点击记录到阅读记录
		var news = innerWrap.querySelectorAll('a');
		for(var i = 0; i < news.length; i++){ 
			bindEvent(news[i], 'click', function(){ 
	            var item = this,
	                readMem = app.localStorage.get(READMEMNAME) || [],
	                href = item.href.replace('&pos=108&cre=ckhome','');

				readMem.push(href);
	            app.localStorage.set(READMEMNAME, readMem.slice(-READMEMLEN));
	            // 猜你喜欢 计数  SUDA.uaTrack("news_like", "title");
	            var $that = $(this);
	            var $pul = $that.closest('ul.p_newslist');
	            var url='';
	            $.each( $pul.find('a'), function(i,val){
	                url+= ( ',' + $(val).attr("href").replace(/&$/,""));
	            });
	            SUDA.uaTrack("recmd_wap_news_view", url.substring(1) );
			});
		}

        var likeSwiper = new Swiper(listWrap, null, {
			circular : true,
            auto : false,
			callback : function(ele, index, direction){ 
				currentPage = index;
				var items = btns.list;
				for(var i = 0; i < items.length; i++){ 
					if(i == index){
					    addClass(items[i], 'on'); 
					}else{ 
						removeClass(items[i], 'on');
					}
				}
				app.localStorage.set(CURPAGENAME, currentPage);
	            // suda统计
	            if (window.suda) {
	                var likeInfo = {
	                    'type': 'liketab',
	                    'name': 'tabchange',
	                    'title': '猜你喜欢',
	                    'index': currentPage + 1
	                };
	                window.suds_count && window.suds_count(likeInfo);
	            }
	        }
		});
    }
    

	/**
	 * 打开一个链接后，重新过滤分页-猜你喜欢的数据
	 * @method	updateInterest
	 * @param
	 * @return
	 */
	function updateInterestData(){
		var filtedInterestData = app.filterRepeated(rawInterestData.data);
		// 数据初始化
		interestData = rebuildInterestData(filtedInterestData);
		// 获取第一批数据
		interestInit();
	}

	/**
	 * 加载-猜你喜欢
	 * @param {Object} cookie的名字
	 * @return {String} cookie的值
	 * @example
	 * var value = co.getCookie(name);
	 */
	function loadInterest(){
		// 多取两页数据，尽量保证 PAGENUM 页
        var arg = '&length=' + (LISTNUM * (PAGENUM+2)) +'&_=' + new Date().getTime(),
		    url = 'http://cre.dp.sina.cn/api/v3/get?cateid=sina_all&fields=surl,stitle,url,title,type&dedup=8&pageid=http://sina.cn&lid=all&cre=sinaw&mod=g&statics=1&merge=3' + arg + '&callback=likeDataHandle';
		createScript(url);
	}

	function loadToplist(){ 
		var arg = '&top_show_num=' + (LISTNUM * (PAGENUM+2)) +'&_=' + new Date().getTime(),
		    url = 'http://cre.dp.sina.cn/api/v3/get?cateid=sina_all&fields=surl,stitle,url,title,type&dedup=8&pageid=http://sina.cn&lid=all&cre=sinaw&mod=g&statics=1&merge=3' + arg + '&callback=topListHandle';
		createScript(url);
	}

	function loadLeju(){
        var timestamp = (new Date()).valueOf();
		var url = 'http://api.m.leju.com/?site=api&ctl=api&act=sl&timestamp='+timestamp;
		createScript(url);
	}

    (function(){
        var cardAuto = document.querySelector("#card_auto"),
            autoTab = cardAuto.querySelector(".j_navTab"),
            autoContent = cardAuto.querySelector(".j_newsModule .news_items_module_wrap"),
            innerTab = document.createElement("li"),
            innerContent = document.createElement("div");
        innerTab.className = "news_tab_nav";
        innerTab.id = "miaoche_btn";
        innerTab.innerHTML = "秒车价";
        innerContent.className = "news_items_module hide";
        innerContent.id = "miaoche_content";
        innerContent.setAttribute("data-sudaclick","ls_miaoche");
        innerContent.innerHTML = '<div class="loading-box">正在载入，请稍候...</div>';
        autoTab.appendChild(innerTab);
        autoContent.appendChild(innerContent);
    })();

    function loadMiaoche(){
        delEvent(document.getElementById("miaoche_btn"),"click",loadMiaoche);
        var timestamp = (new Date()).valueOf();
        var url = 'http://www.miaoche.com/api_sinawap/list?callback=miaocheDataHandle&timestamp='+timestamp;
        createScript(url);
    }
    bindEvent(document.getElementById("miaoche_btn"),"click",loadMiaoche);

    window.miaocheDataHandle = function (data) {
        if(data && data.retCode && data.retData && data.retData.tab && data.retData.tab.miaoche){
            var _data = data.retData.tab.miaoche,
                _items = [];
            if((!_data.pics || (_data.pics && _data.pics.length != 0)) && (!_data.links || (_data.links && _data.links.length != 0)) && (!_data.list || (_data.list && _data.list.length != 0))){

                _items.push('<ul class="news_pic_items m_b">');
                for (var j = 0, pics = _data.pics; j < 2; j++) {
                    _items.push('<li><a href="' + pics[j].link + '" title="' + pics[j].title + '"><img src="' + pics[j].src + '" alt="' + pics[j].title + '" class="news_pic_img" /><p class="news_pic_info">' + pics[j].title + '</p></a></li>');
                }

                _items.push('</ul><div class="news_hot_card leju">');
                var links = _data.links,
                    linksMaxLength = links.length > 3 ? 3 : links.length;//限制条数
                for(var j = 0; j < linksMaxLength; j++){
                    if(links[j].link && links[j].title)_items.push('<a href="'+ links[j].link +'" title="'+ links[j].title +'">'+ links[j].title +'</a>');
                }

                _items.push('</div><ul class="news_items">');
                for(var j = 0, news = _data.list; j < news.length; j++){
                    _items.push('<li><a href="'+ news[j].link +'" title="'+ news[j].title +'">'+ news[j].title +'</a></li>');
                }

                _items.push('</ul><div class="news_more_tips"><a href="'+ _data.more.url +'" title="'+ _data.more.title +'"><span>'+ _data.more.title +'<em class="news_more_r iconf_icon_enter"></em></span></a></div>');
                //_items.push('</ul><div class="news_more_tips"></div>');
            }
        }
        document.getElementById("miaoche_content").innerHTML = _items.join('');
        picHeight();		// 图片等高检测
    };


	function loadLocalStation(){
        var timestamp = (new Date()).valueOf();
        var localSearch = location.search.substr(1),
            itemArr = localSearch.split("&"),
            locationName,
            isDf = "";
        for(var i= 0, len = itemArr.length; i< len; i++){
            var listArr = itemArr[i].split("=");
            if(listArr[0] == "df"){
                locationName = listArr[1];
                break;
            }
        }
        if(locationName) isDf = "df=" + locationName + "&";
        var url = 'http://s.api.sina.cn/ls/allasync?'+isDf+'callback=localStationData&timestamp='+timestamp;
        createScript(url);
    }

    //(function(){
    //    var hotNewsWrap = document.querySelector("#card_yaowen .j_newsModule .news_items_module");
    //    hotNewsWrap.innerHTML += '<aside id="hot_news_show_more" class="news_more_tips"><a href="javascript:;" title="展开查看更多"><span>展开查看更多<em class="news_more_d iconf_icon_down"></em></span></a></aside>';
    //    bindEvent(document.getElementById("hot_news_show_more"),"click",loadHotNews)
    //})();
    //function loadHotNews(){
    //    var timestamp = (new Date()).valueOf();
    //    var url = 'http://s.api.sina.cn/ls/topnews?callback=hotNewsData&timestamp='+timestamp;
    //    createScript(url);
    //}

	function loadWeibo(){ 
		var url = 'http://api.weibo.cn/hot/sinamobile?wm=ig_2002&callback=weiboDataHandle';
		createScript(url);
	}

	window.likeDataHandle = function(data){
	    datatype = 'guess';
        if(data&&data.data&&data.data.length>0){
            pageshowFlag = true;
            rawInterestData = data;
            updateInterestData();
        }else{
            loadToplist();
        }
	}

	window.topListHandle = function(data){
	    datatype = 'top';
        data = data.result;
        pageshowFlag = true;
        rawInterestData = data;
        updateInterestData();
	}
    //window.hotNewsData = function (data) {
    //    delEvent(document.getElementById("hot_news_show_more"),"click",loadHotNews);
    //    if(data.retData.length){
    //        var _data = data.retData,
    //            dataLen = _data.length,
    //            hotNewsWrap = document.querySelector("#card_yaowen .j_newsModule .news_items_module"),
    //            hotNewsShowBtn = document.getElementById("hot_news_show_more"),
    //            hotNewsDom,
    //            hotNewsAsync,
    //            isFirst = true,
    //            min = 0,
    //            singleNum = 8,
    //            max = min + singleNum;
    //        //hotNewsStr +='<h3 class="hot-news-title"><span>热门新闻</span></h3><ul class="news_items" id="hot_news_async"></ul>';
    //        hotNewsDom = document.createElement("h3");
    //        hotNewsDom.className = "hot-news-title";
    //        hotNewsDom.innerHTML = '<span>热门新闻</span>';
    //        hotNewsWrap.insertBefore(hotNewsDom, hotNewsShowBtn);
    //        hotNewsAsync = document.createElement("ul");
    //        hotNewsAsync.className = "news_items";
    //        hotNewsAsync.id = "hot_news_async";
    //        hotNewsWrap.insertBefore(hotNewsAsync, hotNewsShowBtn);
    //        function writeDom(){
    //            var itemStr = "",
    //                hotNewsUl = document.getElementById("hot_news_async");
    //            for(var i=min; i < max; i++){
    //                itemStr +='<li><a href="'+ _data[i].url +'" title="'+ _data[i].title +'">'+ _data[i].title +'</a></li>';
    //            }
    //            if(isFirst){
    //                hotNewsUl.innerHTML = "";
    //                bindEvent(document.getElementById("hot_news_show_more"),"click", function () {
    //                    min += singleNum;
    //                    //nextMin >= dataLen ? nextMax = dataLen : nextMax = singleNum + nextMin;
    //                    if(min + singleNum >= dataLen){
    //                        max = dataLen;
    //                        var d = document.getElementById("hot_news_show_more");
    //                        d.parentNode.removeChild(d)
    //                    }else{
    //                        max = singleNum + min;
    //                    }
    //                    writeDom();
    //                })
    //            }
    //            hotNewsUl.innerHTML += itemStr;
    //            isFirst = false;
    //        }
    //        writeDom();
    //    }
    //}
    window.localStationData = function(data){
        var wrap = document.getElementById('j_localStationWrap'),
            tabs = wrap.querySelector('.j_navTab'),
            innerWrap = wrap.querySelector('.j_newsModule').children[0];
        if(data.retData.weather.icon){
            var weatherImg = document.createElement("img"),
                weatherIcon = document.getElementById("weather_icon");
            weatherImg.src = data.retData.weather.icon;
            weatherImg.width = 22;
            weatherIcon.appendChild(weatherImg);
        }
        if(data.retData.localsite && data.retData.localsite.yaowen && data.retData.localsite.yaowen.list && data.retData.localsite.yaowen.list.top){
            var todayNews = document.querySelector("#card_yaowen"),
                yaowenData = data.retData.localsite.yaowen.list.top,
                yaowenStr="",
                yaowenUl = todayNews.querySelector(".j_newsModule .news_items");
            for(var i= 0,len = yaowenData.length; i< len; i++){
                yaowenStr += '<li><a href="'+ yaowenData[i][0].link +'" title="'+ yaowenData[i][0].title +'">'+ yaowenData[i][0].title +'</a></li>';
            }
            if(yaowenUl)yaowenUl.innerHTML += yaowenStr;

        }
        if(data &&  data.retData.localsite && data.retData.localsite.tab){
            var _data = data.retData.localsite.tab,
                _tabs = [],
                _items = [],
                on = false;
            removeClass(wrap, 'hide');
            for(var i in _data){
                //if((!_data[i].pics || (_data[i].pics && _data[i].pics.length != 0)) && (!_data[i].links || (_data[i].links && _data[i].links.length != 0)) && (!_data[i].list || (_data[i].list && _data[i].list.length != 0))){
                    if(!on){
                        _tabs.push('<li class="news_tab_nav on">'+ _data[i].title.title +'</li>');
                        on = true;
                    }else{
                        _tabs.push('<li class="news_tab_nav">'+ _data[i].title.title +'</li>');
                    }

                    _items.push('<div class="news_items_module"><ul class="news_items">');
                    for(var j = 0, news = _data[i].list.top; j < news.length; j++){
                        _items.push('<li><a href="'+ news[j][0].link +'" title="'+ news[j][0].title +'">'+ news[j][0].title +'</a></li>');
                    }
                    _items.push('</ul><div class="news_more_tips"><a href="'+ _data[i].more.url +'" title="'+ _data[i].more.title +'"><span>进入'+ _data[i].more.title +'<em class="news_more_r iconf_icon_enter"></em></span></a></div></div>');
                //}
            }
            tabs.innerHTML = _tabs.join('');
            innerWrap.innerHTML = _items.join('');
            tabInit(tabs.children, innerWrap.children);
            tabNav();
        }
    }
	window.LejuDataCallback = function(data){
		var wrap = document.getElementById('j_lejuWrap'),
			tabs = wrap.querySelector('.j_navTab'),
			innerWrap = wrap.querySelector('.j_newsModule').children[0];

		if(data && data.retCode && data.retData.tab){
			var _data = data.retData.tab,
				_tabs = [],
				_items = [],
				on = false;

			removeClass(wrap, 'hide');
			for(var i in _data){
				if((!_data[i].pics || (_data[i].pics && _data[i].pics.length != 0)) && (!_data[i].links || (_data[i].links && _data[i].links.length != 0)) && (!_data[i].list || (_data[i].list && _data[i].list.length != 0))){
					if(!on){
						_tabs.push('<li class="news_tab_nav on">'+ _data[i].title.title +'</li>');
						on = true;
					}else{
						_tabs.push('<li class="news_tab_nav">'+ _data[i].title.title +'</li>');
					}
					_items.push('<div class="news_items_module"><ul class="news_pic_items m_b">');
                    for (var j = 0, pics = _data[i].pics; j < 2; j++) {
                        _items.push('<li><a href="' + pics[j].link + '" title="' + pics[j].title + '"><img src="' + pics[j].src + '" alt="' + pics[j].title + '" class="news_pic_img" /><p class="news_pic_info">' + pics[j].title + '</p></a></li>');
                    }

					_items.push('</ul><div class="news_hot_card leju">');
                    var links = _data[i].links,
                        linksMaxLength = links.length > 3 ? 3 : links.length;//限制条数
                    for(var j = 0; j < linksMaxLength; j++){
                        if(links[j].link && links[j].title)_items.push('<a href="'+ links[j].link +'" title="'+ links[j].title +'">'+ links[j].title +'</a>');
                    }

					_items.push('</div><ul class="news_items">');
                    for(var j = 0, news = _data[i].list; j < news.length; j++){
                        _items.push('<li><a href="'+ news[j].link +'" title="'+ news[j].title +'">'+ news[j].title +'</a></li>');
                    }

					_items.push('</ul><div class="news_more_tips"><a href="'+ _data[i].more.url +'" title="'+ _data[i].more.title +'"><span>'+ _data[i].more.title +'<em class="news_more_r iconf_icon_enter"></em></span></a></div></div>');
				}
			}

			tabs.innerHTML = _tabs.join('');
			innerWrap.innerHTML = _items.join('');
			tabInit(tabs.children, innerWrap.children);
			tabNav();
		}
	}

	window.weiboDataHandle = function(data){ 
		var wrap = document.getElementById('j_weiboWrap'),
		    tabs = wrap.querySelector('.j_navTab'),
		    innerWrap = wrap.querySelector('.j_newsModule').children[0],
		    weibo = document.getElementById('j_weiboList');

		if(data && data.status && data.data.length > 4){
		    var _data = data.data,
		        _items = [];

            _items.push('<div class="wb_top_module_card"><a href="'+ _data[0].url +'" title="'+ _data[0].title +'"><aside class="wb_top_info h170 wb_num_1"><p><span>TOP 1</span>'+ _data[0].title +'</p></aside></a></div>');
            _items.push('<div class="wb_top_module_card"><a href="'+ _data[1].url +'" title="'+ _data[1].title +'"><aside class="wb_top_info h80 m_b wb_num_2"><p><span>TOP 2</span>'+ _data[1].title +'</p></aside></a>');
			_items.push('<a href="'+ _data[2].url +'" title="'+ _data[2].title +'"><aside class="wb_top_info h80 m_t wb_num_3"><p><span>TOP 3</span>'+ _data[2].title +'</p></aside></a></div>');
            _items.push('<div class="wb_top_module_card"><a href="'+ _data[3].url +'" title="'+ _data[3].title +'"><aside class="wb_top_info h80 m_b"><p><span>TOP 4</span>'+ _data[3].title +'</p></aside></a>');
			_items.push('<a href="'+ _data[4].url +'" title="'+ _data[4].title +'"><aside class="wb_top_info h80 m_t"><p><span>TOP 5</span>'+ _data[4].title +'</p></aside></a></div>');
		    weibo.innerHTML = _items.join('');
		    tabInit(tabs.children, weibo.parentNode.parentNode.children);
		    tabNav();
		}
	}

	loadInterest();
	loadLeju();
	loadWeibo();
    loadLocalStation();
    //loadHotNews();
})();
