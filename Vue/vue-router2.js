/*
 1.·������				routes: []
 2.Ƕ��·��				children: []
 3.��̬·��				path: 'user/:id'
 4.����·�ɺ���ͼ		name:'home' 
 5.���ʽ����			this.$route.push(), this.$route.replace()
 6.�ض���ͱ���			redirect: '/'  redirect:{name: ''}   alias: '/index'
 7.������Ϊ				scrollBehavior
 8.������				{ path:'', component: resolve=>require(['./index.vue']), resolve }
*/
//routes:
{path: '', name:'', redirect:'', alias:'', meta:{checkAuth:}, component: Home, components: { default:Home, b:Edit } }  

//links
:to = { path:'', name:'',  params:{id:12}, query:{args:123}, replace, append:true }
router.push({ name:'home', query: {} })


//·��ƥ��
{ path:'/params/:id' }
{ path:'/params/:id(\\d+)' }
{ path:'/params/*' }
{ path:'/params/:id?' }
{ path:'/params/(foo/)?/bar' }


{ path: '/a', redirect: to => {  return '�ض���� �ַ���·��/·������' } }

/**
route����
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

//·���л�����
watch: {
  '$route': 'fetchData'
},


new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
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
		{ path: '/index', component: index },
		{ path: '/index', 
		  components: {
			default: nav,
			a: main
		} },
	]
})


//·��ȫ�ֹ���
beforeEach, afterEach

//����·�ɶ�����
beforeEnter, afterEnter

//����ڹ���
beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave



//router����:
mode,
base,
linkActiveClass,
scrollBehavior,


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
beforeEnter()						//canActivate
afterEnter()

//����ڹ���
	- beforeRouteEnter				//activate
    - beforeRouteUpdate
    - beforeRouteLeave				//canActivate


//TODO ����������ڹ��Ӻ���
beforeCreate,						//beforeCompile, init
created

beforeMount,
mounted								//compiled, attached, ready

beforeUpdate
updated

beforeDestory,
destoryed							//deactivate


//����������ڹ���
vue 1.0+					vue 2.0					Description
init						beforeCreate	        ���ʵ���ձ�������������Լ���֮ǰ���� data ���Ե�
created						created	                ���ʵ��������ɣ������Ѱ󶨣��� DOM ��δ���ɣ�$el ���Ի�������
beforeCompile				beforeMount	            ģ�����/����֮ǰ
compiled					mounted	                ģ�����/����֮��
ready						mounted	                ģ�����/����֮�󣨲���֤������� document �У�
-							beforeUpdate	        �������֮ǰ
-							updated	                �������֮��
-							activated	            for keep-alive�����������ʱ����
-							deactivated	            for keep-alive��������Ƴ�ʱ����
attached					-	                    �����˻�˵ɶ��...
detached					-	                    �ǾͲ�˵�˰�...
beforeDestory				beforeDestory	        �������ǰ����
destoryed					destoryed	            ������ٺ����



activate & deactivate��		ʹ���������� lifecycle hook ���
data��						ͨ����� watch ������������ǰ·�� $route �ı仯
canActivate��				��·������ beforeEnter ������
canDeactivate��				��·������ beforeRouteLeave ������
canReuse��					ȥ��


