<template>
  <div>
    <h1>{{ testName }}</h1>
    <div class="test-container">
      <Layout>
        <template #left>
          <div class="left">左边栏区域，宽度适应内容，溢出隐藏</div>
        </template>

        <div class="main">主区域，宽度占满剩余空间，溢出隐藏</div>

        <template #right>
          <div class="right">右边栏区域，宽度适应内容，溢出隐藏</div>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
import "@/styles/global.less";
import Layout from "./index";
export default {
  name: "testLayout",
  data() {
    return {
      testName: "testLayout",
    };
  },
  components: {
    Layout,
  },
};
</script>

<style scoped>
.test-container {
  width: 60%;
  height: 600px;
  margin: 30px auto;
  border: 2px solid #ccc;
}
.left {
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.main {
  width: 100%;
  height: 100%;
  background: lightgreen;
}
.right {
  width: 150px;
  height: 100%;
  background: lightcoral;
}
.left,
.main,
.right {
  text-align: center;
}
</style>
