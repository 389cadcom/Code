import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

/* import Home from '@/pages/Home.vue';
import Edit from '@/pages/Edit.vue';
import About from '@/pages/About.vue';
import Me from '@/pages/Me.vue'; */

const Home  = () => import(/* webpackChunkName: "bundler" */'@/pages/Home.vue')
const Edit  = () => import(/* webpackChunkName: "bundler" */'@/pages/Edit.vue')
const About = () => import(/* webpackChunkName: "bundler" */'@/pages/About.vue')
const Me    = () => import(/* webpackChunkName: "bundler" */'@/pages/Me.vue')

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/home',
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
			path: '/me',
			name: 'me',
			component: Me
		},
	]
});
