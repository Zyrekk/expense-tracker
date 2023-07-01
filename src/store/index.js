import { createStore } from 'vuex'

export default createStore({
  state: {
    login:"test",
    password:"test",
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
