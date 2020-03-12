import Vue from "vue";
import VueRouter from "vue-router";
import roters from "./module/index.js";

Vue.use(VueRouter);

const routes = [
  
];

const router = new VueRouter({
  // mode: 'has',
  routes: [
    {
      path: "/",
      name: "首页",
      redirect: '/project',
      component: () =>
      import(/* webpackChunkName: "common" */ "@/views/common/PageView.vue")
    },
    ...roters,
    {
      path: "/404",
      name: "NotFound",
      meta: {
        permission: "public"
      },
      component: () =>
        import(/* webpackChunkName: "not-found" */ "../views/common/404.vue")
    }
  ],
});

export default router;
