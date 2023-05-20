<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="right" :class="{ show: blogIsShow }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Layout",
  computed: {
    ...mapState("blog", ["blogIsShow"]),
  },
};
</script>
<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  .left,
  .right {
    flex: 0 0 auto;
    overflow: hidden;
  }
  .main {
    flex: 1 1 auto;
    overflow: hidden;
  }
}
@media screen and (max-width: 1279px) {
  .layout-container {
    .right {
      position: absolute;
      top: 0;
      right: -14rem;
      transition: 1s;
    }
    .right.show {
      padding: 3.125rem 0 0;
      right: 0;
    }
    .main {
      height: 100vh - 3.125rem;
    }
  }
}
</style>
