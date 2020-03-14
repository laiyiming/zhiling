<template>
  <div class="navigation">
    <div class="navigation_logo">
      <img src="@/assets/images/logo.png" />
    </div>
    <ul class="navigation_list">
      <li>
        <p class="navigation_list-item">
          <img src="@/assets/icon/xiangmu.png" />
          <span>项目</span>
          <!-- <img
            class="navigation_list-item__down"
            src="@/assets/icon/xiala.png"
            alt=""
          /> -->
        </p>
      </li>
      <li class="navigation_list-active">
        <p class="navigation_list-item">
          <img src="@/assets/icon/rengwu.png" />
          <span>任务</span>
          <img
            class="navigation_list-item__down"
            src="@/assets/icon/xiala.png"
            alt=""
          />
        </p>
        <div class="navigation_list-item_cd">
          <p class="navigation_list-active-p">我的任务</p>
          <p @click="toRouter">待接收的</p>
          <p>我发布的</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navigation",
  methods: {
    toRouter() {
      this.$router.push({ path: "/about" });
    }
  }
};
</script>

<style lang="less">
.navigation {
  min-height: 100vh;
  width: 235px;
  background: #2c6dd2;

  & .navigation_logo {
    margin: 27px 0 37px 40px;
    > img {
      width: 131px;
      height: 36px;
    }
  }

  .navigation_list {
    color: #ffffff;
    font-size: 16px;
    line-height: 18px;

    .navigation_list-item {
      display: flex;
      align-items: center;
      height: 58px;
      padding-left: 40px;

      > span {
        opacity: 0.6;
        margin: 0 auto 0 9px;
      }

      > img {
        width: 17px;
        height: 17px;
      }

      > .navigation_list-item__down {
        width: 13px;
        height: 7px;
        margin-right: 44px;
      }
    }
    .navigation_list-item_cd {
      margin-top: 17px;
      margin-left: 66px;
      > p {
        margin-bottom: 21px;
        opacity: 0.6;
      }
      > .navigation_list-active-p {
        opacity: 1;
      }
    }
    .navigation_list-active {
      > p {
        > span {
          opacity: 1;
        }
      }
    }
  }
}
</style>
