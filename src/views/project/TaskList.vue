<template>
  <div v-loading="initLoading" class="project-task">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
        <el-breadcrumb-item
          ><span @click="backRouter">{{ $route.query.name }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/">
            任务列表
          </a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="project-index__header-button">
        <el-button class="project-index__button-add" @click="addTask"
          >+添加任务
        </el-button>
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
      >
        <el-table-column label="序号" width="120">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" />
        <el-table-column prop="status" label="任务状态">
          <template slot-scope="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="begin_time" label="开始时间" />
        <el-table-column prop="end_time" label="结束时间" />
        <el-table-column prop="host" label="主办人" />
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div class="task-list__table">
              <span @click="lookTo(scope.row)">查看</span>
              <span>下载</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="$util.isEmpty(tableData)" class="project-table__wu">
        <img src="@/assets/images/kzt.png" alt="" />
        <p>什么都没有...</p>
      </div>

      <el-pagination
        @size-change="handleSizeChange"
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
  name: "ProjectMember",
  data() {
    return {
      initLoading: false,
      currentPage: 2,
      tableData: []
    };
  },

  created() {
    this.init();
  },

  methods: {
    // 获取任务列表
    init() {
      const path = {
        api: "api_moduel_lists_taskList",
        data: {
          project_id: this.$route.query.project_id,
          list_id: this.$route.query.list_id
        }
      };
      this.initLoading = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    getStatus(status) {
      switch (status) {
        case "0":
          return "待定";
          // eslint-disable-next-line no-unreachable
          break;
        case "1":
          return "开始";
          // eslint-disable-next-line no-unreachable
          break;
        case "2":
          return "完成";
          // eslint-disable-next-line no-unreachable
          break;
        case "3":
          return "归档";
        default:
      }
    },

    // 查看详情
    lookTo(item) {
      this.$router.push({
        path: "project-view",
        query: {
          project_id: this.$route.query.project_id,
          task_id: item.Id
        }
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
          if (resj.api === "api_moduel_lists_taskList") {
            this.tableData = resj.data.tasks || [];
          }
        }
      }
      this.initLoading = false;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    backRouter() {
      this.$router.go(-1);
    },

    addTask() {
      this.$router.push({
        path: "add-task",
        query: {
          project_id: this.$route.query.project_id,
          list_id: this.$route.query.list_id,
          name: this.$route.query.name
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

  & .task-list__table {
    > span {
      cursor: pointer;
      color: #2c6dd2;
      margin: 0 5px;
    }
  }
}
</style>
