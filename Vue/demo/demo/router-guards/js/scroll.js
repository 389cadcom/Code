const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = {
    template: `
    <div>
      bar
      <div style="height:500px"></div>
      <p id="anchor" style="height:500px">Anchor</p>
      <p id="anchor2">Anchor2</p>
    </div>
  `
}
/*
 * 需配合mode: history使用savedPosition, var position = {};
 */
const scrollBehavior = (to, from, savedPosition) => {
    console.log(to)
    
    if (savedPosition) {
        return savedPosition
    } else {
        var  pos = {}           //x, y, selector
        //有锚点，则跳到锚点
        if (to.hash) {
            pos.selector = to.hash

            if (to.hash === '#anchor2') {
                pos.offset = { y: -5 }
            }
        }

        //路由元信息scrollToTop
        if (to.matched.some(record => record.meta.scrollToTop)) {
            pos.x = 0
            pos.y = 100
        }else{
            pos.y = 0
            pos.x = 100
        }
        return pos
    }
}

const router = new VueRouter({
    mode: 'history',
    scrollBehavior,
    routes: [
        { path: '/', component: Home, meta: { scrollToTop: true } },
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar, meta: { scrollToTop: true } }
    ]
})

new Vue({
    router,
    template: `
    <div id="app">
      <h1>Scroll Behavior</h1>
      <ul>
        <li><router-link to="/" active-class='active'>/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <li><router-link to="/bar#anchor">/bar#anchor</router-link></li>
        <li><router-link to="/bar#anchor2">/bar#anchor2</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')