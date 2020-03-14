const path = require("path");

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        // target: `http://127.0.0.1:${port}/mock`,
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_API]: ''
        // },
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

// function addStyleResource(rule) {
//   rule
//     .use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [path.resolve(__dirname, './src/styles/common.css')]
//     });
// }
