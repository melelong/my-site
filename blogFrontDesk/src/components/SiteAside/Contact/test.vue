<template>
  <div>
    <h1>{{ testName }}</h1>
    <div class="test-container">
      <Contact :data="data" />
    </div>
  </div>
</template>
<script>
import "@/styles/global.less";
import Contact from "./index";
export default {
  name: "testContact",
  data() {
    return {
      testName: "testContact",
      data:[
  {
    icon: "github",
    text: "melelong",
    link: "https://github.com/melelong",
    // img: "",
    // img: "https://s1.vika.cn/space/2023/03/09/cff6e6998c214cadbd9f8cb8021f4300",
  },
  {
    icon: "mail",
    text: "1137042726@qq.com",
    link: "mailto:1137042726@qq.com",
    // img: "https://s1.vika.cn/space/2023/03/09/cff6e6998c214cadbd9f8cb8021f4300",
  },
  {
    icon: "qq",
    text: "1137042726",
    link: "tencent://message/?Menu=yes&uin=1137042726&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45",
    img: "https://s1.vika.cn/space/2023/03/09/cff6e6998c214cadbd9f8cb8021f4300",
  },
  {
    icon: "weixin",
    text: "yml15219764231",
    // link: "",
    img: "https://s1.vika.cn/space/2023/03/09/cff6e6998c214cadbd9f8cb8021f4300",
  },
],
    };
  },
  components: {
    Contact,
  },
};
</script>
<style lang="less" scoped>
.test-container {
  width: 300px;
  border: 1px solid #ccc;
  margin: 100px auto;
  background: #fff;
}
</style>
