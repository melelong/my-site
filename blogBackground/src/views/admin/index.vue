<template>
  <div class="app-container">
    <el-form
      :model="adminForm"
      ref="adminForm"
      auto-complete="on"
      :rules="adminRules"
      label-position="left"
    >
      <el-form-item prop="name" label="用户名">
        <div style="margin-bottom: 15px; width: 40vw">
          <el-input
            ref="name"
            name="name"
            v-model="adminForm.name"
            placeholder="请输入用户名"
            tabindex="1"
            auto-complete="on"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="oldLoginPwd" label="旧密码">
        <div style="margin-bottom: 15px; width: 40vw">
          <el-input
            ref="oldLoginPwd"
            name="oldLoginPwd"
            v-model="adminForm.oldLoginPwd"
            placeholder="请输入旧密码"
            tabindex="2"
            auto-complete="on"
            type="password"
            width="50vw"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="loginPwd" label="新密码">
        <div style="margin-bottom: 15px; width: 40vw">
          <el-input
            ref="loginPwd"
            name="loginPwd"
            v-model="adminForm.loginPwd"
            placeholder="请输入新密码"
            tabindex="3"
            auto-complete="on"
            type="password"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="loginPwdConfirm" label="新密码确认">
        <div style="margin-bottom: 15px; width: 40vw">
          <el-input
            ref="loginPwdConfirm"
            name="loginPwdConfirm"
            v-model="adminForm.loginPwdConfirm"
            placeholder="请确认新密码"
            tabindex="4"
            auto-complete="on"
            type="password"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="margin-top: 15px"
          @click="clickHandle(adminForm)"
          >确定</el-button
        >
        <el-button type="danger" style="margin-top: 15px" @click="backHandle"
          >返回</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateInfo } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "admin",
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.adminForm.loginPwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      adminForm: {
        id: "",
        // loginId
        loginId: "",
        tongJi: "",
        // 用户名
        name: "",
        // 旧密码
        oldLoginPwd: "",
        // 新密码
        loginPwd: "",
        // 新密码确认
        loginPwdConfirm: "",
      },
      // 表单验证
      adminRules: {
        // 各个字段的验证规则
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
        ],
        oldLoginPwd: [
          {
            required: true,
            trigger: "blur",
            message: "请输入旧密码",
          },
          {
            min: 6,
            max: 15,
            message: "长度需要在 6-15 字符之间",
            trigger: "blur",
          },
        ],
        loginPwd: [
          {
            required: true,
            trigger: "blur",
            message: "请输入新密码",
          },
          {
            min: 6,
            max: 15,
            message: "长度需要在 6-15 字符之间",
            trigger: "blur",
          },
        ],
        loginPwdConfirm: [
          {
            required: true,
            trigger: "blur",
            message: "请确认新密码",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.adminForm.name = this.user.name;
    this.adminForm.id = this.user.id;
    this.adminForm.loginId = this.user.loginId;
    this.adminForm.tongJi = this.user.tongJi;
  },
  methods: {
    async clickHandle({ name, oldLoginPwd, loginPwd, loginPwdConfirm }) {
      if (!name || !oldLoginPwd || !loginPwd || !loginPwdConfirm) {
        this.$message.error("请输入内容");
        return;
      }
      try {
        const res = await updateInfo(this.adminForm);
        if (typeof res === "string") {
          const { msg } = JSON.parse(res.replace(/^\//g, ""));
          msg === "旧密码不正确" && (this.adminForm.oldLoginPwd = "");
          this.$message.error(msg);
          return;
        }
        this.$store.dispatch("user/logout");
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        this.$message.success("修改用户信息成功，请重新登录");
      } catch (err) {
        this.$message.error(err);
      }
    },
    backHandle() {
      this.$router.push({ name: "Console" });
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
  a.code {
    color: #409eff;
    text-decoration: underline;
  }
}
</style>
