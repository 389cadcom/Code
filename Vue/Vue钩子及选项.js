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

//props   ����ֵ�����������ͨ��props������ʾָ��
props:['inputMsg', 'star-chars', 'data-msg']
<child :input-msg=""></child>
<my-demo :num="99" :str-chars="99" :data-msg="msg" />

template: `<div><p>���ȫ�������ģ�� <my-demo :num='99' str="99" :dataMsg="msg" /></p></div>`		
template: '<div><p>���ȫ�������ģ�� <my-demo :num="99" :str-chars="99" :data-msg="msg" /></p></div>'

//�Ǹ���ͨ��--ͨ������һ��ʵ���������¼�����
bus = new Vue({})
bus.$emit('up', arg)  //A���- ע���¼�
bus.$on('up', fn)			//B���- �����¼�

//ֻ�����������ı丸�����һ��ֵ 
//<input v-model='' v-bind:value="something" v-on:input="something = $event.target.value">	

������ʽ:
<my-component :total="total" @update="handler"></my-component>


//�� ����Ĭ�� input �¼�
<my-component v-model="total"></my-component>

//��
<p @click="update"></p>
methods: {
	update(){
		this.$emit('input', 100)
	}
}

//�����װ���¼����Դ�͸����, ��v-on="$listener" v-bind="$attrs"
<!--input type="text"
		@focus="$emit('focus')"
		@click="$emit('click')"
		@blur="$emit('blur')"
		@hover="$emit('hover')"
/-->

Vue.component('InputEvent', {
	template: `<input v-on="$listeners" v-bind="$attrs" type="text"/>`
})

//keep-alive����������
//����һ
watch: {
	'$route': {
		immediate: true,
		handler(to, from){
			if(to.path.includes('shop-detail')){
				if(this.id == this.$route.params.id) return;
				this.id = this.$route.params.id;
				this.getData()
			}
		}
	}
},

//������ ǰ��ˢ�£����˲�ˢ��
deactivated () {
	this.$destroy()															//������������ʵ�������ӣ��������ȫ��ָ��¼�������
}

//������
/*keep-alive����  $route.path.includes('detail')
ҳ�滺��:
<div id="app">
	<keep-alive>
		<router-view v-if="$route.meta.keepAlive"></router-view>		//�軺��ҳ��	activated
	</keep-alive>
	<router-view v-if="!$route.meta.keepAlive"></router-view>			//���軺��ҳ��
</div>
*/

//������  ����ҳˢ��
beforeRouteLeave(to, from, next) {
 if (to.path == "/index") {
		to.meta.keepAlive = true;
 } else {
		to.meta.keepAlive = false;
 }
 next();
}

//keep-alive ʵ�����ߵµ�ͼ
export default {
	data(){
		return { map: null }
	},
	mounted(){
		this.amap = new AMap("container", {
      center: [117.373948,24.510122],
			resizeEnable: true,
      zoom: 13
		})
	},
	//���ݼ������
	activated(){
		this.getData()		
	},
	deactivated(){
		this.amap.clearMap()	
	}
}


/**
Vue2 ��������
1.ʵ������ǰ��(��ʼ������, ������ִ����:data���� ), $el��������
2.ģ�����/����(��Ⱦ)
3.�������--app.msg='Hi'
4.�������ǰ��--app.$destroy()
*/
beforeCreate(), beforeMounte(), beforeUpdate(), beforeDestory()
created(),		  mounted(),		  updated(),		  destoryed()

//keep-alive ���������/�Ƴ� 
activated(), deactivated()

//���·�ɹ���
beforeRouteEnter, beforeRouteLeave

//ȫ��·�ɹ���main.js
router.afterEach()
router.beforeEach((to, from, next) => {})
//��֤��¼
router.beforeEach((to, from, next) => {
  var userId = Vue.prototype.userId;
  if(to.meta.requireAuth){
    if(!userId){
      next({
        name: 'login',
        query: { redirect: to.path }
      })
    }
    next()
  }else{
    next()
  }
})

// main.js
Vue.prototype.$EventBus = new Vue()

//ES5�������Է�ʽ - ��������
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})


//ʵ����
new Vue({
	el: '#app',								//vm.$el Ҫ�󶨵�DOM
	data: { },								//Ҫ�󶨵�����, ͨ��data����������һ��ȫ�¸������ݶ���(���ʵ����������ͬһ�����ݶ���)
	props: [],										//���ո�������µ�����
	propsData,								//���� props, ��Ҫ�����Ƿ������
	router: router,						//·��
	render:										//res = Vue.compile('<div></div>'), res.render
	template: '',							//ʹ��ģ�彫���滻���ص�Ԫ��, ѡ���а��� render������template ѡ������ԡ�
	components:{							//�ֲ����
		'my-component': Child
	},
	directives,								//�Զ���ָ��  ָ���������������η������ʽ��ֵ
	filters: {								//����
		tofixed: function(val){
			return Number(val).toFixed(2)
		}
	},
	computed: {								//�������ԣ�(data)���������趨��
		hbprices: function(){}
	},
	watch:{										//�������Ա仯
		'$route': 'routeChange',
		obj: {
			handler(val, old){},
			deep: true
		},
		'obj.age'(){}
	},
	created: function(){			//domδ������, $el���Բ��ɼ�
	
	},
	mounted: function(){			//dom�������
	
	},
	activated(){							//keep-alive			�ڶ��δ���
		if(document.body.scrollTop){
			document.body.scrollTop = sessionStorage.getItem('top')
		}else{
			document.documentElement.scrollTop = sessionStorage.getItem('top')
		}
		window.addEventListener('scroll', this.roll)
	},
	deactivated(){
		sessionStorage.setItem('roll', this.top)
		window.removeEventListener('scroll', this.roll)	
	},
	methods: {
		//method
		rool(){
			this.roll = document.body.scrollTop || document.documentElement.scrollTop
		}
	},
	beforeDestory: function(){
		//�����ʱ��
	}
}).$mount('#app')				//ʵ����ʱû���յ� el ѡ��������ڡ�δ���ء�״̬, ��ʹ�� vm.$mount(id) �ֶ��ع���һ��δ���ص�ʵ��

//����ִ��
watch: {
	'$route':{
		handler: 'getData',
		immediate: true
	}
},
getData(to, from){
  if(to.path == '/me/'){}
}


//��̬��� :is  keep-alive  transition
<component :is="currentView"></compnent>


//ȫ�������������
Vue.component('my-component', {
	data(){
		return { msg: 'Hello World!' }
	}
	props: ['a', 'msgTip'],				//����ֵ :a=''
	template: '#tmpl',
	methods: {										//$on, $emit
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

//vue-meta  metaInfo: {},  metaInfo(){return {title: this.title}}
setTitle(title){
	setTimeout(function () {
			//����iframe��onload�¼�ˢ��ҳ��
			document.title = title;
			var iframe = document.createElement('iframe');
			iframe.src = '/favicon.ico'; // ����
			iframe.style.visibility = 'hidden';
			iframe.style.width = '1px';
			iframe.style.height = '1px';
			iframe.onload = function () {
					setTimeout(function () {
							document.body.removeChild(iframe);
					}, 0);
			};
			document.body.appendChild(iframe);
	}, 0);
}