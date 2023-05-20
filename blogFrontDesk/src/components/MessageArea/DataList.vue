<template>
  <ul class="dataList-container">
    <li v-for="item in list" :key="item.id">
      <div class="data-avatar">
        <Avatar :url="item.avatar" size="44px" />
      </div>
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{ formatDate(item.createDate, true) }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { formatDate } from "@/utils";
import { Avatar } from "@/components";
export default {
  name: "DataList",
  components: {
    Avatar,
  },
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.dataList-container {
  li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px lighten(@gray, 20%) solid;
    .data-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .data {
      position: relative;
      flex: 1 1 auto;
      .nickname {
        color: @success;
        margin-bottom: 10px;
      }
      .time {
        position: absolute;
        top: 5px;
        right: 0;
        font-size: 12px;
        color: @gray;
      }
    }
  }
}
</style>
