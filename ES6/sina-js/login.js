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
