<template>
  <div class="project-task">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span @click="backRouter">{{ $route.query.name }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/">
            新增任务
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
        <el-form-item label="项目标题" prop="name">
          <el-input
            v-model="form.name"
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
            @change="changeTime"
          />
        </el-form-item>
        <el-form-item label="主办人" prop="host_id">
          <el-select
            v-model="form.host_id"
            placeholder="请选择"
            style="width: 511px"
          >
            <el-option
              v-for="item in options"
              :key="item.Id"
              :label="item.name"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目说明" prop="info">
          <el-input
            v-model="form.info"
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
import { format } from "date-fns";
export default {
  name: "ProjectMember",
  data() {
    return {
      form: {
        name: "",
        begin_time: null,
        end_time: null,
        host_id: "",
        info: "",
        time: ""
      },
      options: [],
      rules: {
        name: [
          { required: true, message: "项目标题不可为空", trigger: "change" }
        ],
        time: [
          { required: true, message: "起止时间项目不可为空", trigger: "change" }
        ],
        host_id: [
          { required: true, message: "主办人不可为空", trigger: "change" }
        ],
        info: [
          { required: true, message: "项目简介不可为空", trigger: "change" }
        ]
      }
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.initLoading = true;
      const path = {
        api: "api_project_index_projectMember",
        data: {
          project_id: this.$route.query.project_id
        }
      };
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // socket请求统一处理
    socketData(res) {
      if (res !== '{"type":"ping"}') {
        const resj = JSON.parse(res);
        if (resj.code === -1) {
          this.$message.error(resj.message);
        } else {
          // 获取主办人列表
          if (resj.api === "api_project_index_projectMember") {
            console.log(resj);
            this.options = resj.data.members || [];
          }
          // 添加任务
          if (resj.api === "api_task_index_add") {
            console.log(resj);
            if (resj.code === 0) {
              this.$message.success("添加成功！");
              this.$router.go(-1);
            }
          }
        }
      }
      this.initLoading = false;
    },

    backRouter() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const path = {
            api: "api_task_index_add",
            data: {
              name: this.form.name,
              begin_time: this.form.begin_time,
              end_time: this.form.end_time,
              info: this.form.info,
              host_id: `${this.form.host_id}`,
              list_id: this.$route.query.list_id,
              project_id: this.$route.query.project_id
            }
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
    changeTime(val) {
      this.form.begin_time = format(val[0], "yyyy-MM-dd");
      this.form.end_time = format(val[1], "yyyy-MM-dd");
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
