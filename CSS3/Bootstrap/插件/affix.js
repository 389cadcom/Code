;function($){
	var Affix = function(){};				//������
	Affix.DEFAULTS = {}						//Ĭ�ϲ���
	Affix.prototype = {}					//ԭ�ͷ���
	
	$.fn.affix = function(){}				//��jQuery������ӷ���
	$.fn.affix.Constructor = Affix;			//���ù���������
	$.fn.affix.noConflict = function(){
		
	}

	$(window).on('load', function(){})		//��ʼ��CSS���÷�ʽ

}(window.jQuery)