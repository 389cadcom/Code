/*
	vmapstate, vmapgetters, vmapmutations, vmapactions

	vcommit, vdispatch

	vstore | 2, vgetter, vmutation, vaction, vmodule

	vstore-import
*/
/**
	1.把多个组件的共享状态抽取，以一个全局单例模式管理
	2.state存取多个组共享的数据
	3.mutation:通过mutation对象中方法，改变state中的数据--this.$store.commit('method')触发
	4.action: 异步操作后提交mutation更改数据--this.$store.dispatch('ajax')
*/
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
		userInfo(state, payload){								//state, payload
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
	state,
	modules: { a: moduleA}					//$store.state.a.count
})