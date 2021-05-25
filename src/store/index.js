import Vue from 'vue'
import Vuex from 'vuex'
import request from "../api/request.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accoutName: '',
  },
  mutations: {
    //设置账户名
    setAccoutName(state, name) {
      state.accoutName = name;
    }
  },
  actions: {
  },
  modules: {
  }
})
