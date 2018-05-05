import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Edit from './components/Edit.vue'
import About from './components/About.vue'
Vue.use(VueRouter)

import './assets/css/style.css'

var router = new VueRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/edit', component: Edit },
		{ path: '/about', component: About }
	]
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
}).$mount('#root')
