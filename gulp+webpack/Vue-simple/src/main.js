import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Edit from './components/Edit.vue'
import About from './components/About.vue'
import AMap from './components/AMap.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

import './assets/css/reset.css'

var router = new VueRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/edit', component: Edit },
		{ path: '/about', component: About },
		{ path: '/amap', component: AMap },
	]
})

new Vue({
	// el: '#app',
	router,
	render: h => h(App)
}).$mount('#root')
