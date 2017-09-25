<template>
<div class="page">
	<h1 class="page-title">Popup</h1>
	<div class="page-wrapper">
		<mt-button size="large" type="primary" @click.navive='show=true'>Popup</mt-button>
		<mt-button size="large" @click.navive='showRight=true'>Right</mt-button>
		<mt-button size="large" @click.navive='showBottom = true'>Bottom</mt-button>
	</div>
	<mt-popup v-model="show" position="top" :modal="false">
		更新成功
	</mt-popup>
	<mt-popup v-model="showRight" class="mint-popup-right" position="right" :modal="false">
		<mt-button @click.native="showRight = false" size="large" type="primary">关闭 popup</mt-button>
	</mt-popup>
	<!--<mt-actionsheet :actions="action" v-model="showBottom"></mt-actionsheet>-->
	<mt-popup v-model="showBottom" position="bottom" class="mint-popup-bottom">
		<span>操作失败</span>
	</mt-popup>
</div>
</template>

<script>
import { Button, Popup } from 'mint-ui';
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)

export default {
	data(){
		return {
			show: false,
			showRight: false,
			showBottom: false,
			action: []
		}
	},
	created(){
		this.action = [
			{name:'相册'},
			{name:'选择相册'}
		]
	},
	watch:{
		show(val){
			if (val) {
	          setTimeout(() => {
	            this.show = false;
	          }, 2000);
	        }
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
.page .mint-popup {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    background-color: rgba(0,0,0,.7);
    backface-visibility: hidden;
}	
.page .mint-popup.mint-popup-right{
	height: 100%;
	width: 100%;
	background: #fff;
	
	.mint-button{
		position: absolute;
        width: 90%;
        top: 50%;
        left: 5%;
        transform: translateY(-50%);
	}
}
</style>