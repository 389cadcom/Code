<template>
  <div class="hello">
    <h1>Store</h1>
    <p>count1: {{count1}}</p>
    <p>count: {{count}}</p>
    <p>numbers: {{numbers}}</p>
    <div>
      <input type="button" value="+" @click="add('add')" />
      <input type="button" value="-" @click="mul('mul')" />
      <input type="button" value="reduce" @click="reduce('mul')" />
    </div>
    <ul>
      <li v-for="item in doneTodos" :key="item.id">{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Store',
  data() {
    return {
      // ...mapState(['count', 'list'])
      count1: this.$store.state.count
    }
  },
  //computed: mapState(['count', 'list', 'todos'])    //state映射
  computed:{
    numbers(){
      return this.$store.state.count
    },
    ...mapGetters(['doneTodos']),                     //getters映射
    ...mapState({                                     //重命名data名称
			count: state => state.count,
			countAlias: 'count'
    }),
  },
  methods: {
    ...mapMutations(['add', 'mul']),                  //mutations映射
    ...mapMutations({                                 //重命名方法名称
      reduce: 'mul'             //$store.commit('add')
    })
  },
  mounted(){
    console.log(...mapState(['count', 'list']));
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
