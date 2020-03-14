<template>
  <div v-loading="indexLoading" class="project-index">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="project-index__header-button">
        <el-button class="project-index__button-del">删除项目</el-button>
        <el-button class="project-index__button-add" @click="addProject"
          >+添加项目</el-button
        >
      </div>
    </div>
    <ul class="project-index__ul">
      <li v-for="(list, key) in projectList" :key="key">
        <img :src="list.logo_addr" alt="" />
        <div class="project-index__ul-item">
          <p>{{ list.name }}</p>
          <div>
            {{ list.describ }}
          </div>
          <el-button @click="toRoute('生态鲜管理系统')">进入项目</el-button>
        </div>
      </li>
      <li>
        <img src="" alt="" />
        <div class="project-index__ul-item">
          <p>生态鲜管理系统</p>
          <div>
            生态鲜(厦门)信息技术有限公司成立于2019年07月02日，注册地位于厦门市思明区塔埔东路168号24层2405单元B区，法人代表为王晓坪。
          </div>
          <el-button @click="toRoute('生态鲜管理系统')">进入项目</el-button>
        </div>
      </li>
    </ul>
    <el-dialog
      title="登入窗口"
      :visible.sync="dialogFormVisible"
      :show-close="false"
    >
      <el-form :model="form">
        <el-form-item label="手机号码" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" label-width="120px">
          <el-input v-model="form.code" autocomplete="off"></el-input>
          <el-button
            :disabled="(disabled = !show)"
            style="width: 15%"
            type="success"
            @click="send"
          >
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{ count }} s</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="loginTo">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="projectVisible"
      title="添加项目"
      custom-class="contentdialog"
      width="718px"
      center
    >
      <AddProject />
    </el-dialog>
  </div>
</template>

<script>
import AddProject from "./AddProject";
const TIME_COUNT = 60; //更改倒计时时间

export default {
  name: "ProjectIndex",
  components: {
    AddProject
  },
  data() {
    return {
      projectVisible: false,
      indexLoading: false,
      dialogFormVisible: false,
      form: {
        phone: null,
        code: null
      },
      show: true, // 初始启用按钮
      count: "", // 初始化次数
      timer: null,
      projectList: []
    };
  },

  created() {
    // const _this = this;
    // const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token, 888);
    // if (token === "" || token === null) {
    //   this.dialogFormVisible = true;
    // } else {
    //   this.dialogFormVisible = false;
    //   setTimeout(function() {
    //     _this.init();
    //   }, 1000);
    // }
    // this.getcode();
  },

  methods: {
    // 项目列表初始化
    init() {
      const path = {
        api: "api_project_index_list"
      };
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // 添加项目
    addProject() {
      this.projectVisible = true;
    },

    // 跳转系统
    toRoute(name) {
      // this.$router.push({ path: "/project/project-content" });
      this.$router.push({
        path: "content",
        query: {
          name
        }
      });
    },

    // 获取验证码
    send() {
      if (!this.timer) {
        if (this.form.phone === "" || this.form.phone === null) {
          this.$message.error("请填写手机号");
          return false;
        }
        const path = {
          api: "api_home_index_code",
          data: {
            phone: `${this.form.phone}`
          }
        };
        this.socketApi.sendSock(JSON.stringify(path), res => {
          this.socketData(res);
        });

        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
          }
        }, 1000);
      }
    },

    // getcode() {
    //   const path = {
    //     api: "api_home_index_code",
    //     data: {
    //       phone: "19906013146"
    //     }
    //   };

    //   this.socketApi.sendSock(JSON.stringify(path), res => {
    //     if (res) {
    //       this.socketData(res);
    //     }
    //   });
    // }

    socketData(res) {
      console.log(res);
      if (res !== '{"type":"ping"}') {
        const resj = JSON.parse(res);
        if (resj.code === -1) {
          this.$message.error(resj.message);
        } else {
          if (resj.api === "api_home_index_code") {
            console.log(resj);
          }
          if (resj.api === "api_home_index_login") {
            localStorage.setItem("token", JSON.stringify(resj.data.token));
            this.dialogFormVisible = false;
            this.indexLoading = false;
            console.log(resj);
          }
          if (resj.api === "api_project_index_list") {
            this.projectList = resj.data.projects;
            console.log(resj, 878);
          }
        }
      }
    },

    loginTo() {
      if (this.form.phone === "" || this.form.phone === null) {
        this.$message.error("请填写手机号");
        return false;
      }
      if (this.form.code === "" || this.form.code === null) {
        this.$message.error("请填写验证码");
        return false;
      }

      const path = {
        api: "api_home_index_login",
        data: {
          phone: `${this.form.phone}`,
          method: "code",
          code: `${this.form.code}`
        }
      };
      this.indexLoading = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    }
  }
};
</script>

<style lang="less">
.project-index {
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
        width: 95px;
        height: 36px;
        border-radius: 2px;
        padding: 0;
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

  & .project-index__ul {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    > li {
      width: 526px;
      height: 277px;
      background: #ffffff;
      display: flex;
      margin: 23px 0 0 23px;
      align-items: flex-start;
      padding: 34px 50px 33px 34px;
      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.09);

      > img {
        width: 68px;
        height: 68px;
        flex-shrink: 0;
        margin-right: 30px;
        background: chartreuse;
      }

      & .project-index__ul-item {
        display: flex;
        height: 100%;
        flex-direction: column;

        > p {
          color: #333333;
          font-size: 16px;
          margin-bottom: 40px;
        }

        > div {
          font-size: 14px;
          color: #999999;
          line-height: 16px;
        }

        > .el-button {
          width: 94px;
          height: 34px;
          padding: 0;
          border: 0;
          color: #ffffff;
          font-size: 14px;
          background: rgba(44, 109, 210, 1);
          border-radius: 2px;
          margin-top: auto;
        }
      }
    }
  }
}
</style>
