<template>
  <div class="about">{{msg}}</div>
</template>

<script>
export default {
  data(){
      return {
          msg: 'Hi About'
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
.about{color: blue}
</style>
