import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import routerConfig from './router/router.config'

Vue.use(VueRouter);

let router = new VueRouter({
    routes: routerConfig
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

