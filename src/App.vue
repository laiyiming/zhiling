<template>
  <div id="app">
    <PageView />
  </div>
</template>

<script>
import PageView from "./views/common/PageView.vue";

export default {
  name: "app",
  components: {
    PageView
  }
};
</script>

<style>
html,
body,
#app,
ul,
div,
span,
ul,
li,
p {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
</style>
