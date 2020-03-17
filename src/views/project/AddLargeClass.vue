<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="detailed-list"
    label-width="130px"
  >
    <el-form-item label="大类名称" prop="name">
      <el-input
        v-model="form.name"
        style="width: 511px"
        placeholder="请输入项目名称"
      />
    </el-form-item>
    <el-form-item class="el-form-item__bottom">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AddLargeClass",
  props: {
    id: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      default: ""
    },
    moduelId: {
      type: String,
      default: null
    },
    moduelName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: null
      },
      rules: {
        name: [
          { required: true, message: "大类名称不可为空", trigger: "change" }
        ]
      }
    };
  },

  watch: {
    moduelName: {
      handler(val) {
        if (!this.$util.isEmpty(val)) {
          this.form.name = val;
        } else {
          this.form.name = "";
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            project_id: `${this.id}`,
            name: this.form.name
          };
          let api = "api_moduel_index_add";
          if (this.type === "edit") {
            api = "api_moduel_index_rename";
            data = {
              ...data,
              moduel_id: this.moduelId
            };
          }
          const path = {
            api,
            data
          };
          this.socketApi.sendSock(JSON.stringify(path), res => {
            this.socketData(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    socketData(res) {
      if (res !== '{"type":"ping"}') {
        const resj = JSON.parse(res);
        if (resj.code === -1) {
          this.$message.error(resj.message);
        } else {
          // 获取验证码
          if (resj.api === "api_moduel_index_add") {
            if (resj.code === 0) {
              this.$message.success("添加成功！");
              this.close();
            }
          }
          if (resj.api === "api_moduel_index_rename") {
            if (resj.code === 0) {
              this.$message.success("修改成功！");
              this.close();
            }
          }
        }
      }
    },

    close() {
      this.$emit("closeDialog", "success");
    }
  }
};
</script>

<style></style>
