<template>
  <div>
    <h1>{{ testName }}</h1>
    <Pager
      :type="type"
      @pageChange="handlePageChange"
      :current="current"
      :total="total"
    />
  </div>
</template>
<script>
import { config as type } from "./testData";
import Pager from "./index";
export default {
  name: "testPager",
  data() {
    return {
      testName: "testPager",
      current: 1,
      total: 302,
      type,
    };
  },
  components: {
    Pager,
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
      // console.log("加载当前页数据");
    },
  },
};
</script>
<style scoped></style>
