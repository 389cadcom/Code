//某路由独享钩子函数 beforeEnter
function guardRoute (to, from, next) {
  if (window.confirm(`Navigate to ${to.path}?`)) {
    next()
  } else if (window.confirm(`Redirect to /baz?`)) {
    next('/baz')
  } else {
    next(false)
  }
}

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = {
  data () {
    return { saved: false }
  },
  template: `
    <div>
        <p>baz: {{ saved ? 'saved' : 'not saved' }}</p>
        <button @click='saved = true'>save</button>
    </div>
  `,
  beforeRouteLeave (to, from, next) {        //组件路由钩子  beforeRouteLeave, 离开当前路由
    if (this.saved || window.confirm('未保存, 确认离开?')) {
      next()
    } else {
      next(false)
    }
  }
}
const Qux = {
  data () {
    return {
      msg: null
    }
  },
  template: `<div>{{ msg }}</div>`,
  beforeRouteEnter (to, from, next) {       //组件路由钩子  beforeRouteEnter， 进入没当前路由
    setTimeout(() => {
      next(vm => {
        vm.msg = '1秒后显示 Qux'
      })
    }, 1000)
  }
}

const Quux = {
  data () {
    return {
      prevId: 0
    }
  },
  template: `
    <div>id:{{ $route.params.id }} prevId:{{ prevId }}</div>
  `,
  beforeRouteUpdate (to, from, next) {  //组件路由钩子  beforeRouteUpdate，路由地址更新
    this.prevId = from.params.id
    next()
  }
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, props: { name: 'world' } },
    { path: '/foo', component: Foo, beforeEnter: guardRoute },      //路由独享钩子
    { path: '/bar', component: Bar, meta: { needGuard: true }},
    { path: '/baz', component: Baz },
    { path: '/qux', component: Qux },
    //TODO 
    { path: '/qux-async', component: resolve => {
      setTimeout(() => {
        resolve(Qux)
      }, 0)
    } },
    // in-component beforeRouteUpdate hook
    { path: '/quux/:id', component: Quux ,
      //TODO 重定向函数
      /*redirect: to => {
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }*/
    }
  ]
})

//全局钩子
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.needGuard)) {
    guardRoute(to, from, next)
  } else {
    next()
  }
})

var vm = new Vue({
  el: '#app',
  data: {
      msg: '123'  
  },
  router,
  template: `
    <div id="app" class="template">
      <h1>Navigation Guards</h1>
      <ul>
        <li><router-link :to="{path:'/', query: {a:13}}">/</router-link></li>
        <li><router-link to="/foo">/foo 全局路由钩子</router-link></li>
        <li><router-link to="/bar">/bar 路由元信息</router-link></li>
        <router-link tag="li" to="/baz" :event="['mousedown', 'touchStart']">
            <a>/baz 某一路由钩子</a>
        </router-link>
        <li><router-link to="/qux">/qux 进入路由</router-link></li>
        <li><router-link to="/qux-async">/qux-async</router-link></li>
        <li><router-link to="/quux/1">/quux/1 路由地址更新</router-link></li>
        <li><router-link to="/quux/2">/quux/2 路由地址更新</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `,
  watch:{
      '$route': 'routeChange'
  },
  methods:{
      routeChange(){
          console.log(this.$route.props)
      }
  }
})

/*
 渲染App
 el, render, template vm.$mount
 
 1.使用模板将会替换挂载的元素, 如果Vue选项中包含 render 函数，template 选项将被忽略。
 2.实例化时没有收到 el 选项，则它处于“未挂载”状态, 可使用 vm.$mount('#app')手动地挂载一个未挂载的实例
 3.如果$mount()没有elemSeleor参数，模板将被渲染为文档之外的的元素，使用原先DOM插入
 
 //render编译模板字符串，只在独立构建时有效
 Vue.compile('<div>{{txt}}</div>');
 res: compile.render
 
 document.getElementById("app").appendChild(vm.$mount().$el);
*/
