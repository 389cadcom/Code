new Vuex.Store({
	state: {
		todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
	},
	getters: {
		doneTodo(state){
			return state.todos.filter(item => item.done)
		},
		getByID: (state) => (id) => {						//链式函数传参  this.$store.getters.getByID(1)
			return state.todos.find(item => item.id == id)	
		}
	},
	mutations: {
		userInfo(state, payload){						//state, payload
			state.user = res
		}
	},
	actions: {
		getUser({commit}, payload){							//context | dispatch, commit, getters, state
			axios.get('url').then(res=>{
				var data = res.data;
				commit('userInfo', data)
			})
		}
	}
})

/*
state,		 this.$store.state.count
getters		 this.$store.getters.findBy()         (state, getters)
mutations  this.$store.commit('method', arg)		(state, arg)
actions		 this.$store.dispatch('mthod', arg)	  ({commit}, arg) => commit('method')  

*/

store = new Vuex.Store({
	modules: { a: moduleA}					//$store.state.a.count
})