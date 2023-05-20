<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 标题 -->
      <div class="title-container">
        <h3 class="title">个人空间后台系统</h3>
      </div>
      <!-- 管理员账号 -->
      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="请输入管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 管理员密码 -->
      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入管理员密码"
          name="loginPwd"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <div class="captchaContainer">
        <el-form-item prop="captcha" class="captchaInput">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input
            ref="captcha"
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            name="captcha"
            type="text"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <div
          v-html="captchaStr"
          class="captchaImg"
          @click="getCaptchaFunc"
        ></div>
      </div>
      <!-- 7 天内免登录 -->
      <div class="loginCheck">
        <el-checkbox v-model="loginForm.checked">7 天内免登录</el-checkbox>
      </div>
      <!-- 登录按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
import { getCaptcha } from "@/api/captcha";
export default {
  name: "Login",
  data() {
    // const validateLoginId = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error("请输入正确的用户名"));
    //   } else {
    //     callback();
    //   }
    // };
    // const checkPassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error("密码不能少于6位"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      captchaStr: "",
      loginForm: {
        loginId: "",
        loginPwd: "",
        captcha: "",
        checked: true,
      },
      // 表单验证
      loginRules: {
        // 各个字段的验证规则
        loginId: [
          {
            required: true,
            trigger: "blur",
            message: "请输入管理员账号",
          },
        ],
        loginPwd: [
          {
            required: true,
            trigger: "blur",
            message: "请输入管理员密码",
          },
          {
            min: 6,
            max: 15,
            message: "长度需要在 6-15 字符之间",
            trigger: "blur",
          },
        ],
        captcha: [
          {
            required: true,
            trigger: "blur",
            message: "请输入验证码",
          },
          {
            min: 4,
            max: 4,
            message: "长度需要 4 字符",
            trigger: "blur",
          },
        ],
      },
      passwordType: "password",
      loading: false,
      loadingCaptcha: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  async created() {
    await this.getCaptchaFunc();
  },
  methods: {
    // 显示密码
    showPwd() {
      this.passwordType = this.passwordType === "password" ? "" : "password";
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // 表单校验通过
          this.loading = true;
          if (this.loginForm.checked) {
            this.loginForm.remember = 7;
          } else {
            delete this.loginForm.remember;
          }
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(async (res) => {
              if (typeof res === "string") {
                // 验证码错误
                this.$message.error("验证码错误");
              } else {
                // 账号密码错误
                this.$message.error("账号密码错误");
                this.loginForm.loginId = "";
                this.loginForm.loginPwd = "";
              }
              await this.getCaptchaFunc();
              this.loginForm.captcha = "";
              this.loading = false;
            });
          this.loading = false;
        } else {
          this.$message.error("验证不通过");
          return false;
        }
      });
    },
    // 切换验证码
    async getCaptchaFunc() {
      if (this.loadingCaptcha) return;
      try {
        this.loadingCaptcha = true;
        this.captchaStr = await getCaptcha();
        this.loadingCaptcha = false;
      } catch (err) {
        this.$message({
          type: "error",
          message: err,
        });
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  user-select: none;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.captchaContainer {
  display: flex;
  align-items: flex-start;
  .captchaInput {
    width: 70%;
    margin-right: 1%;
  }
  .captchaImg {
    width: 29%;
    height: 54px;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.loginCheck {
  margin-bottom: 15px;
}
</style>
