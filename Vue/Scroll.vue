<template>
  <div class="list-wrapper list-wrapper-hook"  ref="wrapper">
    <div class="container">
      <div class="top-tip">
        <span class="refresh-hook">下拉刷新</span>
      </div>
      <!-- 列表 -->
      <ul class="list-content list-content-hook">
        <li class="list-item" v-for="i in data" :key="i">
          <div class="avatar">
            <img :src='"./assets/img/2.png"' width="100" height="100" />
          </div>
          <div class="text">
            <h2>{{i}}--只会放肆,不会说谎,好青春也是谁不想要一个深情却刺激</h2>
            <span>2016-11-23</span>
          </div>
        </li>
      </ul>
      <!-- 
        1、底部提示信息 
        2、这里有一种情况,就是没有更多数据时,这里的文本应该显示"暂无更多数据"
      -->
      <div class="bottom-tip">
        <span class="loading-hook">{{dropUp}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	data() {
		return {
			scroll: null,
			data: 0,
			dropDown: false,
			dropUp: '点击上或拉加载更多',
		}
	},
	created() {
		this.loadData()
	},
	methods: {
		loadData() {
			this.data = 10
			this.$nextTick(() => {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrapper, {
						pullDownRefresh: {
							threshold: 40,
							stop: 40 
						},
						pullUpLoad: {
							threshold:-40,
						}
					}) 
				}else {
					this.scroll.refresh();
				};
				this.scroll.on('scroll', pos => {
					if(this.scroll.maxScrollY > pos.y + 50){
						this.dropUp = '加载中...';
					}
				})

				this.scroll.on('pullingDown', ()=>{
					setTimeout(()=>{
						this.scroll.finishPullDown()
					}, 2000)
				})
				this.scroll.on('pullingUp', this.loadMore)
			})
		},
		loadMore(){
			var vm = this;
			setTimeout(function(){
				vm.data = vm.data + 10;
				console.log(vm.data);
				if(vm.data >= 30){
					vm.dropUp = "没有更多数据";
					vm.scroll.off('pullingDown', vm.loadMore)
				}else{
					vm.dropUp = "点击上或拉加载更多";
				}
				
				vm.scroll.finishPullUp()
			}, 2000)
		}
	}
}
</script>

<style>

</style>