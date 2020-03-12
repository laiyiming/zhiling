import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  ...modules,
  state: {
    pageLoading: false
  },
  mutations: {
    // 设置页面loading状态
    setPageLoading(state, status = false) {
      state.pageLoading = status;
    }
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage // 默认是 plugins: [createPersistedState()]，对应的是window.localstorage
    })
  ]
});
