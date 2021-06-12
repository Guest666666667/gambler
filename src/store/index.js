import Vue from 'vue'
import Vuex from 'vuex'
import request from "../api/request.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountName: '',//账户名
    accountBalance: 0,//账户余额
    status: false,//登录状态
  },
  mutations: {
    //设置账户名
    setAccoutName(state, name) {
      state.accountName = name;
    },
    setAccoutBalance(state, balance) {
      state.accountBalance = balance;
    },
    setStatus(state, status) {
      state.status = status
    }
  },
  actions: {
  },
  modules: {
  }
})
