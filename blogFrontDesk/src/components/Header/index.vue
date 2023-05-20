<template>
  <div class="header-container" :class="{ show: isShow }" v-if="data">
    <div class="header-container-fixed">
      <div
        class="header-switch"
        :class="{ show: !isShow }"
        @click="handleClick1"
      >
        <div class="menu"></div>
        <Icon type="close" />
      </div>
      <h1 class="header-title">
        <RouterLink
          :to="{
            name: 'Home',
          }"
        >
          {{ data.siteTitle }}
        </RouterLink>
      </h1>

      <div class="header-logo" @click="handleClick2">
        <Avatar :url="data.avatar" size="2rem" />
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar, Icon } from "@/components";
import { mapState } from "vuex";
export default {
  name: "Header",
  components: {
    Avatar,
    Icon,
  },
  computed: {
    ...mapState("setting", ["data", "isShow"]),
    ...mapState("blog", ["blogIsShow"]),
  },
  methods: {
    handleClick1() {
      this.$store.commit("setting/setIsShow", true);
    },
    handleClick2() {
      this.$store.commit("blog/setBlogIsShow", !this.blogIsShow);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.header-container {
  width: 100%;
  margin: 0 0 3.125rem;
  .header-container-fixed {
    transition: 1s;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 3.125rem;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background: @words;
    .header-switch {
      color: @gray;
      font-size: 1rem;
      &.show .menu {
        position: relative;
        width: 2rem;
        height: 2rem;
        border-radius: 5px;
        background: @primary;
        &::after {
          position: absolute;
          display: block;
          content: "";
          width: 1rem;
          height: 2px;
          top: 50%;
          left: 50%;
          background: #fff;
          transform: translate(-50%, -50%);
        }
      }
      &.show .icon-container {
        display: none;
      }
    }
    .header-title {
      flex: 1 1 auto;
      text-align: center;
      font-size: 1.5rem;
      color: @gray;
    }
  }
}
.header-container.show .header-container-fixed {
  left: 250px;
}
@media screen and (min-width: 1280px) {
  .header-container {
    display: none;
  }
}
</style>
