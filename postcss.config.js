module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-import": {},
    "postcss-url": {},
    "postcss-nesting": {},
    // css-variables to css
    "postcss-custom-properties": {
      importFrom: "./src/styles/vars.css",
      preserve: false
    },
    // // 压缩css
    cssnano: {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
};
