<template>
<div class="">
	<div class="page-title">加载更多 infinite</div>
	<div class="page-wraper">
		<mt-button size="large" @click.native="openIndicator">Indicator</mt-button>
		<mt-button size="large" @click.native="openIndicatorSpinner">配置Indicator参数</mt-button>
	</div>
	<p class="page-infinite-loading">
		<mt-spinner type="fading-circle"></mt-spinner>正在加载中...
	</p>
</div>
</template>

<script>
import { Button, Indicator, Spinner } from 'mint-ui';
Vue.component(Button.name, Button)
Vue.component(Spinner.name, Spinner)

export default {
	data(){
		return {
			loading : false,
			list: []
		}
	},
	created(){ },
	methods: {
		openIndicator() {
	    	Indicator.open();
	    	setTimeout(()=>Indicator.close(), 2000);
		},
		openIndicatorSpinner() {
	    	Indicator.open({ spinnerType: 'fading-circle', text: '加载中...' });
	    	setTimeout(()=>Indicator.close(), 2000);
		}
	},
	beforeDestroy(){
		Indicator.close();
	}
}
</script>

<style lang="scss">

</style>