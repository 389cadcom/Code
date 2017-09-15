<template>
<div class="infinite">
<ul
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="50">
  <li v-for="item in list">{{ item }}</li>
</ul>
<p v-show="loading" class="page-infinite-loading">
	<mt-spinner type="fading-circle"></mt-spinner> 加载中...
</p>
</div>
</template>

<script>
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
			}, 2500);
		}
	}
}
</script>

<style lang="scss">
.infinite ul li{display: block;line-height: 42px; border-bottom: 1px solid #eee;}
.page-infinite-loading {
    text-align: center;
    line-height: 32px;
    div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
}
</style>