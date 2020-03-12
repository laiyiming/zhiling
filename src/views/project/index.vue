<template>
  <div class="project-index">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="project-index__header-button">
        <el-button class="project-index__button-del">删除项目</el-button>
        <el-button class="project-index__button-add">+添加项目</el-button>
      </div>
    </div>
    <ul class="project-index__ul">
      <li>
        <img src="" alt="" />
        <div class="project-index__ul-item">
          <p>生态鲜管理系统</p>
          <div>
            生态鲜(厦门)信息技术有限公司成立于2019年07月02日，注册地位于厦门市思明区塔埔东路168号24层2405单元B区，法人代表为王晓坪。
          </div>
          <el-button @click="toRoute">进入项目</el-button>
        </div>
      </li>
    </ul>
    <router-link :to="{ name: 'ProjectContent' }" tag="li"
      >我的收藏</router-link
    >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ProjectIndex",
  data() {
    return {};
  },

  methods: {
    toRoute() {
      // this.$router.push({ path: "/project/project-content" });
      this.$router.push({ path: "content" });
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
    margin: 24px 0 0 24px;

    > li {
      width: 526px;
      height: 277px;
      background: #ffffff;
      display: flex;
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
