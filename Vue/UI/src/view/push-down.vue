<template>
<div class="">
	<div class="page-title">加载更多 Push Up</div>
	<!--TODO ref onBottomLoaded-->
	<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<mt-loadmore ref="loadmore"
			:top-method="loadBottom" @top-status-change="statusChange">  
			<ul class="page-loadmore-list">
				<li v-for="item in list" class="page-loadmore-listitem">{{ item }}</li>
			</ul>
			<div slot="top" class="mint-loadmore-top">
				<span v-show="status !== 'loading'" :class="{ 'is-rotate': status === 'drop' }">↓</span>
				<span v-show="status === 'loading'">
					<mt-spinner type="fading-circle"></mt-spinner> 加载中...
				</span>
			</div>
		</mt-loadmore>
	</div>
</div>
</template>

<script>
import { Loadmore, Spinner } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner);	
	
//区别是，当底部数据全部获取完毕时，可以将绑定到组件 bottom-all-loaded 属性的变量赋值为 true，
//这样 bottom-method 就不会再次执行了
export default {
	data(){
		return {
			status : '',
			wrapperHeight: 0,
			allLoaded: false,
			list: []
		}
	},
	created(){
		for (let i = 1; i <= 20; i++) {
	      this.list.push(i);
	    }
	},
	mounted() {
		var $wraper = this.$refs.wrapper;
		//this.wrapperHeight = document.documentElement.clientHeight - $wraper.getBoundingClientRect().top;
	},
	methods: {
		//push, drop, loading
		statusChange(status){
			console.log(status)
			this.status = status;
		},
		loadBottom() {
	    	setTimeout(() => {
			    let size = this.list.length;
			    let first = this.list[0];
			    if(size < 40){
			    	for (let i = 1; i <= 10; i++) {
				      this.list.unshift(first - i);
				    }
			    }else{
			    	this.allLoaded = true;
			    }
			    //TODO 手机触发 onTopLoaded onBottomLoaded
			    this.$refs.loadmore.onTopLoaded();
			}, 1500);
		}
	}
}
</script>

<style lang="scss">
.page-loadmore-list li{
	display: block;line-height: 42px; 
	border-bottom: 1px solid #eee;
}

.mint-spinner {
	display: inline-block;
	vertical-align: middle;
}
</style>