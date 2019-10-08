import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import * as filters from '@/utils/filters'   // 全局过滤器
import './plugin'    // 引入操作集合
import './assets/css/index.less'  // 样式集合
Vue.config.productionTip = false

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//自动注册全局组件
const requireComponent = require.context('./components', false, /\.vue$/)
requireComponent.keys().forEach( fileName => {
  var componentConfig = requireComponent(fileName)												  //componentConfig.default.name	
  var componentName = fileName.replace(/^\.\/|\.vue/g, '')									//当前路径与文件扩展后缀名

  Vue.component(componentName, componentConfig.default || componentConfig)
})

//自动注册Vuex
const requireModule = require.context('./modules', false, /\.js$/)
const modules = {}
requireModule.keys().forEach( fileName => {
	var moduleName = fileName.replace(/^\.\/|\.js$/, '')
		modules[moduleName] = {
			namespaced: true,
			...requireModule[moduleName].default
	  }
})



// 非父子组件传值--中央事件总线  this.$root.$emit()  $on()   
//注：<keep-alive v-if="!$route.meta.keepAlive"> 执行beforeDestroy生命周期, this.$bus.$off('name')
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')