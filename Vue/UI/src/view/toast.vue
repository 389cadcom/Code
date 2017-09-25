<template>
<div class="page-toast">
	<h1 class="page-title">Toast</h1>
	<div class="page-wrapper">
		<mt-button size="large" type="primary" @click.navive='openToast'>Toast</mt-button>
		<mt-button size="large" @click.navive='openToastIcon'>带icon的Toast</mt-button>
		<mt-button size="large" @click.navive='openToastPos'>自定义位置Toast</mt-button>
	</div>
</div>
</template>

<script>
import { Toast, Button } from 'mint-ui';
Vue.component(Button.name, Button)

export default {
	data(){
		return {
			msg: 'msg',
			toast: null
		}
	},
	methods: {
		openToast(){
			if(this.toast){
				this.toast.close();
			}
			this.toast = Toast('提示信息');
		},
		openToastIcon(){
			if(this.toast){
				this.toast.close();
			}
			this.toast = Toast({
				message: '带图标的Toast',
				iconClass: 'mintui mintui-success'
			});
		},
		openToastPos(){
			if(this.toast){
				this.toast.close();
			}
			this.toast = Toast({
				message: '自定义位置的Toast',
				position: 'top',
				duration: 5000
			});
		}
	},
	beforeDestroy(){
		if(this.toast){
			this.toast.close();
		}
	}
}
</script>

<style lang="scss">
</style>