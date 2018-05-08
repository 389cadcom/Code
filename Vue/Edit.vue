<template>
  <div class="page-loadmore">
    <p class="page-loadmore-desc">translate : {{ translate }}</p>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @translate-change="translateChange" :top-distance="40"
        @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul class="page-loadmore-list">
          <li :key="i" v-for="(item,i) in list" class="page-loadmore-listitem">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <!-- <mt-spinner type="snake"></mt-spinner> -->
            loading...
          </span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            loading...
            <!-- <mt-spinner type="snake"></mt-spinner> -->
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
console.log($.fn.jquery)
export default {
	name: 'Edit',
	data() {
		return {
			list: [],
        topStatus: '',
        bottomStatus: '',
        translate: 0,
        wrapperHeight: 0,
        moveTranslate: 0
		}
	},
	methods: {
		handleTopChange(status) {
			this.moveTranslate = 1
			this.topStatus = status
		},
		handleBottomChange(status) {
			this.bottomStatus = status
		},
		translateChange(translate) {
			const translateNum = +translate
			this.translate = translateNum.toFixed(2)
			this.moveTranslate = (1 + translateNum / 70).toFixed(2)
		},
		loadTop() {
			setTimeout(() => {
				let firstValue = this.list[0]
				for (let i = 1; i <= 10; i++) {
					//this.list.unshift(firstValue - i)
				}
				this.$refs.loadmore.onTopLoaded()
			}, 1500)
		},
		loadBottom() {
			setTimeout(() => {
				let firstValue = this.list[0]
				for (let i = 1; i <= 10; i++) {
					//this.list.unshift(firstValue - i)
				}
				this.$refs.loadmore.onBottomLoaded()
			}, 1500)
		}
	},
	created() {
		for (let i = 1; i <= 20; i++) {
			this.list.push(i)
		}
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top -50;
  }
}
</script>

<style>
.page-loadmore{width: 100%;overflow-x: hidden;}

.page-loadmore-listitem{height: 50px;line-height: 50px;border-bottom: solid 1px #eee;text-align: center;}
.page-loadmore-listitem:first-child{border-top: solid 1px #eee;}
.page-loadmore-wrapper{margin-top: -1px;overflow: scroll;}

.mint-loadmore-top span{display: inline-block; transition: 0.2s linear;vertical-align: middle;}
.mint-loadmore-top span.is-rotate{transform: rotate(180deg);}
.mint-loadmore{overflow: hidden}
.mint-loadmore-content.is-dropped{transition: .2s}
.mint-loadmore-top, .mint-loadmore-bottom{text-align: center;height: 50px;line-height: 50px}
.mint-loadmore-top{margin-top: -50px}
.mint-loadmore-bottom{margin-bottom: -50px}
.mint-loadmore-spinner{display: inline-block;margin-right: 5px;vertical-align: middle}
.mint-loadmore-text{vertical-align: middle}
</style>
