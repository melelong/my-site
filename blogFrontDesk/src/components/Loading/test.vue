<template>
  <div>
    <h1>{{ testName }}</h1>
    <div class="test-container">
      <Loading size="100%" />
    </div>
  </div>
</template>
<script>
import Loading from "./index";
export default {
  name: "testLoading",
  data() {
    return {
      testName: "testLoading",
    };
  },
  components: {
    Loading,
  },
};
</script>
<style lang="less" scoped>
.test-container {
  width: 600px;
  height: 600px;
  margin: 100px auto;
  background: green;
  position: relative;
}
</style>
