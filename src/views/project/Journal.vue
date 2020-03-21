<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="Journal"
  >
    <el-form-item label="日志类型" prop="name">
      <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
      </el-select>
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
      rules: {
        type: [{ required: true, message: "请选择日志类型", trigger: "change" }]
      }
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      const path = {
        api: "api_task_tasklog_list",
        data: {
          project_id: this.projectId,
          task_id: this.taskId
        }
      };
      console.log(123);
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },
    onSubmit() {
      const path = {
        api: "api_task_tasklog_add",
        data: {
          project_id: this.projectId,
          task_id: this.taskId,
          type: `${this.ruleForm.type}`,
          info: this.ruleForm.info
        }
      };
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
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
              this.$message.success("添加成功！");
              this.$emit("closeDialog", "success");
            }
          }
          if (resj.api === "api_task_tasklog_list") {
            console.log(resj, 888);
          }
        }
      }
    }
  }
};
</script>

<style lang="less">
.Journal {
}
</style>
