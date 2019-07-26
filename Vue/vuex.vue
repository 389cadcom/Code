//TODO require.context 动态全局注册组件页面
let contexts = require.context('../pages/', false, /\.vue$/)
console.log(invest);

contexts.keys().forEach(item => {
  var entity = contexts(item).default;
  // console.log(entity);
});


/**
state,		 this.$store.state.count
getters		 this.$store.getters.findBy()         (state, getters)
mutations  this.$store.commit('method', arg)		(state, arg)
actions		 this.$store.dispatch('mthod', arg)	  ({commit}, arg) => commit('method')  context | dispatch, commit, getters, state



扩展运算：...mapState, mapGetters, mapMutations, mapActions
computed: {
	...mapState({
		
	})
}

对象形式、数组形式
computed: mapState({})		mapState([])	同变量名
*/
<template>
  <div id="app">
    <img width="64" src="./assets/logo.png">
    <h3>Vuex</h3>
    <div class="handler">
      <button @click="addAction">add</button>
      <button @click="mulAction">mul</button>
    </div>
    <ul class="">
      <li>page:{{page}}</li>
      <li>computed映射：count0:{{count0}}</li>
      <li>computed映射count:{{count}}</li>
    </ul>
    <hr/>
    <h3>computed--mapGetters</h3>
    <ul class="">
      <li v-for="(item, i) in dos" :key="i">{{item.id}}:{{item.text}}</li>
    </ul>
    <h3>Actions异步</h3>
    <div class="handler">
      <button @click="asyncGet">get1</button>
      <button @click="asyncPromise">get2</button>
    </div>
    <hr/>
    <ul>
      <li v-for="(item, i) in $store.state.list" :key="i + 'j'">{{item.detail}}</li>
    </ul>
    <ol>
      <li v-for="(item, i) in arys" :key="i + 'i'">{{item.detail}}</li>
    </ol>
  </div>
</template>

<script>
import store from './store/page.js'           //全局对象, 简单store

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';


export default {
	name: 'app',
	data() {
		return {
      arys: [],
      msg: 'Vue vuex多组件共享状态管理',
      page: this.$store.state.count,           //FIXME: state --> 定义变量
		}
  },
  computed: {                                  //TODO 计算属性--辅助函数
    ...mapState({
      count0: state => state.count						 //重新定义变量名
    }),
    ...mapState(['count']),										 //同名变量属性

		//为了使用 this 不能使用箭头函数
		countPlus(state) {
		  return state.count + this.localCount;
		}

    arr(){
      return this.$store.getters.dos           //FIXME: getter
    },
    ...mapGetters(['dos'])
  },
  mounted(){
    console.dir(this.$store.getters)
    this.log(this.$store.getters.getById(2))
  },
	methods: {
    mutationHandler(){
      this.$store.commit('add', 'commit')     //FIXME: mutations   {type:'add', args:''}
    },
    ...mapMutations([													//同方法名
      'add', 'mul'
    ]),
    //异步
    ...mapActions([
      'addAction',
      'mulAction',
    ]),
    asyncGet(){
      this.$store.dispatch('asyncGet')
    },
    asyncPromise(){
      this.$store.dispatch('actionPromise').then( res => {
        if(!res && !res.data) return;
        this.arys = res.data.data
        // console.log(res.data.data);
      })
    }
	}
}
</script>

<style lang="scss">

</style>
