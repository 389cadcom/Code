import NavConfig from './nav.config.json';

/*
 * 动态加载配置路由、组件
 */
const registerRoute = (config) => {
    let routes = [];
    config.map(nav => {
        var dir = 'view'
        if(nav.title == 'CSS Components'){
            dir = 'view-css'
        }
        nav.list.map(page => {
            //console.log(`../view/${page.path}`)
            routes.push({
                name: page.name,
                path: page.path,
                meta: {
                  title: page.title,
                  description: page.desc
                },
                component: require(`../${dir}${page.path}`)
            })
        })
        console.log(nav.title)
    });
    return {routes, navs: config}
};

const router = registerRoute(NavConfig);

//主页
router.routes.push({
    path: '/',
    component: require('../demos.vue')
})

export const navs = router.navs;
export default router.routes;

