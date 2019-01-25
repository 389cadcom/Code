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
		userInfo(state, res){
			state.user = res
		}
	},
	actions: {
		getUser({commit}){
			axios.get('url').then(res=>{
				var data = res.data;
				commit('userInfo', data)
			})
		}
	}
})