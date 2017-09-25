<template>
<div>
	<mt-header fixed title="固定在顶部">
		<!--<mt-button icon="back" slot="left">返回</mt-button>-->
		<router-link slot="left" to="/">
			<mt-button icon="back">返回</mt-button>
		</router-link>
		<mt-button slot="left">关闭</mt-button>
  		<mt-button icon="more" slot="right"></mt-button>
	</mt-header>
	<p>{{selected}}</p>
	<mt-tab-container v-model="selected" swipeable>
		<mt-tab-container-item id="通讯录">
          	<p v-for="n in 10">通讯录  {{n}}</p>
        </mt-tab-container-item>
		<mt-tab-container-item id="发现">
          	<p v-for="n in 10">发现  {{n}}</p>
        </mt-tab-container-item>
		<mt-tab-container-item id="我">
          	<p v-for="n in 10">我  {{n}}</p>
        </mt-tab-container-item>
	</mt-tab-container>
	
	<mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="通讯录">
        <img slot="icon" src="../assets/100x100.png" />通讯录
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="../assets/100x100.png">发现
      </mt-tab-item>
      <mt-tab-item id="我">
        <img slot="icon" src="../assets/100x100.png">我
      </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
import {Header, Button, Tabbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

export default {
	data(){
		return {
			msg: 'msg',
			selected: '通讯录'
		}
	}
}
</script>

<style lang="scss">
</style>