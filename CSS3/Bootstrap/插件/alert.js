;function($){
	var dismiss = '[data-dismiss]="alert"';		//�Զ�������
	var Alert	= function(el){					//����Ԫ�أ�����ڲ��ж���data-dismiss����click�¼�����ԭ����close����
		$(el).on('click', dismiss, this.close); 
	} 
	Alert.prototype.close = function(){			//��������ԭ��
		//�رվ������Ҫ����

	}

	var old = $.fn.alert

	$.fn.alert			   = function(options){//jQueryԭ����������巽��
		return this.each(function(){
			
		})
	};				
	$.fn.alert.Constructor = Alert				//��д����������
	$.fn.alert.noConflict  = fn					//����ͻ����
	$(document).on('close.bs.alert.data-api',	//��ʼ���󶨴����¼�(data-api)
		dismiss, 
		Alert.prototype.close);				
	})
}(jQuery);

/*
���¼���������Ϊ����jQuery����չfn

1.������ִ�к���
2.��������(��Ĭ��ֵ)�����ԭ�ͷ�������: Alert.prototype.close
3.��jQuery�϶����������������캯�����磺$.fn.alert.Constructor = Alert;
4.����ͻ�����磺$.fn.alert.noConflict
5.��ʼ��--�󶨴����¼�(data-api)���磺
	$(document).on('close.bs.alert.data-api', '[data-dismiss]="alert"', 
		Alert.prototype.close
	)

��������ר��ΪJS���봥���¼�׼��
���岽��Ϊ����ʽHTML�����¼�
*/