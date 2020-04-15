<template>
  <el-form
	:model="ruleForm"
	:rules="rules"
	ref="ruleForm"
	label-width="100px"
	class="isPast"
  >
	<el-form-item :label="isPastText" prop="comment">
	  <el-input v-model="ruleForm.comment" type="textarea"  placeholder="请输入理由" maxlength="300"
  show-word-limit />

	</el-form-item>
	<el-form-item class="el-form-item__bottom">
	  <el-button @click="backRouter">取消</el-button>
	  <el-button type="primary" @click="onSubmit">确认</el-button>
	</el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Jiaofu",
  props: {
		projectId: {
			type: String,
			default: ""
		},
		taskId: {
			type: String,
			default: ""
		},
    delieverId: {
      type: String,
	    default: ""
    },
    isPast: {
      type: Boolean,
	    default: true
    },
		isShow: {
      type: Boolean,
	    default: false
    }
  },
  data() {
	return {
	  ruleForm: {
		comment: "",
	  },
	  rules: {
		comment: [{ required: true, message: `请填写理由`, trigger: "change" }]
	  },
		isPastText: ""
	};
  },

	watch: {
		isPast: {
			handler(val) {
        if (val) {
          this.isPastText = "通过理由"
        } else {
					this.isPastText = "不通过理由"
				}
      },
      deep: true,
      immediate: true,
		},

		isShow: {
			handler() {
        this.ruleForm.comment = "";
      },
      deep: true,
      immediate: true,
		},
		
	},

  methods: {
	onSubmit() {
	  this.$refs.ruleForm.validate(valid => {
		if (valid) {
			let api = "api_task_deliver_pass"
			if(!this.isPast) {
				api = "api_task_deliver_deny"
			}
		  const path = {
				api,
				data: {
					project_id: this.projectId,
					task_id: this.taskId,
					deliever_id: this.delieverId,
					comment: this.ruleForm.comment
				}
		  };
		  this.socketApi.sendSock(JSON.stringify(path), res => {
			this.socketData(res);
		  });
		} else {
		  return false;
		}
	  });
	},
	backRouter() {
	  this.$emit("closeDialog");
	},
	socketData(res) {
	  if (res !== '{"type":"ping"}') {
		const resj = JSON.parse(res);
		if (resj.code === -1) {
		  this.$message.error(resj.message);
		} else {
		  // 获取验证码
		  if (resj.api === "api_task_deliver_pass") {
				if (resj.code === 0) {
					console.log(resj)
					this.$message.success("通过操作成功！");
					this.$emit("closeDialog", "success");
				}
		  }
			if (resj.api === "api_task_deliver_deny") {
				if (resj.code === 0) {
					console.log(resj)
					this.$message.success("操作成功！");
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
.isPast {
}
</style>
