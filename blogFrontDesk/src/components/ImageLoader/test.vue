<template>
  <div>
    <h1>{{ testName }}</h1>
    <div class="test-container">
      <ImageLoader
        :src="src"
        :duration="duration"
        :placeholder="placeholder"
        @load="handleLoaded"
      />
    </div>
  </div>
</template>
<script>
import ImageLoader from "./index";
export default {
  name: "testImageLoader",
  data() {
    return {
      testName: "testImageLoader",
      src: "https://s1.vika.cn/space/2023/03/09/bea6b8140b8a49de8c0d17a971fbb038",
      placeholder:
        "https://s1.vika.cn/space/2023/03/09/6dc46595b23c43cd809b1762818c027f",
      duration: 1000,
    };
  },
  components: {
    ImageLoader,
  },
  methods: {
    handleLoaded() {
      // console.log("ImageLoader组件load事件触发，图片加载完成");
    },
  },
};
</script>
<style scoped>
.test-container {
  width: 500px;
  height: 500px;
  margin: 30px auto;
  border: 1px solid #ccc;
}
</style>
