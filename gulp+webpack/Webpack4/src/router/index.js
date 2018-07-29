import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Edit from '@/views/Edit'
import About from '@/views/About'
import Store  from '@/views/Store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: Store
    },
  ]
})
