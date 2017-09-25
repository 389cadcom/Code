<template>
<div class="page-toast">
	<h1 class="page-title">Message Box</h1>
	<div class="page-wrapper">
		<mt-button size="large" type="primary" @click.navive='openMsg'>MessageBox</mt-button>
		<mt-button size="large" @click.navive='openAlert'>Alert</mt-button>
		<mt-button size="large" @click.navive='openConfirm'>Confirm</mt-button>
		<mt-button size="large" @click.navive='openPrompt'>Prompt</mt-button>
	</div>
</div>
</template>

<script>
import { MessageBox, Button } from 'mint-ui';
Vue.component(Button.name, Button)

export default {
	data(){
		return {
			msg: 'msg'
		}
	},
	methods: {
		openMsg(){
			//MessageBox('提示', '操作成功').
			MessageBox({
				title: '提示',
				message: '确定执行此操作?',
				showCancelButton: true
			}).
			then(action=>{
				console.log(action)
			}, cancel=>{
				console.log(cancel)
			});
		},
		openAlert(){
			MessageBox.alert('操作内容', '提示').then( action =>{
				console.log(action + '关闭')
			})
		},
		openConfirm(){
			MessageBox.confirm('选择确认内容', '提示').then( action =>{
				console.log(action)
			}, cancel=>{
				console.log(cancel)
			})
			
		},
		openPrompt(){
			MessageBox.prompt(' ', '确认').then(({ value }) => {
	          if (value) {
	              console.log(value)
	          }
	        });
		}
	}
}
</script>

<style lang="scss">
</style>