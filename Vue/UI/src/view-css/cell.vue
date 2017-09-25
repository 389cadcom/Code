<template>
<div>
	<div class="page-title">Cell</div>
	<div class="page-wrapper">
		<mt-cell title="标题文字"></mt-cell>
		<mt-cell title="标题文字" value="说明内容"></mt-cell>
		<mt-cell title="标题文字" icon="back" value="说明内容"></mt-cell>
		<mt-cell title="标题文字" is-link>
			<!--<span style="color: red;">元素内容</span>-->
			<img slot="icon" src="../assets/100x100.png" width="42"/>
			<mt-button size="small" type="primary" icon="back">按钮</mt-button>
		</mt-cell>
		<mt-cell title="带链接" label="原生的链接" to="/header"></mt-cell>
		<mt-cell title="带链接" is-link :to="{name: 'Toast'}">
			<label>说明内容</label>
			<label>说明内容</label>
			<label>说明内容</label>
		</mt-cell>
	</div>
</div>
</template>

<script>
import {Cell} from 'mint-ui';
Vue.component(Cell.name, Cell)

export default {
	data(){
		return {
			msg: 'msg'
		}
	}
}
</script>

<style lang="scss">
</style>