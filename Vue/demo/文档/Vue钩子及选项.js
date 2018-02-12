//��ע����������� props��ʱ������ʹ�� kebab-case ��camelCase ���� TitleCase
//��HTML�����ִ�Сд���շ�ʽȫ�������props���ԣ���תΪ�̺���ʽ

//���
'kebab-cased-component': { /* ... */ },
'camelCasedComponent': { /* ... */ },
'TitleCasedComponent': { /* ... */ }
Vue.component('', {})

<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>

//props
props:['inputMsg']
<child :input-msg=""></child>
<my-demo :num="99" :str-chars="99" :data-msg="msg" />

template: `<div><p>���ȫ�������ģ�� <my-demo :num='99' str="99" :dataMsg="msg" /></p></div>`		
template: '<div><p>���ȫ�������ģ�� <my-demo :num="99" :str-chars="99" :data-msg="msg" /></p></div>'


/*
Vue2 ��������
1.ʵ������ǰ��(��ʼ������, ������ִ����:data), $el��������
2.ģ�����/����(��Ⱦ)
3.�������--app.msg='Hi'
4.�������ǰ��--app.$destroy()
*/
//keep-alive ���������/�Ƴ� activated(), deactivated()
beforeCreate(), beforeMounte(), beforeUpdate(), beforeDestory()
created(),		mounted(),		updated(),		destoryed()

//ʵ����
new Vue({
	el: '#app',					//vm.$el Ҫ�󶨵�DOM
	data: { },					//Ҫ�󶨵�����, ͨ��data����������һ��ȫ�¸������ݶ���(���ʵ����������ͬһ�����ݶ���)
	props,						//���ո�������µ�����
	propsData,					//���� props, ��Ҫ�����Ƿ������
	router: router,				//·��
	render:						//res = Vue.compile('<div></div>'), res.render
	template: '',				//ʹ��ģ�彫���滻���ص�Ԫ��, ѡ���а��� render������template ѡ������ԡ�
	components:{				//�ֲ����
		'my-component': Child
	},
	directives,					//�Զ���ָ��
	filters: {					//����
		tofixed: function(val){
			return Number(val).toFixed(2)
		}
	},
	computed: {					//�������ԣ�(data)���������趨��
		hbprices: function(){}
	},
	watch:{						//�������Ա仯
		'$route': 'routeChange'
	},
	created: function(){
	
	},
	mounted: function(){
	
	},
	methods: {
		//method
	},
	beforeDestory: function(){

	}
}).$mount('#app')				//ʵ����ʱû���յ� el ѡ��������ڡ�δ���ء�״̬, ��ʹ�� vm.$mount().$el �ֶ��ع���һ��δ���ص�ʵ��

//·��
router.beforeEach((to, from, next)=>{
	
})
router.afterAfter(to=>{

})


//��̬��� :is  keep-alive  transition
<component :is="currentView"></compnent>


//ȫ�������������
Vue.component('my-component', {
	data(){
		return { msg: 'Hello World!' }
	}
	props: ['a', 'msgTip'],				//����ֵ :a=''
	template: '#tmpl',
	methods: {							//$on, $emit
		increment: function(){
			this.count++;
			this.$emit('increment', this.count)		//����ɷ��¼�����,����
		},
		reduce: function(){
			this.count--;
			this.$emit('reduce', this.count)
		}
	}
});
<my-component v-on:increment="doThis" v-on:reduce="doThat" :a="msg" :msg-tip="msg" ref="mychild">
    <img slot="icon" src=''/>
	<p slot="text">text</p>
</my-component>


//�ֲ��������
components: {
	'child': {
		template: '<button @click="increment">{{count}}</button>',
		data(){
			return { count:0 }		//ÿ���������ȫ�µ� data ����
		},
		methods: {
			increment: function(){
				this.count++;
				this.$emit('increment', this.count)		//����ɷ��¼�����,����
			}
		}
	}
}
//�������������domԪ�� 
//ref='mychild' --> parent.$refs.mychild



//Props��֤
props: {
	// �������ͼ�� ��`null` ��˼���κ����Ͷ����ԣ�
	propA: Number,
	// ��������
	propB: [String, Number],
	// �ش������ַ���
	propC: {
	  type: String,
	  required: true
	},
	// ���֣���Ĭ��ֵ
	propD: {
	  type: Number,
	  default: 100
	},
	// ���飯�����Ĭ��ֵӦ����һ��������������
	propE: {
	  type: Object,
	  default: function () {
		return { message: 'hello' }
	  }
	},
	// �Զ�����֤����
	propF: {
	  validator: function (value) {
		return value > 10
	  }
	}
}