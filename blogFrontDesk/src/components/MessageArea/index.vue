<template>
  <div class="messageArea-container">
    <DataForm v-on="$listeners" />
    <h3>
      {{ title }} <span>{{ subTitle }}</span>
    </h3>
    <DataList v-if="list" :list="list" />
    <div class="loading" v-loading="isListLoading"></div>
    <div class="no">
      <Empty v-if="list.length === 0 && !isListLoading" />
    </div>
  </div>
</template>

<script>
import DataForm from "./DataForm";
import DataList from "./DataList";
import { Empty } from "@/components";
export default {
  name: "MessageArea",
  components: {
    DataForm,
    DataList,
    Empty,
  },
  props: {
    // 列表标题
    title: {
      type: String,
      default: "",
    },
    // 列表副标题
    subTitle: {
      type: String,
      default: "",
    },
    // 列表数据
    list: {
      type: Array,
      default: () => [],
    },
    // 列表是否正在加载中
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.messageArea-container {
  user-select: none;
  h3 {
    margin: 1em 0;
  }
  .loading {
    position: relative;
    height: 100px;
  }
  .no{
    width: 100%;
    position: relative;
  }
}
</style>
