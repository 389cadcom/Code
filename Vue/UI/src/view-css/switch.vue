<template>
<div>
	<div class="page-title">Cell</div>
	<div class="page-wrapper">
		<mt-switch v-model="switch1">
			<label v-text="switch1"></label>
		</mt-switch>
		<mt-switch v-model="switch2">
			<label v-text="switch2"></label>
		</mt-switch>
		<br>
		<mt-cell :title="'标题文字'+val">
			<!--<img slot="icon" src="../assets/100x100.png" width="42"/>-->
			<mt-switch v-model="val" @change="handleChange"></mt-switch>
		</mt-cell>
	</div>
</div>
</template>

<script>
import {Cell, Switch} from 'mint-ui';
Vue.component(Cell.name, Cell)
Vue.component(Switch.name, Switch)

export default {
	data(){
		return {
			switch1: false,
			switch2: true,
			val: false
		}
	},
	methods: {
		handleChange(e){
			console.log(e)
		}
	}
}
</script>

<style lang="css">
.mint-switch{padding-bottom: 10px;}	
</style>