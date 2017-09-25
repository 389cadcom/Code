<template>
<div class="page-toast">
	<h1 class="page-title">DateTime Picker</h1>
	<div class="page-wrapper">
		<mt-button type="primary" size="large" @click="open">Datetime</mt-button>
		<mt-datetime-picker ref="picker1"  v-model="pickerValue" :modal="false" 
			year-format="{value}年" month-format="{value}月" :startDate="date"
			date-format="{value}日" 
			@confirm="hadler">
		</mt-datetime-picker>
	</div>
</div>
</template>

<script>
import { Button, DatetimePicker } from 'mint-ui';
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)

export default {
	data(){
		return {
			//2017-09-21 17:10
			date: new Date('2014/12/29 8:40'),
			pickerValue: '',
		}
	},
	created(){
		
	},
	methods: {
		open(){
			this.$refs.picker1.open();
		},
		hadler(val){
			var d = new Date(this.pickerValue);
			console.log(d.toLocaleDateString() + " " + d.toLocaleTimeString() )
		}
	}
}
</script>

<style lang="scss">
.page-picker-desc{
   margin: 10px 0 50px;
   color: #666;
}
</style>