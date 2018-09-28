<template>
  <div id="app">
    <p><img src="../static/images/ma.gif"/></p>
    <img src="./assets/img/logo.png">
    <hr>
    <div class="menu">
      <router-link to="/home">Home</router-link>
      <router-link to="/edit">Edit</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/me">Me</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
   mounted(){
    console.log('object');
  }
}
</script>

<style lang="scss">
@import url('./assets/style/base.css');

ul,li{
  list-style: none;
  padding: 0;
  margin: 15px;
}
//vue默认内容
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu a{display: inline-block; padding: 0 10px;}
</style>
