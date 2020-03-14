<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    class="detailed-list"
    label-width="130px"
  >
    <el-form-item label="大类名称" prop="name">
      <el-input
        v-model="ruleForm.name"
        style="width: 511px"
        placeholder="请输入项目名称"
      />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="el-form-item__bottom">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AddDetailedList",
  data() {
    return {
      ruleForm: {
        name: null,
        region: null
      },
      rules: {
        name: [{ validator: "请填写大类名称", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit(submit) {
      console.log(submit);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style></style>
