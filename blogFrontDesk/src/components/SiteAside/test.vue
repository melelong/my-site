<template>
  <div>
    <h1>{{ testName }}</h1>
    <div class="test-container">
      <SiteAside :data="data" />
    </div>
  </div>
</template>
<script>
import "@/styles/global.less";
import SiteAside from "./index";
export default {
  name: "testSiteAside",
  data() {
    return {
      testName: "testSiteAside",
      data: {
        profile: {
          url: "https://s1.vika.cn/space/2023/03/09/6dc46595b23c43cd809b1762818c027f",
          title: "我的个人空间",
          text:'个人空间',
        },
        menu: [
          {
            icon: "home",
            title: "首页",
            link: "/",
          },
          {
            icon: "blog",
            title: "文章",
            link: "/blog",
            startWith: true,
          },
          {
            icon: "about",
            title: "关于我",
            link: "/about",
            startWith: true,
          },
          {
            icon: "code",
            title: "项目&效果",
            link: "/project",
            startWith: true,
          },
          {
            icon: "chat",
            title: "留言板",
            link: "/message",
            startWith: true,
          },
        ],
        contact: [
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
        footer:'黑ICP备17001719号',
      },
    };
  },
  components: {
    SiteAside,
  },
};
</script>
<style lang="less" scoped>
h1 {
  float: right;
}
.test-container {
  width: 250px;
  height: 100vh;
}
</style>
