import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins";
import * as components from "./components";
import "./plugins/element.js";
import * as socketApi from "@/api/socket"; // socket连接
import "@/styles/common.css";

Vue.config.productionTip = false;

Vue.prototype.socketApi = socketApi;
// 注册全局组件
Object.keys(components).forEach(name => Vue.component(name, components[name]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
