<template>
  <div class="app-container">
    <!-- 模板 -->
    <div class="block-container" v-for="(container, i) in domInfo" :key="i">
      <!-- 标题 -->
      <div class="block-title">{{ container.title || "" }}</div>
      <!-- 判断有没有子 -->
      <template v-if="container.children && container.children.length">
        <div v-for="(item, index) in container.children" :key="index">
          <div class="block">{{ item.title }}</div>
          <div style="margin-bottom: 15px; width: 40vw">
            <template v-if="item.type === 'text'">
              <el-input
                :disabled="inputState"
                v-model="data[item.dataName]"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'upload'">
              <Upload :disabled="inputState" v-model="data[item.dataName]" />
            </template>
          </div>
        </div>
      </template>
    </div>
    <div style="margin-bottom: 15px">
      <el-button
        :disabled="buttonState"
        type="primary"
        style="margin-top: 15px"
        @click="editSettingHandler"
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
import { findSetting, editSetting } from "@/api/setting";
// import { service_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload";
export default {
  name: "setting",
  components: {
    Upload,
  },
  data() {
    return {
      // 初始化数据
      data: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        qq: "",
        mail: "",
        qqQrCode: "",
        siteTitle: "",
        siteText: "",
        weixin: "",
        weixinQrCode: "",
      },
      inputState: true,
      buttonState: false,
      // dom信息
      domInfo: [
        // 网站信息
        {
          title: "网站信息",
          type: "container",
          children: [
            { title: "网站标题", type: "text", dataName: "siteTitle" },
            { title: "网站标语", type: "text", dataName: "siteText" },
            { title: "邮箱", type: "text", dataName: "mail" },
            { title: "备案号", type: "text", dataName: "icp" },
          ],
        },
        // 网站头像信息
        {
          title: "网站头像信息",
          type: "container",
          children: [{ title: "", type: "upload", dataName: "avatar" }],
        },
        // 网址图标信息
        {
          title: "网址图标信息",
          type: "container",
          children: [
            { title: "网址图标地址", type: "text", dataName: "favicon" },
            { title: "网址图标预览", type: "upload", dataName: "favicon" },
          ],
        },
        // github 信息
        {
          title: "github 信息",
          type: "container",
          children: [
            { title: "github 名字", type: "text", dataName: "githubName" },
            { title: "github 地址", type: "text", dataName: "github" },
          ],
        },
        // QQ 信息
        {
          title: "QQ 信息",
          type: "container",
          children: [
            { title: "QQ 号码", type: "text", dataName: "qq" },
            {
              title: "QQ二维码图片预览",
              type: "upload",
              dataName: "qqQrCode",
            },
          ],
        },
        // 微信信息
        {
          title: "微信信息",
          type: "container",
          children: [
            { title: "微信号", type: "text", dataName: "weixin" },
            {
              title: "微信二维码图片预览",
              type: "upload",
              dataName: "weixinQrCode",
            },
          ],
        },
      ],
    };
  },
  computed: {
    text() {
      return this.inputState ? "进入编辑模式" : "保存";
    },
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    // 获取数据
    async fetchData() {
      try {
        const res = await findSetting();
        this.data = res.data;
        // if (this.data.favicon) {
        //   const reg = /^\/static/;
        //   this.data.favicon = reg.test(this.data.favicon)
        //     ? service_URL + this.data.favicon
        //     : this.data.favicon;
        // }
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 提交数据
    async editSettingHandler() {
      if (!this.inputState) {
        if (this.buttonState) {
          return;
        }
        try {
          this.buttonState = true;
          // this.data.favicon = this.data.favicon.startsWith(service_URL)
          //   ? this.data.favicon.replace(service_URL, "")
          //   : this.data.favicon;
          await editSetting(this.data);
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
.block-container {
  border-bottom: 1px solid #ccc;
  padding: 20px 0 15px;
  .block-title {
    font-size: 20px;
  }
  .block {
    margin: 15px 0;
    font-weight: 100;
  }
}
</style>
