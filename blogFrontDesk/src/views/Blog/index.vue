<template>
  <Layout>
    <BlogList />
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>
<script>
import { Layout } from "@/components";
import { BlogList, BlogCategory } from "./components";
export default {
  name: "Blog",
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
</style>
