//当注册组件（或者 props）时，可以使用 kebab-case ，camelCase ，或 TitleCase
//因HTML不区分大小写，驼峰式全局组件或props属性，需转为短横线式

//组件
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

template: `<div><p>添加全局组件到模板 <my-demo :num='99' str="99" :dataMsg="msg" /></p></div>`		
template: '<div><p>添加全局组件到模板 <my-demo :num="99" :str-chars="99" :data-msg="msg" /></p></div>'


/*
Vue2 生命周期
1.实例创建前后(初始化数据, 函数自执行如:data), $el还不存在
2.模板编译/挂载(渲染)
3.组件更新--app.msg='Hi'
4.组件销毁前后--app.$destroy()
*/
//keep-alive 组件被激活/移除 activated(), deactivated()
beforeCreate(), beforeMounte(), beforeUpdate(), beforeDestory()
created(),		mounted(),		updated(),		destoryed()

//实例化
new Vue({
	el: '#app',					//vm.$el 要绑定的DOM
	data: { },					//要绑定的数据, 通过data函数，返回一个全新副本数据对象(多个实例共享引用同一个数据对象)
	props,						//接收父组件传下的数据
	propsData,					//传递 props, 主要作用是方便测试
	router: router,				//路由
	render:						//res = Vue.compile('<div></div>'), res.render
	template: '',				//使用模板将会替换挂载的元素, 选项中包含 render函数，template 选项将被忽略。
	components:{				//局部组件
		'my-component': Child
	},
	directives,					//自定义指令
	filters: {					//过滤
		tofixed: function(val){
			return Number(val).toFixed(2)
		}
	},
	computed: {					//计算属性，(data)属性名不需定义
		hbprices: function(){}
	},
	watch:{						//侦听属性变化
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
}).$mount('#app')				//实例化时没有收到 el 选项，则它处于“未挂载”状态, 可使用 vm.$mount().$el 手动地挂载一个未挂载的实例

//路由
router.beforeEach((to, from, next)=>{
	
})
router.afterAfter(to=>{

})


//动态组件 :is  keep-alive  transition
<component :is="currentView"></compnent>


//全局组件生命周期
Vue.component('my-component', {
	data(){
		return { msg: 'Hello World!' }
	}
	props: ['a', 'msgTip'],				//传递值 :a=''
	template: '#tmpl',
	methods: {							//$on, $emit
		increment: function(){
			this.count++;
			this.$emit('increment', this.count)		//组件派发事件名称,传参
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


//局部定义组件
components: {
	'child': {
		template: '<button @click="increment">{{count}}</button>',
		data(){
			return { count:0 }		//每个组件返回全新的 data 对象
		},
		methods: {
			increment: function(){
				this.count++;
				this.$emit('increment', this.count)		//组件派发事件名称,传参
			}
		}
	}
}
//子组件索引访问dom元素 
//ref='mychild' --> parent.$refs.mychild



//Props验证
props: {
	// 基础类型检测 （`null` 意思是任何类型都可以）
	propA: Number,
	// 多种类型
	propB: [String, Number],
	// 必传且是字符串
	propC: {
	  type: String,
	  required: true
	},
	// 数字，有默认值
	propD: {
	  type: Number,
	  default: 100
	},
	// 数组／对象的默认值应当由一个工厂函数返回
	propE: {
	  type: Object,
	  default: function () {
		return { message: 'hello' }
	  }
	},
	// 自定义验证函数
	propF: {
	  validator: function (value) {
		return value > 10
	  }
	}
}