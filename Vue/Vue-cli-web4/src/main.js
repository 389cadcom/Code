import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

console.log('mode:' + process.env.NODE_ENV)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
