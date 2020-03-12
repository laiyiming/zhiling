<template>
  <div class="project-content">
    <div class="project-index__header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="project-index__header-button">
        <el-button class="project-index__button-del">删除项目</el-button>
        <el-button class="project-index__button-add">+添加清单</el-button>
        <el-button class="project-index__button-add">+添加清单</el-button>
      </div>
    </div>
    <div class="project-content__content">
      <div class="project-content__list">
        <p class="project-content__list-title">
          供应商
          <el-popover placement="bottom" width="400" trigger="click">
            <div>sasdas</div>
            <div class="project-content__list-title__img" slot="reference">
              <img src="@/assets/icon/gd@2x.png" />
            </div>
          </el-popover>
        </p>
        <div class="project-content__list-item">
          <p class="project-content__status1">待定</p>
          <div class="project-content__list-item-div">
            网点市场
          </div>
          <img src="@/assets/icon/bianji.png" />
        </div>
        <div class="project-content__list-item">
          <p class="project-content__status2">开始</p>
          <div class="project-content__list-item-div">
            网点市场
          </div>
          <img src="@/assets/icon/bianji.png" />
        </div>
        <div class="project-content__list-item">
          <p class="project-content__status3">完成</p>
          <div class="project-content__list-item-div">
            网点市场
          </div>
          <img src="@/assets/icon/bianji.png" />
        </div>
        <div class="project-content__list-item">
          <p class="project-content__status4">归档</p>
          <div class="project-content__list-item-div">
            网点市场
          </div>
          <img src="@/assets/icon/bianji.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
  }

  & .project-content__list {
    width: 190px;
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #e5e5e5;
    border-bottom: none;

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

      > img {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 7px;
        right: 7px;
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
</style>
