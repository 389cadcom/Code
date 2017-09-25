<template>
<div class="page">
	<h1 class="page-title">Toast</h1>
	<div class="page-wrapper">
		<mt-navbar v-model="selected">
	        <mt-tab-item id="1"> 选项一 </mt-tab-item>
	        <mt-tab-item id="2"> 选项二 </mt-tab-item>
	    </mt-navbar>
		<mt-tab-container v-model="selected" swipeable>
			<mt-tab-container-item id="1">
	          	<p v-for="n in 10">选项一  {{n}}</p>
	        </mt-tab-container-item>
			<mt-tab-container-item id="2">
	          	<p v-for="n in 10">选项一  {{n}}</p>
	        </mt-tab-container-item>
		</mt-tab-container>
		
	</div>
</div>
</template>

<script>
import {Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

export default {
	data(){
		return {
			msg: 'msg',
			selected: '1'
		}
	}
}
</script>

<style lang="scss">
</style>