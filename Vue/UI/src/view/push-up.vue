<template>
<div class="">
	<div class="page-title">加载更多 Push Up</div>
	<!--TODO ref onBottomLoaded-->
	<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<mt-loadmore ref="loadDemo" :bottom-all-loaded="allLoaded"
			:bottom-method="loadBottom" @bottom-status-change="statusChange">  
			<ul class="page-loadmore-list">
				<li v-for="item in list" class="page-loadmore-listitem">{{ item }}</li>
			</ul>
			<div slot="bottom" class="mint-loadmore-bottom">
				<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
				<span v-show="bottomStatus === 'loading'">
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

export default {
	data(){
		return {
			bottomStatus : '',
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
		var top = this.$refs.wrapper.getBoundingClientRect().top;
		//this.wrapperHeight = document.documentElement.clientHeight - top;
	},
	methods: {
		//push, drop, loading
		statusChange(status){
			console.log(status)
			this.bottomStatus = status;
		},
		loadBottom() {
	    	setTimeout(() => {
			    let last = this.list[this.list.length - 1];
			    if(last < 40){
			    	for (let i = 1; i <= 10; i++) {
				      this.list.push(last + i);
				    }
			    }else{
			    	this.allLoaded = true;
			    }
			    //TODO 手动触发事件
			    this.$refs.loadDemo.onBottomLoaded();
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
.mint-loadmore-bottom,.mint-loadmore-top {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
      color: #999;
	
      &.is-rotate {
        transform: rotate(180deg);
      }
    }
  }
</style>