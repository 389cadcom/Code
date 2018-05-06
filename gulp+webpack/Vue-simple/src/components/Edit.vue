<template>
  <div class="edit">{{msg}}</div>
</template>

<script>
import log from '../assets/js/utils';
export default {
  data(){
      return {
          msg: 'Hi Edit'
      }
  },
  created () {
      log('this is Edit')
  },
  mounted () {

  }
}
</script>
<style>
.edit{color: yellowgreen}
</style>
