<template>
  <div v-loading="initLoading" class="project-content">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/">{{ title }}</a></el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="project-index__header-button">
        <el-button
          class="project-index__button-del"
          @click="addLargeClass('add')"
        >
          +添加大类
        </el-button>
        <el-button
          class="project-index__button-add"
          @click="addDetailedList('add')"
          >+添加清单</el-button
        >
        <el-button class="project-index__button-add">+添加成员</el-button>
      </div>
    </div>
    <div class="project-content__content">
      <div
        v-for="item in moduelList"
        :key="item.Id"
        class="project-content__list"
      >
        <p class="project-content__list-title">
          {{ item.name }}
          <el-popover
            placement="bottom"
            width="113"
            trigger="click"
            popper-class="project-content__popover-lei"
          >
            <ul class="project-content__list-popover-lei">
              <li @click="addLargeClass('edit', item)">
                <img src="@/assets/icon/cmm.png" />
                重命名
              </li>
              <li @click="delModuel(item.Id)">
                <img src="@/assets/icon/shangchu.png" />
                删除大类
              </li>
            </ul>
            <div class="project-content__list-title__img" slot="reference">
              <img src="@/assets/icon/gd@2x.png" />
            </div>
          </el-popover>
        </p>

        <div 
          v-for="list in item.childrenList"
          :key="`qingd${list.Id}`"
          class="project-content__list-item">
          <p 
            :class="getStatusName(+list.status)"
          >
            {{ getStatus(+list.status) }}
          </p>
          <div class="project-content__list-item-div">
            {{ list.name }}
          </div>

          <el-popover
            placement="bottom"
            width="113"
            trigger="click"
            popper-class="project-content__popover-lei"
          >
            <ul class="project-content__list-popover-lei">
              <li @click="addDetailedList('resetName', list)">
                <img src="@/assets/icon/cmm.png" />
                重命名
              </li>
              <li>
                <img src="@/assets/icon/shangchu.png" />
                删除大类
              </li>
              <li>
                <img src="@/assets/icon/xiugaidalei.png" />
                修改大类
              </li>
            </ul>
            <div class="project-content__list-item__img" slot="reference">
              <img src="@/assets/icon/bianji.png" />
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加清单"
      custom-class="contentdialog"
      width="718px"
      center
    >
      <AddDetailedList
        :moduel="moduelList"
        :id="id"
        :moduel-id="moduelId"
        :type="moduelType"
        @closeDialog="closeDialog"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="classVisible"
      :title="moduelTitle"
      custom-class="contentdialog"
      width="718px"
      center
    >
      <AddLargeClass
        :id="id"
        :moduel-id="moduelId"
        :moduel-name="moduelName"
        :type="moduelType"
        @closeDialog="closeDialog"
      />
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible" width="30%" center>
      <span>确认删除！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="delVisibleCom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddDetailedList from "./AddDetailedList";
import AddLargeClass from "./AddLargeClass";
export default {
  name: "ProjectContent",
  components: {
    AddDetailedList,
    AddLargeClass
  },
  data() {
    return {
      title: "",
      id: null,
      dialogVisible: false,
      classVisible: false,
      initLoading: false,
      moduelList: [],
      qinlist: [],
      moduelTitle: "",
      moduelId: "",
      moduelType: "",
      moduelName: "",
      delVisible: false
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.initLoading = true;
      this.id = +this.$route.query.id;

      const path = {
        api: "api_moduel_index_list",
        data: {
          project_id: `${this.id}`
        }
      };
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // 关闭dialog弹窗
    closeDialog(type) {
      this.classVisible = false;
      this.dialogVisible = false;
      this.moduelId = '';
      if (type === "success") {
        this.init();
      }
    },

    // 删除大类弹窗
    delModuel(id) {
      this.moduelId = id;
      this.delVisible = true;
    },

    // socket请求统一处理
    socketData(res) {
      if (res !== '{"type":"ping"}') {
        const resj = JSON.parse(res);
        if (resj.code === -1) {
          this.$message.error(resj.message);
        } else {
          // 获取大类列表
          if (resj.api === "api_moduel_index_list") {
            this.moduelList = resj.data.moduels;
            this.qinlist = resj.data.lists;
            this.moduelList = this.moduelList.map(a => ({
              ...a,
              childrenList: this.getList(a.Id)
            }))
            console.log(this.moduelList, 852)
          }
          // 获取
          if (resj.api === "api_moduel_index_del") {
            this.delVisible = false;
            this.$message.success("删除成功！");
            this.init();
          }
        }
      }
      this.initLoading = false;
    },

    // 获取对应清单数据
    getList(id) {
      const list0 = this.getListData(id, 0);
      const list1 = this.getListData(id, 1);
      const list2 = this.getListData(id, 2);
      const list3 = this.getListData(id, 3);
      return [
        ...list0,
        ...list1,
        ...list2,
        ...list3
      ]
    },

    getListData(id, type) {
       const list = this.qinlist.filter(i => +i.moduel_id === id);
      const listData = list.filter(i => +i.status === type);
      if(!this.$util.isEmpty(listData)) {
        return listData
      }
      return []
    },

    getStatus(type) {
      switch (type) {
        case 0:
          return '待定';
          // eslint-disable-next-line no-unreachable
          break;
        case 1:
          return '开始';
          // eslint-disable-next-line no-unreachable
          break;
        case 2:
          return '完成';
          // eslint-disable-next-line no-unreachable
          break;
        case 3:
          return '归档';
        default:
      }
    },

    getStatusName(type) {
      switch (type) {
        case 0:
          return 'project-content__status1';
          // eslint-disable-next-line no-unreachable
          break;
        case 1:
          return 'project-content__status2';
          // eslint-disable-next-line no-unreachable
          break;
        case 2:
          return 'project-content__status3';
          // eslint-disable-next-line no-unreachable
          break;
        case 3:
          return 'project-content__status4';
        default:
      }
    },

    // 删除大类
    delVisibleCom() {
      const path = {
        api: "api_moduel_index_del",
        data: {
          project_id: `${this.id}`,
          moduel_id: `${this.moduelId}`
        }
      };
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });
    },

    // 添加清单弹窗
    addDetailedList(type) {
      this.dialogVisible = true;
      this.moduelType = type;
    },

    // 添加编辑大类弹窗
    addLargeClass(type, item) {
      if (type === "add") {
        this.moduelTitle = "添加大类";
        this.moduelType = type;
        this.moduelName = null;
      } else {
        this.moduelTitle = "编辑大类";
        this.moduelId = `${item.Id}`;
        this.moduelType = type;
        this.moduelName = item.name;
      }
      this.classVisible = true;
    }
  }
};
</script>
<style lang="less">
.project-content {
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

  & .project-content__content {
    margin: 24px 0 0 24px;
    background: #ffffff;
    padding: 24px 0 0 24px;
    display: flex;
    align-items: flex-start;
  }

  & .project-content__list {
    width: 190px;
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #e5e5e5;
    border-bottom: none;
    margin-right: 24px;

    & .project-content__list-title {
      height: 59px;
      background: #d5e2f6;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2c6dd2;
      position: relative;

      & .project-content__list-title__img {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;

        > img {
          width: 12px;
          height: 2px;
        }
      }
    }

    & .project-content__list-item {
      display: flex;
      height: 73px;
      font-size: 14px;
      border-bottom: 1px solid #e5e5e5;
      position: relative;

      > p {
        display: flex;
        align-items: center;
        width: 34px;
        padding: 0 10px;
        color: #ffffff;
      }

      > div {
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      & .project-content__list-item__img {
        width: 20px;
        height: 20px;
        top: 7px;
        right: 7px;
        cursor: pointer;
        position: absolute;

        > img {
          width: 20px;
          height: 20px;
        }
      }

      & .project-content__status1 {
        background: #bcbcbc;
      }
      & .project-content__status2 {
        background: #20c997;
      }
      & .project-content__status3 {
        background: #2c6dd2;
      }
      & .project-content__status4 {
        background: #ff6b6b;
      }
    }
  }
}
.project-content__popover-lei {
  & .project-content__list-popover-lei {
    > li {
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;

      > img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
      }
    }
    > li:last-child {
      border: none;
    }
  }
}
</style>
