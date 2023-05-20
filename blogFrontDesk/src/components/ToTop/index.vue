<template>
  <div @click="handleClick" class="toTop-container" v-show="show">Top</div>
</template>

<script>
import { debounce } from "@/utils";
export default {
  name: "ToTop",
  data() {
    return {
      show: false,
    };
  },
  props: {
    scrollHeight: {
      type: Number,
      default: 400,
    },
  },
  created() {
    // 防抖处理
    this.scrollDebounce = debounce(this.handleScroll, 50);
    // 监听
    this.$bus.$on("mainScroll", this.scrollDebounce);
  },
  beforeDestroy() {
    // 取消监听
    this.$bus.$off("mainScroll", this.scrollDebounce);
  },
  methods: {
    handleClick() {
      this.$store.commit("blog/setBlogIsShow", false);
      this.$bus.$emit("setMainScroll", 0);
    },
    scrollDebounce() {
      return;
    },
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= this.scrollHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.toTop-container {
  background: @primary;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  right: 2.8rem;
  bottom: 2.8rem;
  cursor: pointer;
  text-align: center;
  line-height: 2.8rem;
  color: #fff;
}
</style>
