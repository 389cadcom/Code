/* (function($){
    $.fn.green = function () {
        $(this).each(function(){
            $(this).css('color', 'green');
        })
    }
})(jQuery)
 */
//UMD模块方案
(function (window, factory) {
    if(typeof exports == 'object'){
        module.exports = factory(require('jquery'))
    }else if(typeof define == 'define' && define.adm){
        define(['jquery'], factory);
    }else{
        factor();
    }
})(window, function($){
    $.fn.green = function () {
        $(this).each(function(){
            $(this).css('color', 'green');
        })
    }
})
