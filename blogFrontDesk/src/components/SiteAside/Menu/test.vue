<template>
  <div>
    <h1>{{ testName }}</h1>
    <div class="test-container">
      <Menu :data="data" />
    </div>
  </div>
</template>
<script>
import "@/styles/global.less";
import Menu from "./index";
export default {
  name: "testMenu",
  data() {
    return {
      testName: "testMenu",
      data: [
        {
          icon: "home",
          title: "首页",
          name: "/",
          exact: true,
        },
        {
          icon: "blog",
          title: "文章",
          name: "/blog",
          exact: false,
        },
        {
          icon: "about",
          title: "关于我",
          name: "/about",
          exact: true,
        },
        {
          icon: "code",
          title: "项目&效果",
          name: "/project",
          exact: true,
        },
        {
          icon: "chat",
          title: "留言板",
          name: "/message",
          exact: true,
        },
      ],
    };
  },
  components: {
    Menu,
  },
};
</script>
<style lang="less" scoped>
.test-container {
  width: 300px;
  height: 500px;
  border: 1px solid #ccc;
  margin: 100px auto;
  background: #202020;
}
</style>
