<template>
<div>
	<div class="page-title">Sinner</div>
	<div class="page-wrapper">
		<mt-cell title="snake">
			<mt-spinner type="snake" color="#26a2ff"></mt-spinner>
		</mt-cell>
		<mt-cell title="double-bounce">
			<mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
		</mt-cell>
		<mt-cell title="triple-bounce">
			<mt-spinner type="triple-bounce" color="#26a2ff"></mt-spinner>
		</mt-cell>
		<mt-cell title="fading-circle">
			<mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
		</mt-cell>
		<mt-spinner type="fading-circle" color="#f00"></mt-spinner>
	</div>
</div>
</template>

<script>
import {Cell, Spinner} from 'mint-ui'
Vue.component(Cell.name, Cell)
Vue.component(Spinner.name, Spinner)

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