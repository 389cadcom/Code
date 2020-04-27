vue-meta						//标题
Vue-Lazyload.js			//图片懒加载
vue-scroller				//滚动加载
vuex-persistedstate	//数据持久缓存


better-normal-scroll



//打包样式优先级(看先后引入)  base.css要早于 App中定义的样式
import Vue from 'vue'
import '@/assets/base.css'     

import App from './App'



//自动注册全局组件
const requireComponent = require.context('./components', false, /\.vue$/)

requireComponent.keys().forEach( fileName => {
  var component = requireComponent(fileName)
  var componentName = fileName.replace(/^\.\//, '').replace('.vue', '')
  console.log(componentName, component.default);

	Vue.component(componentName, componentConfig.default || componentConfig)
})

	
//懒加载
Vue.use(VueLazyload, {
	error: '',
	loading: '',
	preLoad: 1,
	attempt: 1
})

<img v-lazy='item.img'