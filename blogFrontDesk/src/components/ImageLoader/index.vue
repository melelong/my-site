<template>
  <div class="imageLoader-container">
    <img :src="placeholder" alt="" class="placeholder" v-if="!allDone" />
    <img
      :src="src"
      alt=""
      @load="handleLoad"
      :style="{ opacity: srcOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>
<script>
export default {
  name: "ImageLoader",
  data() {
    return {
      srcLoaded: false,
      allDone: false,
    };
  },
  computed: {
    srcOpacity() {
      return this.srcLoaded ? 1 : 0;
    },
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    handleLoad() {
      this.srcLoaded = true;
      setTimeout(() => {
        this.allDone = true;
        this.$emit("load"); // 通知父组件加载已完成
      }, this.duration);
      // console.log("原图加载完成");
    },
  },
};
</script>
<style scoped lang="less">
@import "~@/styles/mixin.less";
.imageLoader-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>
