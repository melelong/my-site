<template>
  <div class="app-container" v-loading="isLoading">
    <!-- 百度统计 -->
    <div class="block">
      百度统计 API_Key
      <a
        class="code"
        target="__blank"
        href="https://tongji.baidu.com/web5/welcome/login"
        >(获取API_Key)</a
      >
    </div>
    <div style="margin-bottom: 15px; width: 40vw">
      <el-input
        :disabled="inputState"
        v-model="data.APIKey"
        placeholder="请输入API_Key"
      ></el-input>
    </div>
    <div class="block">
      百度统计 Secret_Key
      <a
        class="code"
        target="__blank"
        href="https://tongji.baidu.com/web5/welcome/login"
        >(获取Secret_Key)</a
      >
    </div>
    <div style="margin-bottom: 15px; width: 40vw">
      <el-input
        :disabled="inputState"
        v-model="data.SecretKey"
        placeholder="请输入Secret_Key"
      ></el-input>
    </div>
    <div class="block">
      百度统计 CODE
      <a
        class="code"
        v-show="data.APIKey"
        target="__blank"
        :href="`http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=${data.APIKey}&redirect_uri=oob&scope=basic&display=popup`"
        >(获取CODE)</a
      >
    </div>
    <div style="margin-bottom: 15px; width: 40vw">
      <el-input
        :disabled="inputState"
        v-model="data.CODE"
        placeholder="请输入CODE"
      ></el-input>
    </div>
    <!-- 修改信息 -->
    <div style="margin-bottom: 15px; width: 40vw">
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="editTongJiHandler"
        :disabled="buttonState"
        >{{ text }}</el-button
      >
      <el-button
        v-show="!inputState"
        :disabled="buttonState"
        type="danger"
        style="margin-top: 15px"
        @click="exitEditing"
        >退出编辑</el-button
      >
      <el-button
        v-show="inputState"
        :disabled="buttonState"
        type="danger"
        style="margin-top: 15px"
        @click="backHandle"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script>
import { setTongJi, getTongJi, getTongJiTOKEN } from "@/api/user";
import { setRefresh, setAccess } from "@/utils/auth";
export default {
  name: "tongJi",
  data() {
    return {
      data: {
        APIKey: "",
        SecretKey: "",
        CODE: "",
      },
      inputState: true,
      buttonState: false,
      isLoading: true,
    };
  },
  computed: {
    text() {
      return this.inputState ? "编辑" : "完成";
    },
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const res = await getTongJi();
        const { APIKey, CODE, SecretKey } = res.data;
        this.data = { APIKey, CODE, SecretKey };
        this.isLoading = false;
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 提交数据
    async editTongJiHandler() {
      if (!this.inputState) {
        if (!this.data.APIKey || !this.data.CODE || !this.data.SecretKey) {
          this.$message.error("输入框不能为空");
          return;
        }
        if (this.buttonState) return;
        try {
          this.buttonState = true;
          const { access_token, refresh_token } = await getTongJiTOKEN(
            this.data
          );
          await setTongJi({
            ...this.data,
            access_token,
            refresh_token,
            tongJi: "开启",
          });
          setRefresh(refresh_token);
          setAccess(access_token);
          this.$message.success("修改成功");
          this.buttonState = false;
          await this.fetchData();
        } catch (err) {
          let text = err;
          err.message === "Request failed with status code 401" &&
            (text = "Key有误");
          err.message === "Request failed with status code 400" &&
            (text = "CODE有误");
          this.$message.error(text);
          this.buttonState = false;
          return;
        }
      }
      this.inputState = !this.inputState;
    },
    // 退出编辑
    async exitEditing() {
      this.$message.info("退出编辑");
      this.inputState = true;
      await this.fetchData();
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
