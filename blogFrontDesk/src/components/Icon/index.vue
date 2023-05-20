<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>
<script>
import { config } from "./config.js"; // 导入配置
import { loadCSS } from "@/utils"; // 动态导入CSS文件
loadCSS(config.url, "iconUrl");
export default {
  name: "Icon",
  data() {
    return {
      classMap: config.classMap,
    };
  },
  computed: {
    fontClass() {
      return this.classMap[this.type];
    },
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>
