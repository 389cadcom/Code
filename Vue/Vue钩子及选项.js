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

//props   属性值必在子组件中通过props属性显示指定
props:['inputMsg', 'star-chars', 'data-msg']
<child :input-msg=""></child>
<my-demo :num="99" :str-chars="99" :data-msg="msg" />

template: `<div><p>添加全局组件到模板 <my-demo :num='99' str="99" :dataMsg="msg" /></p></div>`		
template: '<div><p>添加全局组件到模板 <my-demo :num="99" :str-chars="99" :data-msg="msg" /></p></div>'

//非父子通信--通过创建一个实例，中央事件总线
bus = new Vue({})
bus.$emit('up', arg)  //A组件- 注册事件
bus.$on('up', fn)			//B组件- 侦听事件

//只在子组件里面改变父组件的一个值 
//<input v-model='' v-bind:value="something" v-on:input="something = $event.target.value">	

正常方式:
<my-component :total="total" @update="handler"></my-component>


//父 利用默认 input 事件
<my-component v-model="total"></my-component>

//子
<p @click="update"></p>
methods: {
	update(){
		this.$emit('input', 100)
	}
}

//组件包装、事件属性穿透问题, 绑定v-on="$listener" v-bind="$attrs"
<!--input type="text"
		@focus="$emit('focus')"
		@click="$emit('click')"
		@blur="$emit('blur')"
		@hover="$emit('hover')"
/-->

Vue.component('InputEvent', {
	template: `<input v-on="$listeners" v-bind="$attrs" type="text"/>`
})

//keep-alive缓存问题解决
//方案一
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

//方案二 前进刷新，后退不刷新
deactivated () {
	this.$destroy()															//清理它与其它实例的连接，解绑它的全部指令及事件监听器
}

//方案三
/*keep-alive设置  $route.path.includes('detail')
页面缓存:
<div id="app">
	<keep-alive>
		<router-view v-if="$route.meta.keepAlive"></router-view>		//需缓存页面	activated
	</keep-alive>
	<router-view v-if="!$route.meta.keepAlive"></router-view>			//不需缓存页面
</div>
*/

//方案四  回首页刷新
beforeRouteLeave(to, from, next) {
 if (to.path == "/index") {
		to.meta.keepAlive = true;
 } else {
		to.meta.keepAlive = false;
 }
 next();
}

//keep-alive 实例化高德地图
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
	//数据加载完成
	activated(){
		this.getData()		
	},
	deactivated(){
		this.amap.clearMap()	
	}
}


/**
Vue2 生命周期
1.实例创建前后(初始化数据, 函数自执行如:data方法 ), $el还不存在
2.模板编译/挂载(渲染)
3.组件更新--app.msg='Hi'
4.组件销毁前后--app.$destroy()
*/
beforeCreate(), beforeMounte(), beforeUpdate(), beforeDestory()
created(),		  mounted(),		  updated(),		  destoryed()

//keep-alive 组件被激活/移除 
activated(), deactivated()

//组件路由钩子
beforeRouteEnter, beforeRouteLeave

//全局路由钩子main.js
router.afterEach()
router.beforeEach((to, from, next) => {})
//验证登录
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

//ES5定义属性方式 - 冻结属性
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})


//实例化
new Vue({
	el: '#app',								//vm.$el 要绑定的DOM
	data: { },								//要绑定的数据, 通过data函数，返回一个全新副本数据对象(多个实例共享引用同一个数据对象)
	props: [],										//接收父组件传下的数据
	propsData,								//传递 props, 主要作用是方便测试
	router: router,						//路由
	render:										//res = Vue.compile('<div></div>'), res.render
	template: '',							//使用模板将会替换挂载的元素, 选项中包含 render函数，template 选项将被忽略。
	components:{							//局部组件
		'my-component': Child
	},
	directives,								//自定义指令  指令名、参数、修饰符、表达式、值
	filters: {								//过滤
		tofixed: function(val){
			return Number(val).toFixed(2)
		}
	},
	computed: {								//计算属性，(data)属性名不需定义
		hbprices: function(){}
	},
	watch:{										//侦听属性变化
		'$route': 'routeChange',
		obj: {
			handler(val, old){},
			deep: true
		},
		'obj.age'(){}
	},
	created: function(){			//dom未被解析, $el属性不可见
	
	},
	mounted: function(){			//dom解析完成
	
	},
	activated(){							//keep-alive			第二次触发
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
		//清除定时器
	}
}).$mount('#app')				//实例化时没有收到 el 选项，则它处于“未挂载”状态, 可使用 vm.$mount(id) 手动地挂载一个未挂载的实例

//立即执行
watch: {
	'$route':{
		handler: 'getData',
		immediate: true
	}
},
getData(to, from){
  if(to.path == '/me/'){}
}


//动态组件 :is  keep-alive  transition
<component :is="currentView"></compnent>


//全局组件生命周期
Vue.component('my-component', {
	data(){
		return { msg: 'Hello World!' }
	}
	props: ['a', 'msgTip'],				//传递值 :a=''
	template: '#tmpl',
	methods: {										//$on, $emit
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

//vue-meta  metaInfo: {},  metaInfo(){return {title: this.title}}
setTitle(title){
	setTimeout(function () {
			//利用iframe的onload事件刷新页面
			document.title = title;
			var iframe = document.createElement('iframe');
			iframe.src = '/favicon.ico'; // 必须
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