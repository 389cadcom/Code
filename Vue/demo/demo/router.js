//全局定义组件    局部定义组件components  
//传值： props down - events up
Vue.component('my-component', {
    template: `
        <div class="">
            <h3>全局 component!</h3> <p>{{msg}}</p>
        </div>
    `,
    data(){
        return {msg: 'data是函数'};
    }
})

//TODO HOME　Vue.extend创建组件 router-view组件
//route->home compnent    template="home"
const Home = Vue.extend({
    template: '#home',
    data() {
        return {
            msg: 'Hello Home!',
            gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
            gridData: [],
            aipURL: 'http://211.149.193.19:8080/api/customers'
        }
    },
    created() {
        //axios.get('http://211.149.193.19:8080/api/customers')
        /*        axios({ url:'http://211.149.193.19:8080/api/customers' })
                    .then(res => {
                        this.gridData = res.data.slice(0, 5);
                    })
                    .catch(error => {
                        console.log(error)
                    })*/
        var instance = axios.create({
            timeout: 1000,
            headers: {
                'X-Custom-Header': 'foobar'
            }
        })
        //多线程请求
        axios.all([
                axios.get('http://ziptasticapi.com/90210'),
                axios.get('http://211.149.193.19:8080/api/customers')
            ]).
            then(axios.spread((res1, res2) => {
                //console.log(res1.data, res2.data)
                this.msg += ' City:' + res1.data.city;
                this.gridData = res2.data.slice(0, 5);
            }))
    }
})

//User 组件内路由钩子  beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave
const User = Vue.extend({
    template: '#user',
    data() {
        return {
            transitionName: 'slide-left'
        }
    },
    beforeRouteUpdate: function(to, form, next) {
        var isBack = this.$router.isBack;
//      console.log(isBack)
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
        next()
    },
    //子组件方法
    methods: {
        goback() {
            this.$router.goBack();
        }
    }
});

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const PostList = {
    template: `
      <div class="list">
        <h4>postList 子路由 </h4>
        <router-link tag="p" to="/user/boo/posts/post1"><a>postid-1</a></router-link>
        <router-link tag="p" to="/user/boo/posts/post2"><a>postid-2</a></router-link>
        <router-view class="child-view"></router-view>
      </div>
    `
};
const Posts = { template: '<div>Posts - {{ $route.params.postid }} </div>' }
const Bar = { template: '<div>bar - {{$route.params.id}} {{ $route.name }} </div>' }


//TODO 定义全局路由方法
VueRouter.prototype.goBack = function() {
    this.isBack = true
    window.history.go(-1)
}
const router = new VueRouter({
    linkActiveClass: 'active',              
    routes: [
        { path: '/home', name: 'home', component: Home, alias: '/' }, 
        { path: '/user/:userid', name: 'user', component: User, meta: { title: 'User' },
            children: [
                { path: '', component: UserHome }, 
                { path: 'profile', component: UserProfile },
                { path: 'posts', component: PostList, 
                  children: [
                    { path: ':postid', component: Posts }, 
                  ]
                },
                { path: 'bar/:id', name: 'bar', component: Bar }
            ]
        },
        //配置404
        { path: '*', component: { template: '#error' } },
    ],
    //滚动位置  -- history
    scrollBehavior: function(to, form, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            }
        }
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
});

//TODO 路由钩子  beforeEach, afterEach, <某路由独享： beforeEnter>
router.beforeEach((to, form, next) => {
    var titleStr = "";
    if (to.name != 'home') {
        for (var i = 0; i < to.matched.length - 1; i++) {
            titleStr += to.matched[i].meta.title
        }
        document.title = titleStr;
    }
    next()
})

//login
var auth = {
    checkAuth() { return true; }
}

router.beforeEach((to, form, next) => {
    if (to.matched.some(record => !record.meta.noCheckSession)) {
        //检查是否登陆
        var isLogin = auth.checkAuth();
        if (!isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next();
        }
    } else {
        next();
    }
})

//App实例
const app = new Vue({
    mode: 'history',
    el: '#app',
    data: {
        msg: 'Hi'
    },
    router,
    components:{
        error: {                                     //局部组件
            template: '#error'
        }
    },
    filters:{
        upperCase(val){
            if(!val) return '';
            return val.toUpperCase();
        }
    },
    computed:{
        reverse(){
            return this.msg.split('').reverse().join('')
        }
    },
    watch: {
        '$route' (to, form) {}
    },
    created: function() {
        console.log('created')
    },
    mounted: function() {
        console.log('mounted')
    },
})

//另一个实例
var Profile = Vue.extend({
    template: '<p>另一个实例<br> this is p {{msg}}</p>',
    data: function(){
        return {msg:'Hi'}
    }
})
new Profile().$mount('#mount-point')