export default [
  {
    path: "/project",
    name: "Project",
    meta: {
      title: "项目"
    },
    redirect: "/project/index",
    component: () =>
      import(/* webpackChunkName: "common" */ "@/views/common/PageView.vue"),
    children: [
      {
        path: "index",
        name: "Project-index",
        meta: {
          title: "项目列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "Project-index" */ "@/views/project/index.vue"
          )
      },
      {
        path: "content",
        name: "project-content",
        meta: {
          title: "项目内容"
        },
        component: () =>
          import(
            /* webpackChunkName: "project-content" */ "@/views/project/ProjectContent.vue"
          )
      },
      {
        path: "member",
        name: "project-member",
        meta: {
          title: "项目成员"
        },
        component: () =>
          import(
            /* webpackChunkName: "project-member" */ "@/views/project/ProjectMember.vue"
          )
      },
      {
        path: "add-member",
        name: "project-add-member",
        meta: {
          title: "添加项目成员"
        },
        component: () =>
          import(
            /* webpackChunkName: "project-add-member" */ "@/views/project/AddProjectMember.vue"
          )
      },
      {
        path: "task",
        name: "project-task",
        meta: {
          title: "任务列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "project-member" */ "@/views/project/TaskList.vue"
          )
      },
      {
        path: "add-task",
        name: "project-add-task",
        meta: {
          title: "添加任务"
        },
        component: () =>
          import(
            /* webpackChunkName: "project-member" */ "@/views/project/AddTask.vue"
          )
      },
      {
        path: "project-view",
        name: "project-view",
        meta: {
          title: "任务详情"
        },
        component: () =>
          import(
            /* webpackChunkName: "project-member" */ "@/views/project/ProjectView.vue"
          )
      }
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
