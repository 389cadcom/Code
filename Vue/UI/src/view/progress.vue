<template>
<div class="page">
	<h1 class="page-title">Toast</h1>
	<div class="page-wrapper">
		<mt-progress :value="20" :bar-height="5">
			<div slot="start">20%</div>
			<div slot="end">100%</div>
		</mt-progress>
		
		<mt-range :value="5" :bar-height='3' :max="20" :disabled="true">
		</mt-range>
		<mt-range v-model="range" :value="2" :bar-height='3' :max="20">
			<div slot="start">0</div>
        	<div slot="end">20</div>
		</mt-range>
		<!--<p>{{range}}</p>-->
	</div>
</div>
</template>

<script>
import { Progress, Range } from 'mint-ui';
Vue.component(Progress.name, Progress)
Vue.component(Range.name, Range)

export default {
	data(){
		return {
			range: 10,
			item: {start:2, end:20}
		}
	}
}
</script>

<style lang="scss">
</style>