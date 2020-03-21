<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="Journal"
  >
    <el-form-item label="日志类型" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.val"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="日志内容">
      <el-input
        v-model="ruleForm.info"
        type="textarea"
        maxlength="300"
        :show-word-limit="true"
      />
    </el-form-item>
    <el-form-item class="el-form-item__bottom">
      <el-button @click="backRouter">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Journal",
  props: {
    projectId: {
      type: String,
      default: ""
    },
    taskId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ruleForm: {
        type: "",
        info: ""
      },
      options: [
        {
          val: "理解",
          id: "0"
        },
        {
          val: "进度",
          id: "1"
        },
        {
          val: "总结",
          id: "2"
        }
      ],
      rules: {
        type: [{ required: true, message: "请选择日志类型", trigger: "change" }]
      }
    };
  },

  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const path = {
            api: "api_task_tasklog_add",
            data: {
              project_id: this.projectId,
              task_id: this.taskId,
              type: `${this.ruleForm.type}`,
              info: this.ruleForm.info
            }
          };
          console.log(path);
          this.socketApi.sendSock(JSON.stringify(path), res => {
            this.socketData(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    backRouter() {
      this.$emit("closeDialog");
    },
    socketData(res) {
      console.log(res);
      if (res !== '{"type":"ping"}') {
        const resj = JSON.parse(res);
        if (resj.code === -1) {
          this.$message.error(resj.message);
        } else {
          // 获取验证码
          if (resj.api === "api_task_tasklog_add") {
            if (resj.code === 0) {
              console.log(resj);
              this.$message.success("添加成功！");
              this.$emit("closeDialog", "success");
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="less">
.Journal {
  & .el-select {
    width: 100%;
  }
}
</style>
