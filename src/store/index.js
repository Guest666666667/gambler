import Vue from 'vue'
import Vuex from 'vuex'
import request from "../api/request.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountName: '未登录',
    accountBalance: 0,
  },
  mutations: {
    //设置账户名
    setAccoutName(state, name) {
      state.accountName = name;
    },
    setAccoutBalance(state, balance) {
      state.accountBalance = balance
    }
  },
  actions: {
  },
  modules: {
  }
})
