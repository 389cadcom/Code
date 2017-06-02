<template>
<div id="app">
    <v-header></v-header>
    <router-view></router-view>
</div>
</template>

<script>
import vHeader from './components/Header.vue'

export default {
  components:{
  	  vHeader
  }
}
</script>

<style lang="scss">
 @import "assets/sass/style";
 @import "assets/sass/list";	
 
#app{margin: 0 10px;}
</style>
