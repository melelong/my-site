<template>
  <div class="siteAside-container" v-if="data">
    <div class="siteAside-profile">
      <RouterLink :to="{ name: 'Home' }">
        <Avatar :url="data.avatar" />
      </RouterLink>
      <h1 class="siteAside-profile-title">{{ data.siteTitle }}</h1>
      <p class="siteAside-profile-text">{{ data.siteText }}</p>
    </div>
    <Menu :data="menuData" />
    <Contact />
    <p class="footer">
      <a target="_blank" href="https://beian.miit.gov.cn/">{{ data.icp }}</a>
    </p>
  </div>
</template>
<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";
export default {
  name: "SiteAside",
  data() {
    return {
      menuData: [
        {
          icon: "home",
          title: "首页",
          name: "Home",
          exact: true,
        },
        {
          icon: "blog",
          title: "文章",
          name: "Blog",
          exact: false,
        },
        {
          icon: "about",
          title: "关于我",
          name: "About",
          exact: true,
        },
        {
          icon: "code",
          title: "项目&效果",
          name: "Project",
          exact: true,
        },
        {
          icon: "chat",
          title: "留言板",
          name: "Message",
          exact: true,
        },
      ],
    };
  },
  computed: mapState("setting", ["data"]),
  components: {
    Avatar,
    Menu,
    Contact,
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.siteAside-container {
  user-select: none;
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  background: @dark;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .siteAside-profile {
    .avatar-container {
      margin: auto;
    }
    .siteAside-profile-title {
      margin-top: 1rem;
      font-size: 20px;
      color: #fff;
      text-align: center;
    }
    .siteAside-profile-text {
      margin-top: 1rem;
      color: #ccc;
      text-align: center;
    }
  }
  .menu-container {
    margin: 24px 0;
  }
  .footer {
    margin: 12px 0;
    font-size: 0.6rem;
    text-align: center;
    color: @gray;
  }
}
</style>
