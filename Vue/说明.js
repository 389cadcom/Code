Vue.mixin, Vue.filter, Vue.directive,		//filters, components, directives, mixins, extends

Vue.exend, Vue.component, Vue.compile

Vue.use, Vue.nextTick, Vue.set, Vue.delete, Vue.version

//ѡ��-���ݡ�DOM���������ڡ���Դ���
data, props, propsData, methods, computed, watch

filters, components, directives, mixins, extends

//ʵ������|���� 
$el, $options, $data, $props 

$parent, $childern, $root, $attrs

$refs, $slots

//ʵ������(���ݣ��¼�����������)
$watch, $set, $delete

$on, $off, $once, $emit

$mount, $destroy, $nextTick, $forceUpdate

//ָ��
v-bind, v-on, v-model, v-cloak, v-once, v-pre
v-html, text, 
v-if, else-if, else, for, show

//����
ref, slot, is, key, scope, slot-scope

//�������
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
		// ���·���б仯�����ٴ�ִ�и÷���
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
