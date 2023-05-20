<template>
  <div class="app-container">
    <Header />
    <Layout>
      <template #left>
        <div class="aside" :class="{ show: isShow }">
          <SiteAside />
        </div>
      </template>
      <div
        class="modal-pad-switch"
        :class="{ show: !isShow }"
        @click="handleClick"
      ></div>
      <RouterView />
    </Layout>
    <ToTop />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Layout, SiteAside, ToTop, Header } from "./components";
export default {
  name: "App", // 根组件名
  components: {
    Layout,
    SiteAside,
    ToTop,
    Header,
  },
  computed: mapState("setting", ["isShow"]),
  watch: {
    $route() {
      this.$store.commit("setting/setIsShow", false);
      this.$store.commit("blog/setBlogIsShow", false);
    },
  },
  methods: {
    handleClick() {
      this.$store.commit("setting/setIsShow", false);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
}
.aside {
  width: 250px;
  height: 100%;
  transition: 1s;
}
@media screen and (max-width: 1279px) {
  .aside {
    position: fixed;
    top: 0;
    left: -250px;
    z-index: 99;
  }
  .aside.show {
    left: 0;
  }
  .modal-pad-switch {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100vw - 250px);
    height: 100vh;
    z-index: 99;
  }
  .modal-pad-switch.show {
    display: none;
  }
}
</style>
