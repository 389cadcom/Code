;function($){
	'use strict'
	/*
		2.�������༰���ԭ�ͷ���
		3.��jQuery�϶����������ò������������
		4.����ͻ����
		5.��ʼ��--�󶨴����¼�
	*/
}(jQuery)
1.transition.js
	fade in

2.modal.js
	data-toggle="modal"	data-target=""	data-backdrop="false"	data-keyboard="true"|tabindex="-1"
	data-dismiss="modal"
	modal	modal-dialog	modal-content	modal-header|modal-title	modal-body	modal-footer
//eg:  $('.modal').modal();

3.dropdown.js
	data-toggle="dropdown"
	dropdown|dropup		button-group	input-group
		dropdown-toggle		dropdown-menu |li|a
//eg:  $('.dropdown-toggle').dropdown();

4.tab.js
	data-toggle="tab"	data-toggle="pill"	data-target="#ID"
	tab-pane fade in active
//eg:  $(this).tab();

5.tooltip.js		//JS����
	data-toggle="tooltip"	data-placement="left" 
	title, selector, trigger, content, delay, container
6.popover.js
	data-toggle="popover"

//eg:
$("[data-toggle='tooltip']").tooltip({
	placement: 'right',
	title:''
})

7.alert
	data-dismiss="alert"
	alert alert-info  close

8.button
	toggle, reset, loading, complete
	data-loading-text="loading..."  data-complete-text=""
//eg:
$(".btn").click(function(){
	$(this).button('loading').delay(1000).queue(function() {
		$(this).button('reset');
	});        
});

9.collapse.js
	data-toggle="collapse"	data-target="" data-parent="accordion"
	.collspse in
	.panel-collapse in
	.navbar-collapse.collapse

10.carousel.js
	carousel slide
		carousel-indicators
			data-slide-to=""	//index
		carousel-inner
			item active
				carousel-caption
		carousel-control left
		carousel-control right	
			data-slide="prev"  href="#myCarousel"
//eg: pause, prev, next, index|0 1 2, cycle
$('.carousel').carousel({
	interval: 5000,
	pause: 'hover',
	wrap: true
})

11.scrollspy.js
	data-spy="scroll"  data-target="" (.nav li>a)	data-offset="10"


12.affix.js
	data-spy="scroll"				//body
	data-spy="affix"				//nav

$('body').scrollspy({
	target: '#myScroll'
});

$("#sidebar").affix({
	offset: {
		top:100
	}
})