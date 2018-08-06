//标签block, template
view, scroll-view, color-view, swiper
icon,  text, rich-text, 
button, checkbox, radio, switch, form, input, label, textarea

image, audio, video, camera, canvas
picker, picker-view, slider, progress


//样式 rpx

//逻辑
wx:if, wx:elif, wx:else, wx:for -->index, item(重命名：wx:for-index="idx" wx:for-item="itemName")
三目: {{flag ? true : false}}



//事件bind冒泡, catch 阻止冒泡bindtap, bind:tap
touch系列
tap, longtap

transitioned, 
animationstart, animationiteration, animationend


//生命周期 App({}), Page({})
onLaunch, onShow, onHide, onError

onLoad, onShow, onReady, onHide, onUnload, onPullDownRefresh


//微信api
wx.request

wx.getLocation()
wx.scanCode