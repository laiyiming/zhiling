<template>
  <div class="logo">
    <div class="logo-header"></div>
    <div class="logo-content">
      <div class="logo-item">
        <img src="@/assets/icon/phone.png" alt="" />
        <el-input v-model="phone" placeholder="请输入手机号" />
      </div>
      <!-- <div class="logo-item">
        <img src="@/assets/icon/shuo.png" alt="" />
        <el-input v-model="password" type="password" placeholder="请输入密码" />
      </div> -->
      <div class="logo-item">
        <img src="@/assets/icon/shuo.png" alt="" />
        <el-input
          v-model="code"
          style="width:314px; margin-right: auto"
          placeholder="请输入手机收到的验证码"
        />
        <el-button
          :disabled="(disabled = !show)"
          style="width: 87px; background: #2C6DD2; color: #FFFFFF"
          type="success"
          @click="send"
        >
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{ count }} s</span>
        </el-button>
      </div>
      <!-- <div class="logo-item">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <span class="logo-item__reset-password" @click="routerTo('/logo/reset')"
          >忘记密码</span
        >
      </div> -->
      <div class="logo-item">
        <el-button :loading="buttonLoading" @click="login">登录</el-button>
        <el-button @click="routerTo('/logo/register')">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const TIME_COUNT = 60; //更改倒计时时间
export default {
  name: "Logo",
  data() {
    return {
      buttonLoading: false,
      phone: "",
      password: "",
      checked: "",
      code: '',
      show: true, // 初始启用按钮
      count: "" // 初始化次数
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

      if (this.$util.isEmpty(this.code)) {
        this.$message.error("请填写验证码");
        return false;
      }

      const path = {
        api: "api_home_index_login",
        data: {
          phone: `${this.phone}`,
          method: "code",
          code: `${this.code}`
        }
      };
      this.buttonLoading = true;
      this.socketApi.sendSock(JSON.stringify(path), res => {
        this.socketData(res);
      });

      // if (this.$util.isEmpty(this.password)) {
      //   this.$message.error("密码不可为空");
      //   return false;
      // }
    },

    // 获取验证码
    send() {
      if (!this.timer) {
        let reg = /^1\d{10}$/;
        if (
          this.$util.isEmpty(this.phone) ||
          this.phone.length <= 10 ||
          !reg.test(this.phone)
        ) {
          this.$message.error("手机号格式有误，请重新填写");
          return false;
        }
        const path = {
          api: "api_home_index_code",
          data: {
            phone: `${this.phone}`
          }
        };
        this.socketApi.sendSock(JSON.stringify(path), res => {
          this.socketData(res);
        });

        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
          }
        }, 1000);
      }
    },

    socketData(res) {
      if (res !== '{"type":"ping"}') {
        const resj = JSON.parse(res);
        if (resj.code === -1) {
          this.$message.error(resj.message);
        } else {
          // 获取验证码
          if (resj.api === "api_home_index_code") {
            console.log(resj);
          }
          //登入
          if (resj.api === "api_home_index_login") {
            console.log(resj)
            if(resj.code === 0) {
              localStorage.setItem("token", JSON.stringify(resj.data.token));
              this.$router.push({
                path: "/project"
              });
            } else {
              this.buttonLoading = false;
            }

            
          }
        }
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
