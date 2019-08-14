1.methods, watcher, computed

2.Vue.mixin, Vue.extend, components, install--Vue.use



//ios虚拟键盘没有恢复
var inputs = [...document.querySelectorAll('input'), ...document.querySelectorAll('textarea'), ]
inputs.forEach( input => {
  input.addEventListener('blur', e => {
    setTimeout(() => {
      document.activeElement.scrollIntoViewIfNeeded(true);
      document.body.scrollTop = document.body.scrollTop;
      console.log('blur')
    }, 100)
  });
})



//加载更多

//可滚动容器的高度
let innerHeight = document.querySelector('#app').clientHeight;
//屏幕尺寸高度
let outerHeight = document.documentElement.clientHeight;
//可滚动容器超出当前窗口显示范围的高度
let scrollTop = document.documentElement.scrollTop;
if (innerHeight < (outerHeight + scrollTop)) {
    //加载更多操作
    console.log("loadmore");
}