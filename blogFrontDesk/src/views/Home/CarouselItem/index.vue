<template>
  <div
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="carouselItem-container"
  >
    <div class="item-container" ref="img" :style="imgPosition">
      <ImageLoader
        @load="showWord"
        :src="data.bigImg"
        :placeholder="data.midImg"
      />
    </div>
    <div class="title" ref="title">
      {{ data.title }}
    </div>
    <div class="desc" ref="desc">
      {{ data.description }}
    </div>
  </div>
</template>
<script>
import { throttle } from "@/utils";
import { ImageLoader, Loading } from "@/components";
export default {
  name: "CarouselItem",
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, // 外层容器尺寸
      innerSize: null, // 内层容器尺寸
      mouse: {
        x: 0,
        y: 0,
      },
    };
  },
  components: {
    ImageLoader,
    Loading,
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouse = {
      x: this.center.x,
      y: this.center.y,
    };
    window.addEventListener("resize", this.setSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    // 显示标题和描述
    showWord() {
      // 标题
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";
      // 描述
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    // 获取容器尺寸
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.img.clientWidth,
        height: this.$refs.img.clientHeight,
      };
    },
    handleMouseMove(e) {
      const that = this;
      const doing = throttle(function () {
        const rect = that.$refs.container.getBoundingClientRect();
        that.mouse = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }, 600);
      doing(e);
    },
    handleMouseLeave() {
      this.mouse = {
        x: this.center.x,
        y: this.center.y,
      };
    },
  },
  computed: {
    // 计算图片位置
    imgPosition() {
      if (!this.innerSize || this.container) return;
      const extraWidth = this.innerSize.width - this.containerSize.width; // 多出的宽度
      const extraHeight = this.innerSize.height - this.containerSize.height; // 多出的高度
      const left = (-extraWidth / this.containerSize.width) * this.mouse.x;
      const top = (-extraHeight / this.containerSize.height) * this.mouse.y;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    // 居中位置
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.carouselItem-container {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
  overflow: hidden;
  .item-container {
    width: 110%;
    height: 110%;
    position: absolute;
    transition: 0.3s;
  }
  .title,
  .desc {
    position: absolute;
    left: 30px;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    font-weight: bold;
    text-shadow: 1px 0 rgba(0, 0, 0, 0.3), -1px 0 rgba(0, 0, 0, 0.3),
      0 -1px rgba(0, 0, 0, 0.3), 0 1px rgba(0, 0, 0, 0.3);
    color: #fff;
  }
  .title {
    top: calc(50% - 30px);
    font-size: 2em;
  }
  .desc {
    top: calc(50% + 20px);
    font-size: 1.2rem;
    color: lighten(@gray, 20%);
  }
}
</style>
