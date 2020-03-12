import Vue from "vue";
import api from "@/api";

/* eslint-disable no-param-reassign */
Vue.prototype.$api = api;
// export default {
//   install(Vue) {
//     Vue.prototype.$api = api;
//   }
// }
