<template>
  <el-form ref="form" :model="form" class="detailed-list" label-width="130px">
    <el-form-item label="大类名称">
      <el-input
        v-model="form.name"
        style="width: 511px"
        placeholder="请输入项目名称"
      />
    </el-form-item>
    <el-form-item class="el-form-item__bottom">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AddLargeClass",
  data() {
    return {
      form: {
        name: null
      }
    };
  },
  methods: {
    onSubmit(submit) {
      console.log(submit);
    }
  }
};
</script>

<style></style>
