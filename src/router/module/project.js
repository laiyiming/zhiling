export default [
  {
    path: '/project',
    name: 'Project',
    meta: {
      title: '项目',
    },
    redirect: '/project/index',
    component: () => import(/* webpackChunkName: "common" */ '@/views/common/PageView.vue'),
    children: [
      {
        path: 'index',
        name: 'Project-index',
        meta: {
          title: '项目列表',
        },
        component: () => import(/* webpackChunkName: "lessons-paper" */ '@/views/project/index.vue'),
      },
      {
        path: 'content',
        name: 'project-content',
        meta: {
          title: '项目内容',
        },
        component: () => import(/* webpackChunkName: "lessons-paper" */ '@/views/project/ProjectContent.vue'),
      },

    ]
  }
  // {
  //   path: "/project",
  //   name: "ProjectIndex",
  //   meta: {
  //     title: "项目"
  //   },
  //   redirect: '/project/index',
  //   component: () => import(/* webpackChunkName: "common" */ '@/views/common/PageView.vue'),
  //   children: [
  //     {
  //       path: "index",
  //       name: "Project-index",
  //       meta: {
  //         title: "项目列表"
  //       },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "ProjectContent" */ "@/views/project/index.vue"
  //         )
  //     }
  //   ]
  // },
  // {
  //   path: "/project-content",
  //   name: "ProjectContent",
  //   meta: {
  //     title: "项目内容"
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "ProjectContent" */ "@/views/project/ProjectContent.vue"
  //     )
  // }
];
