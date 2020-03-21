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
        :disabled="nameDisabled"
        style="width: 511px"
        placeholder="请输入项目名称"
      />
    </el-form-item>
    <el-form-item label="所属大类">
      <el-select
        v-model="form.moduel_id"
        :disabled="classDisabled"
        placeholder="请选择所属大类"
      >
        <el-option label="不分类" value=""></el-option>
        <el-option
          v-for="(list, key) in moduel"
          :key="key"
          :label="list.name"
          :value="list.Id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="el-form-item__bottom">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AddDetailedList",
  props: {
    id: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      default: ""
    },
    moduel: {
      type: Array,
      default: () => []
    },
    moduelId: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: null
    },
    listId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      form: {
        name: null,
        moduel_id: null
      },
      rules: {
        name: [
          { required: true, message: "大类名称不可为空", trigger: "change" }
        ]
      },
      classDisabled: false,
      nameDisabled: false
    };
  },

  watch: {
    type: {
      handler(val) {
        this.form.name = "";
        this.form.moduel_id = null;
        if (val === "resetName" || val === "edit") {
          this.form.name = this.className;
          this.form.moduel_id = +this.moduelId;
        }

        if (val === "resetName") {
          this.classDisabled = true;
        }

        if (val === "edit") {
          this.nameDisabled = true;
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
            name: this.form.name,
            project_id: `${this.id}`,
            moduel_id: `${this.form.moduel_id}`
          };
          let api = "api_moduel_lists_add";
          if (this.type === "edit") {
            api = "api_moduel_lists_changeM";
            data = {
              project_id: `${this.id}`,
              moduel_id: `${this.form.moduel_id}`,
              list_id: `${this.listId}`
            };
          }
          if (this.type === "resetName") {
            api = "api_moduel_lists_rename";
            data = {
              ...data,
              list_id: `${this.listId}`
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
      console.log(res, 989);
      if (res !== '{"type":"ping"}') {
        const resj = JSON.parse(res);
        if (resj.code === -1) {
          this.$message.error(resj.message);
        } else {
          // 获取验证码
          if (resj.api === "api_moduel_lists_add") {
            if (resj.code === 0) {
              this.$message.success("添加成功！");
              this.close("success");
            }
          }
          if (
            resj.api === "api_moduel_lists_rename" ||
            resj.api === "api_moduel_lists_changeM"
          ) {
            if (resj.code === 0) {
              this.$message.success("修改成功！");
              this.close("success");
            }
          }
        }
      }
    },

    close(type) {
      this.$emit("closeDialog", type);
    }
  }
};
</script>

<style></style>
