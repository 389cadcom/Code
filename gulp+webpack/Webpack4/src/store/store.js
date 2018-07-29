import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//数据状态
const state = {
  count: 0,
  list: [],
  todos: [
    { id: 1, text: 'getters', done: true },
    { id: 2, text: 'mutations', done: false },
    { id: 3, text: 'actions', done: true },
  ]
}

const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}

//同步方法集
const mutations = {
  mul(state, arg){
    console.log(arg);
    setTimeout(function() {
      state.count--
    }, 1000);
  },
  add(state, arg){
    console.log(arg);

    state.count++
  }
}
const actions = {

}

//实例化
let store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store;
