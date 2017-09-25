<template>
<div>
	<div class="page-title">CeckList</div>
	<div class="page-wrapper">
		<mt-checklist title="复选列表" v-model="checked"
			:options="options1"></mt-checklist>
		<mt-cell title="选中值">{{checked}}</mt-cell>
		<br>
		<mt-checklist align="right" title="复选列表" v-model="value2"
			:options="options2"></mt-checklist>
		<mt-cell title="选中值">{{value2}}</mt-cell>
		<br>
		<mt-radio title="单选列表" v-model="radio1"
			:options="options2"></mt-radio>
		<mt-cell title="选中值">{{radio1}}
			未读消息<mt-badge>10</mt-badge>
		</mt-cell>
		<mt-cell title="选中值">{{radio1}}
			<div slot="title">
				<mt-badge type="primary" size="large">10</mt-badge>
				<mt-badge type="success">10</mt-badge>
				<mt-badge type="warning">10</mt-badge>
				<mt-badge type="error" size="small">10</mt-badge>
				<mt-badge color="gray" size="small">10</mt-badge>
			</div>
		</mt-cell>
	</div>
</div>
</template>

<script>
import {Checklist, Cell, Radio, Badge} from 'mint-ui';
Vue.component(Checklist.name, Checklist)
Vue.component(Cell.name, Cell)
Vue.component(Radio.name, Radio)
Vue.component(Badge.name, Badge)

export default {
	data(){
		return {
			checked: ['B'],
			checked1: ['A'],
			options1: ['A', 'B', 'C'],
			value2: [],
			radio1: '3',
			options2: [
				{label:'One', value:'1'},
				{label:'Two', value:'2'},
				{label:'Three', value:'3'},
				{label:'Four', value:'4', disabled:true}
			]
		}
	}
}
</script>

<style lang="scss">
</style>