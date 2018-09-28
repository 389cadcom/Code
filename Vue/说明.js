Vue.mixin, Vue.filter, Vue.directive,		//filters, components, directives, mixins, extends

Vue.exend, Vue.component, Vue.compile

Vue.use, Vue.nextTick, Vue.set, Vue.delete, Vue.version

//选项-数据、DOM、生命周期、资源组合
data, props, propsData, methods, computed, watch

filters, components, directives, mixins, extends

//实例属性|方法 
$el, $options, $data, $props 

$parent, $childern, $root, $attrs

$refs, $slots

//实例方法(数据，事件，生命周期)
$watch, $set, $delete

$on, $off, $once, $emit

$mount, $destroy, $nextTick, $forceUpdate

//指令
v-bind, v-on, v-model, v-cloak, v-once, v-pre
v-html, text, 
v-if, else-if, else, for, show

//特性
ref, slot, is, key, scope, slot-scope

//内置组件
component, transition, transition-group, keep-alive, slot

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
