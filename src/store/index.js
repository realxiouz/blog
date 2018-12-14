import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  qnToken: ''
}

export default new Vuex.Store({
  state,
  mutations: {
    setQNToken(state, token) {
      state.qnToken = token
    }
  }
})
