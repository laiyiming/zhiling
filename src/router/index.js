import Vue from "vue";
import VueRouter from "vue-router";
import roters from "./module/index.js";

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'has',
  routes: [
    {
      path: "/",
      name: "首页",
      redirect: "/project",
      component: () =>
        import(/* webpackChunkName: "common" */ "@/views/common/PageView.vue")
    },
    ...roters,
    {
      path: "/logo",
      name: "登入页",
      component: () =>
        import(/* webpackChunkName: "logo" */ "@/views/logo/index.vue")
    },
    {
      path: "/logo/register",
      name: "注册",
      component: () =>
        import(/* webpackChunkName: "logo" */ "@/views/logo/register.vue")
    },
    {
      path: "/logo/reset",
      name: "重置密码",
      component: () =>
        import(/* webpackChunkName: "logo" */ "@/views/logo/reset.vue")
    },
    {
      path: "/404",
      name: "NotFound",
      meta: {
        permission: "public"
      },
      component: () =>
        import(/* webpackChunkName: "not-found" */ "../views/common/404.vue")
    }
  ]
});

export default router;
