<template>
  <el-form
	:model="ruleForm"
	:rules="rules"
	ref="ruleForm"
	label-width="100px"
	class="Journal"
  >
	<el-form-item label="交付名称" prop="name">
	  <el-input v-model="ruleForm.name"  placeholder="交付名称" />
	</el-form-item>
	<el-form-item label="上传文件">
	  
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
	}
  },
  data() {
	return {
	  ruleForm: {
		name: "",
		files: []
	  },
	  rules: {
		name: [{ required: true, message: "添加交付名称", trigger: "change" }]
	  }
	};
  },

  methods: {
	onSubmit() {
	  this.$refs.ruleForm.validate(valid => {
		if (valid) {
		  const path = {
			api: "api_task_deliver_add",
			data: {
			  project_id: this.projectId,
			  task_id: this.taskId,
			  name: `${this.ruleForm.name}`,
			  files: this.ruleForm.files
			}
		  };
		  console.log(path)
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
		console.log(res)
	  if (res !== '{"type":"ping"}') {
		const resj = JSON.parse(res);
		if (resj.code === -1) {
		  this.$message.error(resj.message);
		} else {
		  // 获取验证码
		  if (resj.api === "api_task_deliver_add") {
			if (resj.code === 0) {
				console.log(resj)
			  this.$message.success("交付成功！");
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
