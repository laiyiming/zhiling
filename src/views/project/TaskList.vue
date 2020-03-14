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
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="120" />
        <el-table-column
          prop="address"
          label="任务状态"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            {{ scope }}
            <!-- {{ scope.row.date }} -->
            <span>查看</span>
            <span>下载</span>
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
        :current-page.sync="currentPage3"
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
      tableData: [
        {
          date: "2016-05-03",
          name: "序号",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    addTask() {
      this.$router.push({
        path: "add-task"
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
}
</style>
