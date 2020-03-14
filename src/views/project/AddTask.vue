<template>
  <div class="project-task">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/">
            福福餐饮
          </a>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/">
            任务列表
          </a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="project-index__header-button">
        <el-button class="project-index__button-del" @click="backRouter"
          >返回任务列表</el-button
        >
      </div>
    </div>
    <div class="project-member__content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="project-task__form"
        label-width="99px"
      >
        <el-form-item label="项目标题" prop="title">
          <el-input
            v-model="form.title"
            style="width: 511px"
            placeholder="请输入项目名称"
          />
        </el-form-item>
        <el-form-item label="起止时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 511px"
          />
        </el-form-item>
        <el-form-item label="主办人" prop="man">
          <el-select
            v-model="form.man"
            placeholder="请选择"
            style="width: 511px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目说明" prop="desc">
          <el-input
            v-model="form.desc"
            type="textarea"
            style="width: 511px"
            placeholder="请输入项目说明"
          />
        </el-form-item>
        <el-form-item class="el-form-item__bottom">
          <el-button @click="backRouter">取消</el-button>
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectMember",
  data() {
    return {
      form: {
        title: "",
        time: "",
        man: "",
        desc: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      rules: {
        title: [
          { required: true, message: "项目标题不可为空", trigger: "change" }
        ],
        time: [
          { required: true, message: "起止时间项目不可为空", trigger: "change" }
        ],
        man: [{ required: true, message: "主办人不可为空", trigger: "change" }],
        desc: [
          { required: true, message: "项目简介不可为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    backRouter() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
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

<style lang="less">
.project-task {
  & .project-index__header {
    display: flex;
    height: 60px;
    align-items: center;
    background: #ffffff;

    & .el-breadcrumb {
      color: #333333;
      font-size: 14px;
      margin-left: 24px;
    }

    .project-index__header-button {
      margin-right: 36px;
      margin-left: auto;

      > .el-button {
        border-radius: 2px;
        padding: 11px 16px;
        border: 0;
      }

      .project-index__button-del {
        background: rgba(44, 109, 210, 0.2);
        color: #2c6dd2;
      }
      .project-index__button-add {
        background: #2c6dd2;
        color: #ffffff;
        margin-left: 8px;
      }
    }
  }

  & .project-member__content {
    margin: 24px 0 0 24px;
    background: #ffffff;
    padding: 24px;
  }

  & .project-task__form {
    width: 610px;
  }

  & .el-textarea__inner {
    height: 290px;
  }
}
</style>
