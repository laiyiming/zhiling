<template>
  <div class="logo">
    <div class="logo-header"></div>
    <div class="logo-content">
      <div class="logo-item">
        <img src="@/assets/icon/phone.png" alt="" />
        <el-input v-model="phone" placeholder="请输入手机号" />
      </div>
      <div class="logo-item">
        <img src="@/assets/icon/shuo.png" alt="" />
        <el-input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <div class="logo-item">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <span class="logo-item__reset-password" @click="routerTo('/logo/reset')"
          >忘记密码</span
        >
      </div>
      <div class="logo-item">
        <el-button @click="login">登录</el-button>
        <el-button @click="routerTo('/logo/register')">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logo",
  data() {
    return {
      phone: "",
      password: "",
      checked: ""
    };
  },

  methods: {
    login() {
      let reg = /^1\d{10}$/;
      if (
        this.$util.isEmpty(this.phone) ||
        this.phone.length <= 10 ||
        !reg.test(this.phone)
      ) {
        this.$message.error("手机号格式有误，请重新填写");
        return false;
      }

      if (this.$util.isEmpty(this.password)) {
        this.$message.error("密码不可为空");
        return false;
      }
    },
    routerTo(path) {
      this.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="less">
.logo {
  & .logo-header {
    width: 100%;
    height: 516px;
    background: url("~@/assets/images/banner.png") center;
    background-size: cover;
  }

  & .logo-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px 0 200px;
    overflow: hidden;
  }

  & .logo-item {
    width: 411px;
    position: relative;
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      position: absolute;
      left: 8px;
      top: 10px;
      width: 20px;
      height: 20px;
      z-index: 20;
    }

    & .el-input__inner {
      height: 40px;
      padding-left: 45px;
    }

    & .el-button {
      width: 199px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      border: none;
    }

    & .el-button:first-child {
      background: #2c6dd2;
      color: #ffffff;
    }

    & .el-button:last-child {
      background: #d5e2f6;
      color: #2c6dd2;
    }

    & .el-checkbox {
      margin-right: auto;
    }

    & .logo-item__reset-password {
      color: #2c6dd2;
      cursor: pointer;
    }
  }
}
</style>
