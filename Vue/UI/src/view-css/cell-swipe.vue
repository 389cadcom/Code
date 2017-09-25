<template>
<div>
	<div class="page-title">Cell</div>
	<div class="page-wrapper">
		<mt-cell-swipe v-for="i in 10" :key="i" :title="'标题文字'+i" :right="rightButton">
			<span>说明</span>
		</mt-cell-swipe>
	</div>
</div>
</template>

<script>
import {CellSwipe, MessageBox} from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe)

export default {
	data(){
		return {
//			rightButton: []
		}
	},
	created(){
		this.rightButton = [ {
          content: '取消',
          style: { background: 'lightgray', color: '#fff' }
        },{
          content: '删除',
          style: { background: 'red', color: '#fff' },
          handler: (...arg) => {
          	console.log(arg)
          	  MessageBox.alert('删除内容')
          }
        }];
	}
}
</script>

<style lang="scss">
</style>