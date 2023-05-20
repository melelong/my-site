<template>
  <!-- 只有总页数大于1时才显示 -->
  <div class="pager-container" v-if="isShow">
    <span @click="handleClick(1)" :class="{ disabled: current === 1 }">{{
      type[0]
    }}</span>
    <span
      @click="handleClick(current - 1)"
      :class="{ disabled: current === 1 }"
      >{{ type[1] }}</span
    >
    <span
      v-for="(item, i) in numbers"
      @click="handleClick(item)"
      :key="i"
      :class="{ active: current === item }"
      >{{ item }}</span
    >
    <span
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
      >{{ type[2] }}</span
    >
    <span
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
      >{{ type[3] }}</span
    >
  </div>
</template>
<script>
export default {
  name: "pager",
  computed: {
    isShow() {
      return this.pageNumber > 1;
    },
    // 总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 得到显示的最小数字
    visibleMin() {
      let min = Math.floor(this.current - this.visibleNumber / 2);
      min < 1 && (min = 1);
      return min;
    },
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      max > this.pageNumber && (max = this.pageNumber);
      return max;
    },
    numbers() {
      let nums = new Array(this.visibleMax - this.visibleMin + 1)
        .fill(0)
        .map((item, i) => this.visibleMin + i);
      this.current < 1 && (nums = []);
      this.current > this.pageNumber && (nums = []);
      return nums;
    },
  },
  props: {
    // 当前页码
    current: {
      type: Number,
      // required:true,
      default: 1,
    },
    // 总数据量
    total: {
      type: Number,
      // required:true,
      default: 0,
    },
    // 页容量
    limit: {
      type: Number,
      // required:true,
      default: 10,
    },
    // 可见页码数
    visibleNumber: {
      type: Number,
      // required:true,
      default: 10,
    },
    // 样式
    type: {
      type: Array,
      default: () => ["|<<", "<<", ">>", ">>|"],
    },
  },
  methods: {
    handleClick(newCurrent) {
      if (newCurrent === this.current) return;
      if (newCurrent < 1) return;
      if (newCurrent > this.pageNumber) return;
      this.$emit("pageChange", newCurrent);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  font-size:.5rem;
  margin: 0 0 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: @primary;
    margin: 0 0.4rem;
    cursor: pointer;
    user-select: none;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
    }
  }
}
</style>
