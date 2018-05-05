:class 语法 对象、数组

:class="spec.id==currentData.id?'selected':''"			//三目运算

:class="[show?'icon-close':'icon-caidan', 'hide']"		//数组语法-三目运算

:class="{'active': i==0}"								//对象语法
:class="{'checked':addr.is_default==1, 'hide':i>=3}"


:style="{ color: activeColor, fontSize: fontSize + 'px' }"


//vue-cli webpack配置
编译的文件要放在一个HTTP服务器, file:///访问，资源加载失败，可设置webpack资源配置(publicPath改为相对路径)，改变webpack配置，会出现引用缓存文件，热启动没有效果

//1-4 数据结构
//深入响应式原理
Object.create, assign, defineProerty

vm.$data
Vue.set(object, key, value)

//双向绑定
<input type="text" id="txt"/><span id="sp"></span>
js:
var txt = dg('txt'), sp= dg('sp');
var obj = {};
Object.defineProperty(obj, 'msg', {
	set: (old, val)=>{
		txt.value    = val;
		sp.innerText = val;
	}
})

txt.on('keyup', e=>{
	obj.msg = event.target.value
})

//异步更新
Vue.nextTick()
this.$nextTick()

//过滤器
Vue.filter('data', (val, format)=>{})


// 将 axios 添加到 Vue.prototype 中
Vue.prototype.$axios = axios	==> this.$axios.get(url)


// 请求拦截器
axios.interceptors.request.use()
axios.interceptors.response.use()


//内容分发  --slot  refs