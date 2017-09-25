<template>
<div>
	<!--<div class="page-title">Search</div>-->
	<div class="page-search">
		<mt-search v-model="value" autofocus placehold="搜索" :result="filterResult"></mt-search>
	</div>
</div>
</template>

<script>
import {Search} from 'mint-ui';
Vue.component(Search.name, Search)

export default {
	data(){
		return {
			value: '',
			results: [
				'Apple',
		        'Banana',
		        'Orange',
		        'Durian',
		        'Lemon',
		        'Peach',
		        'Cherry',
		        'Berry',
		        'Core',
		        'Fig',
		        'Haw',
		        'Melon',
		        'Plum',
		        'Pear',
		        'Peanut',
		        'Other'
			]
		}
	},
	computed:{
		filterResult(){
			var arr = [];
			arr = this.results.filter(val=>{
				return new RegExp(this.value, 'i').test(val);
			})
			return arr;
		}
	}
}
</script>

<style lang="scss" scoped>
body{margin: 0 !important;}
.page-search{height: 100%;}
</style>