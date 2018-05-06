<template>
  <div class="home">{{msg}}</div>
</template>

<script>
import log from '../assets/js/utils';
export default {
  data(){
      return {
          msg: 'Hi Home'
      }
  },
  created () {
      log('this is home')
  },
  mounted () {
    //   console.log('el is created!');
  }
}
</script>
<style scoped>
.home{color: red}
</style>
