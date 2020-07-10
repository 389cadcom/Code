//��� APP.vue �еĵ���ʽ����� app.css �У�Ȼ���ٰ� main.js �����õ�����ʽ׷�ӵ�����
//��Ŀ�õ���ts���vue-class-component  vue-property-decorator

Vue.mixin, Vue.filter, Vue.directive,		//filters, components, directives, mixins, extends

Vue.exend, Vue.component, Vue.compile

Vue.use, Vue.nextTick, Vue.set, Vue.delete, Vue.version

//ѡ��-���ݡ�DOM���������ڡ���Դ���
data, props, propsData, methods, computed, watch

filters, components, directives, mixins, extends

//ʵ������|���� 
$el, $options, $data, $props 

$parent, $childern, $root, $attrs

$refs, $slots												//forѭ���пɶ���ͬ��ref, ��������Ḳ��ԭ��ͬ����ref

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


//���������ʹ��
this.$nextTick(() => {
	new Swiper()
})

/*
����ǰ/�� ��beforeCreated�׶Σ�vueʵ���Ĺ���Ԫ��$el�����ݶ���data��Ϊundefined����δ��ʼ������created�׶Σ�vueʵ�������ݶ���data���ˣ�$el��û�С�
����ǰ/����beforeMount�׶Σ�vueʵ����$el��data����ʼ���ˣ������ǹ���֮ǰΪ�����dom�ڵ㣬data.message��δ�滻����mounted�׶Σ�vueʵ��������ɣ�data.message�ɹ���Ⱦ��
����ǰ/�󣺵�data�仯ʱ���ᴥ��beforeUpdate��updated������
����ǰ/����ִ��destroy�����󣬶�data�ĸı䲻���ٴ������ں�����˵����ʱvueʵ���Ѿ�������¼������Լ���dom�İ󶨣�����dom�ṹ��Ȼ����
*/