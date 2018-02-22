;function($){
	var dismiss = '[data-dismiss]="alert"';		//自定义属性
	var Alert	= function(el){					//传入元素，如果内部有定义data-dismiss，则click事件触发原型上close方法
		$(el).on('click', dismiss, this.close); 
	} 
	Alert.prototype.close = function(){			//构造器的原型
		//关闭警告框主要代码

	}

	var old = $.fn.alert

	$.fn.alert			   = function(options){//jQuery原型添加自义义方法
		return this.each(function(){
			
		})
	};				
	$.fn.alert.Constructor = Alert				//重写构造器名称
	$.fn.alert.noConflict  = fn					//防冲突处理
	$(document).on('close.bs.alert.data-api',	//初始化绑定触发事件(data-api)
		dismiss, 
		Alert.prototype.close);				
	})
}(jQuery);

/*
绑定事件，触发行为，在jQuery上扩展fn

1.声明自执行函数
2.定义插件类(类默认值)及相关原型方法，如: Alert.prototype.close
3.在jQuery上定义插件并重设插件构造函数，如：$.fn.alert.Constructor = Alert;
4.防冲突处理，如：$.fn.alert.noConflict
5.初始化--绑定触发事件(data-api)，如：
	$(document).on('close.bs.alert.data-api', '[data-dismiss]="alert"', 
		Alert.prototype.close
	)

第三步：专门为JS代码触发事件准备
第五步：为声明式HTML触发事件
*/