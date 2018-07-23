<template>
  <div class="list-wrapper list-wrapper-hook"  ref="wrapper">
    <div class="container">
      <div class="top-tip">
        <span class="refresh-hook"><img src='./assets/loading.gif' style="vertical-align:middle; height: 22px"/> 下拉刷新</span>
      </div>
      <!-- 列表 -->
      <ul class="list-content list-content-hook">
        <li class="list-item" v-for="i in data" :key="i">
          <div class="avatar">
            <img :src='"./assets/img/2.png"' width="100" height="100" />
          </div>
          <div class="text">
            <p>{{i}}--只会放肆,不会说谎,好青春也是谁不想要一个深情却刺激</p>
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
      noMoreData: false,
			dropUp: '点击上或拉加载更多',
		}
  },
	created() {
		this.loadData()
  },
  watch: {
    data(){
      this.$nextTick(()=>{
        this.scroller && this.scroller.refresh();
      })
    }
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
					if(this.scroll.maxScrollY > pos.y + 50 && !this.noMoreData){
            this.dropUp = '加载中...';
            this.dropDown = true
					}
				})

				this.scroll.on('pullingDown', ()=> this.pullDown())

				this.scroll.on('pullingUp', ()=> this.pullUp())
			})
    },
    pullDown(){
      this.scroll.disable()
      setTimeout(()=>{
        this.data = 10;
        this.scroll.finishPullDown()
        this.scroll.enable()
      }, 2000)
    },
    pullUp(){
      if(this.noMoreData || this.dropDown) return;
      this.fetchData()
    },
    fetchData(){
      console.log('object');
      var vm = this;
      setTimeout(function(){
        vm.data = vm.data + 10;
        if(vm.data >= 30){
          vm.dropUp = "没有更多数据";
          vm.noMoreData = true;
        }else{
          vm.dropUp = "点击上或拉加载更多";
        }
        vm.dropDown = false
        vm.scroll.finishPullUp()
      }, 2000)
    }
	}
}
</script>

<style>
ul, li, p{margin: 0;padding: 0;}
/* 列表容器 */
.list-wrapper {
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #eee;
    overflow: hidden;
    font-size: 13px;
}

.list-wrapper .list-content {
    background: #fff;
    padding: 10px;
}

.list-wrapper .list-item {
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.list-wrapper .list-item .avatar{
    flex: 0 0 100px;
    border: 1px solid #ddd;
}

.list-wrapper .list-item .text{
    position: relative;
    flex: 1;
    padding-left: 10px;
}

.list-wrapper .list-item .text h2{
    font-size: 16px;
    font-weight: normal;
    color: rgb(7, 17, 27);
}

.list-wrapper .list-item .text span{
    position: absolute;
    bottom: 20px;
    color: rgba(7, 17, 27, 0.7);
}

/* 下拉、上拉提示信息 */
.top-tip{
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 1;
    width: 100%;
    height:40px;
    line-height:40px;
    text-align:center;
    color: #555;
}
.bottom-tip{
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #777;
    background: #f2f2f2;
}
</style>
