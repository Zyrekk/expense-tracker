import { createStore } from 'vuex'

export default createStore({
  state: {
    login:"test",
    password:"test",
    categories:[{
      name: "food",
      description: "I like eat pizza",
      summary:1576,
    }, {
      name: "car",
      description: "My car is broken",
      summary:1276,
    }]
  },
  getters: {
  },
  mutations: {
    handlePageChange(state,page){
      state.page=page;
    }
  },
  actions: {
  },
  modules: {
  }
})
