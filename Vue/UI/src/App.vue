<template>
	<div class="app">
		<router-link class="page-back" v-if="visible" to="/">
			<i class="mintui mintui-back"></i>
		</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	computed: {
		visible() {
			var isExist = ['/', '/header', '/search'].indexOf(this.$route.path) < 0;
			return isExist;
		}
	}
}
</script>
<style lang="scss">
/*@import './assets/font/iconfont.css';*/


/*@import 'path$/mint-ui/lib/style.css';*/

html,
body {
	background-color: #fafafa;
	-webkit-overflow-scrolling: touch;
	user-select: none;
	margin: 0;
}

a {
	color: inherit;
	text-decoration: none;
}

.page-back {
	display: inline-block;
	position: absolute;
	top: 12px;
	left: 10px;
	width: 40px;
	height: 40px;
	text-align: center;
	i {
		font-size: 24px;
		line-height: 40px;
	}
}

ul {
	padding-left: 10px;
}

.page-wrapper button:not(:last-child) {
	margin-bottom: 10px;
}
</style>



