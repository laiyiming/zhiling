export default [
  {
    path: "/about",
    name: "about",
    meta: {
      title: "关于"
    },
    // redirect: "/about/index",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/about/About.vue"),
    children: [
      //   {
      //     path: "report/:id",
      //     name: "ExamReport",
      //     meta: {
      //       title: "查看报告",
      //       insidePage: true,
      //       permission: "est.exam.report",
      //       insideTool: "Report/Print"
      //     },
      //     component: () =>
      //       import(
      //         /* webpackChunkName: "exam-report" */ "@/views/Exam/Report/index.vue"
      //       )
      //   }
    ]
  }
];
