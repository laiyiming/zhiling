<template>
  <div class="page-view">
    <navigation />
    <div class="page-view__right">
      <Header />
      <RouterView />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import navigation from "../navigation";
import Header from "./header";

export default {
  name: "PageView",
  components: {
    navigation,
    Header
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loading: state => state.pageLoading
    })
  },

  methods: {}
};
</script>

<style lang="less">
.page-view {
  display: flex;
  align-items: stretch;
  background: #f2f2f2;

  & .page-view__right {
    flex: 1;
  }
}
</style>
