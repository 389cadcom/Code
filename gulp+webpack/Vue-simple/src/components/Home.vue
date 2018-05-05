<template>
  <div class="home">{{msg}}</div>
</template>

<script>
export default {
  data(){
      return {
          msg: 'Hi Home'
      }
  },
  created () {
      console.log('data is create');
  },
  mounted () {
      console.log('el is created!');
  }
}
</script>
<style scoped>
.home{color: red}
</style>
