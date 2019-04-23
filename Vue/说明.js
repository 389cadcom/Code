//会把 APP.vue 中的的样式打包进 app.css 中，然后再把 main.js 中引用到的样式追加到后面
//项目用的是ts配合vue-class-component  vue-property-decorator

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

//第三方插件使用
this.$nextTick(() => {
	new Swiper()
})

/*
创建前/后： 在beforeCreated阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，$el还没有。
载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
更新前/后：当data变化时，会触发beforeUpdate和updated方法。
销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
*/