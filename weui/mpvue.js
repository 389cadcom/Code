//��ǩblock, template
view, scroll-view, color-view, swiper
icon,  text, rich-text, 
button, checkbox, radio, switch, form, input, label, textarea

image, audio, video, camera, canvas
picker, picker-view, slider, progress


//��ʽ rpx

//�߼�
wx:if, wx:elif, wx:else, wx:for -->index, item(��������wx:for-index="idx" wx:for-item="itemName" wx:key="")
��Ŀ: {{flag ? true : false}}



//�¼�bindð��--bindtap, bind:tap, catch ��ֹð��--catchtap, catch:tap  @click.stop=""
touchϵ��
tap, longtap

transitioned, 
animationstart, animationiteration, animationend


//�������� App({}), Page({})
onLaunch, onShow, onHide, onError								//Ӧ����������

onLoad, onShow, onReady, onHide, onUnload, onPullDownRefresh			//ҳ����������

//����
wx.setNavigationBarTitle
navigateTo, navigateBack, redirectTo

//bindinput:	���ݰ�
inputHandler(e){
	this.setData({
		val: e.detail.value
	})
}

//���� e.currentTarget,dataset.id



//΢��api
wx.request

wx.getUserInfo()
wx.getLocation()
wx.scanCode