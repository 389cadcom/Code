;function($){
	var Affix = function(){};				//构造器
	Affix.DEFAULTS = {}						//默认参数
	Affix.prototype = {}					//原型方法
	
	$.fn.affix = function(){}				//在jQuery对象添加方法
	$.fn.affix.Constructor = Affix;			//重置构造器名称
	$.fn.affix.noConflict = function(){
		
	}

	$(window).on('load', function(){})		//初始化CSS设置方式

}(window.jQuery)