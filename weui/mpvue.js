//标签block, template
view, scroll-view, color-view, swiper
icon,  text, rich-text, 
button, checkbox, radio, switch, form, input, label, textarea

image, audio, video, camera, canvas
picker, picker-view, slider, progress


//样式 rpx

//逻辑
wx:if, wx:elif, wx:else, wx:for -->index, item(重命名：wx:for-index="idx" wx:for-item="itemName" wx:key="")
三目: {{flag ? true : false}}



//事件bind冒泡--bindtap, bind:tap, catch 阻止冒泡--catchtap, catch:tap  @click.stop=""
touch系列
tap, longtap

transitioned, 
animationstart, animationiteration, animationend


//生命周期 App({}), Page({})
onLaunch, onShow, onHide, onError								//应用生命周期

onLoad, onShow, onReady, onHide, onUnload, onPullDownRefresh			//页面生命周期

//方法
wx.setNavigationBarTitle
navigateTo, navigateBack, redirectTo

//bindinput:	数据绑定
inputHandler(e){
	this.setData({
		val: e.detail.value
	})
}

//传参 e.currentTarget,dataset.id



//微信api
wx.request

wx.getUserInfo()
wx.getLocation()
wx.scanCode