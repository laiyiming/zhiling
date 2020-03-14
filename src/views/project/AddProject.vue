<template>
  <el-form ref="form" :model="form" class="add-project" label-width="130px">
    <el-form-item label="项目名称">
      <el-input
        v-model="form.name"
        style="width: 511px"
        placeholder="请输入项目名称"
        maxlength="12"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="项目简介">
      <el-input
        v-model="form.jianjie"
        type="textarea"
        style="width: 511px"
        placeholder="请输入项目简介"
        maxlength="100"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label=" 项目logo">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item class="el-form-item__bottom">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AddProject",
  data() {
    return {
      form: {
        name: null,
        jianjie: null
      },
      imageUrl: ""
    };
  },
  methods: {
    onSubmit(submit) {
      console.log(submit);
    },

    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.add-project {
  & .avatar-uploader {
    & .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: #e5e5e5;
    }
  }
  & .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  & .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  & .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
