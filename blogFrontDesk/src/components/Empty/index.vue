<template>
  <div class="empty-container" :style="{ '--color': color, '--size': size }">
    <Icon type="empty" />
    <div class="emptyText">{{ text }}</div>
  </div>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Empty",
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
    color: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "100%",
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.empty-container {
  --color: @gray;
  .self-center(var(--size));
  text-align: center;
  user-select: none;
  font-size: 72px;
  color: var(--color);
  .icon-container {
    color: inherit;
    font-size: 1em;
  }
  .emptyText {
    margin-top: 0.2em;
    color: inherit;
    font-size: 0.2em;
  }
}
</style>
