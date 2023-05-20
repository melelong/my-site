<template>
  <div id="blogComment" class="blogComment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { blog } from "@/api";
import { MessageArea } from "@/components";
import { fetchData } from "@/mixins";
import { debounce } from "@/utils";
export default {
  name: "BlogComment",
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
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
      const res = await blog.getComments(
        this.page,
        this.limit,
        this.$route.params.id
      );
      return res;
    },
    async handleSubmit(formData, callback) {
      try {
        const blogId = this.$route.params.id;
        console.log({
          ...formData,
          blogId,
        });
        const res = await blog.postComment({
          ...formData,
          blogId,
        });
        this.data.rows.unshift(res);
        this.data.total++;
        callback("评论成功");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="less">
.blogComment-container {
  margin: 30px 0;
}
</style>
