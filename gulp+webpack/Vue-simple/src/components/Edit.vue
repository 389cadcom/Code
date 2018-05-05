<template>
  <div class="edit">{{msg}}</div>
</template>

<script>
export default {
  data(){
      return {
          msg: 'Hi Edit'
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
<style>
.edit{color: yellowgreen}
</style>
