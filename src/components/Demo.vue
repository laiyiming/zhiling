<template>
  <div class="components-demo">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "ComponentsDemo",
  props: {
    msg: {
      type: String,
      default: ""
    }
  }
};
</script>
