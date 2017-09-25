<template>
<div class="app">
    <div>Demo App2</div>
    <h1>{{ msg }}</h1>
    <br>
</div>
</template>

<script>
export default {
    data(){
        return {
            msg: 'Demo message!'
        }
    },
}
</script>

<style lang="scss" scoped>
$color: #333;
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color;
  margin-top: 60px;
  background: url(/static/img/logo.png) left top no-repeat;
}
</style>