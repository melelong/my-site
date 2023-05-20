<template>
  <div>
    <h1>{{ testName }}</h1>
    <Avatar :url="url" />
    <Avatar :url="url" :size="50" />
  </div>
</template>
<script>
import Avatar from "./index";
export default {
  name: "testAvatar", // 测试组件名
  data() {
    return {
      url: "https://www.baidu.com/img/flexible/logo/pc/result.png",
      testName: "testAvatar",
    };
  },
  components: {
    Avatar,
  },
};
</script>
