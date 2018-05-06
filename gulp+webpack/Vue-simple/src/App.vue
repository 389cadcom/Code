<template>
<div id="app">
	<img src="./assets/img/logo.png">
	<p>{{ msg }}</p>
	<p class="green">Essential Links</p>
	<div class="chart">
		<span class="pie">0.52/1.561</span>
	</div>
	<ul>
		<li>
			<router-link to="/">Home</router-link>
		</li>
		<li>
			<router-link to="/edit">Edit</router-link>
		</li>
		<li>
			<router-link to="/about">About</router-link>
		</li>
		<li>
			<router-link to="/amap">AMap</router-link>
		</li>
	</ul>
	<router-view/>
</div>
</template>

<script>
//TODO 第三方插件
import '../static/js/jquery.peity.min.js'
import './assets/js/jq.green.js'

export default {
	name: 'app',
	data() {
		return {
			msg: '创建->初始化数据->编译模板->挂载DOM->渲染、更新->渲染、卸载'
		}
	},
	mounted() {
        $('.green').green();

		$('span.pie').peity('pie', {
			fill: ['#1ab394', '#d7d7d7', '#ffffff']
		})
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
}
p {
	margin-bottom: 10px;
}
.chart {
	margin: 10px 0;
}
ul {
	list-style-type: none;
	padding: 0;
	li {
		display: inline-block;
		margin: 0 10px;
		a {
			color: #42b983;
			&:hover {
				color: orange;
			}
		}
	}
}
</style>
