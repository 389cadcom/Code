(function(window,factory){
    if(typeof exports === 'object'){
        module.exports = factory(require('jquery'));
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