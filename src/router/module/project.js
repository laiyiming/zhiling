export default [
  {
    path: "/project",
    name: "ProjectIndex",
    meta: {
      title: "项目"
    },
    component: () =>
      import(
        /* webpackChunkName: "ProjectIndex" */ "@/views/project/index.vue"
      ),
    children: [
      // {
      //   path: "project-content",
      //   name: "ProjectContent",
      //   meta: {
      //     title: "项目内容"
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "ProjectContent" */ "@/views/project/ProjectContent.vue"
      //     )
      // }
    ]
  },
  {
    path: "/project-content",
    name: "ProjectContent",
    meta: {
      title: "项目内容"
    },
    component: () =>
      import(
        /* webpackChunkName: "ProjectContent" */ "@/views/project/ProjectContent.vue"
      )
  }
];
