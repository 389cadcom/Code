Vue.mixin, Vue.filter, Vue.directive, Vue.exend, Vue.component, Vue.compile

Vue.use, Vue.nextTick, Vue.set, Vue.delete, 


//Vue.use   js
export default {
	install(Vue){
		Vue.component('Button', ButtonComponent)
	}
}


new Vue({
	el: '#app',
	props: [],
	mixins: [],
	data(){
		return {
			id: id,
			page: 1,
		}
	},
	watch: {
		'$route'(to, from){
		
		},
		// 如果路由有变化，会再次执行该方法
    '$route': "fetchDate",
		requestParams: {
			handler: 'getData',
			immediate: true
		}
	},
	methods: {
		getData(param = { id: this.id, page: this.page }){
			
		}
	}
})

//webpack config
npm run build --report			//查看打包文件体积

//compression-webpack-plugin
productionGzip: true				//生成.gz的gzip文件