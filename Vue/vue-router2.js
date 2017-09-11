/*
 1.路由配置				routes: []
 2.嵌套路由				children: []
 3.动态路由				path: 'user/:id'
 4.具名路由和视图		name:'home' 
 5.编程式导航			this.$route.push(), this.$route.replace()
 6.重定向和别名			redirect: '/'  redirect:{name: ''}   alias: '/index'
 7.滚动行为				scrollBehavior
 8.懒加载				{ path:'', component: resolve=>require(['./index.vue']), resolve }
*/
//routes:
{path: '', name:'', redirect:'', alias:'', meta:{checkAuth:}, component: Home, components: { default:Home, b:Edit } }  

//links
:to = { path:'', name:'',  params:{id:12}, query:{args:123}, replace, append:true }
router.push({ name:'home', query: {} })


//路由匹配
{ path:'/params/:id' }
{ path:'/params/:id(\\d+)' }
{ path:'/params/*' }
{ path:'/params/:id?' }
{ path:'/params/(foo/)?/bar' }


{ path: '/a', redirect: to => {  return '重定向的 字符串路径/路径对象' } }

/**
route对象
   $route.name
   $route.params
   $route.query
   $route.path
   $route.fullPath
   $route.hash
   $route.meta
   $route.matched

   //router-link
   to  = {path: '', append:true, activeClass: 'active'}  
   :to = {path: '/detail/' + this.$route.params.id}
*/

<router-link tag="li" to="/"><a>Home</a></router-link>
<router-link tag="li" :to="{path:'/'}"><a>Home</a></router-link>

//路由切换侦听
watch: {
  '$route': 'fetchData'
},


new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
})


//运行时构建
new Vue({
  el: '#app',
  router: router,
  render: h=>h('router-view')
})

//动态生成的路由
var routes = [];
markPages.forEach(page => {
    routes.push({
	    path: '/mark/' + page.sid,
		compnent:{
			extends: MarkeComponent
		    data: function () {
				return { page: page }
		    }
		}
	})
})

/* 命名路由视图 */
var router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [
		{ path: '/index', component: index },
		{ path: '/index', 
		  components: {
			default: nav,
			a: main
		} },
	]
})


//路由全局钩子
beforeEach, afterEach

//单个路由独享钩子
beforeEnter, afterEnter

//组件内钩子
beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave



//router配置:
mode,
base,
linkActiveClass,
scrollBehavior,


//router实例：
router.app
router.mode					//hash | history | abstract
router.currentRoute
router.beforeEach()
router.push()
router.replace()			//<router-link :to="..." replace>
router.go()
router.back()
router.forward()


/*http://www.cnblogs.com/faith3/p/6224235.html*/
//路由导航钩子					
beforeEach()
afterEach()

//单个路由独享的钩子
beforeEnter()						//canActivate
afterEnter()

//组件内钩子
	- beforeRouteEnter				//activate
    - beforeRouteUpdate
    - beforeRouteLeave				//canActivate


//TODO 组件生命周期钩子函数
beforeCreate,						//beforeCompile, init
created

beforeMount,
mounted								//compiled, attached, ready

beforeUpdate
updated

beforeDestory,
destoryed							//deactivate


//组件生命周期钩子
vue 1.0+					vue 2.0					Description
init						beforeCreate	        组件实例刚被创建，组件属性计算之前，如 data 属性等
created						created	                组件实例创建完成，属性已绑定，但 DOM 还未生成，$el 属性还不存在
beforeCompile				beforeMount	            模板编译/挂载之前
compiled					mounted	                模板编译/挂载之后
ready						mounted	                模板编译/挂载之后（不保证组件已在 document 中）
-							beforeUpdate	        组件更新之前
-							updated	                组件更新之后
-							activated	            for keep-alive，组件被激活时调用
-							deactivated	            for keep-alive，组件被移除时调用
attached					-	                    不用了还说啥哪...
detached					-	                    那就不说了吧...
beforeDestory				beforeDestory	        组件销毁前调用
destoryed					destoryed	            组件销毁后调用



activate & deactivate：		使用组件自身的 lifecycle hook 替代
data：						通过组件 watch 属性来监听当前路由 $route 的变化
canActivate：				由路由属性 beforeEnter 来代替
canDeactivate：				由路由属性 beforeRouteLeave 来代替
canReuse：					去除


