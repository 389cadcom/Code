webpackJsonp([1],{

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const common = function (param) {
    console.log(param);
}
/* harmony export (immutable) */ __webpack_exports__["a"] = common;


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

(function(window,factory){
    if(true){
        module.exports = factory(__webpack_require__(1));
    }else if(typeof define === 'function' && define.amd){
        define(['jquery'],factory);
    }else{
        factor();
    }
})(window,function($){
    $.fn.green = function(){
        console.log("$.fn.green");
        $(this).each(function(){
            $(this).css('color','red');
        });
    }
});

/***/ })

});