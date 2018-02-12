/*请求组件*/
var asyncRequest = function(){
    this.init();
}
asyncRequest.prototype = {
    init: function () {
        if (!window.Zepto) {
            throw Error('asyncRequest module need Zepto.js!');
            return;
        }
        this.selfHost = window.location.hostname;
    },
    _curTime: function () {
        return (new Date()).valueOf();
    },
    _urlEncode: function (data) {
        if (typeof (data) == 'string') {
            return data;
        }
        var ret = [];
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                ret.push(i + '=' + data[i]);
            }
        }
        return ret.join('&');
    },
    _jsonp: function (callBackFunc, url, data, retry, jsonpQsKey, callbackKey, timeout, cache) {
        var jsonpCallback = null;
        cache = cache ? true : false;
        timeout = timeout || 0;
        jsonpQsKey = jsonpQsKey || 'jsonpcallback';
        var ajaxParams = {
            type: 'GET',
            dataType: 'jsonp',
            jsonp: jsonpQsKey,
        }
        if (data) {
            url += (url.indexOf('?') == -1 ? '?' : '&') + this._urlEncode(data);
            // ajaxParams['data'] = data;
        }
        ajaxParams['url'] = url;
        if (typeof (callBackFunc) === "function") {
            if (callbackKey) { //某些情况需要指定回调名
                jsonpCallback = callbackKey;
            } else {
                jsonpCallback = 'jsonp_' + this._curTime();
            }
            window[jsonpCallback] = function (resp) {
                if(window[jsonpCallback+'timer']){
                    clearTimeout(window[jsonpCallback+'timer']);
                }
                delete window[jsonpCallback];
                callBackFunc(resp);
            }
            ajaxParams['jsonpCallback'] = jsonpCallback;
        }
        if (retry) {
            ajaxParams['error'] = function (xhr, type) {
                while (retry) {
                    console.log(type);
                }
                retry--;
            }
        }
        if(typeof(timeout) === 'number' && timeout > 0){
            window[jsonpCallback+'timer'] = setTimeout(function(){
                console.log('xxxxxx,timeout!!!!');
                if(window[jsonpCallback] && typeof(window[jsonpCallback]) == 'function'){
                    window[jsonpCallback](null);
                }
            }, timeout*1000)
        }
        $.ajax(ajaxParams);
    },
    //重构Ajax参数
    _ajax: function (sucFun, type, url, data, respType, retry, timeout, cache) {
        cache = cache ? true : false;
        respType = respType || 'json';
        timeout = timeout || 0;
        
        //参数
        var ajaxParams = {
            type: type,
            dataType: respType,
            cache: cache,
            timeout: timeout,
        }
        if (type == 'GET' && !data) {
            // url += '?'+this._urlEncode(data);
            ajaxParams['data'] = data;
        }
        ajaxParams['url'] = url;

        if (typeof (sucFun) === 'function') {
            ajaxParams['success'] = sucFun;
        }
        if (typeof (retry) == 'number' && retry > 0) {
            ajaxParams['error'] = function (xhr, type) {
                while (retry) {
                    console.log(type);
                    retry--;
                }
            }
        }
        $.ajax(ajaxParams);
    }

};

/*点赞组件*/
var Praise = (function () {
    var A_STATUS = { UP: 1, DOWN: 2, NOATT: 3 },
        A_LOCALSTORAGE_KEY = { A_CACHE: 'attitude_storage', MAIN: 'sina_praise' },
        A_COOKIE_KEY = { AUTO_SHARE: 'sina_praise_autoshare', PRAISE_UID: 'sina_praise_ucode' },
        A_ICONS = [['http://mjs.sinaimg.cn/wap/h5/cms/article_v2/201505181430/images/up.png', 'http://mjs.sinaimg.cn/wap/h5/cms/article_v2/201505181430/images/uping.png'], ['http://mjs.sinaimg.cn/wap/h5/cms/article_v2/201505181430/images/down.png', 'http://mjs.sinaimg.cn/wap/h5/cms/article_v2/201505181430/images/downing.png']],
        SHARE_ICON = 'http://ww1.sinaimg.cn/bmiddle/589cec00jw1esdyy2ctwij20go08caad.jpg',
        autoShare = true,
        onSubmitProcess = false,
        onCancelProcess = false,
        globalAttitude = A_STATUS.NOATT,
        cacheCount = [0, 0], // praise, dispraise
        cacheSameAttitudeFriends = [0, 0], //praise, dispraise,
        wrapAll = {},
        animateDelay = false,
        praise_uid = null,

        //input
        docId = '',
        apiPath = '',
        requestHandle = null,
        userInfo = {},
        shareTextPattern = '我刚刚%s了这篇文章，小伙伴你们怎么看？',
        txtMap = ['赞', '踩'],
        _$ = null,
        mutualType = 0,
        praise = {};
        
    //登录状态、回调函数、回调参数1、回调参数2
    function login(callback, cancelCallBack) {   
        //在window中判断有没有SINA_OUTLOGIN_LAYER来确定有没有浮层对象及是否登录
        if( window["SINA_OUTLOGIN_LAYER"] )
        {
            //获取登录对象
            _loginLayer = window["SINA_OUTLOGIN_LAYER"];
            //初始化浮层
            _loginLayer.set('sso',{
                entry : 'wapsso'
            }).init();
            //将呼出浮层绑定到相应的目标元素上
                        
            _loginLayer.show();
        
            //登陆成功后的回调事件注册多个login_success事件来对应不同按钮的登陆行为
            _loginLayer.register("login_success", function(re){
                
                //表示登陆成功
                re.islogin = true;
                updateUserInfo(re);
                callback && callback(re);
                
            });
            
            //关闭浮层触发的事件
            _loginLayer.register("layer_hide", function(){
                if(typeof(cancelCallBack) == 'function'){
                    cancelCallBack();
                }
            });
        }
        
        return false;
    }
    function generateUid() {
        var uid = cookie('ustat') || cookie(A_COOKIE_KEY.PRAISE_UID);
        if (!uid) {
            uid = (new Date()).getTime()+'UnIt'+ parseInt(Math.random()*100000);
            cookie(A_COOKIE_KEY.PRAISE_UID, uid);
        }
        praise_uid = uid;
    }
    function scrollPos(){
        var sTop = document.body.scrollTop || document.documentElement.scrollTop,
        sHeight = window.screen.height || window.screen.availHeight,
        pTop = document.getElementById('j_operate').offsetTop;

        if (pTop + 30 <= sTop + sHeight) {
            return true;
        }
        else {
            return false;
        }
    }
    //TODO　Cookie处理
    function cookie(name, value) {
        var argsNum = arguments.length;
        
        function setCookie(key, value, expires, path, domain, m) {
            var s = [];
            s.push(key + "=" + escape(value));
            if (expires) {
                var t = new Date();
                var p = t.getTime() + expires * 3600000;
                t.setTime(p);
                s.push("expires=" + t.toGMTString())
            }
            if (path) {
                s.push("path=" + path)
            }
            if (domain) {
                s.push("domain=" + domain)
            }
            if (m) {
                s.push(m)
            }
            document.cookie = s.join(";")
        }

        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            }
            else {
                return false;
            }
        }
        if (argsNum > 1) {
            setCookie(name, value, 720, '/', '.sina.cn');
            return true;
        } else {
            return getCookie(name);
        }
    }
    function localstorage(key, value) {
        var ret = '',
            record = localStorage[A_LOCALSTORAGE_KEY.MAIN];
        record = record ? JSON.parse(record) : null;
        if (record === null) {
            record = {};
            record[A_LOCALSTORAGE_KEY.A_CACHE] = {};
        }
        if (value == undefined) {
            return record[key][docId] != undefined ? record[key][docId] : A_STATUS.NOATT;
        } else {
            record[key][docId] = value;
        }

        localStorage[A_LOCALSTORAGE_KEY.MAIN] = JSON.stringify(record);
    }
    function convNum(num) {
        var val = (num > 9999999) ? ('999万+') : (num > 9999 ? parseInt(num / 10000) + '万' : num);
        return val;
    }
    function makeText(attitude) {
        var classMap = ['txt_up', 'txt_down'];
        attitude = attitude || globalAttitude;
        if (attitude != A_STATUS.NOATT) {
            var tmpAtti = attitude - 1;
            if(!cacheCount[tmpAtti] || cacheCount[tmpAtti] == 0){
              return null;
            }
            if (typeof(cacheCount[tmpAtti]) == 'number' && cacheCount[tmpAtti] > 0) {
                var friends = cacheSameAttitudeFriends[tmpAtti];
                var ret = '';
                if(attitude == globalAttitude){
                  ret += '我';
                  ret += friends.length > 0 ? '和'+friends.join('、') : '';
                  ret += friends.length < cacheCount[tmpAtti] && cacheCount[tmpAtti] > 1 ? '等'+cacheCount[tmpAtti] +'人' : '';
                }else{
                  ret += friends.length > 0 ? friends.join('、'): '';
                  ret += friends.length > 0 && friends.length < cacheCount[tmpAtti] ? '等' : '';
                  ret += cacheCount[tmpAtti] +'人';
                }
                return ret + '<span class="p_txt ' + classMap[tmpAtti] + '">' + txtMap[tmpAtti] + '</span>了这篇文章';
            }
        }
        return null;
    }
    function getWidth(nums) {
        if (!nums || nums.length != 2) {
            throw new Error('invalid parameters nums:' + nums);
        }
        var sum = (nums[0] + nums[1]) / 100;
        return [Math.round(nums[0] / sum), Math.round(nums[1] / sum)];
    }
    function transitCom(type, el, val) {
        var removeClass, addClass;
        switch (type) {
            case 'opacity':
                if (val > 0) {
                    removeClass = 'pfade';
                    addClass = 'pshow';
                } else {
                    removeClass = 'pshow';
                    addClass = 'pfade';
                }
                break;
            case 'scale':
                addClass = removeClass = 'penlarge';
                break;
            case 'pnomal':
                addClass = removeClass = type;
                break;
            case 'fade':
                if (el.length == 2) {
                    el[0].removeClass('hide').css('opacity', 1);
                    el[1].removeClass('hide').css('opacity', 0);
                }
                return;
            case 'clearAni':
                el.css({
                    'animation': '',
                    '-webkit-animation': ''
                });
            default:
                return;
        }
        el.removeClass(removeClass);
        if (addClass) {
            setTimeout(function () {
                el.addClass(addClass);
            }, 10)
        }
    }
    function resize() {
        var operateWidth = parseInt(wrapAll.operate.css('width')),
                actWidth = parseInt(wrapAll.act.css('width')),
                barWidth = operateWidth - actWidth * 2 - 14 * 2;

        wrapAll.bar.css({
            'width': barWidth + 'px',
            'margin-left': parseInt(-barWidth / 2) + 'px'
        });
    }
    function initEvent() {
        wrapAll.btn.eq(0).on('click tap', changeAttitutde.bind(this, A_STATUS.UP));
        wrapAll.btn.eq(1).on('click tap', changeAttitutde.bind(this, A_STATUS.DOWN));
        wrapAll.tip.on('click tap', function () {
            if (wrapAll.tip.hasClass('on')) {
                wrapAll.tip.removeClass('on');
                autoShare = false;
            } else {
                wrapAll.tip.addClass('on');
                autoShare = true;
            }
            cookie(A_COOKIE_KEY.AUTO_SHARE, autoShare ? 1 : 0);
        })
        window.addEventListener('scroll', function () {
            if (scrollPos() && animateDelay) {
                dispAnimation();
                animateDelay = false;
            };
        }, false);
        $(window).on('resize', resize);
    }
    function dispLine(isHide) {
        isHide = isHide == null ? onCancelProcess : isHide;
        if (!isHide) {
            var attitudePercents = getWidth([cacheCount[0], cacheCount[1]]);
            wrapAll.praiseBar.css('width', attitudePercents[0] + '%');
            wrapAll.dispraiseBar.css('width', attitudePercents[1] + '%');
        } else {
            wrapAll.bar.addClass('popacity');
            wrapAll.bar.css('opacity', 0);
            setTimeout(function () {
                wrapAll.praiseBar.addClass('no_animation');
                wrapAll.dispraiseBar.addClass('no_animation');
                wrapAll.praiseBar.css('width', '0');
                wrapAll.dispraiseBar.css('width', '0');
                setTimeout(function () {
                    wrapAll.praiseBar.removeClass('no_animation');
                    wrapAll.dispraiseBar.removeClass('no_animation');
                    wrapAll.bar.removeClass('popacity');
                    wrapAll.bar.css('opacity', 1);
                }, 50);
            }, 1000);
        }
    }
    function dispAnimation() {
        if (globalAttitude == A_STATUS.NOATT && !onCancelProcess) {
            return;
        }
        var _act = wrapAll.act,
            len = _act.length,
            //是否取消状态
            order = globalAttitude - 1,
            isCancel = onCancelProcess ? true : false;

        //for (var o = 0; o < len; o++) {
        var btn = wrapAll.btn.eq(order).find('img'),
        num = wrapAll.num.eq(order).find('span'),
        item = order;

        if (!isCancel) {
            var btn_1 = btn.eq(0),
                btn_2 = btn.eq(1),
                num_1 = num.eq(0),
                num_2 = num.eq(1);
            cacheCount[item] += 1;
            wrapAll.btn.eq(order  == 0 ? 1 :0).addClass('lose');

            transitCom('scale', btn_2);

            transitCom('scale', num_2);

            btn_2.removeClass('hide').attr('src', A_ICONS[item][0]);
            setTimeout(function () {
                btn_1.attr('src', A_ICONS[order][1]);

                transitCom('pnormal', btn_1);

                transitCom('pnormal', num_1);
            }, 200);

            transitCom('fade', [wrapAll.state, wrapAll.tip]);
        }
        else {
            cacheCount[item] -= 1;
            btn.eq(0).attr('src', A_ICONS[item][0]);
            btn.eq(1).attr('src', A_ICONS[item][0]);
            wrapAll.btn.eq(order  == 0 ? 1 :0).removeClass('lose');
            transitCom('fade', [wrapAll.tip, wrapAll.state]);
        }

        //更改数字
        num.text(cacheCount[item]);
        //更改线动画
        dispLine();
        //}

    }
    function updateText() {
        var txt = '';
        switch (mutualType) {
            case 0:
                txt = makeText();

                break;
            case 1:
                txt = [];
                txt.push()
                var upTxt = makeText(A_STATUS.UP),
                    downTxt = makeText(A_STATUS.DOWN);
                if(globalAttitude == A_STATUS.UP){
                    upTxt ? txt.push(upTxt): '';
                    downTxt ? txt.push(downTxt): '';
                }else{
                    downTxt ? txt.push(downTxt): '';
                    upTxt ? txt.push(upTxt): '';
                }
                txt = txt.join('<b></b>');
                break;
            default:
                break;
        }
        wrapAll.state.html(txt ? txt : '');
    }
    function updateAttitude(isInit) {
        if (globalAttitude == A_STATUS.NOATT) {
            cacheCount.forEach(function (item, index) {
                wrapAll.num.eq(index).find('span').text(item);
            });
            return;
        }
        isInit = isInit || false;
        updateText();
        cacheCount.forEach(function (item, index) {
            wrapAll.num.eq(index).find('span').text(item);
        });
        if (isInit && !scrollPos()) {
            animateDelay = true;
        } else {
            dispAnimation();
        }
    }
    function changeAttitutde(curAttitude) {
        if (onSubmitProcess || curAttitude != globalAttitude && globalAttitude != A_STATUS.NOATT) {
            return;
        }
        onSubmitProcess = true;
        if (curAttitude == globalAttitude) {
            onCancelProcess = true;
        } else {
            globalAttitude = curAttitude;
        } 
        if (!onCancelProcess && autoShare && !userInfo.isLogin) {
            login(function (resp) {
                submitAttitude();
            }, function () {
                if (!userInfo.isLogin) {
                    submitAttitude();
                }
            });
        } else {
            submitAttitude();
        }
    }
    function analyServerData(data) {
        var validKey = ['praise', 'dispraise'];
        validKey.forEach(function (key, index) {
            var tmp = [];
            if (data.hasOwnProperty(key) && data[key]) {
                data[key].forEach(function (item) {
                    if (item && item.userName && !userInfo.isLogin || userInfo.nick != item.userName) {
                        tmp.push(item.userName);
                    }
                });
            };
            cacheSameAttitudeFriends[index] = tmp;
        });
    }    
    function updateUserInfo(resp) {
        if (resp && resp.nick) {
            userInfo = {
                isLogin: true,
                nick: resp.nick,
                uid: resp.uid,
            }
            cacheSameAttitudeFriends.forEach(function(item){
              if(item && item.length >0){
                var exist = item.indexOf(resp.nick);
                exist != -1 ? item.splice(exist, exist+1): '';
              }
            });
        } else {
            userInfo.isLogin = false;
        }
    }
    function shareWeibo(title, content) {
        var url = __docConfig.share && __docConfig.share.targeturl || 'http://o.share.sina.cn/ajshare?vt=4',
                tj_ch = __docConfig.__tj_ch ? __docConfig.__tj_ch : 'news';

        var csrftime = parseInt(new Date().getTime() / 1000),
            codeStr = hex_md5 && hex_md5(csrftime + "85e47ac07ac9d6416" + userInfo.uid) || '',
            data = {
                csrftime: csrftime,
                csrfcode: codeStr,
                title: encodeURIComponent(title),
                content: encodeURIComponent('【' + (__docConfig.__title || title) + '】' + content),
                pic: encodeURIComponent(__docConfig.__mainPic ? __docConfig.__mainPic : SHARE_ICON),
                url: encodeURIComponent(__docConfig.__docUrl),
                isdoc: __docConfig.share && __docConfig.share.isdoc ? __docConfig.share.isdoc : 0,
            }
        requestHandle._jsonp(function (resp) {
            // ToDo
        }, url, data, 0, 'jsoncallback');
    }
    function submitAttitude() {
        var data = {
            act: 'add',
            attitude: globalAttitude == A_STATUS.UP ? 'praise' : 'dispraise',
            type: globalAttitude == A_STATUS.UP ? 1 : 0,
            record: 1,
            tj_ch: __docConfig.__tj_ch || '',
            p: docId,
        }
        if (!userInfo.isLogin) {
            data.ustat = praise_uid;
        }
        if (onCancelProcess) {
            data['attitude'] = 'cancel';
        }
        if (!onCancelProcess && autoShare && userInfo.isLogin) {
            var attitudeText = (globalAttitude == A_STATUS.UP) ? 'good' : '弱',
                shareContent = shareTextPattern.replace('%s', attitudeText);
            shareWeibo($('title').html(), shareContent);
        }
        requestHandle._jsonp(function (resp) {
            if (resp.status == 1 && resp.msg == 'success') {
                if (resp.data) {
                    analyServerData(resp.data);
                    updateText();
                }
            }
        }, apiPath, data, 0, null, 'addPraise');
        updateAttitude();
        if (onCancelProcess) {
            globalAttitude = A_STATUS.NOATT;
            onCancelProcess = false;
        }
        //localstorage(A_LOCALSTORAGE_KEY.A_CACHE, globalAttitude)
        onSubmitProcess = false;
    }
    function loadStatus() {
        var data = {
            act: 'show',
            p: docId,
            tj_ch: __docConfig.__tj_ch || '',
            record: 1
        };
        if (!userInfo.isLogin) {
            data.ustat = praise_uid;
        }
        //globalAttitude = localstorage(A_LOCALSTORAGE_KEY.A_CACHE);
        requestHandle._jsonp(function (resp) {
            if (resp.status == 1 && resp.msg == 'success') {
                var tmp;
                if (resp.count && resp.count[docId]) {
                    tmp = resp.count[docId];
                    cacheCount = [tmp.zan || 0, tmp.cai || 0];
                }
                if (resp.data && resp.data[docId]) {
                    tmp = resp.data[docId];
                    tmp.newAttitude && analyServerData(tmp.newAttitude);
                    if (tmp.userAttitude) {
                        globalAttitude = tmp.userAttitude.attitude == 'praise' ? A_STATUS.UP : A_STATUS.DOWN;
                        //localstorage(A_LOCALSTORAGE_KEY.A_CACHE, globalAttitude);
                    }
                }
            }
            updateAttitude(true);
        }, apiPath, data, 0, null, 'showSup');
    }
    praise.init = function (config) {
        var needs = ['requestHandle', 'apiPath', 'docId', 'wrapRoot'],
            options = ['shareTextPattern', 'txtMap'],
            mutualTypeMap = ['article', 'comment'];
        if (!window.Zepto) {
            throw new Error('require Zepto.js!');
        }
        _$ = window.Zepto;
        needs.forEach(function (item) {
            if (!config.hasOwnProperty(item)) {
                throw new Error('missing parameters "' + item + '!"');
            }
        });
        requestHandle = config.requestHandle;
        apiPath = config.apiPath;
        docId = config.docId;
        var wrapRoot = config.wrapRoot;
        if (typeof (wrapRoot) == 'string') {
            wrapRoot = _$(wrapRoot);
        }
        if (mutualTypeMap.indexOf(config.type) != -1) {
            mutualType = mutualTypeMap.indexOf(config.type);
        } else {
            var hostName = location.hostname;
            if (!hostName) {
                if (hostName == 'cmnt.sina.cn') {
                    mutualType = 2;
                }
            }
        }

        wrapAll.operate = wrapRoot.find('#j_operate');
        wrapAll.act = wrapRoot.find('.j_pact');
        wrapAll.btn = wrapRoot.find('.j_p_btn');
        wrapAll.num = wrapRoot.find('.j_p_num');
        wrapAll.bar = wrapRoot.find('.j_p_bar');
        wrapAll.praiseBar = wrapRoot.find('.j_p_upbar');
        wrapAll.dispraiseBar = wrapRoot.find('.j_p_downbar');
        wrapAll.tip = wrapRoot.find('.j_ptip');
        wrapAll.state = wrapRoot.find('.j_pstate');
        wrapAll.root = wrapRoot;

        if (window.checkLogin && typeof (checkLogin) == 'function') {
            userInfo.isLogin = checkLogin();
        }
        window.getUserInfo && getUserInfo(function (re) {
            if (re.islogin) {
                updateUserInfo({
                    nick: re.uname,
                    uid: re.uid,
                });
            }
        });
        autoShare = cookie(A_COOKIE_KEY.AUTO_SHARE) == '0' ? false : true;
        generateUid();
        if (!autoShare) {
            wrapAll.tip.removeClass('on');
        }
        resize();
        
        initEvent();
        loadStatus();

        if (config.hasOwnProperty('txtMap')) {
            txtMap = config.txtMap;
        }
        if (config.hasOwnProperty('shareTextPattern')) {
            txtMap = config.shareTextPattern;
        }
    }
    return praise;
})();


/*滑动图集组件*/
var Iscroller = function (config) {
    this.options = {
        needLimit: false,
        limitRate: 0.75,
        boneTime: 300,
        slideClass: '.slide',
        switchDistinct: 0,
        minPos: 0,
        maxPos: 0,
        slowArea: 30,
        defaultEaseType: 'bounce',
        resizePolling: 60,
    }
    for(var i in config){
        if(config.hasOwnProperty(i)){
            this.options[i] = config[i];
        }
    }
    this.options.ease = {
        quadratic: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function (k) {
                return k * ( 2 - k );
            }
        },
        circular: {
            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',   // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
            fn: function (k) {
                return Math.sqrt( 1 - ( --k * k ) );
            }
        },
        back: {
            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fn: function (k) {
                var b = 4;
                return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
            }
        },
        bounce: {
            style: 'ease-in-out',
            fn: function (k) {
                if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
                    return 7.5625 * k * k;
                } else if ( k < ( 2 / 2.75 ) ) {
                    return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
                } else if ( k < ( 2.5 / 2.75 ) ) {
                    return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
                } else {
                    return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
                }
            }
        },
        elastic: {
            style: '',
            fn: function (k) {
                var f = 0.22,
                    e = 0.4;

                if ( k === 0 ) { return 0; }
                if ( k == 1 ) { return 1; }

                return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
            }
        }
    };
    this.wrapRoot = typeof config.wrapRoot == 'string' ? $(config.wrapRoot) : config.wrapRoot;
    this.wrapRootStyle = this.wrapRoot[0].style;
    this.slideLens = this.wrapRoot.find(this.options.slideClass).length;
    this.curSlide = 0;
    this.x = this.y = this.startX = this.startY = 0;
    this.wrapRootStyle.webkitTransform = this.options.ease[this.options.defaultEaseType];
    this._translateTime(this.options.boneTime || 300);
    this.initEvent();
    this._refresh();
}
Iscroller.prototype = {
    initEvent: function () {
        this.wrapRoot.on('touchstart', this._handleEvent.bind(this));
        this.wrapRoot.on('touchend', this._handleEvent.bind(this));
        this.wrapRoot.on('touchmove', this._handleEvent.bind(this));
        $(window).on('resize', this._handleEvent.bind(this));
    },
    _limitHeight: function () {
        var slides = this.wrapRoot.find(this.options.slideClass),
            tmpThis = this;
        for (var i = 0, len = this.slideLens; i < len; i++) {
            var tmp = slides.eq(i),
                cH,
                cImg = tmp.find('img');
            if (cImg.length > 0) {
                cH = cImg.height();
                if(cH == 0){
                    cImg.on('load', function(e){
                        var cH = this.offsetHeight;
                        if(cH < tmpThis.maxHeight){
                            this.style['max-width'] = 'inherit';
                            this.style['height'] = '100%';
                        }
                    });
                }else if (cH < this.maxHeight) {
                    cImg.css('max-width', 'inherit');
                    cImg.css('height', '100%');
                }
            }
        }
    },
    _refresh: function () {
        var slides = this.wrapRoot.find(this.options.slideClass);
        var slideWidth = slides[0].offsetWidth;
        var tmpThis = this;
        if (this.options.needLimit) {
            var maxHeight = slideWidth * this.options.limitRate;
            slides.forEach(function (node, index) {
                var tmp = slides.eq(index),
                cH,
                cImg = tmp.find('img');
                tmp.find('.mark-box').css('height', maxHeight);
                /*limit height*/
                if (cImg.length > 0) {
                    cH = cImg.height();
                    if (cH == 0) {
                        cImg.on('load', function (e) {
                            var cH = this.offsetHeight;
                            if (cH < maxHeight) {
                                this.style['max-width'] = 'inherit';
                                this.style['height'] = '100%';
                            }
                        });
                    } else if (cH < maxHeight) {
                        cImg.css('max-width', 'inherit');
                        cImg.css('height', '100%');
                    }
                }
                //node.style['height'] = maxHeight + 'px';
            });
            this.maxHeight = maxHeight;
            //this._limitHeight(slides);
        }
        this.options.switchDistinct = Math.round(slideWidth + 10);
        this.options.maxPos = 0;
        this.options.minPos = -Math.round(this.options.switchDistinct * (this.slideLens - 1)) + slideWidth * 0.2 + 10;
        this._resetPos();
    },
    _handleEvent: function (e) {
        switch (e.type) {
            case 'touchstart':
                this._start(e);
                break;
            case 'touchmove':
                this._move(e);
                break;
            case 'touchend':
                this._end(e);
                break;
            case 'resize':
                this._resize(e);
                break;
        }
    },
    _resize: function () {
        var that = this;
        if(this.resizeTimeout)
            clearTimeout(this.resizeTimeout);

        this.resizeTimeout = setTimeout(function () {
            that._refresh();
        }, this.options.resizePolling);
    },
    _translateTime: function(time){
        this.wrapRootStyle.webkitTransitionDuration = time / 1000 + 's';
        this.wrapRootStyle.transitionDuration = time / 1000 + 's';
    },
    _translateTimeFun: function(easeing){
        this.wrapRootStyle.webkitTransitionTimingFunction = easeing.style;
        this.wrapRootStyle.transitionTimingFunction = easeing.style;
    },
    _translate: function(pos, time, easeType){
        if(time != undefined){
            this._translateTime(time);
        }
        if(easeType){
            this._translateTimeFun(this.options.ease[easeType]);
        }
        this.wrapRoot[0].style.webkitTransform = 'translate3d(' + pos + 'px,0,0)';
        this.wrapRoot[0].style.transform = 'translate3d(' + pos + 'px,0,0)';
        this.x = pos;
    },
    _start: function (e) {
        this.startX = this.x;
        this.startY = this.y;
        this.pointX = e.touches ? e.touches[0].pageX : e.pageX;
        this.pointY = e.touches ? e.touches[0].pageY : e.pageY;
        this.ready2move = true;
        this.slideing = false;
    },
    _move: function (e) {
        if (!this.ready2move) {
            return;
        }
        var curX = e.touches ? e.touches[0].pageX : e.pageX,
            curY = e.touches ? e.touches[0].pageY : e.pageY,
            deltaX = curX - this.pointX,
            deltaY = curY - this.pointY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.slideing = true;
            var newPos = Math.round(this.startX + deltaX);
            if(newPos > (this.options.maxPos + this.options.slowArea) || newPos < (this.options.minPos - this.options.slowArea)){
                newPos = this.x + (curX - this.midX)/3;
            }
            this._translate(newPos, 0);
        }
        if (this.slideing) {
            e.preventDefault();
        }
        this.midX = curX;
    },
    _end: function (e) {
        if (!this.ready2move) {
            return;
        }
        this.ready2move = false;
        var curX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
            deltaX = curX - this.pointX;;

        this._switchSlide(deltaX > 0 ? 'last' : 'next');

        this.startX = null;
    },
    _switchSlide: function (direction) {
        var tmpSlide = direction == 'next' ? this.curSlide - 1: this.curSlide + 1;
        var nextX = tmpSlide * this.options.switchDistinct;
        if (tmpSlide <= 0 && tmpSlide > -this.slideLens) {
            this.curSlide = tmpSlide;
        }
        this.x = nextX > this.options.maxPos ? this.options.maxPos : nextX < this.options.minPos ? this.options.minPos : nextX;
        this._translate(this.x, this.options.boneTime, this.options.defaultEaseType);
    },
    _resetPos: function(){
        if (this.x > this.options.maxPos) {
            this._translate(this.options.maxPos, this.options.boneTime, this.options.defaultEaseType);
            return true;
        } else if (this.x < this.options.minPos) {
            this._translate(this.options.minPos, this.options.boneTime, this.options.defaultEaseType);
            return true;
        }
        return false;
    }
}

/*audio*/
var AudioModule = function(config){
    this.init(config);
}
AudioModule.prototype = {
    init: function(obj){
        var tmpThis = this;
        this.rootWrap = $(obj.rootId);
        this.url = obj.mediaUrl || this.rootWrap.attr('data-url');
        this.btnModule = this.rootWrap.find('.audio-btn');
        this.rootWrap.on('click', function(e){
            e.preventDefault();
            var curClass = e.target.className.replace('audio-btn ', '');
            tmpThis._action(curClass);
        });
    },
    _action: function(type){
        switch(type){
            case 'play':
                this.audioTag.play();
                this.btnModule.removeClass('play');
                this.btnModule.addClass('pause');
            break;
            case 'pause':
                this.audioTag.pause();
                this.btnModule.removeClass('pause');
                this.btnModule.addClass('play');
            break;
            case 'load':
                this.audioTag = document.createElement('audio');
                this.audioTag.src = this.url;
                this.rootWrap.append(this.audioTag);
                this.audioTag.play();
                this.btnModule.removeClass('load');
                this.btnModule.addClass('pause');
            break;
            default:
            break;
        }
    }
}

/*recommend*/
var RecommendModule = function(config){
    this.init(config);
}

RecommendModule.prototype = {
    init: function(obj){
        var tmpThis = this;
        this.wrapRoot = typeof(obj.wrapRoot) == 'string' ? $(obj.wrapRoot) : obj.wrapRoot;
        this.loadingBar = $('#r-load-bar');
        this.pageUrl = obj.pageUrl;
        this.loadedLen = 0;
        this.reqTimeOut = obj.timeout;
        this.apiBackupUrl = obj.backupUrl;
        this.apiUrl = obj.url;
        this.requestHandle = obj.requestHandle,
        this.contentBox = this.wrapRoot.find('.box');
        this.loadingBar.show();
        this.topLen = 0;
        this.sendData = {
            feed_fmt:'1',
            dedup:'32',
            merge:'3',
            statics:'1',
            this_page:'1',
            rfunc:'105',
            fields: 'url',
            cateid: obj.cateid || 'sina-all',
            cre: obj.cre,
            mod:obj.mod,
            offset:obj.offset || 0,
            length:obj.pageLen || 10,
            pageUrl: this.pageUrl,
            feed_fields: 'url,title,wapurls,wapurl,img,comment_total,type,ctime',
        };
        this.localstorage = this.localstorage();
        this.maxLoad = obj.maxLoad || 0;
        this.checkBottomTimer = null;
        this.isFirst = true;
        this.requestHandle._jsonp(function(resp, is_backup){
            var self = arguments.callee;
            if(!resp){
                if(is_backup){
                    if(tmpThis.localstorage){
                        var cache = tmpThis.localstorage.get();
                        if(cache){
                            tmpThis.sendData['offset'] = cache.offset || 10;
                            tmpThis.analyContent(cache.data || [], cache.top || []);
                            tmpThis.loadingBar.hide();
                            return;
                        }
                    }
                    tmpThis.wrapRoot.hide();
                    return;
                }
                tmpThis.requestHandle._jsonp(function(resp){
                    self(resp, true);
                },tmpThis.apiBackupUrl, tmpThis.sendData, null, 'callback', null, tmpThis.reqTimeOut, true);
                return;
            }
            if(is_backup){
                tmpThis.loadingBar.hide();
                if(resp && resp.result){
                    resp = resp.result;
                    tmpThis.localstorage && tmpThis.localstorage.set({data: resp.data});
                    tmpThis.sendData['offset'] = 10;
                    tmpThis.analyContent(resp.data || [], []);
                    tmpThis.wrapRoot.show();
                }
                return;
            }
            tmpThis.loadingBar.hide();
            resp = resp.result;
            if(resp.status && resp.status.code == 0){
                tmpThis.totalLen = resp.total || resp.data.length;
                tmpThis.sendData['offset'] = resp.end;
                tmpThis.analyContent(resp.data, resp.top);
                $(window).on('scroll', function(){
                     var curDom = tmpThis.wrapRoot[0];
                     if(tmpThis.checkBottomTimer){
                         clearTimeout(tmpThis.checkBottomTimer);
                     }
                     tmpThis.checkBottomTimer = setTimeout(function(){
                         if(curDom.getBoundingClientRect().bottom < ($(window).height() + 97)){
                             tmpThis.loadMore();
                         }
                         tmpThis.checkBottomTimer = null;
                     },500);
                });

                tmpThis.wrapRoot.show();
            }else{
                console.log('request recomment fail!');
            }
        },this.apiUrl, this.sendData, null, 'callback', null, tmpThis.reqTimeOut, true);
    },
    localstorage: function(){
        var key = 'sinaRecommendCache';
        var storage = window.localStorage;
        return storage ? {
            get: function(){
                var record = storage[key];
                try{
                    return record ? JSON.parse(record) : null;
                }catch(err){
                    return null;
                }
            },
            set: function(value){
                if(value && typeof(value) == 'object'){
                    storage[key] = JSON.stringify(value);
                }
            }
        } : null;
    },
    orginizeHtml: function(obj){
        var img, title, dateObj, date, type, commen, hour, mintue, ret;
        // 需要异常处理
        img = '';
        if(obj.img && obj.img.u){
            img = '<div class="img ' + (obj.img.h > obj.img.w ? 'fill-x' : 'fill-y') + '" style="background:url(' + obj.img.u + '),url(http://mjs.sinaimg.cn/wap/h5/cms/article_v2/201505081537/images/feed_default.jpg);"></div>';
        }
        title = '<p class="title">' + obj.title + '</p>';
        hour = obj.date.getHours();
        mintue = obj.date.getMinutes();
        date = '<span class="date">'+(obj.date.getMonth() + 1)+'月'+obj.date.getDate()+'日 '+ (hour >= 10 ? hour : ('0'+hour)) +':'+ (mintue >= 10 ? mintue : ("0"+mintue))+'</span>';
        //type = obj.type == 'top' ? '<span class="type a">荐</span>' : '<span class="type b">猜</span>';
        comment = '<span class="comment-count">' + obj.commentCount + '</span>';
        ret = document.createElement('a');
        ret.href = obj.url;
        ret.innerHTML = '<div class="rec-unit">' + (img != '' ? img + '<div class="detail">' : '<div class="detail no-pic">') + title + '<p class="mark">' + date + comment + '</p></div></div>'
        return ret;
    },
    analyContent: function(auto, top){
        var feedNodes = [],
            tmpThis = this;
        this.topLen += top.length;
        top.forEach(function(item){
            var tmp = {};
            tmp.img = item.img;
            tmp.title = item.title;
            tmp.date = new Date(parseInt(item.ctime)*1000);
            tmp.type = 'top';
            tmp.url = item.wapurl;
            tmp.commentCount = item.comment_total || 0;
            feedNodes.push(tmpThis.orginizeHtml(tmp));
        });
        auto.forEach(function (item) {
            var tmp = {};
            tmp.img = item.img;
            tmp.title = item.title;
            tmp.date = new Date(parseInt(item.ctime)*1000);
            tmp.type = 'auto';
            tmp.url = item.wapurl;
            tmp.commentCount = item.comment_total || 0;
            feedNodes.push(tmpThis.orginizeHtml(tmp));
        });
        
        this.loadedLen += auto.length + top.length
        this.feedNodes = feedNodes;
        if (this.isFirst) {
            this.isFirst = false;
            this.loadAd(true);
        } else {
            this.loadAd(false);
        }
    },
    loadAd: function (flag) {
        var feedAds = [],
            feedAdDict = {},
            curIndex = 1,
            fragment = document.createDocumentFragment();
        if (flag) {
            feedAds = $('.sina_tj_article_feed');
            feedAds.forEach(function (node) {
                pos = parseInt(node.getAttribute('data-pos'));
                feedAdDict[pos] = node;
            });
        }
        
        this.feedNodes.forEach(function (node) {
            if (feedAds.length > 0) {
                while (1) {
                    if (curIndex in feedAdDict) {
                        fragment.appendChild(feedAdDict[curIndex]);
                        feedAdDict[curIndex].className = feedAdDict[curIndex].className.replace('hide', '');
                        curIndex++;
                        continue;
                    }
                    break;
                };
            }
            fragment.appendChild(node);
            curIndex++;
        });
        this.contentBox.append(fragment);
    },
    //TODO 
    loadMore: function(){
        var tmpThis = this;
        if (this.loadedLen < this.totalLen && this.maxLoad == 0 || this.loadedLen < this.maxLoad) {
            this.loadingBar.show();
            this.sendData['topCount'] = this.topLen;
            this.sendData.length = this.maxLoad - this.loadedLen > 10 ? 10 : this.maxLoad - this.loadedLen;
            this.requestHandle._jsonp(function(resp){
                tmpThis.loadingBar.hide();
                resp = resp.result;
                if(resp.status && resp.status.code == 0){
                    tmpThis.totalLen = resp.total || resp.data.length;
                    tmpThis.sendData['offset'] = resp.end;
                    tmpThis.analyContent(resp.data, resp.top);
                }else{
                    console.log('request recomment fail!');
                }
            },this.apiUrl, this.sendData, null, 'callback', null, 3, true)
        }else{
            console.log('load done')
            // this.wrapRoot.off('touchstart');
        }
    }
}

//TODO 评论
var AjaxComment = function(config){
    this.init(config);
}

AjaxComment.prototype = {
    init: function(obj){
        this.commentCountDisp = $('.j_commentBtn');
        this.apiUrl = obj.url;
        this.requestHandle = obj.requestHandle;
        this.rootWrap = null;
        if(obj.rootWrap && obj.rootWrap.length > 0){
            this.rootWrap = obj.rootWrap;
            this.boxArea = this.rootWrap.find('.box');
        }
        if(this.commentCountDisp.length >0 || this.rootWrap){
            this._loadData(obj.docId, obj.commentId);
        }  
    },
    _loadData: function(docId, commentId){
        var tmpThis = this,
            data = {
            docID: docId,
            commentId: commentId,
        };
        this.requestHandle._jsonp(function(resp){
            if(resp && resp.status == 0){
                var commentData = resp.data && resp.data.cmnt;
                tmpThis.updateCommentCount(commentData.total);
                if(tmpThis.rootWrap){
                    tmpThis.commentUrl = commentData.commentUrl;
                    if(commentData.cmntlist && commentData.cmntlist.length > 0){
                        tmpThis._orginizeDom(commentData.cmntlist);
                        return;
                    }
                }
            }
            //tmpThis.rootWrap.hide();
        },this.apiUrl, data, null, 'jsoncallback', null, null, true);
    },
    _makeHtml: function(nickName, time, content){
        return '<div class="comment-wrap"><div class="author">'+nickName+'<span class="time">'+time+'<span></span></span></div><article>'+content+'</article></div>'
    },
    _hideMore:function() {
            var commentLis = this.boxArea.find("article");
            var _width = this.rootWrap.width();
            var _criticalWidth = 300;  //临界宽度
            var _criticalWidth2 = 365;  //临界宽度
            var _criticalWidth3 = 390;  //临界宽度
            var _maxWordsNum = 0;  //评论最大字数,超出则显示展开评论
            if (_width <= _criticalWidth) {
                _maxWordsNum = 71;
            } else if (_width <= _criticalWidth2) {
                _maxWordsNum = 87;
            } else if (_width <= _criticalWidth3) {
                _maxWordsNum = 95;
            } else {
                _maxWordsNum = 105;
            }

            var comment = null;
            var commentTxt = "";
            for (var ssi = 0,len = commentLis.length;ssi < len;ssi++) {
                comment = commentLis.eq(ssi);
                if (comment) {
                    commentTxt = comment.html();
                    if (commentTxt.length > _maxWordsNum) {  //需要有显示全部
                        comment.data("allcontents", commentTxt);
                        comment.html(commentTxt.substr(0, _maxWordsNum) + "...");
                        comment.parent().append('<div class="cmt-show-more-wrap j_show_allcontent"><span class="cmt-show-more">展开更多</span></div>');
                    }
                }
            }
            $(".j_show_allcontent").on("click tap",function () {
                var comment = $(this).prev("article");
                comment.html(comment.data("allcontents"));
                $(this).hide();
            });
    },
    _orginizeDom: function(cmnList){
        var cmnDoms = [];
        var tmpThis = this;
        cmnList.forEach(function(item){
            var timeStr = item.time,
                now = new Date(),
                timeInter;
            timeArr = timeStr.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
            if(timeArr[1] < now.getFullYear()){
                timeInter = now.getFullYear() - timeArr[1] + '年前';
            }else if(timeArr[2] < (now.getMonth()+1)){
                timeInter = now.getMonth() - timeArr[2] +1 + '月前';
            }else if(timeArr[3] < now.getDate()){
                timeInter = now.getDate() - timeArr[3] + '天前';
            }else if(timeArr[4] < now.getHours()){
                timeInter = now.getHours() - timeArr[4] + '小时前';
            }else if(timeArr[5] < now.getMinutes()){
                timeInter = now.getMinutes() - timeArr[5] + '分钟前';
            }else{
                timeInter = '刚刚';
            }
            cmnDoms.push(tmpThis._makeHtml(item.nick, timeInter, item.content));
        })
        if(cmnDoms.length == 0){
            this.rootWrap.hide();
        }else{
            this.boxArea.html(cmnDoms.join(''));
            this._hideMore();
        }
    },
    updateCommentCount: function(count){
        if(count == null || this.commentCountDisp.length == 0){
            return;
        }
        try{
            count = parseInt(count);
            if(typeof(count) == 'number' && count >= 0){
                var count_str = count;
                if(count > 10000){
                    count_str = Math.floor(count/10000) + '万' + (count % 10000 == 0 ? '' : '+');
                }
                this.commentCountDisp.text(count_str);
            }
        }catch(err){
            console.log(err);
        }
    },
}

// 投票插件
$(function(){
    /**
     * 自定义下拉菜单
     * @method  simSelect
     * @param
     * @return
     * @desc    为需要自定义样式的select加入类名-'.j_simselect'
     */
    function simSelectBind(){
        if($('.j_simselect').length>0){
            $('.j_simselect').each(function(){
                $(this).on('change',function(){
                    var that = $(this),
                    val = that.val(),
                    text = that.find('option[value="'+val+'"]').text(),
                    oShow = $(this).prev(),
                    showText = oShow.text();
                    oShow.html((text&&text.length>0)?text:val);
                })
            })
        }

    }
    /**
     * 点击其他显示输入框
     * @method  simSelect
     * @param
     * @return
     * @desc    为其他input加入类名-'.j_other'
     */
    function otherSelect(){
        if($('.j_other').length>0){
            $('.j_other').on('click tap',function(){
                $(this).parent().siblings().find('p').toggle()
            })
        }

    }
    /**
     * 多选数目控制
     * @method  simSelect
     * @param
     * @return
     * @desc    为需要多选的父div加入类名-'.j_multi'；maxselect控制多选上限
     */
    function selectContrl(){
        if($('.j_multi').length>0){
            $('.j_multi').each(function(){
                var maxSelect = $(this).data('maxselect');
                var _self = $(this);
                $(this).find('input[type="checkbox"]').on('click tap', function(){
                    var checkedNum = _self.find('input[type="checkbox"]:checked').size();
                    if (checkedNum >= maxSelect) {
                        _self.find('input[type="checkbox"]:not(:checked)').attr('disabled', true);
                    } else {
                        _self.find('input[type="checkbox"]').removeAttr('disabled');
                    }
                });
            });
        }

    }
    function init() {
        otherSelect(); //点击其他显示input
        selectContrl(); //选项最大数控制
        simSelectBind();//自定义下拉菜单
        var voteForm = $('#j_suv_form');
        if (voteForm.length > 0) {
            
            voteForm.forEach(function (item) {
                var target = $(item),
                    tParent = target.parent(),
                    loginFlag = tParent.find('#cmnt_needLogin');

                var needLogin = loginFlag && loginFlag.data('needlogin'),
                    loginEntry = tParent.find('.sp_unlogin').length != 0;
                var submitBtn = target.find('#j_suv_smt');
                if (submitBtn[0] && submitBtn[0].tagName != 'input') {
                    submitBtn.replaceWith('<input type="submit" value="提交" class="sp_smt" id="j_suv_smt" />')
                }
                if (needLogin || loginEntry) {
                    if(window.getUserInfo){
                        window.getUserInfo(function(re){
                            if(re && re.islogin){
                                if (loginEntry) {
                                    tParent.find('.sp_unlogin').remove();
                                    tParent.find('.sp_login_btn').remove();
                                    target.find('.sp_submit').removeClass('sp_submit_disable');
                                    target.find('.sp_submit').find('span').replaceWith('<input type="submit" value="提交" class="sp_smt" id="j_suv_smt" />');
                                }
                            }else{
                                 if (!loginEntry) {
                                    target.before('<div class="sp_unlogin">该调查需登录参与，您还未登录</div><a class="sp_login_btn j_login_btn" href="http://passport.sina.cn/signin/signin?entry=wapsso&amp;vt=4&amp;r=' + encodeURIComponent(location.href) + '&amp;revalid=1">登&nbsp;录</a>')
                                    target.find('.sp_submit').addClass('sp_submit_disable');
                                    target.find('#j_suv_smt').replaceWith('<span>提交</span>');
                                }
                            }
                        });
                    }
                }
            });
        }
    }
    window.initVote = init;
    /**
     * 绑定事件
     */

});


// 图片弹层插件
$(function(){
    // 图片点击事件委托
    window.showpic= function(oBox , oBody){
        var oMeta=document.getElementsByName('viewport')[0];
        var screenScroll=0;

        oBox.on('click',function(ev){

            var obj=ev.srcElement||ev.target;
                // 图片点击事件
            if(obj.tagName=='IMG'){
                if (obj.getAttribute('disabeld-show') || $(obj).parents('a').length > 0) {
                    return;
                }
                seePic($(obj));
            }
            else if(obj.tagName=='EM'){
                seePic($(obj).prev());
            }

           // 图片关闭
        $('#showpic_box').on('click',function(){

            oMeta.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no";

            $('#showpic_box').addClass('hide');
            showBody();
            window.removeEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', orientationchange, false);
            window.scrollTo(0,screenScroll);
        })
        $('#showpic_box img').on('click',function(ev){
            return false;
        })


        });

        // 点击图片把当前图片src给弹层， 同时改变高度
        function seePic(obj){
            if(!obj || obj.length == 0 || obj[0].tagName != 'IMG'){
                return;
            }
            if($('#showpic_box').length==0){
                var str='<aside id="showpic_box" class="showpic_box hide"><div class="center_pic_bg show"></div><p class="close_ico"><b></b></p><ul class="center_marker_pic"><li ><img src="" alt="pic"></li></ul></aside>';
                $('body').append(str);
            }
            // ios全屏显示
            oMeta.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui";
            // 记录当时屏幕位置
            screenScroll = document.body.scrollTop || document.documentElement.scrollTop;
            // 显示图片
            var oPic=$('#showpic_box');

            var data_src=obj.data('src');

            if(data_src){
                oPic.find('img').attr('src',data_src);
            }
            else{
                oPic.find('img').attr('src',obj.attr('src'));
            }

            hideBody();
            oPic.removeClass('hide');

            // 横屏事件
            window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', orientationchange, false);

            changSize();

        }

        function showBody(){

            if(oBody.length>1){
                for(var i=0;i<oBody.length;i++){
                    oBody[i].show();
                }
            }
            else if(oBody.length==1){
                oBody.show();
            }
            else{
                return;
            }
        }
        function hideBody(){

            if(oBody.length>1){
                for(var i=0;i<oBody.length;i++){
                    oBody[i].hide();

                }
            }
            else if(oBody.length==1){
                oBody.hide();
            }
            else{
                return;
            }
        }
    }
    // 横竖屏处理
    function orientationchange(){

            if(window.navigator.userAgent.toLowerCase().indexOf('xiaomi')!=-1){
                  setTimeout(function(){
                    changSize();
                    window.scrollTo(0, 1);
                  },100)


            }
            else{
                    setTimeout(function(){
                    changSize();
                    window.scrollTo(0, 1);
                  },30)
            }
    }

    // 改变屏幕宽高适应图片大小
    function changSize(){
        var docWidth=document.documentElement.clientWidth;
        var docHeight=document.documentElement.clientHeight;

        var oPic=$('#showpic_box');
        oPic.find('ul').css({'width':docWidth,'height':docHeight,'line-height':docHeight+'px'});
        oPic.find('li').css({'width':docWidth,'height':docHeight,'line-height':docHeight+'px'});
    }

})

function prevent(e) {
    //弹出评论框状态下禁止页面滚动
    if (!$('#j_cmnt_pop').css('display') == 'none') e.preventDefault();
    return;
}
var requestHandle = new asyncRequest();

/*客户端呼起*/
(function(){

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
              self.schemejc = config.schemejc;
              self.downloadjc = config.downloadjc;
            } else {
              self.installUrl = config.androidInstallUrl;
              self.nativeUrl = config.androidNativeUrl;
              self.openTime = config.androidOpenTime || 3000;
              //self.package = config.package || 'com.sina.news';
              self.schemejc = config.schemejc;
              self.downloadjc = config.downloadjc;
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
            var self = this,
                oImg = new Image(),
                ua = navigator.userAgent.toLowerCase();
            oImg.src = self.schemejc;
            
            //if(ua.indexOf('iphone os 6_') != -1){
            if(self.platform == 'ios' && 
                (ua.indexOf('os 6_') != -1 || ua.indexOf('os 7_') != -1)){ 
                window.location = self.installUrl;
                var _oImg = new Image();
                _oImg.src = self.downloadjc;
            }else{ 
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
            }
        },
        /**
         * [_gotoInstall 去下载]
         * @param  {[type]} startTime [开始时间]
         * @return 
         */
        _gotoDownload: function(startTime) {
            var self = this;
            var endTime = Date.now();
            if (endTime - startTime < self.openTime + 50) {
                window.location = self.installUrl;
                var oImg = new Image();
                oImg.src = self.downloadjc;
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
            if (ua.match(/iphone|ipod|ipad/ig)){
                return 'ios';
            } else if (ua.match(/Android/i)) {
                return 'android';
            } else {
                return '';
            }
        }
    }

    function is_weixn(){

        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger")  {
            return true;
        } else {
            return false;
        }
    }

    function is_Android(){

        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/Android/i)) {
            return true;
        } else {
            return false;
        }
    }

    function is_Ios(){

        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/iphone|ipod|ipad/ig))  {
            return true;
        } else {
            return false;
        }
    }

    function is_Ipad(){

        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/ipad/ig))  {
            return true;
        } else {
            return false;
        }
    }

    var k, type, schemejc, downloadjc;

    function clientInit(){
        $('.j_appentrance').attr('href', 'javascript:void(0);');
        $(document).on('click tap', '.j_appentrance', function(e){

            var that = $(this),
                configObj,
                newsid,
                downloadurl,
                apiurl,
                url = 'http://api.sina.cn/sinago/scheme.jsonp';

            type = that.data('type') ? that.data('type') : '';    //若不填写type默认为新浪新闻
            if(is_Ipad())type += 'hd';     //ipad环境下需要切换至ipad版应用标识

            if(that.data('newsid') && that.data('newsid') != '' && that.data('downloadurl') && that.data('downloadurl') != ''){
                newsid = that.data('newsid');
                downloadurl = that.data('downloadurl');
                k = downloadurl.indexOf('k=') != -1 ? downloadurl.split('k=')[1] : '';
                schemejc = that.data('schemejc') ? that.data('schemejc') : '';
                downloadjc = that.data('downloadjc') ? that.data('downloadjc') : '';
                configObj = {
                    iosInstallUrl: downloadurl,
                    androidInstallUrl: downloadurl,
                    iosNativeUrl: type +'://newsid='+ newsid,
                    androidNativeUrl: type +'://newsid='+ newsid,
                    schemejc: schemejc,
                    downloadjc: downloadjc
                };
                if(is_weixn() && (type == 'sinanews' || type == 'sinasports')){
                    if(is_Android())window.location.href = 'http://mjs.sinaimg.cn/wap/public/generalize/micromessenger/android_'+ type +'.html?newsid='+ encodeURIComponent(newsid) +'&k='+ k +'&type='+ type;
                    else if(is_Ios())window.location.href = 'http://mjs.sinaimg.cn/wap/public/generalize/micromessenger/ios_'+ type +'.html?newsid='+ encodeURIComponent(newsid) +'&k='+ k +'&type='+ type;
                }else if(!is_weixn()){
                    RedirectToNative.init(configObj);
                }else{ 
                    var oImg1 = new Image(),
                        oImg2 = new Image();
                    if(schemejc)oImg1.src = schemejc;
                    if(downloadjc)oImg2.src = downloadjc;
                    window.location.href = downloadurl;
                }
            }else if(that.data('apiurl') && that.data('apiurl') != ''){
                var apiurl = that.data('apiurl').split('&k=')[0];
                k = that.data('apiurl').split('&k=')[1];
                schemejc = that.data('schemejc') ? that.data('schemejc') : '';
                downloadjc = that.data('downloadjc') ? that.data('downloadjc') : '';
                url += '?url=' + encodeURIComponent(apiurl) + '&jsonpcallback=apiCallbackFunction';
                $.ajax({
                    url : url,
                    async : false,
                    type : 'GET',
                    dataType : 'jsonp',
                    success : function(data){
                    },
                    error : function(xhr, type){
                    }
                }); 
            }else if((!that.data('newsid') || that.data('newsid') == '') && that.data('downloadurl') && that.data('downloadurl') != ''){
                downloadurl = that.data('downloadurl');
                k = downloadurl.indexOf('k=') != -1 ? downloadurl.split('k=')[1] : '';
                schemejc = that.data('schemejc') ? that.data('schemejc') : '';
                downloadjc = that.data('downloadjc') ? that.data('downloadjc') : '';
                configObj = {
                    iosInstallUrl: downloadurl,
                    androidInstallUrl: downloadurl,
                    iosNativeUrl: type +'://newsid=',
                    androidNativeUrl: type +'://newsid=',
                    schemejc: schemejc,
                    downloadjc: downloadjc
                };
                if(is_weixn() && (type == 'sinanews' || type == 'sinasports')){
                    if(is_Android())window.location.href = 'http://mjs.sinaimg.cn/wap/public/generalize/micromessenger/android_'+ type +'.html?newsid=&k='+ k +'&type='+ type;
                    else if(is_Ios())window.location.href = 'http://mjs.sinaimg.cn/wap/public/generalize/micromessenger/ios_'+ type +'.html?newsid=&k='+ k +'&type='+ type;
                }else if(!is_weixn()){
                    RedirectToNative.init(configObj);
                }else{ 
                    var oImg1 = new Image(),
                        oImg2 = new Image();
                    if(schemejc)oImg1.src = schemejc;
                    if(downloadjc)oImg2.src = downloadjc;
                    window.location.href = downloadurl;
                }
            }
            e.stopPropagation();
            e.preventDefault();
        });
    }

    window.apiCallbackFunction = function(data){
        if(data.data){
            var newsid = data.data.id_info.id,
                downloadurl = 'http://sina.cn/j/d.php?k=' + k,
                configObj = {
                    iosInstallUrl: downloadurl,
                    androidInstallUrl: downloadurl,
                    iosNativeUrl: 'sinanews://newsid='+ newsid,
                    androidNativeUrl: 'sinanews://newsid='+ newsid,
                    schemejc: schemejc,
                    downloadjc: downloadjc
                };
            if(is_weixn()){
                if(is_Android())window.location.href = 'http://mjs.sinaimg.cn/wap/public/generalize/micromessenger/android_'+ type +'.html?newsid='+ encodeURIComponent(newsid) +'&k='+ k +'&type='+ type;
                else if(is_Ios())window.location.href = 'http://mjs.sinaimg.cn/wap/public/generalize/micromessenger/ios_'+ type +'.html?newsid='+ encodeURIComponent(newsid) +'&k='+ k +'&type='+ type;
            }else{
                RedirectToNative.init(configObj);
            }
        }
    }

    
    /**
     * 绑定事件
     */
    setTimeout(function(){
        clientInit();       //广告 - 客户端唤起
    }, 300);


})();
/*index*/
$(function(){
    
    /*
        加载余下全文
    */
    if(!window.__docConfig){
        throw new Error('require "__docConfig" not found!');
    }
    $('#j_load_btn').on('click', function(e){
        var curDom = $(this),
            url = 'http://interface.sina.cn/wap_api/wap_get_article_info.d.json',
            data = {docID: __docConfig.__docId, page: 2},
            loadBar = $('#j_load_bar');
        if(curDom.data('loading') == 'yes' || curDom.data('loaded') == 'done'){
            return;
        }
        curDom.hide();
        loadBar.show();
        curDom.data('loading', 'yes');
        requestHandle._jsonp(function(resp){
            loadBar.hide();
            if(resp && resp.content){
                loadBar.before(resp.content);
            }
            curDom.data('loading', 'not');
            curDom.data('loaded', 'done');
            setTimeout(function () {
                var tmp = loadBar.parent()
                tmp.find('.slide-box').forEach(function (item) {
                    var tmp;
                    if (item.id && item.getAttribute('data-build') != '1') {
                        item = $(item);
                        tmp = new Iscroller({
                            wrapRoot: item,
                            needLimit: item.data('limit-height'),
                        });
                        item.data('build', '1');
                    }
                });
            }, 500);
        }, url, data, null, null, null, null, true);
    });
    /*
        添加audio组件 交互
    */
    $('.audio').forEach(function(item){
        if(item.id){
            var tmp = new AudioModule({
                rootId: '#' + item.id,
                mediaUrl: __docConfig.__media || '',
            });
        }
    });

    /*
        增加滑动组件交互
    */
    $('.slide-box').forEach(function(item){
        var tmp;
        if (item.id && item.getAttribute('data-build') != '1') {
            item = $(item);
            window[item.attr('id')] = new Iscroller({
                wrapRoot: item,
                needLimit: item.data('limit-height'),
            });
            item.data('build', '1');
        }
    });

    /*财经切换*/
    if($('.j_stock_rank').length>0){
        var aRank_1 = $('.j_stock_rank li');
        aRank_1.on('click',function(){

            aRank_1.removeClass('on');
            $(this).addClass('on');
            $(this).parent().parent().find('.j_rank_box').addClass('hide');
            $(this).parent().parent().find('.j_rank_box').eq($(this).index()).removeClass('hide');
        })
        var aRank_2= $('.j_rank_ul li');
        aRank_2.on('click',function(){
            aRank_2.removeClass('on');
            $(this).addClass('on');
            $(this).parent().parent().find('.j_rank_data').addClass('hide');
            $(this).parent().parent().find('.j_rank_data').eq($(this).index()).removeClass('hide');
        })
    }
    /*nba 切换*/
    $('.card_mode').on('click tap', '.j_nba_date li', function(ev){
        var that = $(this).parent();
        that.find('li').removeClass('on');
        $(this).addClass('on');
        var oCard = that.parent();
        var aFeedDate = oCard.find('.feed_date_tips');
        if(aFeedDate.length>1){
            aFeedDate.addClass('hide');
            aFeedDate.eq($(this).index()).removeClass('hide');
        }
        var aDateWrap = oCard.find('.date_wrap');
        aDateWrap.addClass('hide');
        aDateWrap.eq($(this).index()).removeClass('hide');
    });

    /*精彩图片限高*/
    if($('.picture .pic-wrap').length>0){
        $('.picture .pic-wrap').height(parseInt($('.picture .pic-wrap').width()/1.4)+22);
        $(window).on('resize', function(e){
             $('.picture .pic-wrap').height(parseInt($('.picture .pic-wrap').width()/1.4)+22);
        });
    }

    /*拉评论*/
    if(__docConfig.__cmntId){
        var ajaxCommentDemo = new AjaxComment({
            rootWrap: $('.extend-module.comment'),
            url: __docConfig.__api || 'http://interface.sina.cn/wap_api/wap_get_article_info.d.json',
            docId: __docConfig.__docId,
            commentId: __docConfig.__cmntId,
            commentCount: __docConfig.__cmntTotal || 0,
            requestHandle: requestHandle,
        });
    }
    


    /*推荐*/
    var recommendNode = $('.extend-module.recommend');
    if(recommendNode.length == 1 && recommendNode.data('source') == 'guess'){
        var recom = new RecommendModule({
            wrapRoot: recommendNode,
            cre:__docConfig.__cre,
            mod: 'f',
            pageUrl: __docConfig.__webURL,
            timeout: 3,
            url:'http://cre.dp.sina.cn/api/v3/get',
            backupUrl: __docConfig.__hotapi || 'http://interface.sina.cn/wap_api/hotnews.d.html',
            requestHandle: requestHandle,
            cateid: __docConfig.__cateid,
            maxLoad: 20,
        });
    }


    /*初始化点赞*/
    if (__docConfig && __docConfig.__ispraise) {
        Praise.init({
            requestHandle: requestHandle,
            docId: __docConfig.__docId,
            wrapRoot: '.M_attitude ',
            apiPath: 'http://data.api.sina.cn/api/count/apicount.php',
            type: 'article',
        })
    }else{
        $('.M_attitude').hide();
    }
    setTimeout(function(){
        showpic($('#j_articleContent'), [$('#j_header'),$('#j_generalize'),$('#artcileMain'),$('#j_float_btns'),$('#j_footer'),$('.card_box'),$('.article_push'),$('.article-module'),$('.extend-module'),$('.foot_comment')]);
        var oComment = new Comment({
            main: [$('#j_header'), $('#j_generalize'), $('#artcileMain'), $('#j_float_btns'), $('#j_footer'), $('.card_box'), $('.article_push'), $('.article-module'), $('.extend-module'), $('#promotionCover'), $('.textati_finance')]
        });
        window.addEventListener("touchmove", prevent, false);
        initVote();
    },500)

});