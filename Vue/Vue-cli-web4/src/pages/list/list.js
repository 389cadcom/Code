import Vue from 'vue'
import App from './list.vue'

import '@/assets/base.css'
import '@/assets/common.scss'

Vue.config.productionTip = false

console.log('mode:' + process.env.NODE_ENV)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
