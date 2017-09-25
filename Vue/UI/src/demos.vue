<template>
<section class="page-demo">
	<div class="item" v-for="nav,i in navs" :key="i">
		<div class="page-title">{{nav.title}}</div>
		<mt-cell v-for="item,i in nav.list" :key='i' :to='item.path' is-link>
			<div slot="title">
	          <i :class="['indexicon', 'icon-' + item.icon]"></i>
	          <span>{{ item.name }}</span>
	        </div>
		</mt-cell>
	</div>
</section>
</template>

<script>
//import Vue from 'vue';
import {navs} from './router/route.js';
import {Cell} from 'mint-ui';

Vue.component(Cell.name, Cell);

export default {
	data(){
		return {
			navs: []
		}
	},
	created(){
		this.navs = navs;
	}
}
</script>

<style lang="scss">
.page-demo{
	padding-bottom: 50px;

    .indexicon {
      font-size: 22px;
      color: #26a2ff;
      display: inline-block;
      width: 26px;
      vertical-align: middle;

      &.icon-swipe {
        font-size: 26px;
      }

      &.icon-checklist {
        font-size: 18px;
      }
   }
  @at-root{
  	.page-title {
      font-size: 20px;
      margin: 20px 0;
      text-align: center;
      display: block;
      line-height: 1;
    }
  }
    .page-part {
      margin-bottom: 15px;
    }
}


</style>