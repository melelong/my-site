<template>
  <div class="blogCategory-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
    <Empty v-if="data.length === 0 && !isLoading" />
  </div>
</template>

<script>
import { blog } from "@/api";
import { fetchData } from "@/mixins";
import RightList from "../RightList";
import { Empty } from "@/components";
import { titleController } from "@/utils";
export default {
  mixins: [fetchData([])],
  name: "BlogCategory",
  components: {
    RightList,
    Empty,
  },
  mounted() {},
  computed: {
    categoryId() {
      return this.$route.params.categoryId || -1;
    },
    limit() {
      return this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const res = [
        {
          id: -1,
          name: "全部",
          articleCount: totalArticleCount,
          order: 0,
        },
        ...this.data,
      ];

      return res.map((item) => ({
        ...item,
        isSelect: item.id === this.categoryId,
        aside: `${item.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await blog.getBlogTypes();
    },
    handleSelect(item) {
      if (!item.articleCount) return;
      if (item.id === this.categoryId) return;
      titleController.setRouteTitle(item.name);
      const query = {
        page: 1,
        limit: this.limit,
      };
      item.id === -1
        ? this.$router.push({ name: "Blog", query })
        : this.$router.push({
            name: "CategoryBlog",
            query,
            params: {
              categoryId: item.id,
            },
          });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogCategory-container {
  width: 14rem;
  padding: 0 1.2rem 1.2rem;
  height: calc(100vh - 3.125rem);
  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  user-select: none;
  background: #fff;
  border-left: 1px solid lighten(@gray, 20%);
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin-bottom: 16px;
    position: sticky;
    top: 0;
    padding: 20px 0 1em;
    border-bottom: 1px lighten(@gray, 20%) solid;
    background: #fff;
  }
}
</style>
