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
          <span style="margin-left:49px" @click="addXiaban">添加</span> <i /> <span @click="delXiaban">删除</span>
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
          <span @click="rzDialog('rzVisible')">写日志</span>
          <span @click="rzDialog('jfVisible')">交付</span>
        </div>
      </div>
      <template v-if="rzi_active === 1 || rzi_active === 2">
      <ul v-if="!$util.isEmpty(taskLog)" class="project-view__ul">
        <li v-for="item in taskLog" :key="item.duitime">
          <p>{{ getTime(item.duitime, "MM-dd") }}</p>
          <div
            v-for="items in item.list"
            :key="items.Id"
            class="project-view__ul-div"
          >
            <p class="project-view__ul-div__xiang">
              <span />
            </p>
            <div class="project-view__ul-div-right">
              <p></p>
              <div class="project-view__ul-div-right-content">
                <img src="@/assets/images/man.png" />
                <div class="project-view__man-content">
                  <p>{{ "--" }}(总结）</p>
                  <div v-html="items.info" />
                </div>
                <div class="project-view__ul-div-right-abo">
                  <i class="el-icon-time" />
                  {{ getTime(items.time, "yyyy-MM-dd") }}
                  <span @click="rzDel(items)">删除</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template v-if="rzi_active === 3">
        <div style="padding: 30px 30px 50px">
          <el-table ref="jfTable" :data="tableData" border>
            <el-table-column label="任务名称" prop="name" />
            <el-table-column prop="name" label="交付名称" />
            <el-table-column
              prop="time"
              label="交付时间"
              show-overflow-tooltip
            />
            <el-table-column label="审核" prop="status">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '0'"> 未审核 </span>
              <span v-if="scope.row.status === '1'"> 已通过 </span>
              <span v-if="scope.row.status === '2'"> 未通过 </span>
              <span @click="statusClick(scope.row, true)"> 通过 </span>
              <span @click="statusClick(scope.row, false)"> 不通过 </span>

            </template>
            </el-table-column>
            <el-table-column label="操作" prop="name">
              <template slot-scope="scope">
                <span @click="jiaofuView(scope.row)">查看</span>
                <span style="margin: 0 5px" @click="downListShow(scope.row)">下载</span>
                <span @click="delJiaofu(scope.row)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
     <!-- 添加协办人列表 -->
    <el-dialog title="" :visible.sync="dialogxieban" width="400px" center>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(list, key) in untaskMember" :label="list" :key="key">{{list}}</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
     <!-- 删除协办人列表 -->
    <el-dialog title="" :visible.sync="dialogdelxieban" width="400px" center>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(list, key) in helpers" :label="list" :key="key">{{list}}</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
    <!-- 删除任务 -->
    <el-dialog title="" :visible.sync="dialogVisible" width="30%" center>
      <p>确定删除任务：任务名称任务名称？</p>
      <p>删除后，日志与文件均会消失，请及时备份</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delRenwu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 日志 -->
    <el-dialog title="" :visible.sync="rzVisible" width="50%" center>
      <Journal
        :project-id="`${$route.query.project_id}`"
        :task-id="`${$route.query.task_id}`"
        @closeDialog="closeDialog"
      />
    </el-dialog>
    <!-- 交付 -->
    <el-dialog title="" :visible.sync="jfVisible" width="50%" center>
      <Jiaofu
        :project-id="`${$route.query.project_id}`"
        :task-id="`${$route.query.task_id}`"
        @closeDialog="closeDialog"
      />
    </el-dialog>
    <!-- 通过 / 不通过 -->
    <el-dialog :title="isPast ? '通过交付' : '不通过交付'" :visible.sync="isPVisible" width="50%" center>
      <isPast
        :project-id="`${$route.query.project_id}`"
        :task-id="`${$route.query.task_id}`"
        :deliever-id="delieverId"
        :is-past="isPast"
        :is-show="isPVisible"
        @closeDialog="closeDialog"
      />
    </el-dialog>
    <!-- 下载列表 -->
    <el-dialog title="下载附件" :visible.sync="downDialog" width="718px" center>
      <ul class="down-ul">
        <li v-for="(item, key) in downList" :key="key">{{ item.name }} <span @click="downJF(item.Id)">下载</span></li>
      </ul>
    </el-dialog>

    <!-- 交付查看 -->
    <el-dialog title="详情" :visible.sync="jiaofuDialog" width="718px" center>
      <template v-if="jiaofuData">
      <p>{{ jiaofuData.title }}</p>
      <div v-html="jiaofuData.content" />
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { format } from "date-fns";
import Journal from "./Journal";
import Jiaofu from "./Jiaofu";
import isPast from "./isPast";
export default {
  name: "ProjectMember",
  components: {
    Journal,
    Jiaofu,
    isPast
  },
  data() {
    return {
      jiaofuDialog: false,
      jiaofuData: null,
      downDialog: false,
      dialogdelxieban: false,
      dialogxieban: false,
      isPVisible: false,
      jfVisible: false,
      rzVisible: false,
      initLoading: false,
      dialogVisible: false,
      rzi_active: 1,
      taskInfo: null,
      taskLog: [],
      tableData: [],
      delieverId: "",
      isPast: true,
      helpers: [],
      untaskMember: [],
      checkedCities: null,
      downList: []
    };
  },

  created() {
   this.rziActive(1);
  },
  methods: {
    jiaofuView(item) {
      console.log(item, 8858)
      this.jiaofuData = item;
      this.jiaofuDialog = true;
    },
    // 是否通过
    statusClick(list, type) {
      // 
      if(type) {
        this.isPast = true
      } else {
        this.isPast = false
      }
      this.isPVisible = true;
      this.delieverId = `${list.Id}`;
    },

    // 添加协办人
    addXiaban() {
      const path = {
        api: "api_task_index_untaskMember",
        data: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id
        }
      };
      this.dialogxieban = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // 未添加协办人
    delXiaban() {
      const path = {
        api: "api_task_index_helperList",
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

    // 下载列表展示
    downListShow(item) {
      const path = {
        api: "api_task_deliver_filelist",
        data: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id,
          deliver_id: `${item.Id}`
        }
      };
      this.initLoading = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // 删除任务
    delRenwu() {
      const path = {
        api: "api_task_index_del",
        data: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id
        }
      };
      this.dialogxieban = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // 协办人积累
    handleCheckedCitiesChange() {

    },

    // 删除交付
    delJiaofu(list) {
      this.$confirm("确定删除交付记录：硬件需求文档？", "删除交付记录", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            const path = {
              api: "api_task_deliver_del",
              data: {
                project_id: this.$route.query.project_id,
                task_id: this.$route.query.task_id,
                deliever_id: list.Id
              }
            };
            this.initLoading = true;
            this.socketApi.sendSock(JSON.stringify(path), res => {
              this.socketData(res);
            });
          })
          .catch(() => {});
    },

    // 删除日志
    rzDel(list) {
      this.$confirm("确定删除该日志？", "删除日志", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            const path = {
              api: "api_task_tasklog_del",
              data: {
                project_id: this.$route.query.project_id,
                task_id: this.$route.query.task_id,
                log_id: list.Id
              }
            };
            this.initLoading = true;
            this.socketApi.sendSock(JSON.stringify(path), res => {
              this.socketData(res);
            });
          })
          .catch(() => {});
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
    closeDialog(type) {
      this.rzVisible = false;
      this.rzVisible = false;
      this.isPVisible = false;
      if (type === "success") {
        this.rziActive(1);
        this.rziActive(2);
        this.rziActive(3);
      }
    },
    rzDialog(type) {
      this[type] = true;
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

    getTime(time, type) {
      return format(new Date(time), type);
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
            this.taskInfo = resj.data.task || [];
            if (!this.$util.isEmpty(resj.data.task_log)) {
              this.taskLog = [];
              const list = [];
              resj.data.task_log.forEach(i => {
                const duitime = this.getTime(i.time, "yyyy-MM-dd");
                const pushData = resj.data.task_log.filter(
                  i => this.getTime(i.time, "yyyy-MM-dd") === duitime
                );
                list.push({
                  duitime,
                  list: [...pushData]
                });
              });
              this.taskLog = this.unique(list, "duitime");
            }
          }
          // 操作日志
          if (resj.api === "api_task_index_operation") {
            console.log(resj)
          }
          
          // 归档
          if (resj.api === "api_task_index_setfile") {
            this.$message.success("归档成功！");
            this.$router.go(-1);
          }
          // 交付列表
          if (resj.api === "api_task_deliver_list") {
            if (resj.code === 0) {
              this.tableData = resj.data.deliver;
            }
          }

          // 删除任务
          if (resj.api === "api_task_index_del") {
            this.$message.success("任务删除成功！");
            this.$router.go(-1);
          }
          // 删除任务日志
          if (resj.api === "api_task_tasklog_del") {
            this.$message.success("日志删除成功！");
            this.rziActive(1);
            this.rziActive(2);
          }
          // 删除交付
          if (resj.api === "api_task_deliver_del") {
            if(resj.code === 0) {
              this.$message.success("交付删除成功！");
              this.rziActive(3);
            }
          }

          // 协办列表
          if (resj.api === "api_task_index_helperList") {
            if(resj.code === 0) {
              this.helpers = resj.data.helpers;
            }
          }

          // 协办列表
          if (resj.api === "api_task_index_untaskMember") {
            if(resj.code === 0) {
              console.log(resj, 878)
              // this.untaskMember = resj.data.helpers;
            }
          }

          // 下载交付
          if (resj.api === "api_task_deliver_download") {
            if(resj.code === 0) {
              console.log(resj)
              // this.untaskMember = resj.data.helpers;
            }
          }

          // 下载列表
          if(resj.api === "api_task_deliver_filelist") {
            if(resj.code === 0) {
              this.downList = resj.data.deliver_files;
              this.downDialog = true;
            }
          }
          
        }
      }
      this.initLoading = false;
    },
    // 根据对象去重
    unique(arr1, type) {
      const res = new Map();
      return arr1.filter(a => !res.has(a[type]) && res.set(a[type], 1));
    },

    // 下载交付
    downJF() {
      const path = {
        api: "api_task_deliver_download",
        data: {
          project_id: this.$route.query.project_id,
          task_id: this.$route.query.task_id,
          deliever_id: '1'
        }
      };
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    rziActive(type) {
      this.rzi_active = type;
      let api = "";
      if(type === 1) {
        api = "api_task_index_info";
      } 
      if(type === 2) {
        api = "api_task_index_operation"
      }
      if(type === 3) {
        api = "api_task_deliver_list"
      }

      const path = {
        api,
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

    // 返回上一页
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
        display: flex;
        align-items: center;
      }
      > i {
          height: 10px;
          width: 1px;
          background: #2c6dd2;
          margin: 0 8px;
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
        cursor: pointer;
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
  & .down-ul {
    > li {
      display: flex;
      justify-content: space-between;
      padding: 0 33px 0 50px;
      height: 45px;
      align-items: center;
      border-bottom: 1px solid #E5E5E5;
      font-size: 14px;
      color: #666666;

      > span {
        color: #2C6DD2;
        cursor: pointer;
      }
    }
  }
}
</style>
