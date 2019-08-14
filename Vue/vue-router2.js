// router key组件刷新 -- 
/lists/a,  /lists/b 数据没有更新 vue-router"智能地"发现这是同一个组件，然后它就决定要复用这个组件

解决方案一：监听$route的变化来初始化数据 this.id != this.$route.params.id
解决方案二：给router-view添加一个唯一的key，这样即使是公用组件，只要url变化了，就一定会重新创建这个组件
				<router-view :key="$route.fullpath"></router-view>
/*
注：一般应用在子路由里面，这样才可以不避免大量重绘, app.vue根目录添加这个属性，那么每次点击改变地址都会重绘
*/


/*
 VueRouter: router  router.beforeEach()   this.$router.push() 

 watch:{
	'$route'(to, from){}
 }  
 this.$route: { path name params query meta fullPath }



 1.配置						routes: []
 2.嵌套路由				children: []
 3.动态路由				path: 'user/:id'
 4.命名路由				name:'home'														 <router-view></router-view>
 5.命名视图				components: { default:Home, b:Edit }   <router-view name=""></router-view>
 6.编程式导航			this.$route.push(), this.$route.replace()
 7.重定向和别名			redirect: '/'  redirect:{name: ''}   alias: '/index'
 8.滚动行为				scrollBehavior
 9.懒加载				{ path:'', component: resolve=>require(['./index.vue']), resolve }
*/
//routes: options参数 props
{path: '/', name:'', redirect:'', alias:'', meta:{checkAuth:}, component: Home |  components: { default:Home, b:Edit } }  


router-link属性  :to, tag, active-class, replace, append, exact

<router-link tag="li" to="/home#hash" replace><a>Home</a></router-link>
<router-link tag="li" :to="{path:'/'}"><a>Home</a></router-link>

<router-link :to="{ path: '/abc'}" replace append></router-link>

:to = { path:'', name:'', activeClass: 'active',  params:{id:12}, query:{args:123}}
:to = { name: '',  params:{id:12, uid: 1}}


this.$router.push('home')																						// 字符串
this.$router.push({ path: 'home' })																	// 对象
this.$router.push({ name: 'user', params: { userId: 123 }})					// 命名的路由,动态参数
this.$router.push({ path: 'register', query: { plan: 'private' }})	// 带查询参数 


//路由匹配
{ path:'/params/:id' }
{ path:'/params/:id(\\d+)' }
{ path:'/params/*' }
{ path:'/params/:id?' }
{ path:'/params/(foo/)?/bar' }


{ path: '/a', redirect: to => {  return '重定向的 字符串路径/路径对象' } }

/**
$route对象
   $route.name					名称
   $route.params				参数 user/:name
   $route.query					查找条件  query:{arg:123}
   $route.path					路径
   $route.fullPath
   $route.hash
   $route.meta					元信息
   $route.matched

   //router-link
   to  = {path: '', append:true, activeClass: 'active'}  
   :to = {path: '/detail/' + this.$route.params.id}
'$route'(to, from)


$router实例
this.$router.push('/')
this.$router.replace('/home')
this.$router.go(-1)

*/
vue传参方式有：query、params+动态路由传参


// replace跳转处理
'$route'(to, from) {
	if(to.path == '/' && from.path == '/me/shangbao'){
		this.$router.push('/city');
	}
}

'$route':{
	handler: 'getCartList',
	immediate: true
},
getCartList(to, from){}


//路由回退、切换问题处理
1.
addAddress(){
	this.$router.replace('/me/address-add')
}
2.
watch: {
	//TODO 路由回退问题   keep-alive
	'$route'(to, from) {
		if(to.path == '/me' && from.path == '/me/address-add'){
			this.$router.push('/me/address');
		}
	}
}
3.
save(){
	vm.$router.replace('/me/address');
}

//路由钩子执行vm
beforeRouteEnter (to, from, next) {		//beforeRouteUpdate, beforeRouteLeave
  next(vm => {
    // 通过 `vm` 访问组件实例
  })

  //next(false)
}


//登录token验证
router.beforeEach((to, from, next)=>{		
	let isLogin = localStorage.getItem('token') ? true : false
	if(to.path == '/'){
		next()
	}else{
		isLogin ? next() : next('/login')
	}

	if(to.meta.title){
			document.title = to.meta.title
	}
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
		{ path: '/index', component: index, props: {name: 'message'} },
		{ path: '/index', 
		  components: {
				default: nav,
				a: main
		} },
	]
})

//router配置:
mode,								//window.addEventListener('hashchange', fn)
base,
linkActiveClass,
scrollBehavior,			//to, from, savedPosition

//scrollBehavior
if(savedPosition){
	return savedPosition;
}else{
	if(to.hash){
		return { selector: to.hash};

		if (to.hash === '#anchor2') {
			return { offset: { y: -5} }			//偏移坐标
		}
	}
	if (to.matched.some(record => record.meta.scrollToTop)) {
		return {x:0, y:100 }
	}
}


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
beforeEnter()						
afterEnter()

//组件内钩子
beforeRouteEnter			
beforeRouteUpdate
beforeRouteLeave			


//TODO 组件生命周期钩子函数
beforeCreate,						
created

beforeMount,
mounted								  

beforeUpdate
updated

beforeDestory,
destoryed							



//获取 wxconfig 配置
let url = location.href.split('#')[0]
http.get('weixin/config',{
	params:{
			url: encodeURIComponent(url)
	}
}).then(res=>{
	wx.config({
			beta: true,														// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
			debug: false,                       // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.appId,           // 必填，企业微信的corpID
			timestamp: res.data.timestamp,  // 必填，生成签名的时间戳
			nonceStr: res.data.nonceStr,   // 必填，生成签名的随机串
			signature: res.data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
			jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
	})
	// 检测微信
	wx.error(function(res){
			//  config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			console.log('错误信息====',res)
	})
})


// 添加百度统计 先判断是生产环境还是开发环境 如果是开发环境 不用添加
if (process.env.NODE_ENV !== 'development') {
	let _hmt = _hmt || [];
	window._hmt = _hmt;  // 必须把_hmt挂载到window下，否则找不到
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?yourappid";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})()
}

// 添加百度统计代码 先判断是生产环境还是开发环境
router.beforeEach(to, from, next){
	if (process.env.NODE_ENV !== 'development') {
		// 添加页面统计
		if (_hmt) {
				if (to.path) {
						_hmt.push(['_trackPageview', '/#' + to.fullPath]);
				}
		}
	}
}