<template>
  <div ref="message" class="message-container">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>
<script>
import { MessageArea } from "@/components";
import { fetchData, mainScroll } from "@/mixins";
import { message } from "@/api";
import { debounce } from "@/utils";
export default {
  name: "Message",
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("message")],
  data() {
    return {
      page: 1,
      limit: 10,
    };
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
  computed: {
    // 判断是否还有更多
    hasMore() {
      return this.data.total > this.data.rows.length;
    },
  },
  components: {
    MessageArea,
  },
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) return;
      const range = 100; // 可接受的范围
      // 元素滚动条高度 = 元素离顶部的高度 + 元素高度
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      dec <= range && this.fetchMore();
    },
    // 加载更多
    async fetchMore() {
      if (!this.hasMore) return;
      this.isLoading = true;
      this.page++;
      const res = await this.fetchData();
      this.data.total = res.total;
      // 旧的数组和新数组合并
      this.data.rows = [...this.data.rows, ...res.rows];
      this.isLoading = false;
    },
    async fetchData() {
      return await message.getMessages(this.page, this.limit, "");
    },
    async handleSubmit(formData, callback) {
      try {
        const res = await message.postMessage(formData);
        this.data.rows.unshift(res);
        this.data.total++;
        callback("感谢您的留言");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  // position: relative;
  padding: 25px 0;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  .messageArea-container {
    width: 38.9rem;
    margin: 0 auto;
  }
  @media screen and (max-width: 768px) {
    .messageArea-container {
      width: 80vw;
      margin: 0 auto;
    }
  }
}
</style>
