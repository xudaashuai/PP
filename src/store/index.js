import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    users:[]
  },
  mutations: {
    users(state, data) {
      state.users=data.users
    },
    login(state, data) {
      state.username = data.username
    }
  },
  getters: {
    friends: state => {
      return state.users.filter(user => user!=state.username)
    },
    username: state => {
      return state.username
    }
  }
})
