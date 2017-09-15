import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/route.js'             
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//注册fastclick
document.addEventListener('DOMContentLoaded', function(){
    if(window.FastClick) window.FastClick.attach(document.body);
}, false)

Vue.use(VueRouter)
Vue.use(MintUI);

const router = new VueRouter({
    base: __dirname,
    linkActiveClass: 'active',
    routes
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

//回到主页滚动位置
let scrollTop = 0;
router.beforeEach((to, from, next)=>{
    if(to.path != '/'){
        scrollTop = document.body.scrollTop;
    }
    document.title = to.meta.title || document.title;
    next();
});
router.afterEach(to=>{
    if(to.path != '/'){
        document.body.scrollTop = 0;
    }else{
        Vue.nextTick(()=>{
            document.body.scrollTop = scrollTop;
        })
    }
})


/*
new Vue({
    el: '#app',
    router,
    render: h => h(App)
    render:function(createElement){
        return createElement(App);
    }
    components:{
        'app':App
    }
    
}).$mount('#app');
*/