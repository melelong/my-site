<template>
  <div class="testEmpty">
    <h1>{{ testName }}</h1>
    <div class="test-container">
      <Empty  :size="size" v-if="!datas.length" />
    </div>
  </div>
</template>
<script>
import Empty from "./index";
export default {
  name: "testEmpty",
  data() {
    return {
      datas: [],
      testName: "testEmpty",
      color: "red",
      size:'100%'
    };
  },
  components: {
    Empty,
  },
};
</script>
<style lang="less" scoped>
.testEmpty {
  .test-container {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    margin: 0 auto;
    position: relative;
  }
}
</style>
