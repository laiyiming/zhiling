<template>
  <div v-loading="initLoading" class="project-view">
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
        <el-button
          class="project-index__button-del"
          @click="dialogVisible = true"
          >删除任务
        </el-button>
        <el-button class="project-index__button-add" @click="bianji"
          >编辑任务</el-button
        >
        <el-button class="project-index__button-red" @click="guidan"
          >归档任务</el-button
        >
      </div>
    </div>
    <div v-if="!$util.isEmpty(taskInfo)" class="project-view__item">
      <div class="project-view__item-title">
        <i class="el-icon-tickets" style="width: 18px height:19px" />
        {{ taskInfo.name }}
        <span class="green-boll" />
        <span>{{ getStatus(taskInfo.status) }}</span>
      </div>
      <div class="project-view__item-content1">
        <div>
          <p>任务来源:</p>
          {{ taskInfo.name }}
        </div>
        <div>
          <p>起止时间:</p>
          {{ taskInfo.begin_time }}至{{ taskInfo.end_time }}
        </div>
      </div>
      <div class="project-view__item-content1">
        <div>
          <p>主办人:</p>
          {{ taskInfo.host || "--" }}
        </div>
      </div>
      <div class="project-view__item-content1">
        <div>
          <p>协办人:</p>
          {{ "--" }}
          <span>添加 <i /> 删除</span>
        </div>
      </div>
    </div>
    <div v-if="!$util.isEmpty(taskInfo)" class="project-view__item">
      <div class="project-view__item-title">
        <i class="el-icon-reading" style="width: 23px height:18px" />
        任务说明
      </div>
      <div v-html="taskInfo.info" class="project-view__item-desc" />
    </div>
    <div class="project-view__item2">
      <div class="project-view__nav">
        <div class="project-view__nav-list">
          <span
            :class="rzi_active === 1 ? 'project-view__nav-list-active' : ''"
            @click="rziActive(1)"
          >
            项目日志</span
          >
          <i />
          <span
            :class="rzi_active === 2 ? 'project-view__nav-list-active' : ''"
            @click="rziActive(2)"
            >操作日志</span
          >
          <i />
          <span
            :class="rzi_active === 3 ? 'project-view__nav-list-active' : ''"
            @click="rziActive(3)"
            >交付日记</span
          >
        </div>
        <div class="project-view__right">
          <span @click="rzDialog">写日志</span>
          <span>交付</span>
        </div>
      </div>
      <ul class="project-view__ul">
        <li>
          <p>03-12</p>
          <div class="project-view__ul-div">
            <p class="project-view__ul-div__xiang">
              <span />
            </p>
            <div class="project-view__ul-div-right">
              <p></p>
              <div class="project-view__ul-div-right-content">
                <img src="@/assets/images/man.png" />
                <div class="project-view__man-content">
                  <p>高睿(总结）</p>
                  <div>
                    <p>
                      今日：与研发人员讨论圈主相关的业务，并了解取数所需的字段来源
                      2.完成大区交易额模板的展现界面开发
                      3.完成大区交易额模板的取数逻辑开发
                    </p>
                    <p>
                      今日：1.与研发人员对接省级交易额模板取数需要的关联表及字段
                    </p>
                    <p>
                      问题：不理解圈主和商家之间的详细关系导致了取数上的困惑
                    </p>
                  </div>
                </div>
                <div class="project-view__ul-div-right-abo">
                  <i class="el-icon-time" />
                  2020/03/12
                  <span>删除</span>
                </div>
              </div>
            </div>
          </div>
          <div class="project-view__ul-div">
            <p class="project-view__ul-div__xiang">
              <span />
            </p>
            <div class="project-view__ul-div-right">
              <p></p>
              <div class="project-view__ul-div-right-content">
                <img src="@/assets/images/man.png" />
                <div class="project-view__man-content">
                  <p>高睿(总结）</p>
                  <div>
                    <p>
                      今日：与研发人员讨论圈主相关的业务，并了解取数所需的字段来源
                      2.完成大区交易额模板的展现界面开发
                      3.完成大区交易额模板的取数逻辑开发
                    </p>
                    <p>
                      今日：1.与研发人员对接省级交易额模板取数需要的关联表及字段
                    </p>
                    <p>
                      问题：不理解圈主和商家之间的详细关系导致了取数上的困惑
                    </p>
                  </div>
                </div>
                <div class="project-view__ul-div-right-abo">
                  <i class="el-icon-time" />
                  2020/03/12
                  <span>删除</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%" center>
      <p>确定删除任务：任务名称任务名称？</p>
      <p>删除后，日志与文件均会消失，请及时备份</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delRenwu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 日志 -->
    <el-dialog title="" :visible.sync="rzVisible" width="30%" center>
      <Journal
        :project_id="$route.query.project_id"
        :task_id="$route.query.task_id"
        @closeDialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import Journal from "./Journal";
export default {
  name: "ProjectMember",
  components: {
    Journal
  },
  data() {
    return {
      rzVisible: false,
      initLoading: false,
      dialogVisible: false,
      rzi_active: 1,
      taskInfo: null
    };
  },

  created() {
    this.init();
  },
  methods: {
    // 删除任务
    delRenwu() {
      const path = {
        api: "api_task_index_del",
        data: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id
        }
      };
      this.initLoading = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },
    // 归档
    guidan() {
      const path = {
        api: "api_task_index_setfile",
        data: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id
        }
      };
      this.initLoading = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // 关闭弹窗
    closeDialog() {
      this.rzVisible = false;
    },
    rzDialog() {
      this.rzVisible = true;
    },
    // 获取状态对应值
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
    // 获取详情数据
    init() {
      const path = {
        api: "api_task_index_info",
        data: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id
        }
      };
      this.initLoading = true;
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
          if (resj.api === "api_task_index_info") {
            console.log(resj);
            this.taskInfo = resj.data.task;
          }
          // 删除任务
          if (resj.api === "api_task_index_del") {
            this.$message.success("任务删除成功！");
            this.$router.go(-1);
          }
          // 归档
          if (resj.api === "api_task_index_setfile") {
            this.$message.success("归档成功！");
            this.$router.go(-1);
          }
        }
      }
      this.initLoading = false;
    },
    rziActive(type) {
      this.rzi_active = type;
    },
    backRouter() {
      this.$router.go(-1);
    },

    bianji() {
      this.$router.push({
        path: "add-task",
        query: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id,
          name: this.taskInfo.name
        }
      });
    }
  }
};
</script>

<style lang="less">
.project-view {
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
        margin-left: 8px;
      }

      .project-index__button-del {
        background: rgba(44, 109, 210, 0.2);
        color: #2c6dd2;
      }
      .project-index__button-add {
        background: #2c6dd2;
        color: #ffffff;
      }
      .project-index__button-red {
        background: #ff6b6b;
        color: #ffffff;
      }
    }
  }

  & .project-view__item {
    margin: 24px 24px 0 24px;
    background: #ffffff;
    padding: 33px;
  }

  & .project-task__form {
    width: 610px;
  }

  & .el-textarea__inner {
    height: 290px;
  }

  & .project-view__item-title {
    font-size: 16px;
    color: #666666;
    display: flex;
    align-items: center;
    margin-bottom: 36px;

    & > i {
      color: #ffffff;
      background: #2c6dd2;
      margin-right: 5px;
    }

    & .green-boll {
      width: 10px;
      height: 10px;
      background: #20c997;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 6px 0 26px;
    }

    & > span {
      color: #20c997;
      font-size: 14px;
    }
  }

  & .project-view__item-content1 {
    margin-left: 24px;
    margin-bottom: 36px;
    display: flex;
    font-size: 14px;
    > div {
      display: flex;
      align-items: center;
      margin-right: 49px;

      > p {
        color: #999999;
        margin-right: 8px;
      }
      > span {
        color: #2c6dd2;
        margin-left: 49px;
        display: flex;
        align-items: center;

        > i {
          height: 10px;
          width: 1px;
          background: #2c6dd2;
          margin: 0 8px;
        }
      }
    }
  }

  & .project-view__item-desc {
    padding: 24px;
    border: 1px solid #e5e5e5;
    font-size: 14px;
    color: #666666;
    margin-left: 24px;
  }

  & .project-view__item2 {
    background: #ffffff;
    margin: 24px 24px 0 24px;
  }

  & .project-view__nav {
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    position: relative;

    & .project-view__right {
      margin-left: auto;
      display: flex;

      > span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 95px;
        height: 36px;
        font-size: 14px;
        border-radius: 2px;
      }
      > span:first-child {
        background: #2c6dd2;
        color: #ffffff;
      }
      > span:last-child {
        background: #ffffff;
        color: #2c6dd2;
        border: 1px solid #2c6dd2;
        margin: 0 24px 0 8px;
      }
    }

    & .project-view__nav-list {
      position: absolute;
      height: 70px;
      display: flex;
      align-items: center;
      margin-left: 28px;

      > span {
        color: #666666;
        font-size: 16px;
        padding: 0 4px;
        height: 70px;
        line-height: 70px;
        cursor: pointer;
        border-bottom: 1px solid #e5e5e5;
      }

      > i {
        height: 10px;
        width: 1px;
        background: #e5e5e5;
        margin: 0 9px;
      }

      & .project-view__nav-list-active {
        color: #2c6dd2;
        border-bottom: 3px solid #2c6dd2;
      }
    }
  }

  & .project-view__ul {
    > li {
      margin: 30px 24px 0 60px;

      > p {
        font-size: 16px;
        color: #2c6dd2;
        font-weight: bold;
        margin-bottom: 24px;
      }

      & .project-view__ul-div {
        display: flex;
        align-items: stretch;

        > p {
          width: 1px;
          background: #e5e5e5;
          position: relative;

          > span {
            position: absolute;
            top: 0;
            left: -4px;
            width: 10px;
            height: 10px;
            border: 1px solid #999999;
            border-radius: 50%;
            background: #ffffff;
          }
        }

        & .project-view__ul-div-right {
          flex: 1;
          background: #eff5ff;
          min-height: 182px;
          overflow: hidden;
          border-radius: 4px;
          display: flex;
          align-items: stretch;
          margin-left: 29px;
          margin-bottom: 24px;

          > p {
            width: 6px;
            background: #2c6dd2;
          }

          & .project-view__ul-div-right-content {
            display: flex;
            flex: 1;
            position: relative;
            align-items: flex-start;
            padding: 24px;

            > img {
              width: 33px;
              height: 33px;
              margin-right: 9px;
            }

            & .project-view__man-content {
              font-size: 14px;
              color: #666666;

              > p {
                margin: 9px 0;
              }
              > div {
                line-height: 30px;
              }
            }

            & .project-view__ul-div-right-abo {
              position: absolute;
              top: 24px;
              right: 24px;
              display: flex;
              font-size: 14px;
              color: #999999;
              display: flex;
              align-items: center;

              > i {
                color: #999999;
              }
              > span {
                color: #2c6dd2;
                margin-left: 18px;
              }
            }
          }
        }
      }
    }
  }
  & .el-dialog__header {
    border: none;
  }

  & .el-dialog__body {
    text-align: center;
    font-size: 14px;
    color: #666666;

    > p:first-child {
      color: #e51a1a;
      margin-bottom: 20px;
    }
  }
  & .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    & .el-button {
      width: 95px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0 6px;
      font-size: 14px;
    }

    & .el-button:first-child {
      background: rgba(44, 109, 210, 0.2);
      color: #2c6dd2;
    }

    & .el-button:last-child {
      background: #2c6dd2;
      color: #ffffff;
    }
  }
}
</style>
