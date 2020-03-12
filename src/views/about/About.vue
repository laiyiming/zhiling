<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  name: 'about',

  data() {
    return {
      list: 'sss'
    }
  },

  
  created() {
    console.log(process.env.VUE_APP_BASE)
    console.log(!this.$util.isEmpty(this.list))
    this.$api.login().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
};
</script>>
