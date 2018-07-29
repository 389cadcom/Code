<template>
  <div id="app">
    <img src="./assets/images/logo.png" style="height:64px">
    <p>{{count}}</p>
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMuntations} from 'vuex'

export default {
  name: 'App',
  data(){
    return {
      count: this.$store.state.count,
    }
  },
  mounted(){
    console.log(this.$store.state.count);
  },
  methods: {

  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
