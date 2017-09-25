<template>
<div class="">
	<div class="page-title">加载更多 infinite</div>
	<div class="page-wraper">
	<ul v-infinite-scroll="loadMore" class="load-more"
	  	infinite-scroll-disabled="loading"
	  	infinite-scroll-distance="200">
	  	<li v-for="item in list">{{ item }}</li>
	</ul>
	<p v-show="loading" class="page-loading">
		<mt-spinner type="fading-circle"></mt-spinner>正在加载中...
	</p>
	</div>
</div>
</template>

<script>
import { Spinner, InfiniteScroll } from 'mint-ui'
Vue.component(Spinner.name, Spinner);

Vue.use(InfiniteScroll);			//v-infinite-scroll
	
export default {
	data(){
		return {
			loading : false,
			list: []
		}
	},
	created(){
		for (let i = 1; i <= 20; i++) {
	      this.list.push(i);
	    }
	},
	methods: {
		loadMore() {
	    	this.loading = true;
	    	setTimeout(() => {
			    let last = this.list[this.list.length - 1];
			    for (let i = 1; i <= 10; i++) {
			      this.list.push(last + i);
			    }
			    this.loading = false;
			}, 1500);
		}
	}
}
</script>

<style lang="scss">
.page-wraper ul.load-more li{display: block;line-height: 42px; border-bottom: 1px solid #eee;}
.page-loading {
    text-align: center;
    line-height: 32px;
    div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
}
</style>