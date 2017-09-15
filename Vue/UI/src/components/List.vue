<template>
<div id="home">
	<h1>list</h1>
	<ul class="tabs">
		<li v-for="(tab, i) in tabbars">
			<!--:class="{ active:i==0 }"-->
			<!--:class="[i==0?'active':'']"-->
			<router-link :to="tab.link" :class="">{{tab.name}}</router-link>
		</li>
	</ul>
	<hr>
	子视图
    <router-view></router-view>
</div>
</template>

<script>
export default {
	data(){
		return {
			tabbars:[
				{name: 'demo', link: '/list/demo'},
				{name: 'msg', link: '/list/msg'},
				{name: 'about', link: '/list/about'},
			]
		}
	}
}
</script>

<style>
.active{color: red;}
</style>