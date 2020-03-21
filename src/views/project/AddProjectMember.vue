<template>
  <div v-loading="initLoading" class="project-member">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
        <el-breadcrumb-item>项目成员 </el-breadcrumb-item>
        <el-breadcrumb-item>添加项目成员 </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="project-index__header-button">
        <el-button class="project-index__button-add" @click="addMwmber"
          >添加项目成员</el-button
        >
      </div>
    </div>
    <div class="project-member__content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        :class="$util.isEmpty(tableData) ? 'project-member__table-kon' : ''"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="任务名称" width="120" />
        <el-table-column prop="phone" label="手机号码" show-overflow-tooltip />
      </el-table>
      <div class="project-table__wu">
        <img src="@/assets/images/kzt.png" alt="" />
        <p>什么都没有...</p>
      </div>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProjectMember",
  data() {
    return {
      initLoading: false,
      currentPage: 3,
      tableData: [
        {
          date: "2016-05-03",
          name: "序号",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      listTable: [],
      type: null
    };
  },

  created() {
    this.init();
    this.type = this.$route.query.type;
  },

  methods: {
    // 获取任务列表
    init() {
      const path = {
        api: "api_project_index_unprojectMember",
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
          // 获取大类列表
          if (resj.api === "api_project_index_unprojectMember") {
            this.tableData = resj.data.members || [];
          }
          // 获取大类列表
          if (resj.api === "api_project_index_addMemberMany") {
            if (this.code === 0) {
              this.$message.success("添加成功！");
              this.init();
            }
          }
          // 获取大类列表
          if (resj.api === "api_project_index_addManageMany") {
            if (this.code === 0) {
              this.$message.success("添加成功！");
              this.init();
            }
          }
        }
      }
      this.initLoading = false;
    },

    // 添加项目成员
    addMwmber() {
      if (this.$util.isEmpty(this.listTable)) {
        this.$message.error("请先选择项目人员");
        return false;
      }
      const member_ids = this.listTable.map(i => i.Id);
      let api = "api_project_index_addMemberMany";
      if (this.type === "jingli") {
        api = "api_project_index_addManageMany";
      }
      const path = {
        api,
        data: {
          project_id: this.$route.query.project_id,
          member_ids: member_ids
        }
      };
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    handleSelectionChange(val) {
      this.listTable = val;
      console.log(val);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
.project-member {
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

  & .el-table__header {
    & .has-gutter {
      > tr {
        > th {
          background: #e5e5e5;
        }
      }
    }
  }

  & .project-table__wu {
    padding: 215px 0 300px;
    text-align: center;
    font-size: 14px;
    color: #666666;
    > img {
      width: 133px;
      height: 198px;
    }
  }

  & .project-member__table-kon {
    & .el-table__body-wrapper {
      display: none;
    }
  }
}
</style>
