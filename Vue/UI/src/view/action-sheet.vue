<template>
<div class="page-toast">
	<h1 class="page-title">Toast</h1>
	<div class="page-wrapper">
		<mt-button size="large" type="primary" @click.navive='openAction'>点击上拉 action sheet</mt-button>
		<mt-button size="large" @click.navive='openAction2'>不带取消按钮的 action sheet</mt-button>
		
		<mt-actionsheet :actions="actions" v-model="show1"></mt-actionsheet>
		<mt-actionsheet :actions="actions2" v-model="show2" cancel-text=''></mt-actionsheet>
	</div>
</div>
</template>

<script>
import { Actionsheet, Button } from 'mint-ui';
Vue.component(Button.name, Button)
Vue.component(Actionsheet.name, Actionsheet)

/*
 :closeOnClickModal = false
 :modal = false
 */

export default {
	data(){
		return {
			show1: false,
			show2: false,
			actions: [],
			actions2: []
		}
	},
	mounted(){
		this.actions = [
			{ name: '拍照', method: this.takePhoto },
			{ name: '从相册中选择', method: this.openAlbum }
		]
		this.actions2 = [
			{ name: '确定' },
			{ name: '返回上一步', method: this.goBack }
		]
	},
	methods: {
		openAction(){ this.show1 = true },
		openAction2(){ this.show2 = true },
		takePhoto(){
			console.log("takePhoto")
		},
		goBack(){
			history.go(-1);
		}
	}
}
</script>

<style lang="scss">
</style>