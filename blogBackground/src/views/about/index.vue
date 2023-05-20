<template>
  <div class="app-container" v-loading="isLoading">
    <!-- 关于我 -->
    <div class="block">关于我</div>
    <div style="margin-bottom: 15px">
      <el-input
        :disabled="inputState"
        v-model="data"
        placeholder="请输入url地址"
      ></el-input>
    </div>
    <!-- 关于我修改 -->
    <div style="margin-bottom: 15px">
      <el-button
        :disabled="buttonState"
        type="primary"
        style="margin-top: 15px"
        @click="editAboutHandler"
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
    </div>
  </div>
</template>

<script>
import { findAbout, editAbout } from "@/api/about";
export default {
  name: "about",
  data() {
    return {
      data: "",
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
    // 获取数据
    async fetchData() {
      try {
        this.isLoading = true;
        const res = await findAbout();
        this.data = res.data;
        this.isLoading = false;
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 提交数据
    async editAboutHandler() {
      if (this.data === "") {
        this.$message.error("输入框不能为空");
        return;
      }
      if (!this.inputState) {
        if (this.buttonState) return;
        try {
          this.buttonState = true;
          await editAbout({ url: this.data });
          this.$message.success("修改成功");
          this.buttonState = false;
          await this.fetchData();
        } catch (err) {
          this.$message.error(err);
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
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
