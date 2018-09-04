/*
	Block(块) Element(双下划线)	Modify(单下划线) class (inpu-box 中横杠--链词符)
	cell 
		元素: cell__hd  cell__bd  cell__ft  cells__title  cells__tips
		属性: cell_primay	cell_access cell_link cell_switch cell_vcode
		类名: vcode  vcode-img
*/
//表单 btn, input, cell, slider, uploader, progress
cells__form  cells_radio  cells_checkbox
	check__label(cell)  cehck  icon-checked
	cell_vcode					vcode-btn  vcode-img
	cell_switch					weui-switch
			input, textarea | textarea-counter, select

	cell_select cell_select-before cell_select-after
	agree 
		agree__checkbox  agree__text
	btn-area

slider
	slider__inner		slier__track  slider__handler

progress
	progress__bar		progress__inner-bar
	progress__opr

uploader
	uploader__hd	uploader__title  uploader__info
	uploader__bd	
	    uploader__files  uploader__file		__file_status  __file-content
			uploader__input-box upload__input

//基本组件 atricle, badge, flex, footer, grid, icon, panel
//				 gallery, preview, loadmore


panel
	panel__hd	
	panel__bd
		media-box media-box_text media-box_appmsg		//大图、文本
			media-box__hd	
			media-box__bd media-box__title media-box__desc
		media-box media-box_small-appmsg						//小图
			cells cell	cell__hd cell__bd
	panel__ft
		cell cell_access cell_link


footer
	footer__links footer__link 
	footer__text

//bar
search-bar
	search-bar__form
		search-bar__box		search-bar__input	//icon-search
		search-bar__label										//icon-search
	search-bar__cancel-btn
cells searchbar-result

tabbar
	tabbar__item  tabbar__icon  tabbar__label
navbar
	navbar__item navbar__item_on

//操作相关 mask action, dialog, msg, picker, toast
msg
	msg__icon-area  
	msg__text-area  
		msg__title
		msg__desc
	msg__opr-area
	msg__extra-area   //min-height:418

toast
	icon_toast icon-no-success
	toast__content

dialog	skin_android
	dialog__hd  dialog__bd	
	dialog__ft
		dialog__title
		dialog__btn	dialog__btn_default	| primay
	
actionsheet actionsheet_toggle
	actionsheet__title	title-text
	actionsheet__menu		actionsheet__menu__cell
	actionsheet__action actionsheet__menu__cell

picker animate-slide-up
	picker__hd	picker__action
	picker__bd
		picker__group  
			picker__mask	picker__indicator
			picker__content  picker__item



/**
.box__bd{
  flex: 1;
  /*min-width: 0;*/
}

.title{
  /*overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;*/
  
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

*/