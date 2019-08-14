// router key���ˢ�� -- 
/lists/a,  /lists/b ����û�и��� vue-router"���ܵ�"��������ͬһ�������Ȼ�����;���Ҫ����������

�������һ������$route�ı仯����ʼ������ this.id != this.$route.params.id
�������������router-view���һ��Ψһ��key��������ʹ�ǹ��������ֻҪurl�仯�ˣ���һ�������´���������
				<router-view :key="$route.fullpath"></router-view>
/*
ע��һ��Ӧ������·�����棬�����ſ��Բ���������ػ�, app.vue��Ŀ¼���������ԣ���ôÿ�ε���ı��ַ�����ػ�
*/


/*
 VueRouter: router  router.beforeEach()   this.$router.push() 

 watch:{
	'$route'(to, from){}
 }  
 this.$route: { path name params query meta fullPath }



 1.����						routes: []
 2.Ƕ��·��				children: []
 3.��̬·��				path: 'user/:id'
 4.����·��				name:'home'														 <router-view></router-view>
 5.������ͼ				components: { default:Home, b:Edit }   <router-view name=""></router-view>
 6.���ʽ����			this.$route.push(), this.$route.replace()
 7.�ض���ͱ���			redirect: '/'  redirect:{name: ''}   alias: '/index'
 8.������Ϊ				scrollBehavior
 9.������				{ path:'', component: resolve=>require(['./index.vue']), resolve }
*/
//routes: options���� props
{path: '/', name:'', redirect:'', alias:'', meta:{checkAuth:}, component: Home |  components: { default:Home, b:Edit } }  


router-link����  :to, tag, active-class, replace, append, exact

<router-link tag="li" to="/home#hash" replace><a>Home</a></router-link>
<router-link tag="li" :to="{path:'/'}"><a>Home</a></router-link>

<router-link :to="{ path: '/abc'}" replace append></router-link>

:to = { path:'', name:'', activeClass: 'active',  params:{id:12}, query:{args:123}}
:to = { name: '',  params:{id:12, uid: 1}}


this.$router.push('home')																						// �ַ���
this.$router.push({ path: 'home' })																	// ����
this.$router.push({ name: 'user', params: { userId: 123 }})					// ������·��,��̬����
this.$router.push({ path: 'register', query: { plan: 'private' }})	// ����ѯ���� 


//·��ƥ��
{ path:'/params/:id' }
{ path:'/params/:id(\\d+)' }
{ path:'/params/*' }
{ path:'/params/:id?' }
{ path:'/params/(foo/)?/bar' }


{ path: '/a', redirect: to => {  return '�ض���� �ַ���·��/·������' } }

/**
$route����
   $route.name					����
   $route.params				���� user/:name
   $route.query					��������  query:{arg:123}
   $route.path					·��
   $route.fullPath
   $route.hash
   $route.meta					Ԫ��Ϣ
   $route.matched

   //router-link
   to  = {path: '', append:true, activeClass: 'active'}  
   :to = {path: '/detail/' + this.$route.params.id}
'$route'(to, from)


$routerʵ��
this.$router.push('/')
this.$router.replace('/home')
this.$router.go(-1)

*/
vue���η�ʽ�У�query��params+��̬·�ɴ���


// replace��ת����
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


//·�ɻ��ˡ��л����⴦��
1.
addAddress(){
	this.$router.replace('/me/address-add')
}
2.
watch: {
	//TODO ·�ɻ�������   keep-alive
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

//·�ɹ���ִ��vm
beforeRouteEnter (to, from, next) {		//beforeRouteUpdate, beforeRouteLeave
  next(vm => {
    // ͨ�� `vm` �������ʵ��
  })

  //next(false)
}


//��¼token��֤
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




//����ʱ����
new Vue({
  el: '#app',
  router: router,
  render: h=>h('router-view')
})

//��̬���ɵ�·��
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

/* ����·����ͼ */
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

//router����:
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
			return { offset: { y: -5} }			//ƫ������
		}
	}
	if (to.matched.some(record => record.meta.scrollToTop)) {
		return {x:0, y:100 }
	}
}


//routerʵ����
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
//·�ɵ�������					
beforeEach()
afterEach()

//����·�ɶ���Ĺ���
beforeEnter()						
afterEnter()

//����ڹ���
beforeRouteEnter			
beforeRouteUpdate
beforeRouteLeave			


//TODO ����������ڹ��Ӻ���
beforeCreate,						
created

beforeMount,
mounted								  

beforeUpdate
updated

beforeDestory,
destoryed							



//��ȡ wxconfig ����
let url = location.href.split('#')[0]
http.get('weixin/config',{
	params:{
			url: encodeURIComponent(url)
	}
}).then(res=>{
	wx.config({
			beta: true,														// ������ôд������wx.invoke������ʽ��jsapi��������
			debug: false,                       // ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
			appId: res.data.appId,           // �����ҵ΢�ŵ�corpID
			timestamp: res.data.timestamp,  // �������ǩ����ʱ���
			nonceStr: res.data.nonceStr,   // �������ǩ���������
			signature: res.data.signature,// ���ǩ������ ��¼-JS-SDKʹ��Ȩ��ǩ���㷨
			jsApiList: ['scanQRCode'] // �����Ҫʹ�õ�JS�ӿ��б�����Ҫ���õĽӿڶ���Ҫ������
	})
	// ���΢��
	wx.error(function(res){
			//  config��Ϣ��֤ʧ�ܻ�ִ��error��������ǩ�����ڵ�����֤ʧ�ܣ����������Ϣ���Դ�config��debugģʽ�鿴��Ҳ�����ڷ��ص�res�����в鿴������SPA�������������ǩ����
			console.log('������Ϣ====',res)
	})
})


// ��Ӱٶ�ͳ�� ���ж��������������ǿ������� ����ǿ������� �������
if (process.env.NODE_ENV !== 'development') {
	let _hmt = _hmt || [];
	window._hmt = _hmt;  // �����_hmt���ص�window�£������Ҳ���
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?yourappid";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})()
}

// ��Ӱٶ�ͳ�ƴ��� ���ж��������������ǿ�������
router.beforeEach(to, from, next){
	if (process.env.NODE_ENV !== 'development') {
		// ���ҳ��ͳ��
		if (_hmt) {
				if (to.path) {
						_hmt.push(['_trackPageview', '/#' + to.fullPath]);
				}
		}
	}
}