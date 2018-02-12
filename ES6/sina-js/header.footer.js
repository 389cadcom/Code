(function() {
    var loginBox = document.getElementById("loginBox");
    if (loginBox) { (function() {
            if (typeof window.$WeiboJsApi == "undefined") {
                window.$WeiboJsApi = {}
            }
            $WeiboJsApi._ajax = function(a) {
                a = a[0] || {};
                this.url = a.url || "";
                this.param = a.param || null;
                this.callback = a.callback ||
                function() {};
                this.timeout = a.timeout || 15000;
                this.ontimeout = a.ontimeout ||
                function() {};
                this.timeoutflag = true;
                if (typeof window._$WeiboJsApi_callback == "undefined") {
                    window._$WeiboJsApi_callback = {}
                }
                this._setJSONRequest()
            };
            $WeiboJsApi._ajax.prototype = {
                _setJSONRequest: function() {
                    var d = document.getElementsByTagName("head")[0];
                    var b = document.createElement("script");
                    var a = this._setRandomFun();
                    var f = this;
                    var e = "";
                    for (var c in this.param) {
                        if (e == "") {
                            e = c + "=" + this.param[c]
                        } else {
                            e += "&" + c + "=" + this.param[c]
                        }
                    }
                    b.type = "text/javascript";
                    b.charset = "utf-8";
                    if (d) {
                        d.appendChild(b)
                    } else {
                        document.body.appendChild(b)
                    }
                    window._$WeiboJsApi_callback[a.id] = function(g) {
                        f.callback(g);
                        f.timeoutflag = false;
                        setTimeout(function() {
                            delete window._$WeiboJsApi_callback[a.id];
                            b.parentNode.removeChild(b)
                        },
                        100)
                    };
                    b.src = this.url + "&callback=" + a.name + "&" + e;
                    setTimeout(function() {
                        if (f.timeoutflag) {
                            f.ontimeout();
                            setTimeout(function() {
                                delete window._$WeiboJsApi_callback[a.id];
                                b.parentNode.removeChild(b)
                            },
                            100)
                        }
                    },
                    f.timeout)
                },
                _setRandomFun: function() {
                    var a = "";
                    do {
                        a = "$WeiboJsApi" + Math.floor(Math.random() * 10000)
                    } while ( window . _$WeiboJsApi_callback [ a ]);
                    return {
                        id: a,
                        name: "window._$WeiboJsApi_callback." + a
                    }
                }
            };
            window.$WeiboJsApi.ajax = function() {
                return new $WeiboJsApi._ajax(arguments)
            };
            window.$WeiboJsApi.getWeiboInfo = function(a) {
                return new $WeiboJsApi.ajax({
                    url: "http://127.0.0.1:9527/query?appid=com.sina.weibo",
                    callback: a
                })
            };
            window.$WeiboJsApi.getAppInfo = function(a, b) {
                return new $WeiboJsApi.ajax({
                    url: "http://127.0.0.1:9527/query?appid=" + a,
                    callback: b
                })
            };
            window.$WeiboJsApi.startWeibo = function(a) {
                return new $WeiboJsApi.ajax({
                    url: "http://127.0.0.1:9527/si?cmp=com.sina.weibo_com.sina.weibo.SplashActivity&act=android.intent.action.VIEW",
                    callback: a
                })
            };
            window.$WeiboJsApi.startApp = function(a, c, b) {
                return new $WeiboJsApi.ajax({
                    url: "http://127.0.0.1:9527/si?act=android.intent.action.VIEW&cmp=" + a + "_" + c,
                    callback: b
                })
            };
            window.$WeiboJsApi.startScheme = function(a, b) {
                return new $WeiboJsApi.ajax({
                    url: "http://127.0.0.1:9527/si?act=android.intent.action.VIEW&data=" + a,
                    callback: b
                })
            };
            window.$WeiboJsApi.getUserInfo = function(a) {
                return new $WeiboJsApi.ajax({
                    url: "http://127.0.0.1:9527/login?",
                    callback: a.onsuccess,
                    ontimeout: a.ontimeout,
                    timeout: a.timeout
                })
            }
        })(); (function(h, g) {
            function j(q) {
                var p = [],
                o = /%20/g;
                var n;
                for (var m in q) {
                    n = q[m].toString();
                    p.push(h.encodeURIComponent(m).replace(o, "+") + "=" + h.encodeURIComponent(n).replace(o, "+"))
                }
                return p.join("&")
            }
            var b = Object.prototype.toString;
            function a(m) {
                return b.call(m) === "[object Function]"
            }
            function l(m) {
                return b.call(m) === "[object Number]"
            }
            function e(m) {
                var n = (new Date()).getTime() + Math.floor(Math.random() * 100000);
                return m ? m + "" + n: n
            }
            var f = g.getElementsByTagName("head")[0] || g.documentElement;
            var i = f.getElementsByTagName("base")[0];
            var d = /^(?:loaded|complete|undefined)/;
            var k = function(m, n) {
                m.onload = m.onreadystatechange = function() {
                    if (d.test(m.readyState)) {
                        m.onload = m.onreadystatechange = null;
                        f.removeChild(m);
                        m = null
                    }
                }
            };
            function c(m, o) {
                var n = g.createElement("script");
                n.src = m;
                if (o) {
                    n.charset = o
                }
                n.async = true;
                k(n);
                if (i) {
                    f.insertBefore(n, i)
                } else {
                    f.appendChild(n)
                }
                return n
            }
            h.jsonp = function(q) {
                var m = q.jsonp || "callback";
                var r = e("jsonpcallback");
                var n = m + "=" + r;
                var o = window.setTimeout(function() {
                    if (a(q.ontimeout)) {
                        q.ontimeout()
                    }
                },
                5000);
                window[r] = function(s) {
                    window.clearTimeout(o);
                    if (a(q.onsuccess)) {
                        q.onsuccess(s)
                    }
                };
                var p = q.url.indexOf("?") > 0 ? "&": "?";
                if (q.data) {
                    c(q.url + p + j(q.data) + "&" + n, q.charset)
                } else {
                    c(q.url + p + n, q.charset)
                }
            };
            h.cookie = {
                setCookie: function(n, r, o, u, q, m) {
                    var s = [];
                    s.push(n + "=" + escape(r));
                    if (o) {
                        var t = new Date();
                        var p = t.getTime() + o * 3600000;
                        t.setTime(p);
                        s.push("expires=" + t.toGMTString())
                    }
                    if (u) {
                        s.push("path=" + u)
                    }
                    if (q) {
                        s.push("domain=" + q)
                    }
                    if (m) {
                        s.push(m)
                    }
                    g.cookie = s.join(";")
                },
                getCookie: function(m) {
                    m = m.replace(/([\.\[\]\$])/g, "\\$1");
                    var o = new RegExp(m + "=([^;]*)?;", "i");
                    var p = g.cookie + ";";
                    var n = p.match(o);
                    if (n) {
                        return n[1] || ""
                    } else {
                        return ""
                    }
                },
                deleteCookie: function(m) {
                    g.cookie = m + "=;expires=Fri, 31 Dec 1999 23:59:59 GMT;"
                }
            }
        })(window, document); (function(a, d) {
            var c = function(f) {
                return d.getElementById(f)
            },
            b = {},
            e = false;
            b.loginBox = c("loginBox");
            jsonp({
                url: "http://passport.sina.cn/sso/islogin",
                data: {
                    entry: "wapsso"
                },
                charset: "utf-8",
                onsuccess: function(f) {
                    if (f.retcode === 20000000) {

                    	if (b.loginBox.href == location.href || b.loginBox.href == location.href + "#") {
                            b.loginBox.href = f.data.return_url;
                        }

                        var j = '<img src="' + f.data.portrait_url + '">';
                        if (f.data.unread_num > 0) {
                            j += "<em>" + f.data.unread_num + "</em>"
                        }
                        b.loginBox.innerHTML = j
                        if($('#footer_entry').length > 0){
                            $('#footer_entry').replaceWith("<a href='http://passport.sina.cn/sso/logout?vt=4&amp;entry=wapsso&amp;r="+encodeURIComponent(location.href)+"' class='linkico'>退出</a>");
                        }
                    } else {
                        if (f.retcode === 50011039) {
                            var h = cookie.getCookie("needapp");
                            if (h === "") {
                                e = true
                            } else {
                                var i = (new Date()).getTime() / 1000;
                                var g = (i - h) / (60 * 60);
                                if (g > 24) {
                                    e = true
                                }
                            }
                            if (e) {
                                $WeiboJsApi.getUserInfo({
                                    onsuccess: function(l) {
                                        var k = {
                                            entry: "wapsso",
                                            id: l.uid,
                                            login_state: l.login_state,
                                            from: l.from
                                        };
                                        jsonp({
                                            url: "http://passport.sina.cn/sso/checkapp",
                                            data: k,
                                            charset: "utf-8",
                                            onsuccess: function(m) {
                                                if (m.retcode === 20000000 && l.login_state === 1) {
                                                    if (b.loginBox.href == location.href || b.loginBox.href == location.href + "#") {
					                                    b.loginBox.href = m.data.return_url
					                                }
                                                    var n = '<img src="' + l.portrait_url + '">';
                                                    if (l.unread_num > 0) {
                                                        n += "<em>" + l.unread_num + "</em>"
                                                    }
                                                    b.loginBox.innerHTML = n
                                                } else {
                                                	if (b.loginBox.href == location.href || b.loginBox.href == location.href + "#") {
					                                    b.loginBox.href = m.data.return_url
					                                }

                                                }
                                            }
                                        })
                                    },
                                    ontimeout: function() {
                                        if (b.loginBox.href == location.href || b.loginBox.href == location.href + "#") {
                                            b.loginBox.href = "http://my.sina.cn/?pos=108&vt=4"
                                        }
                                    },
                                    timeout: 2000
                                })
                            } else {
                                if (b.loginBox.href == location.href || b.loginBox.href == location.href + "#") {
                                    b.loginBox.href = "http://my.sina.cn/?pos=108&vt=4"
                                }
                            }
                        }
                    }
                }
            })
        })(window, document)
    };
})();

(function () {

    /*
     * 返回上一页
     */
     function backTopHandle(){
        var backTop = $('.j_scrollToTop');
        if(backTop.length > 0){
            backTop.click(function(){
                window.scrollTo(0,0);
            });
        }

    }
    function backHistory() {
        var goBack = $('.j_backPrePage');
        if(goBack.length > 0){
            goBack.click(function(){
                window.history.length <= 1 ? window.location.href='http://sina.cn' : window.history.go(-1);
            })
        }
    }
    /*自定义下拉菜单*/
    function simSelectBind(){
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

    /**
     * 追加onscroll事件
     * @method  addOnscroll
     * @param   fn  执行函数
     */
    function addOnscroll(fn){
        if (typeof window.onscroll == 'function') {
            var tempFn = window.onscroll;
            window.onscroll = function(){
                tempFn();
                fn();
            }
        } else {
            window.onscroll = function(){
                fn();
            }
        }
    }

    // 设置搜索内容
    function setSearchContent(evt){
        searchTimer = setInterval(checkSearchContent, 200);
    }
    function checkSearchContent(){
        if(!searchTimer){
            return;
        }
        var sInput = $('#searchInput'),
            cross = $('#searchCross'),
            searchContent = sInput ? $.trim(sInput.val()) : '';

        if(cross){
            if (searchContent === '') {
                if (cross.css('display') != 'none') {
                    cross.css('display', 'none');
                }
            }else {
                if (cross.css('display') != 'block') {
                    cross.css('display', 'block');
                }
            }
        }

    };
    // 检查搜索内容
    function defaultSearchContent(evt){
        if (searchTimer) {
            clearInterval(searchTimer);
            searchTimer = null;
        }
    };

    // 清空搜索输入框
    function clearSearchContent(evt){
        var sInput = $('#searchInput'),
            cross = $('#searchCross');

        cross && cross.css('display', 'none');
        if(sInput) {
            sInput.val('');
            sInput.focus();
        }
    };

    function searchInit(){
        if($('#searchInput').length > 0 && $('#searchCross').length > 0){
            var sInput = $('#searchInput'),
            cross = $('#searchCross'),
            defaultSearch = sInput.attr('placeholder'),
            searchContent = sInput ? $.trim(sInput.val()) : '';

            if(cross && searchContent === defaultSearch)cross.css('display', 'none');
            $(document).on('focus', '#searchInput', setSearchContent);          // 设置搜索内容
            $(document).on('blur', '#searchInput', defaultSearchContent);       // 检查搜索内容
            $('#searchCross').on('click tap', clearSearchContent);    //清空搜索输入框
        }
    }
    window.onpageshow = function(){
        simSelectBind();            //select控件
        $('.p_search_wrap').find('.j_simselect').eq(0).val('news');
        $('.p_search_wrap').find('.j_simselect').eq(0).prev().html('站内');
        $('.footer_search').find('.j_simselect').eq(0).val('news');
        $('.footer_search').find('.j_simselect').eq(0).prev().html('站内');
    }


    window.checkLogin=function(){

        if(getCookie ('SUBP')){

            var obj=getSUBPCookie.decode(getCookie ('SUBP'));
            if(typeof obj=='object'){

                if(obj.status==="0"){
                    var bloon= true;
                }
                else{
                    var bloon= false;
                }
            }
            else{
                var bloon=false;
            }
        }
        else{
            var bloon=false;
        }

        return bloon;

    }

    window.getUserInfo=function(fn, getUid){
        if(window.userInfo){
            fn && fn(window.userInfo);
            return;
        }
        getUid = getUid || false;
        //window._userInfocallback=fn;

        if(!window.checkLogin()){
            delCookie('sina_ucode');
            window.userInfo = false;
            fn && fn({});
            return ;
        }
        if(fn && getUid){
            var localUid = getCookie('sina_ucode');
            if(localUid){
                return fn({uid:convNum(localUid, 'decode')});
            }
        }
        
        

        var url = 'http://interface.sina.cn/wap_api/wap_get_user_info.d.api';

        var oDate=new Date();
        var data = {
            random: Math.random(),
            time: oDate.getTime()
        }

        jsonp(function(rs){
            rs.result.data = rs.result.data ||{};
            rs.result.data.islogin =rs.result.status.code;
            if(rs.result.data.islogin && rs.result.data.uid){
                setCookie('sina_ucode', convNum(rs.result.data.uid), 1, '/', '.sina.cn');
            }
            window.userInfo=rs.result.data;
            if(typeof(fn) == 'function'){
                fn(rs.result.data);
            }
        }, url, data, null, 'jsoncallback');
    }
    function convNum(input, method){
        method = method || 'encode';
        var Keys = ['a','B', 'X', 'M', 'Z', 'Y', 'Q', 'c', 'I', 'p'],
            ret = '';
        for(var i=0, len=input.length; i< len; i++){
            ret += method == 'encode' ? Keys[parseInt(input[i])] : Keys.indexOf(input[i]);
        }
        return ret;
    }
    function urlEncode(data) {
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
    }
    function jsonp(callBackFunc, url, data, retry, jsonpQsKey, callbackKey, timeout, cache) {
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
            url += (url.indexOf('?') == -1 ? '?' : '&') + urlEncode(data);
            // ajaxParams['data'] = data;
        }
        ajaxParams['url'] = url;
        if (typeof (callBackFunc) === "function") {
            if (callbackKey) { //某些情况需要指定回调名
                jsonpCallback = callbackKey;
            } else {
                jsonpCallback = 'jsonp_' + (new Date()).getTime();
            }
            window[jsonpCallback] = function (resp) {
                callBackFunc(resp);
                delete window[jsonpCallback];
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
        $.ajax(ajaxParams);
    }
    window.getUserInfoFunction = function(rs) {

        rs.result.data = rs.result.data ||{};
        rs.result.data.islogin =rs.result.status.code;

        window.userInfo=rs.result.data

        window._userInfocallback && window._userInfocallback(rs.result.data);
    }

    function delCookie(m){
        document.cookie = m + "=;expires=Fri, 31 Dec 1999 23:59:59 GMT;path=/;domain=.sina.cn";
    }
    window.getCookie = function(ckName) {

        if (undefined == ckName || "" == ckName) {
            return false;
        }

        return stringSplice(document.cookie, ckName, ";", "");

    }
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

    function stringSplice(src, k, e, sp) {
        if (src == "") { return ""; }
        sp = (sp == "") ? "=" : sp;
        k += sp;
        var ps = src.indexOf(k);
        if (ps < 0) {
            return "";
        }
        ps += k.length;
        var pe = src.indexOf(e, ps);
        if (pe < ps) {
            pe = src.length;
        }

        return src.substring(ps, pe);
    }

    var getSUBPCookie = {

        __parse: function(arr_code){

            var s,kl,k,vl,v,i=0,j,res_obj={},tempK='', tempV='';

            if (!arr_code){

                return res_obj;

            }

            do{

                kl = arr_code[i];

                s = ++i;



                for (j=i; j<kl+s; j++,i++){

                    tempK += String.fromCharCode(arr_code[j]);

                }

                vl = arr_code[i];

                s = ++i;

                if (tempK == 'status' || tempK == 'flag'){ // 这两个的值是数字，所以不能用arr2utf8。如果名字改了，就 呵呵。。。

                    for (j=i; j<vl+s; j++,i++){

                        tempV += arr_code[j];

                    }

                }else{

                    tempV = arr_code.slice(j, vl+s);

                    try{

                        tempV = arr2utf8(tempV);

                    }catch(e){

                        tempV = '';

                    }

                    i += vl;

                }

                res_obj[tempK] = tempV;

                tempK = '';

                tempV = '';

            }while (i<arr_code.length);

            return res_obj;

        },

        decode: function(input){



            var arr_code = [], keyVersion,

                version = input.substr(0, 3),

                body = decodeURIComponent(input.substr(3));

            switch (version){

                case '002':

                    arr_code = base64.decode(body, 'subp_v2', 'array');

                    return getSUBPCookie.__parse(arr_code);

                case '003':

                    keyVersion = body.substr(0, 1);

                    body = body.substr(1);

                    arr_code = base64.decode(body, 'subp_v3_'+keyVersion, 'array');

                    return getSUBPCookie.__parse(arr_code);

                default:

                    return decodeURIComponent(input);

            }

        }

     };

    var base64 = {

        encode:function(input) {

            input = "" + input; // Convert to string for encode

            if (input == "") return "";



            var output = '';

            var chr1, chr2, chr3 = '';

            var enc1, enc2, enc3, enc4 = '';

            var i = 0;

            do {

                chr1 = input.charCodeAt(i++);

                chr2 = input.charCodeAt(i++);

                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;

                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);

                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);

                enc4 = chr3 & 63;

                if (isNaN(chr2)){

                    enc3 = enc4 = 64;

                } else if (isNaN(chr3)){

                    enc4 = 64;

                }

                output = output+this._keys.charAt(enc1)+this._keys.charAt(enc2)+this._keys.charAt(enc3)+this._keys.charAt(enc4);

                chr1 = chr2 = chr3 = '';

                enc1 = enc2 = enc3 = enc4 = '';

            } while (i < input.length);

            return output;

        },

        decode: function(input, keys_type, returntype ){

            var indexOf = function (arr, obj) {

                for (var i = 0; i < arr.length; i++) {

                    if (arr[i] === obj) {

                        return i;

                    }

                }

                return -1;

            }

            if (typeof(input) == 'string' ) {

                input = input.split('');

            }

            var arr_code = [];

            var chr1, chr2, chr3 = '';

            var enc1, enc2, enc3, enc4 = '';

            if (input.length%4 != 0){

                //return returntype=="array"?[]:''; // 由于原来的PHP端的base64有点瑕疵，这里不做长度判断

            }

            var base64test = /[^A-Za-z0-9+\/=]/;

            var keys = this._keys.split('');

            // 这里最好改成switch ，或者把keys_type和对应key值做成一个数组

            if (keys_type == "urlsafe") {

                base64test = /[^A-Za-z0-9-_=]/;

                keys = this._keys_urlsafe.split('');

            }

            if (keys_type == "subp_v2"){

                base64test = /[^A-Za-z0-9_=-]/;

                keys = this._subp_v2_keys.split('');

            }

            if (keys_type == "subp_v3_3"){

                base64test = /[^A-Za-z0-9-_.-]/;

                keys = this._subp_v3_keys_3.split('');

            }

            var i = 0;

            if (keys_type == "binnary") {

                keys = [];

                for (i = 0; i <= 64; i++) {

                    keys[i] = i+128;

                }

            }

            if (keys_type != "binnary" && base64test.test(input.join(''))){

                return returntype=="array"?[]:'';

            }

            i = 0;

            do {

                enc1 = indexOf(keys, input[i++]);

                enc2 = indexOf(keys, input[i++]);

                enc3 = indexOf(keys, input[i++]);

                enc4 = indexOf(keys, input[i++]);



                chr1 = (enc1 << 2) | (enc2 >> 4);

                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);

                chr3 = ((enc3 & 3) << 6) | enc4;

                arr_code.push(chr1);

                if (enc3 != 64 && enc3 != -1){

                    arr_code.push(chr2);

                }

                if (enc4 != 64 && enc4 != -1){

                    arr_code.push(chr3);

                }

                chr1 = chr2 = chr3 = '';

                enc1 = enc2 = enc3 = enc4 = '';

            } while (i < input.length);

            if (returntype == "array") {

                return arr_code;

            }

            var str = '', j = 0;

            for(; j < arr_code.lenth; j++ ) {

                str += String.fromCharCode(arr_code[j]);

            }

            return str;

        },





        _keys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        _keys_urlsafe: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',

        _subp_v2_keys: 'uAL715W8e3jJCcNU0lT_FSXVgxpbEDdQ4vKaIOH2GBPtfzqsmYZo-wRM9i6hynrk=',

        _subp_v3_keys_3: '5WFh28sGziZTeS1lBxCK-HgPq9IdMUwknybo.LJrQD3uj_Va7pE0XfcNR4AOYvm6t'

        // v3版本的subp cookie可能又几种不同的密钥，最后一个数字说明其密钥版本，还未上线，暂时写个示例 modify by gaolei2@ 20140611

     };
	$(function(){

		/*
		 * 返回顶部
		 */
		window.addEventListener('load', function (){
			backTopHandle();	//返回顶部
			backHistory();		//返回上一页
		}, false);
		/**
		 * 绑定事件
		 */
		setTimeout(function(){
			searchInit();               //搜索清空默认
		}, 300);
    });
})()