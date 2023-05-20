<template>
  <Layout>
    <div ref="main" class="main-container" v-loading="isLoading">
      <BlogDetail v-if="data" :blog="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import { fetchData, mainScroll } from "@/mixins";
import { blog } from "@/api";
import { Layout } from "@/components";
import { titleController } from "@/utils";
import { BlogDetail, BlogTOC, BlogComment } from "./components";

export default {
  name: "Detail",
  mixins: [fetchData(null), mainScroll("main")],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mounted() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
  computed: {
    blogid() {
      return this.$route.params.id;
    },
  },
  methods: {
    async fetchData() {
      const resp = await blog.getBlog(this.blogid);
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
}
.right-container {
  z-index: 20;
  width: 14rem;
  position: relative;
  height: 100vh;
  user-select: none;
}
</style>
