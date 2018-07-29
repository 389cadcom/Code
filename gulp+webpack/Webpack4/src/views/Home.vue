<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, i) in datas" :key="i">
        {{item.text}}
      </li>
    </ul>
    <h2>Vue-Router Page</h2>
    <ul>
      <li>
        <router-link to="/edit">edit</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <router-link tag="li" to="/vuex">Store</router-link>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      msg: 'webpack4 + vue'
    }
  },
  computed: {
    datas(){
      return this.$store.getters.doneTodos
    },
    ...mapGetters(['list'])
  }
}
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
