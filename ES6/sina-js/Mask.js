(function() {
    if (!STK) {
        var STK = (function() {
            var pkgs = {};
            var main = "theia";
            var logList = [];
            var logMax = 200;
            var logFunction;
            pkgs[main] = {IE: /msie/i.test(navigator.userAgent),E: function(id) {
                    if (typeof id === "string") {
                        return document.getElementById(id)
                    } else {
                        return id
                    }
                },C: function(tagName) {
                    var dom;
                    tagName = tagName.toUpperCase();
                    if (tagName == "TEXT") {
                        dom = document.createTextNode("")
                    } else {
                        if (tagName == "BUFFER") {
                            dom = document.createDocumentFragment()
                        } else {
                            dom = document.createElement(tagName)
                        }
                    }
                    return dom
                },log: function() {
                    var logError, args = arguments, l = args.length, logArray = [].slice.apply(args, [0, l]), logType = "error", result;
                    while (logArray[--l]) {
                        if (logArray[l] instanceof Error) {
                            logError = logArray.splice(l, 1)[0];
                            break
                        }
                    }
                    if (!logError) {
                        logError = new Error();
                        logType = "log"
                    }
                    result = [logArray, logType, new Date().getTime(), logError.message, logError.stack];
                    if (logFunction) {
                        try {
                            logFunction.apply(null, result)
                        } catch (exp) {
                        }
                    } else {
                        logList.length >= logMax && logList.shift();
                        logList.push(result)
                    }
                },_regLogFn: function(fn) {
                    logFunction = fn
                },_clearLogList: function() {
                    return logList.splice(0, logList.length)
                }};
            var that = pkgs[main];
            that.register = function(ns, maker, pkgName) {
                if (!pkgName || typeof pkgName != "string") {
                    pkgName = main
                }
                if (!pkgs[pkgName]) {
                    pkgs[pkgName] = {}
                }
                var pkg = pkgs[pkgName];
                var NSList = ns.split(".");
                var step = pkg;
                var k = null;
                while (k = NSList.shift()) {
                    if (NSList.length) {
                        if (step[k] === undefined) {
                            step[k] = {}
                        }
                        step = step[k]
                    } else {
                        if (step[k] === undefined) {
                            try {
                                if (pkgName && pkgName !== main) {
                                    if (ns === "core.util.listener") {
                                        step[k] = pkgs[main].core.util.listener;
                                        return true
                                    }
                                    if (ns === "core.util.connect") {
                                        step[k] = pkgs[main].core.util.connect;
                                        return true
                                    }
                                }
                                step[k] = maker(pkg);
                                return true
                            } catch (exp) {
                                setTimeout(function() {
                                    console.log(exp)
                                }, 0)
                            }
                        }
                    }
                }
                return false
            };
            that.unRegister = function(ns, pkgName) {
                if (!pkgName || typeof pkgName != "string") {
                    pkgName = main
                }
                var pkg = pkgs[pkgName];
                var NSList = ns.split(".");
                var step = pkg;
                var k = null;
                while (k = NSList.shift()) {
                    if (NSList.length) {
                        if (step[k] === undefined) {
                            return false
                        }
                        step = step[k]
                    } else {
                        if (step[k] !== undefined) {
                            delete step[k];
                            return true
                        }
                    }
                }
                return false
            };
            that.regShort = function(sname, sfun) {
                if (that[sname] !== undefined) {
                    throw "[" + sname + "] : short : has been register"
                }
                that[sname] = sfun
            };
            that.shortRegister = function(ns, shortName, pkgName) {
                if (!pkgName || typeof pkgName != "string") {
                    pkgName = main
                }
                var pkg = pkgs[pkgName];
                var NSList = ns.split(".");
                if (!shortName) {
                    return false
                }
                if (pkg[shortName]) {
                    return false
                }
                var step = pkg;
                var k = null;
                while (k = NSList.shift()) {
                    if (NSList.length) {
                        if (step[k] === undefined) {
                            return false
                        }
                        step = step[k]
                    } else {
                        if (step[k] !== undefined) {
                            if (pkg[shortName]) {
                                return false
                            }
                            pkg[shortName] = step[k];
                            return true
                        }
                    }
                }
                return false
            };
            that.getPKG = function(pkgName) {
                if (!pkgName || typeof pkgName != "string") {
                    pkgName = main
                }
                return pkgs[pkgName]
            };
            return that
        })()
    }
    STK.register("core.arr.isArray", function($) {
        return function(o) {
            return Object.prototype.toString.call(o) === "[object Array]"
        }
    });
    STK.register("core.arr.foreach", function($) {
        var arrForeach = function(o, insp) {
            var r = [];
            for (var i = 0, len = o.length; i < len; i += 1) {
                var x = insp(o[i], i);
                if (x === false) {
                    break
                } else {
                    if (x !== null) {
                        r[i] = x
                    }
                }
            }
            return r
        };
        var objForeach = function(o, insp) {
            var r = {};
            for (var k in o) {
                var x = insp(o[k], k);
                if (x === false) {
                    break
                } else {
                    if (x !== null) {
                        r[k] = x
                    }
                }
            }
            return r
        };
        return function(o, insp) {
            if ($.core.arr.isArray(o) || (o.length && o[0] !== undefined)) {
                return arrForeach(o, insp)
            } else {
                if (typeof o === "object") {
                    return objForeach(o, insp)
                }
            }
            return null
        }
    });
    STK.register("core.arr.indexOf", function($) {
        return function(oElement, aSource) {
            if (aSource.indexOf) {
                return aSource.indexOf(oElement)
            }
            for (var i = 0, len = aSource.length; i < len; i++) {
                if (aSource[i] === oElement) {
                    return i
                }
            }
            return -1
        }
    });
    STK.register("core.arr.inArray", function($) {
        return function(oElement, aSource) {
            return $.core.arr.indexOf(oElement, aSource) > -1
        }
    });
    STK.register("core.evt.addEvent", function($) {
        return function(el, type, fn) {
            el = $.E(el);
            if (el == null) {
                return false
            }
            if (typeof fn !== "function") {
                return false
            }
            if (el.addEventListener) {
                el.addEventListener(type, fn, false)
            } else {
                if (el.attachEvent) {
                    el.attachEvent("on" + type, fn)
                } else {
                    el["on" + type] = fn
                }
            }
            return true
        }
    });
    STK.register("core.util.browser", function($) {
        var ua = navigator.userAgent.toLowerCase();
        var external = window.external || "";
        var core, m, extra, version, os;
        var numberify = function(s) {
            var c = 0;
            return parseFloat(s.replace(/\./g, function() {
                return (c++ == 1) ? "" : "."
            }))
        };
        try {
            if ((/windows|win32/i).test(ua)) {
                os = "windows"
            } else {
                if ((/macintosh/i).test(ua)) {
                    os = "macintosh"
                } else {
                    if ((/rhino/i).test(ua)) {
                        os = "rhino"
                    }
                }
            }
            if ((m = ua.match(/applewebkit\/([^\s]*)/)) && m[1]) {
                core = "webkit";
                version = numberify(m[1])
            } else {
                if ((m = ua.match(/presto\/([\d.]*)/)) && m[1]) {
                    core = "presto";
                    version = numberify(m[1])
                } else {
                    if (m = ua.match(/msie\s([^;]*)/)) {
                        core = "trident";
                        version = 1;
                        if ((m = ua.match(/trident\/([\d.]*)/)) && m[1]) {
                            version = numberify(m[1])
                        }
                    } else {
                        if (/gecko/.test(ua)) {
                            core = "gecko";
                            version = 1;
                            if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                                version = numberify(m[1])
                            }
                        }
                    }
                }
            }
            if (/world/.test(ua)) {
                extra = "world"
            } else {
                if (/360se/.test(ua)) {
                    extra = "360"
                } else {
                    if ((/maxthon/.test(ua)) || typeof external.max_version == "number") {
                        extra = "maxthon"
                    } else {
                        if (/tencenttraveler\s([\d.]*)/.test(ua)) {
                            extra = "tt"
                        } else {
                            if (/se\s([\d.]*)/.test(ua)) {
                                extra = "sogou"
                            }
                        }
                    }
                }
            }
        } catch (e) {
        }
        var ret = {OS: os,CORE: core,Version: version,EXTRA: (extra ? extra : false),IE: /msie/.test(ua),OPERA: /opera/.test(ua),MOZ: /gecko/.test(ua) && !/(compatible|webkit)/.test(ua),IE5: /msie 5 /.test(ua),IE55: /msie 5.5/.test(ua),IE6: /msie 6/.test(ua),IE7: /msie 7/.test(ua),IE8: /msie 8/.test(ua),IE9: /msie 9/.test(ua),IE10: /msie 10/.test(ua),SAFARI: !/chrome\/([\d.]*)/.test(ua) && /\/([\da-f.]*) safari/.test(ua),CHROME: /chrome\/([\d.]*)/.test(ua),IPAD: /\(ipad/i.test(ua),IPHONE: /\(iphone/i.test(ua),ITOUCH: /\(itouch/i.test(ua),MOBILE: /mobile/i.test(ua)};
        return ret
    });
    STK.register("core.func.getType", function($) {
        return function(oObject) {
            var _t;
            return ((_t = typeof (oObject)) == "object" ? oObject == null && "null" || Object.prototype.toString.call(oObject).slice(8, -1) : _t).toLowerCase()
        }
    });
    STK.register("core.dom.ready", function($) {
        var funcList = [];
        var inited = false;
        var getType = $.core.func.getType;
        var browser = $.core.util.browser;
        var addEvent = $.core.evt.addEvent;
        var checkReady = function() {
            if (!inited) {
                if (document.readyState === "complete") {
                    return true
                }
            }
            return inited
        };
        var execFuncList = function() {
            if (inited == true) {
                return
            }
            inited = true;
            for (var i = 0, len = funcList.length; i < len; i++) {
                if (getType(funcList[i]) === "function") {
                    try {
                        funcList[i].call()
                    } catch (exp) {
                    }
                }
            }
            funcList = []
        };
        var scrollMethod = function() {
            if (checkReady()) {
                execFuncList();
                return
            }
            try {
                document.documentElement.doScroll("left")
            } catch (e) {
                setTimeout(arguments.callee, 25);
                return
            }
            execFuncList()
        };
        var readyStateMethod = function() {
            if (checkReady()) {
                execFuncList();
                return
            }
            setTimeout(arguments.callee, 25)
        };
        var domloadMethod = function() {
            addEvent(document, "DOMContentLoaded", execFuncList)
        };
        var windowloadMethod = function() {
            addEvent(window, "load", execFuncList)
        };
        if (!checkReady()) {
            if ($.IE && window === window.top) {
                scrollMethod()
            }
            domloadMethod();
            readyStateMethod();
            windowloadMethod()
        }
        return function(oFunc) {
            if (checkReady()) {
                if (getType(oFunc) === "function") {
                    oFunc.call()
                }
            } else {
                funcList.push(oFunc)
            }
        }
    });
    STK.register("core.dom.isNode", function($) {
        return function(node) {
            return (node != undefined) && Boolean(node.nodeName) && Boolean(node.nodeType)
        }
    });
    STK.register("core.dom.setStyle", function($) {
        function supportFilters() {
            if ("y" in supportFilters) {
                return supportFilters.y
            }
            return supportFilters.y = ("filters" in $.C("div"))
        }
        return function(node, property, val) {
            if (supportFilters()) {
                switch (property) {
                    case "opacity":
                        node.style.filter = "alpha(opacity=" + (val * 100) + ")";
                        if (!node.currentStyle || !node.currentStyle.hasLayout) {
                            node.style.zoom = 1
                        }
                        break;
                    case "float":
                        property = "styleFloat";
                    default:
                        node.style[property] = val
                }
            } else {
                if (property == "float") {
                    property = "cssFloat"
                }
                node.style[property] = val
            }
        }
    });
    STK.register("core.dom.getStyle", function($) {
        function supportFilters() {
            if ("y" in supportFilters) {
                return supportFilters.y
            }
            return supportFilters.y = ("filters" in $.C("div"))
        }
        return function(node, property) {
            if (supportFilters()) {
                switch (property) {
                    case "opacity":
                        var val = 100;
                        try {
                            val = node.filters["DXImageTransform.Microsoft.Alpha"].opacity
                        } catch (e) {
                            try {
                                val = node.filters("alpha").opacity
                            } catch (e) {
                            }
                        }
                        return val / 100;
                    case "float":
                        property = "styleFloat";
                    default:
                        var value = node.currentStyle ? node.currentStyle[property] : null;
                        return (node.style[property] || value)
                }
            } else {
                if (property == "float") {
                    property = "cssFloat"
                }
                try {
                    var computed = document.defaultView.getComputedStyle(node, "")
                } catch (e) {
                }
                return node.style[property] || computed ? computed[property] : null
            }
        }
    });
    STK.register("core.util.hideContainer", function($) {
        var hideDiv;
        var initDiv = function() {
            if (hideDiv) {
                return
            }
            hideDiv = $.C("div");
            hideDiv.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
            document.getElementsByTagName("head")[0].appendChild(hideDiv)
        };
        var that = {appendChild: function(el) {
                if ($.core.dom.isNode(el)) {
                    initDiv();
                    hideDiv.appendChild(el)
                }
            },removeChild: function(el) {
                if ($.core.dom.isNode(el)) {
                    hideDiv && hideDiv.removeChild(el)
                }
            }};
        return that
    });
    STK.register("core.dom.getSize", function($) {
        var size = function(dom) {
            if (!$.core.dom.isNode(dom)) {
                throw "core.dom.getSize need Element as first parameter"
            }
            return {width: dom.offsetWidth,height: dom.offsetHeight}
        };
        var getSize = function(dom) {
            var ret = null;
            if (dom.style.display === "none") {
                dom.style.visibility = "hidden";
                dom.style.display = "";
                ret = size(dom);
                dom.style.display = "none";
                dom.style.visibility = "visible"
            } else {
                ret = size(dom)
            }
            return ret
        };
        return function(dom) {
            var ret = {};
            if (!dom.parentNode) {
                $.core.util.hideContainer.appendChild(dom);
                ret = getSize(dom);
                $.core.util.hideContainer.removeChild(dom)
            } else {
                ret = getSize(dom)
            }
            return ret
        }
    });
    STK.register("core.util.scrollPos", function($) {
        return function(oDocument) {
            oDocument = oDocument || document;
            var dd = oDocument.documentElement;
            var db = oDocument.body;
            return {top: Math.max(window.pageYOffset || 0, dd.scrollTop, db.scrollTop),left: Math.max(window.pageXOffset || 0, dd.scrollLeft, db.scrollLeft)}
        }
    });
    STK.register("core.obj.parseParam", function($) {
        return function(oSource, oParams, isown) {
            var key, obj = {};
            oParams = oParams || {};
            for (key in oSource) {
                obj[key] = oSource[key];
                if (oParams[key] != null) {
                    if (isown) {
                        if (oSource.hasOwnProperty(key)) {
                            obj[key] = oParams[key]
                        }
                    } else {
                        obj[key] = oParams[key]
                    }
                }
            }
            return obj
        }
    });
    STK.register("core.dom.position", function($) {
        var generalPosition = function(el) {
            var box, scroll, body, docElem, clientTop, clientLeft;
            box = el.getBoundingClientRect();
            scroll = $.core.util.scrollPos();
            body = el.ownerDocument.body;
            docElem = el.ownerDocument.documentElement;
            clientTop = docElem.clientTop || body.clientTop || 0;
            clientLeft = docElem.clientLeft || body.clientLeft || 0;
            return {l: parseInt(box.left + scroll.left - clientLeft, 10) || 0,t: parseInt(box.top + scroll.top - clientTop, 10) || 0}
        };
        var countPosition = function(el, shell) {
            var pos, parent;
            pos = [el.offsetLeft, el.offsetTop];
            parent = el.offsetParent;
            if (parent !== el && parent !== shell) {
                while (parent) {
                    pos[0] += parent.offsetLeft;
                    pos[1] += parent.offsetTop;
                    parent = parent.offsetParent
                }
            }
            if ($.core.util.browser.OPERA != -1 || ($.core.util.browser.SAFARI != -1 && el.style.position == "absolute")) {
                pos[0] -= document.body.offsetLeft;
                pos[1] -= document.body.offsetTop
            }
            if (el.parentNode) {
                parent = el.parentNode
            } else {
                parent = null
            }
            while (parent && !/^body|html$/i.test(parent.tagName) && parent !== shell) {
                if (parent.style.display.search(/^inline|table-row.*$/i)) {
                    pos[0] -= parent.scrollLeft;
                    pos[1] -= parent.scrollTop
                }
                parent = parent.parentNode
            }
            return {l: parseInt(pos[0], 10),t: parseInt(pos[1], 10)}
        };
        return function(oElement, spec) {
            if (oElement == document.body) {
                return false
            }
            if (oElement.parentNode == null) {
                return false
            }
            if (oElement.style.display == "none") {
                return false
            }
            var conf = $.core.obj.parseParam({parent: null}, spec);
            if (oElement.getBoundingClientRect) {
                if (conf.parent) {
                    var o = generalPosition(oElement);
                    var p = generalPosition(conf.parent);
                    return {l: o.l - p.l,t: o.t - p.t}
                } else {
                    return generalPosition(oElement)
                }
            } else {
                return countPosition(oElement, conf.parent || document.body)
            }
        }
    });
    STK.register("core.dom.hasClassName", function($) {
        return function(node, className) {
            return (new RegExp("(^|\\s)" + className + "($|\\s)").test(node.className))
        }
    });
    STK.register("core.str.trim", function($) {
        return function(str) {
            if (typeof str !== "string") {
                throw "trim need a string as parameter"
            }
            var len = str.length;
            var s = 0;
            var reg = /(\u3000|\s|\t|\u00A0)/;
            while (s < len) {
                if (!reg.test(str.charAt(s))) {
                    break
                }
                s += 1
            }
            while (len > s) {
                if (!reg.test(str.charAt(len - 1))) {
                    break
                }
                len -= 1
            }
            return str.slice(s, len)
        }
    });
    STK.register("core.dom.addClassName", function($) {
        return function(node, className) {
            if (node.nodeType === 1) {
                if (!$.core.dom.hasClassName(node, className)) {
                    node.className = $.core.str.trim(node.className) + " " + className
                }
            }
        }
    });
    STK.register("core.dom.removeClassName", function($) {
        return function(node, className) {
            if (node.nodeType === 1) {
                if ($.core.dom.hasClassName(node, className)) {
                    node.className = node.className.replace(new RegExp("(^|\\s)" + className + "($|\\s)"), " ")
                }
            }
        }
    });
    STK.register("core.util.getUniqueKey", function($) {
        var _loadTime = (new Date()).getTime().toString(), _i = 1;
        return function() {
            return _loadTime + (_i++)
        }
    });
    STK.register("core.dom.uniqueID", function($) {
        return function(node) {
            return node && (node.uniqueID || (node.uniqueID = $.core.util.getUniqueKey()))
        }
    });
    STK.register("core.evt.removeEvent", function($) {
        return function(el, type, fn) {
            el = $.E(el);
            if (el == null) {
                return false
            }
            if (typeof fn !== "function") {
                return false
            }
            if (el.removeEventListener) {
                el.removeEventListener(type, fn, false)
            } else {
                if (el.detachEvent) {
                    el.detachEvent("on" + type, fn)
                }
            }
            el["on" + type] = null;
            return true
        }
    });
    STK.register("core.evt.getEvent", function($) {
        return (function() {
            if (document.addEventListener) {
                return function() {
                    var o = arguments.callee;
                    var e;
                    do {
                        e = o.arguments[0];
                        if (e && (e.constructor == Event || e.constructor == MouseEvent || e.constructor == KeyboardEvent)) {
                            return e
                        }
                    } while (o = o.caller);
                    return e
                }
            } else {
                return function(el, type, fn) {
                    return window.event
                }
            }
        }())
    });
    STK.register("core.evt.fixEvent", function($) {
        var fixTouchList = "clientX clientY pageX pageY screenX screenY".split(" ");
        return function(e) {
            e = e || $.core.evt.getEvent();
            if (!e.target) {
                e.target = e.srcElement || document
            }
            if (e.pageX == null && e.clientX != null) {
                var html = document.documentElement;
                var body = document.body;
                e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || body && body.clientLeft || 0);
                e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || body && body.clientTop || 0)
            }
            if (!e.which && e.button) {
                if (e.button & 1) {
                    e.which = 1
                } else {
                    if (e.button & 4) {
                        e.which = 2
                    } else {
                        if (e.button & 2) {
                            e.which = 3
                        }
                    }
                }
            }
            if (e.relatedTarget === undefined) {
                e.relatedTarget = e.fromElement || e.toElement
            }
            if (e.layerX == null && e.offsetX != null) {
                e.layerX = e.offsetX;
                e.layerY = e.offsetY
            }
            return e
        }
    });
    STK.register("core.evt.preventDefault", function($) {
        return function(event) {
            event = event || $.core.evt.getEvent();
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
        }
    });
    STK.register("core.evt.custEvent", function($) {
        var custEventAttribute = "__custEventKey__", custEventKey = 1, custEventCache = {}, findCache = function(obj, type) {
            var _key = (typeof obj == "number") ? obj : obj[custEventAttribute];
            return (_key && custEventCache[_key]) && {obj: (typeof type == "string" ? custEventCache[_key][type] : custEventCache[_key]),key: _key}
        };
        var hookCache = {};
        var add = function(obj, type, fn, data, once) {
            if (obj && typeof type == "string" && fn) {
                var _cache = findCache(obj, type);
                if (!_cache || !_cache.obj) {
                    throw "custEvent (" + type + ") is undefined !"
                }
                _cache.obj.push({fn: fn,data: data,once: once});
                return _cache.key
            }
        };
        var fire = function(obj, type, args, defaultAction) {
            var preventDefaultFlag = true;
            var preventDefault = function() {
                preventDefaultFlag = false
            };
            if (obj && typeof type == "string") {
                var _cache = findCache(obj, type), _obj;
                if (_cache && (_obj = _cache.obj)) {
                    args = typeof args != "undefined" && [].concat(args) || [];
                    for (var i = _obj.length - 1; i > -1 && _obj[i]; i--) {
                        var fn = _obj[i].fn;
                        var isOnce = _obj[i].once;
                        if (fn && fn.apply) {
                            try {
                                fn.apply(obj, [{obj: obj,type: type,data: _obj[i].data,preventDefault: preventDefault}].concat(args));
                                if (isOnce) {
                                    _obj.splice(i, 1)
                                }
                            } catch (e) {
                                $.log("[error][custEvent]" + e.message, e, e.stack)
                            }
                        }
                    }
                    if (preventDefaultFlag && $.core.func.getType(defaultAction) === "function") {
                        defaultAction()
                    }
                    return _cache.key
                }
            }
        };
        var that = {define: function(obj, type) {
                if (obj && type) {
                    var _key = (typeof obj == "number") ? obj : obj[custEventAttribute] || (obj[custEventAttribute] = custEventKey++), _cache = custEventCache[_key] || (custEventCache[_key] = {});
                    type = [].concat(type);
                    for (var i = 0; i < type.length; i++) {
                        _cache[type[i]] || (_cache[type[i]] = [])
                    }
                    return _key
                }
            },undefine: function(obj, type) {
                if (obj) {
                    var _key = (typeof obj == "number") ? obj : obj[custEventAttribute];
                    if (_key && custEventCache[_key]) {
                        if (type) {
                            type = [].concat(type);
                            for (var i = 0; i < type.length; i++) {
                                if (type[i] in custEventCache[_key]) {
                                    delete custEventCache[_key][type[i]]
                                }
                            }
                        } else {
                            delete custEventCache[_key]
                        }
                    }
                }
            },add: function(obj, type, fn, data) {
                return add(obj, type, fn, data, false)
            },once: function(obj, type, fn, data) {
                return add(obj, type, fn, data, true)
            },remove: function(obj, type, fn) {
                if (obj) {
                    var _cache = findCache(obj, type), _obj, index;
                    if (_cache && (_obj = _cache.obj)) {
                        if ($.core.arr.isArray(_obj)) {
                            if (fn) {
                                var i = 0;
                                while (_obj[i]) {
                                    if (_obj[i].fn === fn) {
                                        break
                                    }
                                    i++
                                }
                                _obj.splice(i, 1)
                            } else {
                                _obj.splice(0, _obj.length)
                            }
                        } else {
                            for (var i in _obj) {
                                _obj[i] = []
                            }
                        }
                        return _cache.key
                    }
                }
            },fire: function(obj, type, args, defaultAction) {
                return fire(obj, type, args, defaultAction)
            },hook: function(orig, dest, typeMap) {
                if (!orig || !dest || !typeMap) {
                    return
                }
                var destTypes = [], origKey = orig[custEventAttribute], origKeyCache = origKey && custEventCache[origKey], origTypeCache, destKey = dest[custEventAttribute] || (dest[custEventAttribute] = custEventKey++), keyHookCache;
                if (origKeyCache) {
                    keyHookCache = hookCache[origKey + "_" + destKey] || (hookCache[origKey + "_" + destKey] = {});
                    var fn = function(event) {
                        var preventDefaultFlag = true;
                        fire(dest, keyHookCache[event.type].type, Array.prototype.slice.apply(arguments, [1, arguments.length]), function() {
                            preventDefaultFlag = false
                        });
                        preventDefaultFlag && event.preventDefault()
                    };
                    for (var origType in typeMap) {
                        var destType = typeMap[origType];
                        if (!keyHookCache[origType]) {
                            if (origTypeCache = origKeyCache[origType]) {
                                origTypeCache.push({fn: fn,data: undefined});
                                keyHookCache[origType] = {fn: fn,type: destType};
                                destTypes.push(destType)
                            }
                        }
                    }
                    that.define(dest, destTypes)
                }
            },unhook: function(orig, dest, typeMap) {
                if (!orig || !dest || !typeMap) {
                    return
                }
                var origKey = orig[custEventAttribute], destKey = dest[custEventAttribute], keyHookCache = hookCache[origKey + "_" + destKey];
                if (keyHookCache) {
                    for (var origType in typeMap) {
                        var destType = typeMap[origType];
                        if (keyHookCache[origType]) {
                            that.remove(orig, origType, keyHookCache[origType].fn)
                        }
                    }
                }
            },destroy: function() {
                custEventCache = {};
                custEventKey = 1;
                hookCache = {}
            }};
        return that
    });
    STK.register("core.func.empty", function() {
        return function() {
        }
    });
    STK.register("core.dom.removeNode", function($) {
        return function(node) {
            node = $.E(node) || node;
            try {
                node.parentNode.removeChild(node)
            } catch (e) {
            }
        }
    });
    STK.register("core.str.parseURL", function($) {
        return function(url) {
            var parse_url = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
            var names = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"];
            var results = parse_url.exec(url);
            var that = {};
            for (var i = 0, len = names.length; i < len; i += 1) {
                that[names[i]] = results[i] || ""
            }
            return that
        }
    });
    STK.register("core.json.queryToJson", function($) {
        return function(QS, isDecode) {
            var _Qlist = $.core.str.trim(QS).split("&");
            var _json = {};
            var _fData = function(data) {
                if (isDecode) {
                    return decodeURIComponent(data)
                } else {
                    return data
                }
            };
            for (var i = 0, len = _Qlist.length; i < len; i++) {
                if (_Qlist[i]) {
                    var _hsh = _Qlist[i].split("=");
                    var _key = _hsh[0];
                    var _value = _hsh[1];
                    if (_hsh.length < 2) {
                        _value = _key;
                        _key = "$nullName"
                    }
                    if (!_json[_key]) {
                        _json[_key] = _fData(_value)
                    } else {
                        if ($.core.arr.isArray(_json[_key]) != true) {
                            _json[_key] = [_json[_key]]
                        }
                        _json[_key].push(_fData(_value))
                    }
                }
            }
            return _json
        }
    });
    STK.register("core.json.jsonToQuery", function($) {
        var _fdata = function(data, isEncode) {
            data = data == null ? "" : data;
            data = $.core.str.trim(data.toString());
            if (isEncode) {
                return encodeURIComponent(data)
            }
            return data
        };
        return function(JSON, isEncode) {
            var _Qstring = [];
            if (typeof JSON == "object") {
                for (var k in JSON) {
                    if (k === "$nullName") {
                        _Qstring = _Qstring.concat(JSON[k]);
                        continue
                    }
                    if (JSON[k] instanceof Array) {
                        for (var i = 0, len = JSON[k].length; i < len; i++) {
                            _Qstring.push(k + "=" + _fdata(JSON[k][i], isEncode))
                        }
                    } else {
                        if (typeof JSON[k] != "function") {
                            _Qstring.push(k + "=" + _fdata(JSON[k], isEncode))
                        }
                    }
                }
            }
            if (_Qstring.length) {
                return _Qstring.join("&")
            }
            return ""
        }
    });
    STK.register("core.util.URL", function($) {
        return function(sURL, args) {
            var opts = $.core.obj.parseParam({isEncodeQuery: false,isEncodeHash: false}, args || {});
            var that = {};
            var url_json = $.core.str.parseURL(sURL);
            var query_json = $.core.json.queryToJson(url_json.query);
            var hash_json = $.core.json.queryToJson(url_json.hash);
            that.setParam = function(sKey, sValue) {
                query_json[sKey] = sValue;
                return this
            };
            that.getParam = function(sKey) {
                return query_json[sKey]
            };
            that.setParams = function(oJson) {
                for (var key in oJson) {
                    that.setParam(key, oJson[key])
                }
                return this
            };
            that.setHash = function(sKey, sValue) {
                hash_json[sKey] = sValue;
                return this
            };
            that.getHash = function(sKey) {
                return hash_json[sKey]
            };
            that.valueOf = that.toString = function() {
                var url = [];
                var query = $.core.json.jsonToQuery(query_json, opts.isEncodeQuery);
                var hash = $.core.json.jsonToQuery(hash_json, opts.isEncodeQuery);
                if (url_json.scheme != "") {
                    url.push(url_json.scheme + ":");
                    url.push(url_json.slash)
                }
                if (url_json.host != "") {
                    url.push(url_json.host);
                    if (url_json.port != "") {
                        url.push(":");
                        url.push(url_json.port)
                    }
                }
                url.push("/");
                url.push(url_json.path);
                if (query != "") {
                    url.push("?" + query)
                }
                if (hash != "") {
                    url.push("#" + hash)
                }
                return url.join("")
            };
            return that
        }
    });
    STK.register("core.io.scriptLoader", function($) {
        var entityList = {};
        var default_opts = {url: "",charset: "UTF-8",timeout: 30 * 1000,args: {},onComplete: $.core.func.empty,onTimeout: $.core.func.empty,isEncode: false,uniqueID: null};
        return function(oOpts) {
            var js, requestTimeout;
            var opts = $.core.obj.parseParam(default_opts, oOpts);
            if (opts.url == "") {
                throw "scriptLoader: url is null"
            }
            var uniqueID = opts.uniqueID || $.core.util.getUniqueKey();
            js = entityList[uniqueID];
            if (js != null && $.IE != true) {
                $.core.dom.removeNode(js);
                js = null
            }
            if (js == null) {
                js = entityList[uniqueID] = $.C("script")
            }
            js.charset = opts.charset;
            js.id = "scriptRequest_script_" + uniqueID;
            js.type = "text/javascript";
            if (opts.onComplete != null) {
                if ($.IE) {
                    js.onreadystatechange = function() {
                        if (js.readyState.toLowerCase() == "loaded" || js.readyState.toLowerCase() == "complete") {
                            try {
                                clearTimeout(requestTimeout);
                                document.getElementsByTagName("head")[0].removeChild(js);
                                js.onreadystatechange = null
                            } catch (exp) {
                            }
                            opts.onComplete()
                        }
                    }
                } else {
                    js.onload = function() {
                        try {
                            clearTimeout(requestTimeout);
                            $.core.dom.removeNode(js)
                        } catch (exp) {
                        }
                        opts.onComplete()
                    }
                }
            }
            js.src = $.core.util.URL(opts.url, {isEncodeQuery: opts.isEncode}).setParams(opts.args).toString();
            document.getElementsByTagName("head")[0].appendChild(js);
            if (opts.timeout > 0) {
                requestTimeout = setTimeout(function() {
                    try {
                        document.getElementsByTagName("head")[0].removeChild(js)
                    } catch (exp) {
                    }
                    opts.onTimeout()
                }, opts.timeout)
            }
            return js
        }
    });
    STK.register("core.io.jsonp", function($) {
        return function(oOpts) {
            var opts = $.core.obj.parseParam({url: "",charset: "UTF-8",timeout: 30 * 1000,args: {},onComplete: null,onTimeout: null,responseName: null,isEncode: false,varkey: "callback"}, oOpts);
            var funcStatus = -1;
            var uniqueID = opts.responseName || ("STK_" + $.core.util.getUniqueKey());
            opts.args[opts.varkey] = uniqueID;
            var completeFunc = opts.onComplete;
            var timeoutFunc = opts.onTimeout;
            window[uniqueID] = function(oResult) {
                if (funcStatus != 2 && completeFunc != null) {
                    funcStatus = 1;
                    completeFunc(oResult)
                }
            };
            opts.onComplete = null;
            opts.onTimeout = function() {
                if (funcStatus != 1 && timeoutFunc != null) {
                    funcStatus = 2;
                    timeoutFunc()
                }
            };
            return $.core.io.scriptLoader(opts)
        }
    });
    STK.register("core.json.merge", function($) {
        var checkCell = function(obj) {
            if (obj === undefined) {
                return true
            }
            if (obj === null) {
                return true
            }
            if ($.core.arr.inArray((typeof obj), ["number", "string", "function", "boolean"])) {
                return true
            }
            if ($.core.dom.isNode(obj)) {
                return true
            }
            return false
        };
        var deep = function(ret, key, coverItem) {
            if (checkCell(coverItem)) {
                ret[key] = coverItem;
                return
            }
            if ($.core.arr.isArray(coverItem)) {
                if (!$.core.arr.isArray(ret[key])) {
                    ret[key] = []
                }
                for (var i = 0, len = coverItem.length; i < len; i += 1) {
                    deep(ret[key], i, coverItem[i])
                }
                return
            }
            if (typeof coverItem === "object") {
                if (checkCell(ret[key]) || $.core.arr.isArray(ret[key])) {
                    ret[key] = {}
                }
                for (var k in coverItem) {
                    deep(ret[key], k, coverItem[k])
                }
                return
            }
        };
        var merge = function(origin, cover, isDeep) {
            var ret = {};
            if (isDeep) {
                for (var k in origin) {
                    deep(ret, k, origin[k])
                }
                for (var k in cover) {
                    deep(ret, k, cover[k])
                }
            } else {
                for (var k in origin) {
                    ret[k] = origin[k]
                }
                for (var k in cover) {
                    ret[k] = cover[k]
                }
            }
            return ret
        };
        return function(origin, cover, opts) {
            var conf = $.core.obj.parseParam({isDeep: false}, opts);
            return merge(origin, cover, conf.isDeep)
        }
    });
    STK.register("core.util.language", function($) {
        return function(template, data) {
            var rep = [];
            for (var i = 2, len = arguments.length; i < len; i += 1) {
                rep.push(arguments[i])
            }
            return template.replace(/#L\{((.*?)(?:[^\\]))\}/ig, function() {
                var key = arguments[1];
                var ret;
                if (data && data[key] !== undefined) {
                    ret = data[key]
                } else {
                    ret = key
                }
                if (rep.length) {
                    ret = ret.replace(/(\%s)/ig, function() {
                        var pic = rep.shift();
                        if (pic !== undefined) {
                            return pic
                        } else {
                            return arguments[0]
                        }
                    })
                }
                return ret
            })
        }
    });
    STK.register("core.util.listener", function($) {
        return (function() {
            var dispatchList = {};
            var fireTaskList = [];
            var fireTaskTimer;
            var runFireTaskList = function() {
                if (fireTaskList.length == 0) {
                    return
                }
                clearTimeout(fireTaskTimer);
                var curFireTask = fireTaskList.splice(0, 1)[0];
                try {
                    curFireTask.func.apply(curFireTask.func, [].concat(curFireTask.data))
                } catch (exp) {
                }
                fireTaskTimer = setTimeout(runFireTaskList, 25)
            };
            return {register: function(sChannel, sEventType, fCallBack) {
                    dispatchList[sChannel] = dispatchList[sChannel] || {};
                    dispatchList[sChannel][sEventType] = dispatchList[sChannel][sEventType] || [];
                    dispatchList[sChannel][sEventType].push(fCallBack)
                },fire: function(sChannel, sEventType, oData) {
                    var funcArray;
                    var i, len;
                    if (dispatchList[sChannel] && dispatchList[sChannel][sEventType] && dispatchList[sChannel][sEventType].length > 0) {
                        funcArray = dispatchList[sChannel][sEventType];
                        funcArray.data_cache = oData;
                        for (i = 0, len = funcArray.length; i < len; i++) {
                            fireTaskList.push({channel: sChannel,evt: sEventType,func: funcArray[i],data: oData})
                        }
                        runFireTaskList()
                    }
                },remove: function(sChannel, sEventType, fCallBack) {
                    if (dispatchList[sChannel]) {
                        if (dispatchList[sChannel][sEventType]) {
                            for (var i = 0, len = dispatchList[sChannel][sEventType].length; i < len; i++) {
                                if (dispatchList[sChannel][sEventType][i] === fCallBack) {
                                    dispatchList[sChannel][sEventType].splice(i, 1);
                                    break
                                }
                            }
                        }
                    }
                },list: function() {
                    return dispatchList
                },cache: function(sChannel, sEventType) {
                    if (dispatchList[sChannel] && dispatchList[sChannel][sEventType]) {
                        return dispatchList[sChannel][sEventType].data_cache
                    }
                }}
        })()
    });
    STK.register("core.util.winSize", function($) {
        return function(_target) {
            var w, h;
            var target;
            if (_target) {
                target = _target.document
            } else {
                target = document
            }
            if (target.compatMode === "CSS1Compat") {
                w = target.documentElement.clientWidth;
                h = target.documentElement.clientHeight
            } else {
                if (self.innerHeight) {
                    if (_target) {
                        target = _target.self
                    } else {
                        target = self
                    }
                    w = target.innerWidth;
                    h = target.innerHeight
                } else {
                    if (target.documentElement && target.documentElement.clientHeight) {
                        w = target.documentElement.clientWidth;
                        h = target.documentElement.clientHeight
                    } else {
                        if (target.body) {
                            w = target.body.clientWidth;
                            h = target.body.clientHeight
                        }
                    }
                }
            }
            return {width: w,height: h}
        }
    });
    (function() {
        var $ = STK.core;
        var hash = {arrCopy: $.arr.copy,arrClear: $.arr.clear,hasby: $.arr.hasby,unique: $.arr.unique,foreach: $.arr.foreach,isArray: $.arr.isArray,inArray: $.arr.inArray,arrIndexOf: $.arr.indexOf,findout: $.arr.findout,domNext: $.dom.next,domPrev: $.dom.prev,isNode: $.dom.isNode,addHTML: $.dom.addHTML,insertHTML: $.dom.insertHTML,setXY: $.dom.setXY,contains: $.dom.contains,position: $.dom.position,trimNode: $.dom.trimNode,insertAfter: $.dom.insertAfter,insertBefore: $.dom.insertBefore,removeNode: $.dom.removeNode,replaceNode: $.dom.replaceNode,Ready: $.dom.ready,setStyle: $.dom.setStyle,setStyles: $.dom.setStyles,getStyle: $.dom.getStyle,addClassName: $.dom.addClassName,hasClassName: $.dom.hasClassName,removeClassName: $.dom.removeClassName,builder: $.dom.builder,addEvent: $.evt.addEvent,custEvent: $.evt.custEvent,removeEvent: $.evt.removeEvent,fireEvent: $.evt.fireEvent,fixEvent: $.evt.fixEvent,getEvent: $.evt.getEvent,stopEvent: $.evt.stopEvent,delegatedEvent: $.evt.delegatedEvent,preventDefault: $.evt.preventDefault,hotKey: $.evt.hotKey,getType: $.func.getType,funcEmpty: $.func.empty,ajax: $.io.ajax,jsonp: $.io.jsonp,ijax: $.io.ijax,scriptLoader: $.io.scriptLoader,jsonToQuery: $.json.jsonToQuery,queryToJson: $.json.queryToJson,parseParam: $.obj.parseParam,trim: $.str.trim,parseURL: $.str.parseURL,listener: $.util.listener,winSize: $.util.winSize,scrollPos: $.util.scrollPos,getUniqueKey: $.util.getUniqueKey};
        for (var k in hash) {
            if (hash[k]) {
                STK.regShort(k, hash[k])
            }
        }
    })();
    STK.register("kit.dom.cssText", function($) {
        var _getNewCss = function(oldCss, addCss) {
            var _newCss = (oldCss + ";" + addCss).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"), _m;
            while (_newCss && (_m = _newCss.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i))) {
                _newCss = _newCss.replace(_m[1] + _m[2] + _m[3], "")
            }
            return _newCss
        };
        return function(oldCss) {
            oldCss = oldCss || "";
            var _styleList = [], that = {push: function(property, value) {
                    _styleList.push(property + ":" + value);
                    return that
                },remove: function(property) {
                    for (var i = 0; i < _styleList.length; i++) {
                        if (_styleList[i].indexOf(property + ":") == 0) {
                            _styleList.splice(i, 1)
                        }
                    }
                    return that
                },getStyleList: function() {
                    return _styleList.slice()
                },getCss: function() {
                    return _getNewCss(oldCss, _styleList.join(";"))
                }};
            return that
        }
    });
    STK.register("kit.dom.fix", function($) {
        var _canFix = !($.core.util.browser.IE6 || (document.compatMode !== "CSS1Compat" && STK.IE)), _typeReg = /^(c)|(lt)|(lb)|(rt)|(rb)$/;
        function _visible(node) {
            return $.core.dom.getStyle(node, "display") != "none"
        }
        function _createOffset(offset) {
            offset = $.core.arr.isArray(offset) ? offset : [0, 0];
            for (var i = 0; i < 2; i++) {
                if (typeof offset[i] != "number") {
                    offset[i] = 0
                }
            }
            return offset
        }
        function _draw(node, type, offset) {
            if (!_visible(node)) {
                return
            }
            var _position = "fixed", _top, _left, _right, _bottom, _width = node.offsetWidth, _height = node.offsetHeight, _winSize = $.core.util.winSize(), _limitTop = 0, _limitLeft = 0, _cssText = $.kit.dom.cssText(node.style.cssText);
            if (!_canFix) {
                _position = "absolute";
                var _scrlPos = $.core.util.scrollPos();
                _limitTop = _top = _scrlPos.top;
                _limitLeft = _left = _scrlPos.left;
                switch (type) {
                    case "lt":
                        _top += offset[1];
                        _left += offset[0];
                        break;
                    case "lb":
                        _top += _winSize.height - _height - offset[1];
                        _left += offset[0];
                        break;
                    case "rt":
                        _top += offset[1];
                        _left += _winSize.width - _width - offset[0];
                        break;
                    case "rb":
                        _top += _winSize.height - _height - offset[1];
                        _left += _winSize.width - _width - offset[0];
                        break;
                    case "c":
                    default:
                        _top += (_winSize.height - _height) / 2 + offset[1];
                        _left += (_winSize.width - _width) / 2 + offset[0]
                }
                _right = _bottom = ""
            } else {
                _top = _bottom = offset[1];
                _left = _right = offset[0];
                switch (type) {
                    case "lt":
                        _bottom = _right = "";
                        break;
                    case "lb":
                        _top = _right = "";
                        break;
                    case "rt":
                        _left = _bottom = "";
                        break;
                    case "rb":
                        _top = _left = "";
                        break;
                    case "c":
                    default:
                        _top = (_winSize.height - _height) / 2 + offset[1];
                        _left = (_winSize.width - _width) / 2 + offset[0];
                        _bottom = _right = ""
                }
            }
            if (type == "c") {
                if (_top < _limitTop) {
                    _top = _limitTop
                }
                if (_left < _limitLeft) {
                    _left = _limitLeft
                }
            }
            _cssText.push("position", _position).push("top", _top + "px").push("left", _left + "px").push("right", _right + "px").push("bottom", _bottom + "px");
            node.style.cssText = _cssText.getCss()
        }
        return function(node, type, offset) {
            var _type, _offset, _fixed = true, _ceKey;
            if ($.core.dom.isNode(node) && _typeReg.test(type)) {
                var that = {getNode: function() {
                        return node
                    },isFixed: function() {
                        return _fixed
                    },setFixed: function(fixed) {
                        (_fixed = !!fixed) && _draw(node, _type, _offset);
                        return this
                    },setAlign: function(type, offset) {
                        if (_typeReg.test(type)) {
                            _type = type;
                            _offset = _createOffset(offset);
                            _fixed && _draw(node, _type, _offset)
                        }
                        return this
                    },destroy: function() {
                        if (!_canFix) {
                            $.core.evt.removeEvent(window, "scroll", _evtFun)
                        }
                        $.core.evt.removeEvent(window, "resize", _evtFun);
                        $.core.evt.custEvent.undefine(_ceKey)
                    }};
                _ceKey = $.core.evt.custEvent.define(that, "beforeFix");
                that.setAlign(type, offset);
                function _evtFun(event) {
                    event = event || window.event;
                    $.core.evt.custEvent.fire(_ceKey, "beforeFix", event.type);
                    if (_fixed && (!_canFix || _type == "c")) {
                        _draw(node, _type, _offset)
                    }
                }
                if (!_canFix) {
                    $.core.evt.addEvent(window, "scroll", _evtFun)
                }
                $.core.evt.addEvent(window, "resize", _evtFun);
                return that
            }
        }
    });
    STK.register("kit.dom.builder", function($) {
        var parentNode = null;
        return function(node_or_html) {
            var node = null;
            if (typeof (node_or_html) == "string") {
                if (!parentNode) {
                    parentNode = $.C("div")
                }
                parentNode.innerHTML = node_or_html;
                node = parentNode.children[0];
                parentNode.removeChild(node);
                parentNode.innerHTML = ""
            } else {
                node = node_or_html
            }
            var list = {};
            var all_nodes = node.getElementsByTagName("*");
            if (all_nodes.length > 0) {
                $.foreach(all_nodes, function(el) {
                    if ($.isNode(el)) {
                        var node_type = el.getAttribute("node-type");
                        if (node_type) {
                            if (!list[node_type]) {
                                list[node_type] = []
                            }
                            list[node_type].push(el)
                        }
                    }
                })
            }
            var obj = {};
            obj.box = node;
            obj.list = list;
            return obj
        }
    });
    STK.register("kit.dom.parseDOM", function($) {
        return function(list) {
            for (var a in list) {
                if (list[a] && (list[a].length == 1)) {
                    list[a] = list[a][0]
                }
            }
            return list
        }
    });
    STK.register("kit.obj.append", function($) {
        return function(original) {
            for (var i = 1, l = arguments.length; i < l; i++) {
                var extended = arguments[i] || {};
                for (var key in extended) {
                    original[key] = extended[key]
                }
            }
            return original
        }
    });
    STK.register("kit.dom.loadStyle", function($) {
        var head;
        var $empty = $.funcEmpty;
        var $browser = $.core.util.browser;
        return function(source, spec) {
            var link, styleCheckTimer, loaded = false, timeout = false;
            var conf = $.parseParam({id: $.getUniqueKey(),timeout: 30 * 1000,styleCheck: null,onLoad: $empty,onTimeout: $empty,props: {charset: "utf-8",rel: "stylesheet",media: "screen",type: "text/css"}}, spec);
            link = $.C("link");
            $.foreach(conf.props, function(val, key) {
                link[key] = val
            });
            link.id = conf.id;
            link.href = source;
            var link_load = function() {
                clearInterval(styleCheckTimer);
                if (!timeout && !loaded) {
                    if ($.getType(conf.onLoad) === "function") {
                        setTimeout(conf.onLoad, 100)
                    }
                }
                loaded = true
            };
            if ($browser.IE) {
                link.onload = link_load
            } else {
                if ($.getType(conf.styleCheck) === "function") {
                    styleCheckTimer = setInterval(function() {
                        if (conf.styleCheck()) {
                            link_load()
                        }
                    }, 10)
                } else {
                    var img = document.createElement("img");
                    img.onerror = link_load;
                    img.src = source
                }
            }
            if (conf.timeout && conf.onTimeout) {
                setTimeout(function() {
                    clearInterval(styleCheckTimer);
                    if (!loaded && $.getType(conf.onTimeout) === "function") {
                        timeout = true;
                        conf.onTimeout()
                    }
                }, conf.timeout)
            }
            if (!head) {
                head = document.getElementsByTagName("head")[0]
            }
            head.appendChild(link)
        }
    });
    STK.register("kit.util.makeReady", function($) {
        return function(spec) {
            var conf = $.parseParam({timeout: 30 * 1000,condition: $.funcEmpty,ready: $.funcEmpty}, spec);
            var cache, timer;
            return {reset: function() {
                    if (cache) {
                        cache.length = 0;
                        cache = null
                    }
                    if (timer) {
                        clearTimeout(timer);
                        timer = null
                    }
                },exec: function(fn) {
                    var that = this;
                    if ($.getType(fn) === "function") {
                        if (conf.condition()) {
                            fn()
                        } else {
                            if (!cache) {
                                cache = [];
                                cache.push(fn);
                                if (!timer) {
                                    timer = setTimeout(that.reset, conf.timeout)
                                }
                                conf.ready(function() {
                                    clearTimeout(timer);
                                    timer = null;
                                    while ($.getType(cache) === "array" && cache.length > 0) {
                                        cache.shift()()
                                    }
                                })
                            } else {
                                cache.push(fn)
                            }
                        }
                    }
                },destroy: function() {
                    this.reset()
                }}
        }
    });
    STK.register("kit.dom.appendStyle", function($) {
        return function(cssText, spec) {
            var conf = $.parseParam({autoAppend: true,target: null,type: "text/css"}, spec);
            var style;
            cssText = cssText || "";
            cssText = cssText.toString();
            if ($.isNode(conf.target) && conf.target.tagName.toLowerCase() === "style") {
                style = conf.target
            } else {
                style = document.createElement("style");
                style.setAttribute("type", conf.type)
            }
            if (style.styleSheet) {
                style.styleSheet.cssText = style.innerHTML + cssText
            } else {
                style.appendChild(document.createTextNode(cssText))
            }
            if (conf.autoAppend) {
                document.getElementsByTagName("head")[0].appendChild(style)
            }
            return style
        }
    });
    STK.register("module.mask", function($) {
        var _maskNode, _nodeList = [], _fix, _inBody, _fixCKey;
        var _setStyle = $.core.dom.setStyle;
        var _getStyle = $.core.dom.getStyle;
        var _custEvent = $.core.evt.custEvent;
        var _cache = {}, _lastNode;
        function _init(options) {
            _maskNode = $.C("div");
            _maskNode.id = "ST_outLogin_mask";
            if ($.core.util.browser.IE6 && options && options.useIframeInIE6) {
                _maskNode.innerHTML = '<iframe id = "ST_outLogin_mask" style="position:absolute;z-index:-1;width:100%;height:100%;filter:mask();"></iframe>'
            }
            document.body.appendChild(_maskNode);
            _inBody = true;
            _fix = $.kit.dom.fix(_maskNode, "lt");
            var _beforeFixFn = function() {
                var _winSize = $.core.util.winSize();
                _maskNode.style.cssText = $.kit.dom.cssText(_maskNode.style.cssText).push("width", _winSize.width * 10 + "px").push("height", _winSize.height * 10 + "px").getCss()
            };
            _fixCKey = _custEvent.add(_fix, "beforeFix", _beforeFixFn);
            _beforeFixFn()
        }
        var that = {getNode: function() {
                return _maskNode
            },show: function(option, cb) {
                if (_inBody) {
                    option = $.core.obj.parseParam({useIframeInIE6: true,opacity: 0.1,background: "#000000"}, option);
                    _maskNode.style.background = option.background;
                    _setStyle(_maskNode, "opacity", option.opacity);
                    _maskNode.style.display = "block";
                    _fix.setAlign("lt");
                    cb && cb()
                } else {
                    $.Ready(function() {
                        _init(option);
                        that.show(option, cb)
                    })
                }
                return that
            },hide: function(node) {
                if (_maskNode && node) {
                    if (_lastNode != node) {
                        delete _cache[$.core.dom.uniqueID(node)]
                    } else {
                        var prev_node = $.core.dom.prev(_maskNode);
                        if (_lastNode) {
                            delete _cache[$.core.dom.uniqueID(_lastNode)];
                            _lastNode = undefined
                        }
                        var prev_flag = false;
                        for (var i = 0; prev_node && i < 3; i++) {
                            if (_cache[$.core.dom.uniqueID(prev_node)]) {
                                prev_flag = true;
                                break
                            }
                            prev_node = $.core.dom.prev(prev_node)
                        }
                        if (prev_flag) {
                            that.showUnderNode(prev_node)
                        } else {
                            _maskNode.style.display = "none"
                        }
                        prev_node = undefined
                    }
                }
                node = undefined;
                return that
            },showUnderNode: function(node, option) {
                if ($.isNode(node)) {
                    (_lastNode = node);
                    _cache[$.core.dom.uniqueID(node)] = 1;
                    that.show(option, function() {
                        document.body.appendChild(_maskNode);
                        document.body.appendChild(node);
                        _setStyle(_maskNode, "zIndex", "999")
                    })
                }
                return that
            },destroy: function() {
                _custEvent.remove(_fixCKey);
                _maskNode.style.display = "none";
                _lastNode = undefined;
                _cache = {}
            }};
        return that
    });
    STK.register("common.listener", function($) {
        var listenerList = {};
        var that = {};
        that.define = function(sChannel, aEventList) {
            if (listenerList[sChannel] != null) {
                throw "common.listener.define: 频道已被占用"
            }
            listenerList[sChannel] = aEventList;
            var ret = {};
            ret.register = function(sEventType, fCallBack) {
                if (listenerList[sChannel] == null) {
                    throw "common.listener.define: 频道未定义"
                }
                $.core.util.listener.register(sChannel, sEventType, fCallBack)
            };
            ret.fire = function(sEventType, oData) {
                if (listenerList[sChannel] == null) {
                    throw "commonlistener.define: 频道未定义"
                }
                $.core.util.listener.fire(sChannel, sEventType, oData)
            };
            ret.remove = function(sEventType, fCallBack) {
                $.core.util.listener.remove(sChannel, sEventType, fCallBack)
            };
            return ret
        };
        return that
    });
    STK.register("common.channel.sso", function($) {
        return $.common.listener.define("common.channel.sso", ["layer_ready", "layer_show", "layer_hide", "validate_failure", "play_door_voice", "login", "login_complete", "login_success", "login_failure", "login_timeout", "logout", "logout_complete", "logout_success", "logout_failure", "logout_timeout", "verify", "need_verify"])
    });
    STK.register("core.dom.addHTML", function($) {
        return function(node, html) {
            if (node.insertAdjacentHTML) {
                node.insertAdjacentHTML("BeforeEnd", html)
            } else {
                var oRange = node.ownerDocument.createRange();
                oRange.setStartBefore(node);
                var oFrag = oRange.createContextualFragment(html);
                node.appendChild(oFrag)
            }
        }
    });
    STK.register("core.io.getXHR", function($) {
        return function() {
            var _XHR = false;
            try {
                _XHR = new XMLHttpRequest()
            } catch (try_MS) {
                try {
                    _XHR = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (other_MS) {
                    try {
                        _XHR = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (failed) {
                        _XHR = false
                    }
                }
            }
            return _XHR
        }
    });
    STK.register("common.util.sso", function($) {
        var $merge = $.core.json.merge, $channel_sso = $.common.channel.sso, $jsonp = $.core.io.jsonp, $removeNode = $.core.dom.removeNode;
        $addHTML = $.core.dom.addHTML;
        return function(spec) {
            var that = {}, spec = spec || {};
            that.para = {};
            var conf = $merge({timeout: 20 * 1000}, spec);
            that.init = function() {
                if (that.inited) {
                    return
                }
                that.bindListener();
                that.inited = true
            };
            that.encodeFormData = function(data) {
                var pairs = {}, regexp = /%20/g;
                var pkey, value;
                for (var key in data) {
                    value = window.encodeURIComponent(data[key].toString()).replace(regexp, "+");
                    pkey = window.encodeURIComponent(key).replace(regexp, "+");
                    pairs[pkey] = value
                }
                return pairs
            };
            that.createForm = function(formName, display) {
                if (display == null) {
                    display = "none"
                }
                $removeNode(formName);
                var form = document.createElement("form");
                form.height = 0;
                form.width = 0;
                form.style.display = display;
                form.name = formName;
                form.id = formName;
                form.method = "post";
                $addHTML(document.body, form);
                form.addInput = function(name, value, type) {
                    if (type == null) {
                        type = "text"
                    }
                    var _name = this.getElementsByTagName("input")[name];
                    if (_name) {
                        this.removeChild(_name)
                    }
                    _name = document.createElement("input");
                    this.appendChild(_name);
                    _name.id = name;
                    _name.name = name;
                    _name.type = type;
                    _name.value = value
                };
                return form
            };
            that.login = function(data) {
                that.loginTimer = setTimeout(function() {
                    $channel_sso.fire("login_timeout")
                }, conf.timeout);
                var sendData = $.core.json.jsonToQuery(data);
                var xhr = $.core.io.getXHR();
                if (!"withCredentials" in xhr) {
                    return false
                }
                xhr.open("POST", "https://passport.sina.cn/sso/login", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.withCredentials = true;
                xhr.onreadystatechange = function() {
                    clearTimeout(that.loginTimer);
                    delete that.loginTimer;
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var ret = that.parseJSON(xhr.responseText);
                        if (ret.retcode == 20000000) {
                            var rs = {uid: ret.data.uid,nick: ret.data.nick,portrait: ret.data.portrait};
                            $channel_sso.fire("login_success", rs);
                            var crossdomainlist = ret.data.crossdomainlist;
                            for (var d in crossdomainlist) {
                                if (!crossdomainlist.hasOwnProperty(d)) {
                                    continue
                                }
                                $jsonp({url: crossdomainlist[d] + "&savestate=1",})
                            }
                        } else {
                            $channel_sso.fire("login_failure", [ret])
                        }
                    }
                };
                xhr.send(sendData)
            };
            that.forgetPassword = function(data) {
                var sendData = $.core.json.jsonToQuery(data);
                var xhr = $.core.io.getXHR();
                if (!"withCredentials" in xhr) {
                    return false
                }
                xhr.open("POST", "https://passport.sina.cn/forgot/ajforgot", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.withCredentials = true;
                xhr.onreadystatechange = function() {
                    var BackUrl = window.encodeURIComponent(window.location.href);
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var ret = that.parseJSON(xhr.responseText);
                        if (ret.retcode == 20000000) {
                            window.location.href = ret.data.jump_url
                        } else {
                            window.location.href = "https://passport.sina.cn/forgot/forgot?entry=wapsso&from=0&r=" + BackUrl
                        }
                    }
                };
                xhr.send(sendData)
            };
            that.parseJSON = function(str) {
                if (typeof (str) === "object") {
                    return str
                } else {
                    if (window.JSON) {
                        return JSON.parse(str)
                    } else {
                        return eval("(" + str + ")")
                    }
                }
            };
            that.checkVerify = function(loginName, verifyFun) {
                var ops = {url: "https://login.sina.com.cn/sso/prelogin.php",args: {entry: "sso",checkpin: 1,su: window.btoa(window.encodeURIComponent(loginName))},onComplete: function(rs) {
                        if (rs.retcode === 0) {
                            verifyFun(rs)
                        }
                    }};
                $jsonp(ops)
            };
            that.chackLogin = function(fn) {
                var ops = {url: "https://passport.sina.cn/sso/checklogin",args: {entry: "sso"},onComplete: function(rs) {
                        if ($.getType(fn) === "function") {
                            fn(rs)
                        }
                    }};
                $jsonp(ops)
            };
            that.mobileVerify = function(mobileVerifyurl, fn) {
                var ops = {url: mobileVerifyurl,onComplete: function(rs) {
                        if ($.getType(fn) === "function") {
                            fn(rs)
                        }
                    }};
                $jsonp(ops)
            };
            that.getPinCodeUrl = function(url, img) {
                var ops = {url: url,onComplete: function(ret) {
                        if (ret.retcode == 20000000) {
                            img.src = ret.data.image;
                            img.setAttribute("data-pcid", ret.data.pcid)
                        }
                    }};
                $jsonp(ops)
            };
            that.bindListener = function() {
                $channel_sso.register("login", that.login);
                $channel_sso.register("verify", that.checkVerify)
            };
            return that
        }
    });
    STK.register("kit.extra.template", function($) {
        var templet = function(template, data) {
            return template.replace(/#\{(.+?)\}/ig, function() {
                var key = arguments[1];
                var ret = arguments[0];
                var list = key.split("||");
                for (var i = 0, len = list.length; i < len; i += 1) {
                    if (/^default:.*$/.test(list[i])) {
                        ret = list[i].replace(/^default:/, "");
                        break
                    } else {
                        if (data[list[i]] !== undefined) {
                            ret = data[list[i]];
                            break
                        }
                    }
                }
                return ret
            })
        };
        return function(temp, data) {
            data = data || $.$LANG || {};
            var str = templet(temp, data);
            return str
        }
    });
    STK.register("kit.evt.input_bindchange", function($) {
        var $browser = $.core.util.browser;
        return function(node, type, fn) {
            type = (type == "add") ? "add" : "remove";
            var action = type + "Event";
            if ($browser.IE) {
                var version = parseInt($browser.Version, 10);
                if (version == 5) {
                    $[action](node, "keydown", fn);
                    $[action](node, "cut", fn);
                    $[action](node, "input", fn)
                } else {
                    if (version > 5) {
                        $[action](node, "input", fn)
                    } else {
                        $[action](node, "propertychange", fn)
                    }
                }
            } else {
                $[action](node, "input", fn)
            }
        }
    });
    STK.register("kit.util.buffer_pool", function($) {
        return function(spec) {
            var that = {};
            var conf = $.parseParam({delay: 50}, spec);
            var timer_final = null;
            that.trigger_final = function() {
                if (timer_final) {
                    clearTimeout(timer_final);
                    timer_final = null
                }
                timer_final = setTimeout(function() {
                    timer_final = null;
                    that.feedback()
                }, conf.delay)
            };
            var timer_regular = null;
            var enable = false;
            that.trigger_regular = function() {
                enable = true;
                if (!timer_regular) {
                    timer_regular = setInterval(function() {
                        that.feedback();
                        if (!enable) {
                            clearInterval(timer_regular);
                            timer_regular = null
                        }
                        enable = false
                    }, conf.delay)
                }
            };
            that.feedback = function() {
            };
            return that
        }
    });
    STK.register("kit.dom.placeholder", function($) {
        var $merge = $.core.json.merge;
        var tempInput;
        return function(node, spec) {
            var that = {};
            var conf = $.parseParam({}, spec);
            var conf_style = {opacity: 0.5};
            that.supportPlaceholder = function() {
                if (!tempInput) {
                    tempInput = $.C("input")
                }
                return "placeholder" in tempInput
            };
            that.compute_offset = function() {
                var pos = {};
                $.foreach(["marginTop", "paddingTop", "borderTopWidth", "marginLeft", "paddingLeft", "borderLeftWidth"], function(prop) {
                    pos[prop] = $.getStyle(node, prop);
                    if (pos[prop] == "auto") {
                        pos[prop] = "1px"
                    }
                    pos[prop] = parseInt(pos[prop], 10) || 0
                });
                pos.x = pos.marginLeft + pos.paddingLeft + pos.borderLeftWidth;
                pos.y = pos.marginTop + pos.paddingTop + pos.borderTopWidth + ($.core.util.browser.IE6 ? 1 : 0);
                return pos
            };
            that.getStyles = function() {
                var styles = {};
                $.foreach(["fontSize", "lineHeight"], function(prop) {
                    styles[prop] = $.getStyle(node, prop)
                });
                styles.position = "absolute";
                return styles
            };
            that.focus = function() {
                that.hide();
                setTimeout(function() {
                    node.focus()
                })
            };
            that.hide = function() {
                if (that.label) {
                    $.setStyle(that.label, "display", "none")
                }
            };
            that.show = function() {
                if (that.label && node && !node.value) {
                    $.setStyle(that.label, "display", "")
                }
            };
            that.check = function() {
                if (!node.value) {
                    that.show()
                } else {
                    that.hide()
                }
            };
            that.build_placeholder = function(text) {
                if (!that.label) {
                    that.label = $.C("span");
                    that.hide();
                    $.insertBefore(that.label, node);
                    that.bindDomEvents()
                }
                that.label.innerHTML = text;
                var styles = that.getStyles();
                var offset = that.compute_offset();
                styles.marginLeft = offset.x + "px";
                styles.marginTop = offset.y + "px";
                styles = $merge(styles, conf_style);
                $.foreach(styles, function(val, key) {
                    $.setStyle(that.label, key, val)
                })
            };
            that.checkInput = function() {
                if (node && node.value) {
                    that.hide()
                }
            };
            that.bindDomEvents = function() {
                $.addEvent(node, "input", that.checkInput);
                $.addEvent(node, "propertychange", that.checkInput);
                $.addEvent(node, "focus", that.hide);
                $.addEvent(node, "blur", that.check);
                $.addEvent(that.label, "mousedown", that.focus)
            };
            that.destroy = function() {
                $.removeEvent(node, "focus", that.hide);
                $.removeEvent(that.label, "mousedown", that.focus);
                $.removeEvent(node, "blur", that.check);
                if (that.label && that.label.parentNode) {
                    that.label.parentNode.removeChild(that.label)
                }
                that.label = null
            };
            that.set = function(text, spec_style) {
                if (!node) {
                    return
                }
                spec_style = spec_style || {};
                conf_style = $merge({color: "#888"}, spec_style);
                if (!text) {
                    text = node.getAttribute("placeholder") || ""
                }
                if (that.supportPlaceholder()) {
                    node.setAttribute("placeholder", text)
                } else {
                    that.build_placeholder(text);
                    that.check()
                }
                return that
            };
            that.node = node;
            that.conf = conf;
            that.conf_style = conf_style;
            return that
        }
    });
    STK.register("common.util.door", function($) {
        var $merge = $.core.json.merge, $channel_sso = $.common.channel.sso, $sso = $.common.util.sso;
        var getQueryPara = function(query) {
            var para = {};
            var arrPara = query.split("&");
            var arr = [];
            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");
                para[arr[0]] = arr[1]
            }
            return para
        };
        return function(spec) {
            var that = {}, conf = {};
            that.sso = $sso();
            that.argsCheck = function() {
                conf = $.parseParam({usesso: false,address: "",img: null,input: null,tip: null,button: null,img_extra: {},autofocus: false}, spec)
            };
            that.init = function() {
                that.argsCheck();
                that.setEvents("add")
            };
            that.change = function() {
                var address = "https://passport.sina.cn/captcha/image";
                if (conf.tip) {
                    conf.tip.innerHTML = ""
                }
                if (conf.input) {
                    conf.input.value = ""
                }
                if (conf.img) {
                    $.setStyle(conf.img, "visibility", "hidden");
                    that.sso.getPinCodeUrl(conf.address, conf.img)
                }
            };
            that.bound = {change: function() {
                    $.preventDefault();
                    that.change();
                    if (conf.input && conf.autofocus) {
                        conf.input.focus()
                    }
                },doorImgLoad: function() {
                    $.setStyle(conf.img, "visibility", "visible")
                }};
            that.setEvents = function(type) {
                var action = type === "add" ? "addEvent" : "removeEvent";
                $[action](conf.button, "click", that.bound.change);
                $[action](conf.img, "click", that.bound.change);
                $[action](conf.img, "load", that.bound.doorImgLoad)
            };
            that.destroy = function() {
                that.setEvents("remove")
            };
            that.conf = conf;
            return that
        }
    });
    STK.register("comp.login.outlogin", function($) {
        var $merge = $.core.json.merge, $template = $.kit.extra.template, $builder = $.kit.dom.builder, $parseDOM = $.kit.dom.parseDOM, $bind_change = $.kit.evt.input_bindchange, $buffer_pool = $.kit.util.buffer_pool, $placeholder = $.kit.dom.placeholder, $door = $.common.util.door, $channel_sso = $.common.channel.sso;
        $sso = $.common.util.sso;
        return function(rootNode) {
            var that = {}, nodes = {}, conf = {forget_vsn_url: "",forget_password_url: "",register_url: "https://login.sina.com.cn/signup/signup.php?entry=#{entry||default:sso}",entry: "wapsso",door_address: "http://passport.sina.cn/captcha/image",savestate: 3650,relative_node: null,setTipDelay: 100,closeAutoCompleteDelay: 200,updateDelay: 200,login_failure: 0};
            that.username = null;
            that.loginFailureNum = 0;
            that.isInside = false;
            that.mobileVerifyurl = null;
            that.prev_value = "";
            that.disabled = false;
            that.submitDisabled = true;
            that.focusDom = null;
            that.setOptions = function(spec) {
                spec = spec || {};
                conf = $.parseParam(conf, spec);
                that.conf = conf
            };
            that.setTip = function(strtip, el) {
                if (strtip + "" === "undefined") {
                    return
                }
                if (nodes.tip && strtip !== "") {
                    nodes.tip.innerHTML = strtip;
                    nodes.tip.style.display = "block"
                }
            };
            that.hideTip = function(clear) {
                if (nodes.tip) {
                    nodes.tip.style.display = "none";
                    nodes.tip.innerHTML = ""
                }
            };
            that.mobileVerify = function() {
                $.removeEvent(nodes.mobile_Verify, "click", that.mobileVerify);
                var sso = that.getSSO();
                sso.mobileVerify(that.mobileVerifyurl, function(rs) {
                    that.cfrom = rs.data.cfrom
                });
                var countDown = 60;
                var updateCountDown = function() {
                    if (countDown == 0) {
                        nodes.mobile_Verify.className = "lymb-code-btn";
                        nodes.mobile_Verify.innerHTML = "获取验证码";
                        countDown = 60;
                        $.addEvent(nodes.mobile_Verify, "click", that.mobileVerify)
                    } else {
                        beginCountDown()
                    }
                };
                var beginCountDown = function() {
                    nodes.mobile_Verify.className = "lymb-code-wait";
                    nodes.mobile_Verify.innerHTML = "重新获取(" + countDown + ")";
                    setTimeout(function() {
                        countDown--;
                        updateCountDown()
                    }, 1000)
                };
                beginCountDown()
            };
            that.lockForm = function(isLock) {
                isLock = !!isLock;
                that.disabled = isLock;
                $.foreach(["loginname", "password", "door", "vsn"], function(prop) {
                    var el = nodes[prop];
                    el.readOnly = isLock
                })
            };
            that.getRemember = function() {
                var value = nodes.loginname.value;
                var sso = that.getSSO();
                if (!value && sso && $.getType(sso.getLoginInfo) === "function") {
                    var info = sso.getLoginInfo();
                    if (info && info.ln) {
                        nodes.loginname.value = info.ln
                    }
                }
                if (that.placeholder_loginname) {
                    that.placeholder_loginname.check()
                }
                that.checkFace()
            };
            that.showClearButton = function() {
                if (nodes.clear) {
                    if (nodes.loginname.value) {
                        $.setStyle(nodes.clear, "display", "")
                    } else {
                        $.setStyle(nodes.clear, "display", "none")
                    }
                }
            };
            that.hideClearButton = function() {
                if (nodes.clear) {
                    nodes.clear.style.display = "none"
                }
            };
            that.clearRemember = function() {
            };
            that.reset = function() {
                that.lockForm(false);
                nodes.loginname.value = "";
                nodes.password.value = "";
                nodes.door.value = "";
                nodes.vsn.value = "";
                nodes.mobile.value = "";
                that.switchFace("password");
                that.hideTip();
                that.submitDisabled = true;
                nodes.submit.className = "lymb-sub";
                if (that.placeholder_loginname) {
                    that.placeholder_loginname.check()
                }
                if (that.placeholder_password) {
                    that.placeholder_password.check()
                }
                if (that.placeholder_vsn) {
                    that.placeholder_vsn.check()
                }
                that.hideClearButton()
            };
            that.getData = function() {
                var data = {};
                $.foreach(["loginname", "door", "vsn", "password", "mobile", "advanceLoginname"], function(prop) {
                    var el = nodes[prop];
                    var trim_value = $.trim(el.value);
                    if (el.value !== trim_value && prop !== "password") {
                        el.value = trim_value;
                        el.blur()
                    }
                    data[prop] = el.value
                });
                return data
            };
            that.validate = function(data, state) {
                var result = true;
                var errTip = "";
                var errNode = null;
                $.foreach({loginname: "E010001",password: "E010002",door: "E010003",vsn: "E010004",mobile: "E010003"}, function(code, prop) {
                    var enable = prop === "loginname" || state === prop;
                    if (prop === "loginname" && nodes.advanceLoginname_box.style.display != "none") {
                        enable = false
                    }
                    var node = nodes[prop];
                    if (enable && node && !data[prop]) {
                        errNode = node;
                        errTip = $template("#{" + code + "}");
                        result = false
                    }
                    return result
                });
                if (!result) {
                    if (errNode) {
                        errNode.focus()
                    }
                    setTimeout(function() {
                        that.setTip(errTip, errNode);
                        $channel_sso.fire("validate_failure")
                    }, conf.setTipDelay)
                }
                return result
            };
            that.verify = function(json) {
                json = json || {reason: ""};
                var reason = $template("#{" + json.code + "||default:" + json.reason + "}");
                var relate_node = null;
                if (json.code == "4049" || json.code == "2070") {
                    that.switchFace("door");
                    if (that.door) {
                        that.door.change()
                    }
                    relate_node = nodes.door
                } else {
                    that.switchFace("vsn");
                    relate_node = nodes.vsn
                }
                if (relate_node) {
                    relate_node.focus()
                }
                setTimeout(function() {
                    that.setTip(reason, relate_node);
                    if (json.code == "2070" || json.code == "5025" || json.code == "4049") {
                        $channel_sso.fire("validate_failure")
                    }
                }, conf.setTipDelay)
            };
            that.submit = function() {
                if (that.disabled || that.submitDisabled) {
                    return
                }
                that.hideTip();
                var loginData = {};
                var data = that.getData();
                var state = that.getFaceState();
                if (that.validate(data, state)) {
                    that.lockForm(true);
                    loginData.savestate = 3650;
                    if (nodes.remember && nodes.remember.checked) {
                        loginData.savestate = conf.savestate
                    }
                    if (data.loginname) {
                        loginData.username = encodeURIComponent(data.loginname)
                    }
                    loginData.password = encodeURIComponent(data.password);
                    if (state === "door") {
                        loginData.pincode = data.door;
                        loginData.pcid = nodes.door_img.getAttribute("data-pcid")
                    } else {
                        if (state === "vsn") {
                            loginData.vsn = data.vsn
                        } else {
                            if (state === "mobile") {
                                loginData.password = data.mobile;
                                loginData.cfrom = that.cfrom
                            }
                        }
                    }
                    if (document.referrer) {
                        loginData.pagerefer = document.referrer
                    }
                    loginData.entry = "wapsso";
                    loginData.loginfrom = 1;
                    $channel_sso.fire("login", [loginData])
                }
            };
            that.getFaceState = function() {
                if (nodes.door_box.style.display != "none") {
                    return "door"
                } else {
                    if (nodes.vsn_box.style.display != "none") {
                        return "vsn"
                    } else {
                        if (nodes.mobile_box.style.display != "none") {
                            return "mobile"
                        } else {
                            return "password"
                        }
                    }
                }
            };
            that.switchFace = function(type) {
                if (type === "change") {
                    nodes.userhead.src = "http://i.sso.sina.com.cn/images/login/thumb_default.gif";
                    nodes.advanceLoginname_box.style.display = "none";
                    nodes.loginname_box.style.display = "block";
                    nodes.password_box.style.display = "block";
                    $.foreach(["door", "vsn", "mobile"], function(boxType) {
                        var node = nodes[boxType + "_box"];
                        $.setStyle(node, "display", "none")
                    })
                } else {
                    type = type || "password";
                    if (type === "door" && that.door) {
                        if ($.getStyle(nodes.door_box, "display") === "none") {
                            that.door.change()
                        }
                    }
                    if (type === "password") {
                        $.setStyle(nodes.password_box, "display", "block")
                    }
                    $.foreach(["door", "vsn", "mobile"], function(boxType) {
                        var node = nodes[boxType + "_box"];
                        if (boxType === type) {
                            if (boxType === "mobile") {
                                $.setStyle(nodes.password_box, "display", "none")
                            }
                            $.setStyle(node, "display", "block")
                        } else {
                            $.setStyle(node, "display", "none")
                        }
                    });
                    if (nodes.forget_vsn && nodes.forget_password) {
                        if (type === "vsn") {
                            $.setStyle(nodes.forget_vsn, "display", "");
                            $.setStyle(nodes.forget_password, "display", "none")
                        } else {
                            $.setStyle(nodes.forget_vsn, "display", "none");
                            $.setStyle(nodes.forget_password, "display", "")
                        }
                    }
                }
            };
            var checkpinCache = {};
            that.checkFace = function() {
                var sso = that.getSSO();
                var username = $.trim(nodes.loginname.value);
                if (!username) {
                    return
                }
                if ($.getType(checkpinCache[username]) !== "undefined") {
                    that.checkPin(checkpinCache[username])
                } else {
                    if (!sso) {
                        return
                    }
                    sso.checkVerify(username, function(rs) {
                        if (rs) {
                            if (rs.nopwd === 1) {
                                var code = {nopwd: 1};
                                that.checkPin(code);
                                checkpinCache[username] = {nopwd: 1};
                                that.mobileVerifyurl = rs.smsurl
                            } else {
                                var code = {nopwd: 0,showpin: rs.showpin};
                                that.checkPin(code);
                                checkpinCache[username] = {nopwd: 0,showpin: rs.showpin}
                            }
                        }
                    })
                }
            };
            that.forgetPassword = function() {
                var sso = that.getSSO(), data = that.getData();
                var forgetData = {};
                forgetData.entry = "wapsso";
                forgetData.username = data.loginname || data.advanceLoginname;
                forgetData.from = 1;
                forgetData.r = window.location.href;
                sso.forgetPassword(forgetData)
            };
            that.checkPin = function(code) {
                if (code.nopwd) {
                    that.switchFace("mobile")
                } else {
                    var showpin = code.showpin.toString();
                    if (showpin === "1") {
                        that.switchFace("door")
                    } else {
                        if (showpin === "2") {
                            that.switchFace("vsn")
                        } else {
                            if (showpin === "0") {
                                that.switchFace("password")
                            }
                        }
                    }
                }
            };
            that.update = function() {
                var value = nodes.loginname.value;
                if (value != that.prev_value) {
                    that.switchFace("password");
                    if (checkpinCache[$.trim(value)]) {
                        that.checkFace()
                    }
                }
                that.prev_value = value;
                that.showClearButton()
            };
            that.delayUpdate = function() {
                if (!that.buffer) {
                    that.buffer = $buffer_pool({delay: conf.updateDelay});
                    that.buffer.feedback = that.update
                }
                that.buffer.trigger_regular();
                that.changeSubmit()
            };
            that.clearName = function() {
                nodes.loginname.value = "";
                nodes.password.value = "";
                that.update();
                that.changeSubmit()
            };
            that.clearPassword = function() {
                nodes.password.value = "";
                that.changeSubmit()
            };
            that.clearVsn = function() {
                nodes.vsn.value = "";
                that.changeSubmit()
            };
            that.focusLoginName = function() {
                if (that.focusDom && that.focusDom !== nodes.loginname) {
                    that[that.focusDom]()
                }
                nodes.loginname_box.className = "ipt-sect ipt-sect-name ipt-sect-focus";
                that.hideTip();
                that.focusDom = "blurLoginName"
            };
            that.focusPassword = function() {
                if (that.focusDom && that.focusDom !== nodes.password) {
                    that[that.focusDom]()
                }
                nodes.password_box.className = "ipt-sect ipt-sect-pass ipt-sect-focus";
                that.hideTip();
                that.focusDom = "blurPassword"
            };
            that.focusDoor = function() {
                if (that.focusDom && that.focusDom !== nodes.door) {
                    that[that.focusDom]()
                }
                nodes.door_box.className = "ipt-sect ipt-sect-yz ipt-sect-focus";
                that.hideTip();
                that.focusDom = "blurDoor"
            };
            that.focusVsn = function() {
                if (that.focusDom && that.focusDom !== nodes.vsn) {
                    that[that.focusDom]()
                }
                nodes.vsn_box.className = "ipt-sect ipt-sect-vd ipt-sect-focus";
                that.hideTip();
                that.focusDom = "blurVsn"
            };
            that.focusMobile = function() {
                if (that.focusDom && that.focusDom !== nodes.mobile) {
                    that[that.focusDom]()
                }
                nodes.mobile_box.className = "ipt-sect ipt-sect-yz ipt-sect-focus";
                that.hideTip();
                that.focusDom = "blurMobile"
            };
            that.blurLoginName = function() {
                nodes.loginname_box.className = "ipt-sect ipt-sect-name"
            };
            that.blurPassword = function() {
                nodes.password_box.className = "ipt-sect ipt-sect-pass"
            };
            that.blurDoor = function() {
                nodes.door_box.className = "ipt-sect ipt-sect-yz"
            };
            that.blurVsn = function() {
                nodes.vsn_box.className = "ipt-sect ipt-sect-vd"
            };
            that.blurMobile = function() {
                nodes.mobile_box.className = "ipt-sect ipt-sect-yz"
            };
            that.clearFocusClearName = function(evt) {
                if (that.focusDom) {
                    var stop = {loginname: 1,password_box: 1,password: 1,door_box: 1,door: 1,door_img: 1,vsn_box: 1,vsn: 1,mobile_box: 1,mobile: 1,mobile_Verify: 1,clearName: 1,clearPassword: 1,clearVsn: 1};
                    var node_type = evt.target.getAttribute("node-type");
                    if (!stop[node_type]) {
                        that[that.focusDom]()
                    }
                }
            };
            that.changeUser = function() {
                nodes.loginname.value = "";
                nodes.password.value = "";
                nodes.door.value = "";
                nodes.vsn.value = "";
                nodes.mobile.value = "";
                that.switchFace("change");
                that.changeSubmit()
            };
            that.changeSubmit = function() {
                that.submitDisabled = false;
                $.foreach(["loginname", "password", "door", "vsn", "mobile"], function(prop) {
                    var box = prop + "_box";
                    if (nodes[box].style.display != "none" && $.trim(nodes[prop].value) === "") {
                        that.submitDisabled = true
                    }
                });
                nodes.submit.className = that.submitDisabled ? "lymb-sub" : "lymb-sub lymb-sub-enable"
            };
            that.parseDom = function() {
                var parentNode = rootNode;
                if (parentNode) {
                    var dom = $builder(parentNode);
                    nodes = $parseDOM(dom.list);
                    nodes.box = dom.box;
                    that.nodes = nodes;
                    $.foreach(["root", "tip", "loginname", "password_box", "password", "door_box", "door", "door_img", "vsn_box", "vsn", "mobile_box", "mobile", "mobile_Verify"], function(prop) {
                        if (!nodes[prop]) {
                            throw ("Can't find necessary node : " + prop + " !")
                        }
                    });
                    $.foreach(["submit", "clear", "door_voice", "door_change", "forget_password", "forget_vsn", "register_button", "remember", "remember_label"], function(prop) {
                        if (!nodes[prop]) {
                            that.log("Can't find node : " + prop + " !")
                        }
                    });
                    nodes.relative = conf.relative_node || nodes.root
                } else {
                    that.log("Can't find login form : " + rootNode.id || rootNode.getAttribute("noe-type"))
                }
            };
            that.domEvents = {check_keydown: function(evt) {
                    evt = $.fixEvent(evt);
                    var state = that.getFaceState();
                    var focus_node = null;
                    var node_type = evt.target.getAttribute("node-type");
                    if (evt.keyCode == 13) {
                        if (!nodes.loginname.value) {
                            focus_node = nodes.loginname
                        } else {
                            if (!nodes.password.value) {
                                focus_node = nodes.password
                            } else {
                                if (!nodes[state].value) {
                                    focus_node = nodes[state]
                                } else {
                                    that.submit()
                                }
                            }
                        }
                    }
                    if (focus_node) {
                        setTimeout(function() {
                            focus_node.focus()
                        }, 10)
                    }
                },clear: function() {
                    $.preventDefault();
                    that.reset();
                    that.hideClearButton();
                    that.clearRemember();
                    nodes.loginname.focus();
                    nodes.loginname.blur()
                },submit: function() {
                    $.preventDefault();
                    that.submit()
                }};
            that.setDomEvents = function(type) {
                type = type == "add" ? "add" : "remove";
                var action = type + "Event";
                $bind_change(nodes.loginname, type, that.delayUpdate);
                $bind_change(nodes.password, type, that.changeSubmit);
                $bind_change(nodes.door, type, that.changeSubmit);
                $bind_change(nodes.vsn, type, that.changeSubmit);
                $bind_change(nodes.mobile, type, that.changeSubmit);
                $[action](nodes.submit, "click", that.domEvents.submit);
                $[action](nodes.box, "click", that.clearFocusClearName);
                $[action](nodes.loginname, "blur", that.checkFace);
                $[action](nodes.loginname, "focus", that.focusLoginName);
                $[action](nodes.password, "focus", that.focusPassword);
                $[action](nodes.door, "focus", that.focusDoor);
                $[action](nodes.vsn, "focus", that.focusVsn);
                $[action](nodes.mobile, "focus", that.focusMobile);
                $[action](nodes.mobile_Verify, "click", that.mobileVerify);
                $[action](nodes.clearName, "click", that.clearName);
                $[action](nodes.clearPassword, "click", that.clearPassword);
                $[action](nodes.clearVsn, "click", that.clearVsn);
                $[action](nodes.changeUser, "click", that.changeUser);
                $[action](nodes.loginname, "keydown", that.domEvents.check_keydown);
                $[action](nodes.password, "keydown", that.domEvents.check_keydown);
                $[action](nodes.door, "keydown", that.domEvents.check_keydown);
                $[action](nodes.vsn, "keydown", that.domEvents.check_keydown)
            };
            that.listenerEvents = {loginComplete: function(json) {
                },loginSuccess: function(json) {
                    that.hideTip()
                },loginFailure: function(json) {
                    that.lockForm(false);
                    json = json || {reason: ""};
                    var username = nodes.loginname.value || nodes.advanceLoginname.value;
                    that.username = !that.loginFailureNum ? username : that.username;
                    var reason = json.msg;
                    var state = that.getFaceState();
                    if (that.door && state === "door") {
                        that.door.change()
                    }
                    if (that.username === username && (json.retcode === 50011002 || json.retcode === 50011015)) {
                        that.loginFailureNum++;
                        if (that.loginFailureNum >= 3) {
                            reason = $template("#{E010006}")
                        }
                    } else {
                        that.loginFailureNum = 0
                    }
                    that.setTip(reason)
                },verify: function(json) {
                    that.lockForm(false);
                    that.verify(json)
                },logoutSuccess: function(json) {
                    that.reset()
                },onLoginTimeout: function() {
                    that.lockForm(false);
                    var errTip = $template("#{E010005}");
                    that.setTip(errTip)
                }};
            that.setListener = function(type) {
                var action = type == "register" ? "register" : "remove";
                $channel_sso[action]("login_complete", that.listenerEvents.loginComplete);
                $channel_sso[action]("login_success", that.listenerEvents.loginSuccess);
                $channel_sso[action]("login_failure", that.listenerEvents.loginFailure);
                $channel_sso[action]("logout_success", that.listenerEvents.logoutSuccess);
                $channel_sso[action]("need_verify", that.listenerEvents.verify);
                $channel_sso[action]("login_timeout", that.listenerEvents.onLoginTimeout)
            };
            that.initPlugin = function() {
                that.switchFace("password");
                that.lockForm(false);
                setTimeout(function() {
                    that.showClearButton();
                    that.placeholder_loginname = $placeholder(nodes.loginname).set();
                    that.placeholder_password = $placeholder(nodes.password).set();
                    that.placeholder_vsn = $placeholder(nodes.vsn).set();
                    nodes.loginname.blur();
                    nodes.password.blur()
                }, conf.closeAutoCompleteDelay);
                that.door = $door({address: conf.door_address,usesso: true,autofocus: true,img: nodes.door_img,input: nodes.door,button: nodes.door_change});
                that.door.init();
                that.setSSO();
                if (conf.entry) {
                    var regHref = $template(conf.register_url, {entry: conf.entry});
                    if ($.getType(nodes.register_button) === "array") {
                        $.foreach(nodes.register_button, function(btn) {
                            btn.href = regHref
                        })
                    }
                }
                if (nodes.forget_password && conf.forget_password_url) {
                    nodes.forget_password.href = conf.forget_password_url
                } else {
                    if (nodes.forget_password) {
                        nodes.forget_password.href = "https://passport.sina.cn/forgot/forgot?entry=wapsso&from=0&r=" + window.encodeURIComponent(window.location.href)
                    }
                }
                if (nodes.register_login) {
                    nodes.register_login.href = "https://passport.sina.cn/signup/signup?entry=wapsso&r=" + window.encodeURIComponent(window.location.href)
                }
                if (nodes.forget_vsn && conf.forget_vsn_url) {
                    nodes.forget_vsn.href = conf.forget_vsn_url
                }
            };
            that.setSSO = function() {
                that.SSO = $sso();
                that.SSO.init()
            };
            that.getSSO = function() {
                return that.SSO
            };
            that.advanceLogin = function() {
                var sso = that.getSSO();
                sso.chackLogin(function(rs) {
                    if (rs.retcode === 20000000 && (rs.data.type === 2 || rs.data.type === 3)) {
                        var userData = rs.data;
                        nodes.advanceLoginname.value = userData.username;
                        nodes.userhead.src = userData.portrait;
                        if (userData.nopwd === 1) {
                            var code = {nopwd: 1};
                            that.checkPin(code);
                            checkpinCache[userData.username] = {nopwd: 1};
                            that.mobileVerifyurl = userData.smsurl
                        } else {
                            if (userData.showpin !== undefined) {
                                var code = {nopwd: 0,showpin: userData.showpin};
                                that.checkPin(code)
                            }
                            checkpinCache[userData.username] = {nopwd: 0,showpin: userData.showpin}
                        }
                        nodes.loginname_box.style.display = "none";
                        nodes.advanceLoginname_box.style.display = "block"
                    }
                })
            };
            that.log = function(str) {
                if (str) {
                    $.log("STK.comp.login.plugin : " + str)
                }
            };
            that.destroy = function() {
                that.setListener("remove");
                that.setDomEvents("remove");
                that.placeholder_loginname.destroy();
                that.placeholder_password.destroy();
                that.placeholder_vsn.destroy();
                if (that.door && that.door.destroy) {
                    that.door.destroy()
                }
            };
            that.init = function() {
                that.parseDom();
                that.setDomEvents("add");
                that.setListener("register");
                that.initPlugin()
            };
            that.nodes = nodes;
            that.conf = conf;
            return that
        }
    });
    STK.register("comp.defaultStyle", function($) {
        var cssText = ['.layer-mb-login {position: absolute;width: 256px;padding: 40px 12px 20px;background: #f8f8f8;border-radius: 3px;font-family:"STHeiti Light","Microsoft Yahei",Helvetica;}', ".layer-mb-login .lymb-icon {display: inline-block;background-image: url(http://i.sso.sina.com.cn/images/login/lymb_icon.png);background-repeat: no-repeat;}", ".layer-mb-login .lymb-cls {position: absolute;top: -50px;right: 10px;width: 32px;height: 32px;background-position: 0 0;}", ".layer-mb-login .text_remove {position: absolute;display:none;width: 20px;height: 20px;background-position: -40px 0;right: 17px;top: 10px;z-index:4;}", ".layer-mb-login .edit_name {position: absolute;width: 26px;height: 22px;background-position: 0 -240px;right:28px;top:13px;}", ".layer-mb-login .lymb-thumb {position: absolute;top: -50px;left: 50%;margin-left: -41px;width: 80px;height: 80px;border-radius: 40px;border: 1px solid #e1e1e1;background:#f8f8f8;}", ".layer-mb-login .lymb-thumb img {margin:5px 0 0 5px;width: 70px;height: 70px;-webkit-border-radius: 35px;border-radius: 35px;}", ".layer-mb-login .lymb-ipt-wrap {position: relative;}", ".layer-mb-login .ipt-sect {position:relative;margin-top: -1px;border: 1px solid #dfdfdf;background:#fff;}", ".layer-mb-login .ipt-sect-focus{border-color: #0090f7;z-index:2;background:#fff;}", ".layer-mb-login .ipt-sect-focus .text_remove{display:block;}", ".layer-mb-login .ipt-sect-name .edit_name {right: 8px;top: 12px;}", ".layer-mb-login .ipt {position:relative;border:0;width: 200px;padding:0 0 0 50px;height: 39px;color: #1a1a1a;outline: none;font-size: 16px;-webkit-appearance: none;border-radius: 0;}", ".layer-mb-login .ipt-sect-focus .ipt{width: 160px;}", ".layer-mb-login .ipt::-webkit-input-placeholder {color:#9fa6ac;}", ".layer-mb-login .ipt:focus::-webkit-input-placeholder {color:transparent;}", ".layer-mb-login .ipt-sect-vd .ipt,", ".layer-mb-login .ipt-sect-yz .ipt{width:128px;padding-left:16px;background-color:transparent;}", ".layer-mb-login .ipt-sect-name .ipt {background: url(http://i.sso.sina.com.cn/images/login/lymb_icon.png) no-repeat 14px -70px;}", ".layer-mb-login .ipt-sect-name.ipt-sect-focus .ipt {background-position: 14px -110px;}", ".layer-mb-login .ipt-sect-pass .ipt {background: url(http://i.sso.sina.com.cn/images/login/lymb_icon.png) no-repeat 14px -150px;}", ".layer-mb-login .ipt-sect-pass.ipt-sect-focus .ipt {background-position: 14px -190px;}", ".layer-mb-login .ipt-cookie {position:relative;width: 254px;padding-left: 0;border-color: transparent;background: none;text-align: center;}", ".layer-mb-login .lymb-code{position:absolute;top:0;right:4px;z-index:3;}", ".layer-mb-login .lymb-code img{height:39px;}", ".layer-mb-login .lymb-code-btn,", ".layer-mb-login .lymb-code-wait{position:absolute;top:1px;right:1px;z-index:3;display:inline-block;width:100px;height:37px;line-height:37px;background:#34a83d;color:#fff; text-decoration:none;font-size:14px;text-align:center;}", ".layer-mb-login .lymb-code-wait{background:#666;}", ".layer-mb-login .lymb-sub {margin-top: 20px;display: block;height: 30px;line-height: 30px;text-align: center;background: #dfdfdf;text-decoration: none;color: #fff;font-size: 16px;}", ".layer-mb-login .lymb-sub-enable {background-color: #0090f7;}", ".layer-mb-login .lymb-help {font-size: 12px;padding-top: 20px;line-height: 1;color: #9fa6ac;}", ".layer-mb-login .lymb-help a {color: #3990e6;}", ".layer-mb-login .fgtpass {float: right;}", ".layer-mb-login .lymb-warn {border: 1px solid #ffc0c0;padding: 8px 14px;background: #ffefef;color: #f48383;font-size: 14px;}", "@media screen and (-webkit-device-pixel-ratio: 2){.layer-mb-login .lymb-icon{background-image:url(http://i.sso.sina.com.cn/images/login/lymb_2t_icon.png);background-size:80px 280px;}}", ".layer-mb-promote{position:absolute;border-radius:5px;width:240px;padding:16px 10px 10px;background:hsla(0,0%,0%,.6);color:#fff;}", ".layer-mb-promote .promote-txt{line-height:20px;font-size:14px;}", ".layer-mb-promote .promote-sub{padding-top:30px;overflow:hidden;text-align:center;}", ".layer-mb-promote .promote-sub-cancle,", ".layer-mb-promote .promote-sub-veri{display:inline-block;width:117px;height:28px;border:1px solid #77797d;border-radius:5px;background:#6d7175;color:#fff;line-height:28px;text-decoration:none;}", ".layer-mb-promote .promote-sub-veri{margin-left:2px;border-color:#d65b41;background-color:#bd4329;}"];
        return {get: function() {
                if (typeof cssText !== "string") {
                    cssText = cssText.join("\n")
                }
                return cssText
            }}
    });
    STK.register("comp.layer.outlogin", function($) {
        var $merge = $.core.json.merge, $lang = $.core.util.language, $getSize = $.core.dom.getSize, $append = $.kit.obj.append, $fix = $.kit.dom.fix, $builder = $.kit.dom.builder, $parseDOM = $.kit.dom.parseDOM, $loadStyle = $.kit.dom.loadStyle, $makeReady = $.kit.util.makeReady, $appendStyle = $.kit.dom.appendStyle, $mask = $.module.mask, $sso = $.common.util.sso, $channel_sso = $.common.channel.sso, $defaultStyle = $.comp.defaultStyle, $outlogin = $.comp.login.outlogin;
        var nodes = {};
        var TPL = {layer: ['<div node-type="box" class="layer-mb-login" style="top:100px;display:none;">', '<span  node-type="close" class="lymb-icon lymb-cls"></span>', '<div  class="lymb-thumb"><img src="http://i.sso.sina.com.cn/images/login/thumb_default.gif" node-type="userhead"/></div>', '<div class="lymb-ipt-wrap">', '<div class="ipt-sect ipt-sect-name" node-type="loginname_box">', '<input node-type="loginname" type="text" class="ipt" placeholder="#L{微博帐号/手机号/邮箱}"><span class="lymb-icon text_remove" node-type = "clearName"></span>', "</div>", '<div class="ipt-sect ipt-sect-name ipt-cookie" style="display:none;" node-type = "advanceLoginname_box">', '<input type="text" class="ipt ipt-cookie" node-type="advanceLoginname" readOnly><span class="lymb-icon edit_name" node-type = "changeUser"></span></span>', "</div>", '<div class="ipt-sect  ipt-sect-pass" node-type="password_box">', '<input node-type="password" type="password" class="ipt" placeholder="#L{密码}"><span class="lymb-icon text_remove" node-type = "clearPassword"></span>', "</div>", '<div class="ipt-sect  ipt-sect-vd" node-type="vsn_box">', '<input node-type="vsn" type="text" class="ipt" placeholder="请输入微盾"><span class="lymb-icon text_remove" node-type = "clearVsn"></span>', "</div>", '<div class="ipt-sect  ipt-sect-yz" node-type="door_box">', '<input node-type="door" type="text" class="ipt" placeholder="#L{请输入验证码}"><a href="#" class="lymb-code"><img node-type="door_img" src=""></a>', "</div>", '<div node-type="mobile_box" class="ipt-sect  ipt-sect-yz">', '<input node-type="mobile" type="text" class="ipt" placeholder="点击输入验证码"><a href="#" class="lymb-code-btn" node-type="mobile_Verify">获取验证码</a>', "</div>", '<div node-type="tip" class="lymb-warn">这里会显示任意长度的报错文字</div>', '<a href="#" class="lymb-sub" node-type="submit" suda-uatrack="key=guess_wap_summary&value=login_logclick">登录</a>', "</div>", '<div class="lymb-help" node-type="root">', '<a node-type="forget_password" href="" class="fgtpass">忘记密码？</a>还没有帐号？<a href="" node-type="register_login">立即注册</a>', "</div>", "</div>"].join("")};
        var that = {};
        var _this = {};
        var options = {html: {layer: TPL.layer},sso: {entry: "wapsso"},language: {iframemask: "",E010001: "请输入登录名",E010002: "请输入密码",E010003: "请输入验证码",E010004: "请输入您微盾上显示的动态码",E010005: "网络异常，请检查网络连接",E010006: '如果您忘记了密码请点击：<a href="javascript:;" target="_blank" onclick = "window.SINA_OUTLOGIN_LAYER.forgetPassword()">忘记密码</a>',"4010": '帐号尚未激活，请<a href="https://login.sina.com.cn/signup/signupmail1.php?user=#{loginname}" target="_blank">点此激活</a>',end: ""},styles: {zIndex: "10000"},mask: {enable: true,opacity: 0.5,background: "#000000"},modes: {simple: "sos-pad-login"},plugin: {position: "center",parentNode: null,relatedNode: null,savestate: 365}};
        $.$LANG = options.language;
        that.set = function(type, spec) {
            type = type.toString();
            spec = spec || {};
            var ops = options[type];
            if (ops) {
                ops = $merge(ops, spec);
                options[type] = ops
            }
            if (_this[type] && _this[type].conf) {
                $append(_this[type].conf, ops)
            }
            return that
        };
        that.init = function() {
            _this.prepare();
            return that
        };
        var cssLoaded = false;
        _this.prepareCss = function(fn) {
            if (!_this.cssReady) {
                _this.cssReady = $makeReady({condition: function() {
                        return cssLoaded
                    },ready: function(callback) {
                        $appendStyle($defaultStyle.get());
                        if (options.extra && options.extra.css) {
                            $loadStyle(options.extra.css, {timeout: 10 * 1000,styleCheck: function() {
                                    if ($.isNode(nodes.css_check)) {
                                        var width = $.getStyle(nodes.css_check, "width");
                                        if (width === "123px") {
                                            return true
                                        }
                                    }
                                },onLoad: function() {
                                    cssLoaded = true;
                                    callback()
                                },onTimeout: function() {
                                    _this.cssReady.reset()
                                }})
                        } else {
                            cssLoaded = true;
                            callback()
                        }
                    }})
            }
            _this.cssReady.exec(fn)
        };
        _this.prepare = function(fn) {
            $.Ready(function() {
                _this.parseDom();
                _this.prepareCss(function() {
                    _this.build();
                    if ($.getType(fn) === "function") {
                        fn()
                    }
                })
            })
        };
        _this.setSSO = function() {
            _this.setListener("add")
        };
        _this.build = function() {
            if (_this.plugin) {
                return
            }
            _this.setSSO();
            _this.parseDom();
            $.setStyle(nodes.box, "display", "");
            if (options.mask.enable) {
                that.nodes.mask = _this.mask = $mask.showUnderNode(nodes.box, options.mask);
                $.setStyle(_this.mask.getNode(), "display", "none");
                $.addEvent(document.getElementById("ST_outLogin_mask"), "touchmove", function(e) {
                    e.preventDefault()
                })
            }
            _this.plugin = $outlogin(nodes.box);
            options.plugin.entry = options.sso.entry;
            _this.plugin.setOptions(options.plugin);
            _this.plugin.init();
            $.setStyle(nodes.box, "display", "none");
            _this.setEvents("add");
            $channel_sso.fire("layer_ready")
        };
        _this.insert = function() {
            if (!$.isNode(nodes.box)) {
                return
            }
            var parentNode = options.plugin.parentNode;
            if (!$.isNode(parentNode)) {
                parentNode = document.body
            }
            if (!$.isNode(nodes.box.parentNode) || parentNode !== _this._currentParentNode) {
                parentNode.appendChild(nodes.box)
            }
            _this._currentParentNode = parentNode
        };
        _this.parseDom = function() {
            if (!$.isNode(nodes.box)) {
                var html = $lang(options.html.layer, options.language);
                var dom = $builder(html);
                that.nodes = nodes = $parseDOM(dom.list);
                nodes.box = dom.box;
                _this.insert()
            }
        };
        _this.updateLayer = function() {
            _this.insert();
            $.foreach(options.styles, function(val, key) {
                $.setStyle(nodes.box, key, val)
            })
        };
        _this.setPosition = function() {
            var position = options.plugin.position, boxSize = $getSize(nodes.box), relatedNode, arr, rPos, rSize, winSize;
            if (position === "center") {
                if (!_this.fixedLayer) {
                    _this.fixedLayer = $fix(nodes.box, "c")
                } else {
                    _this.fixedLayer.setFixed(true)
                }
            } else {
                if (_this.fixedLayer) {
                    _this.fixedLayer.destroy();
                    _this.fixedLayer = null
                }
                if (position === "custom") {
                    $.setStyle(nodes.box, "position", "absolute")
                } else {
                    $.setStyle(nodes.box, "position", "absolute");
                    relatedNode = options.plugin.relatedNode;
                    if (relatedNode) {
                        rPos = $.position(relatedNode);
                        rSize = $getSize(relatedNode)
                    }
                    arr = position.split(/\s*[,，]\s*/gi);
                    $.foreach(arr, function(prop) {
                        if (rPos && rSize) {
                            switch (prop) {
                                case "top":
                                    $.setStyle(nodes.box, "top", rPos.t + "px");
                                    break;
                                case "bottom":
                                    $.setStyle(nodes.box, "top", rPos.t + rSize.height - boxSize.height + "px");
                                    break;
                                case "left":
                                    $.setStyle(nodes.box, "left", rPos.l + "px");
                                    break;
                                case "right":
                                    $.setStyle(nodes.box, "left", rPos.l + rSize.width - boxSize.width + "px");
                                    break;
                                default:
                                    break
                            }
                        } else {
                            $.setStyle(nodes.box, prop, "0px")
                        }
                    })
                }
            }
            if (nodes.iframemask) {
                var borderWidth = $.getStyle(nodes.box, "borderWidth");
                borderWidth = parseInt(borderWidth, 10);
                $.setStyle(nodes.iframemask, "width", boxSize.width + "px");
                $.setStyle(nodes.iframemask, "height", boxSize.height + "px");
                $.setStyle(nodes.iframemask, "marginLeft", 0 - borderWidth + "px");
                $.setStyle(nodes.iframemask, "marginTop", 0 - borderWidth + "px")
            }
        };
        that.reset = function() {
            if (_this.plugin) {
                _this.plugin.reset()
            }
        };
        _this.onLogin = function() {
            that.hide()
        };
        _this.onClose = function() {
            $outlogin.loginFailureNum = 0;
            that.hide()
        };
        _this.onLogout = function() {
        };
        _this.setEvents = function(type) {
            var action = type === "add" ? "addEvent" : "removeEvent";
            $[action](nodes.close, "click", _this.onClose);
            $[action](window, "unload", that.destroy)
        };
        _this.setListener = function(type) {
            var action = type === "add" ? "register" : "remove";
            $channel_sso[action]("login_success", _this.onLogin);
            $channel_sso[action]("logout_success", _this.onLogout)
        };
        that.forgetPassword = function() {
            _this.plugin.forgetPassword()
        };
        that.isDisplay = function() {
            return nodes.box ? $.getStyle(nodes.box, "display") !== "none" : false
        };
        that.isVisible = function() {
            return nodes.box ? !!nodes.box.offsetWidth : false
        };
        that.show = function() {
            try {
                $.preventDefault()
            } catch (e) {
            }
            _this.prepare(function() {
                var isDisplay = that.isDisplay();
                var isVisible = that.isVisible();
                if (!isDisplay) {
                    if (_this.mask) {
                        $.setStyle(_this.mask.getNode(), "display", "")
                    }
                    if (nodes.box) {
                        $.setStyle(nodes.box, "display", "");
                        that.reset()
                    }
                }
                _this.updateLayer();
                _this.setPosition();
                if (!isVisible) {
                    if (_this.plugin) {
                        _this.plugin.advanceLogin();
                        _this.plugin.showClearButton()
                    }
                }
                if (!isDisplay) {
                    $channel_sso.fire("layer_show")
                }
            });
            return that
        };
        that.hide = function() {
            try {
                $.preventDefault()
            } catch (e) {
            }
            that.reset();
            if (_this.mask) {
                $.setStyle(_this.mask.getNode(), "display", "none")
            }
            if (nodes.box) {
                $.setStyle(nodes.box, "display", "none")
            }
            $channel_sso.fire("layer_hide");
            return that
        };
        var parseQueryToJson = function(str) {
            var arr = str.split("&");
            var arrtmp;
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                arrtmp = arr[i].split("=");
                obj[arrtmp[0]] = decodeURIComponent(arrtmp[1]) || ""
            }
            return obj
        };
        that.destroy = function() {
            that.hide();
            _this.setEvents("remove");
            _this.setListener("remove");
            if (that.loginButton) {
                $.removeEvent(that.loginButton, "click", that.show);
                that.loginButton = null
            }
            $.foreach(["mask", "SSO", "plugin"], function(name) {
                var obj = _this[name];
                if (obj && typeof (obj.destroy) === "function") {
                    try {
                        obj.destroy()
                    } catch (e) {
                    }
                }
            })
        };
        that.register = function(channel, fn) {
            $channel_sso.register(channel, fn);
            return that
        };
        that.remove = function(channel, fn) {
            $channel_sso.remove(channel, fn);
            return that
        };
        that.getNodes = function() {
            return nodes
        };
        that.nodes = nodes;
        that.options = options;
        return that
    });
    (function($) {
        var $ns = $.comp.layer.outlogin;
        $ns.getVersion = function() {
            return "1.0.0"
        };
        $ns.listener = $.common.channel.sso;
        $ns.STK = STK;
        this.SINA_OUTLOGIN_LAYER = $ns
    }).call(this, STK)
}).call(this);
