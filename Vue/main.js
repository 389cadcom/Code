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

// 非父子组件传值公交车
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')