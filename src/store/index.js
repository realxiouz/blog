import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // qnToken: '',
  // token: '',
  user: {}
}

export default new Vuex.Store({
  state,
  mutations: {
    // setQNToken(state, token) {
    //   state.qnToken = token
    // },
    // setToken(s, t) {
    //   s.token = t
    // },
    setUser(s, o) {
      s.user = o
    }
  }
})
