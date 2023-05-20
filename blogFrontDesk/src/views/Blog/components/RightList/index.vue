<template>
  <ul class="rightList-container">
    <li v-for="(item, i) in list" :key="i">
      <span class="type" @click="handleClick(item)">
        <span class="name" :class="{ active: item.isSelect }">
          {{ item.name }}
        </span>
        <span
          v-if="item.aside"
          class="aside"
          :class="{ active: item.isSelect }"
        >
          {{ item.aside }}
        </span>
      </span>
      <RightList
        v-if="item.children"
        :list="item.children"
        @select="handleClick"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.rightList-container {
  .rightList-container {
    margin-left: 1em;
  }
  li {
    line-height: 40px;
    min-height: 1.5rem;
    color: @words;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    .type {
      cursor: pointer;
      .aside,
      .name {
        &.active {
          color: @warn;
          font-weight: bold;
        }
      }
      .name {
        font-size: 14px;
      }
      .aside {
        color: @gray;
        font-size: 15px;
        margin-left: 12px;
      }
    }
  }
}
</style>
