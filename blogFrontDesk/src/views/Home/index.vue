<template>
  <div
    v-loading="isLoading"
    ref="home"
    class="home-container"
    @wheel.passive="wheelDoing"
  >
    <ul
      class="carousel-container"
      :style="{ transform: `translateY(${moveTo})` }"
      @transitionend="transitionEndDoing"
    >
      <li v-for="(item, i) in data" :key="item.id">
        <CarouselItem
          :data="{
            bigImg: item.bigImg,
            description: item.description,
            midImg: item.midImg,
            title: item.title,
          }"
        />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index >= 1" @click="changeIndex(false)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="index < data.length - 1"
      @click="changeIndex(true)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ selected: index === i }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  .carousel-container {
    transition: 1s ease-in-out;
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    @gap: 15px;
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    .self-center();
    transform: translatex(-50%);
    &.icon-up {
      bottom: auto;
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
    @jump: 5px;
    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
  }
  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 10px;
    li {
      border-radius: 50%;
      width: 7px;
      height: 7px;
      background: @words;
      margin-bottom: 10px;
      border: 1px solid #fff;
      transition: 0.5s;
      cursor: pointer;
    }
    .selected {
      background: #fff;
    }
  }
}
@media screen and (max-width: 1281px) {
  .home-container {
    .carousel-container {
      height: 100vh;
      overflow-y: auto;
      scroll-behavior: smooth;
      scroll-snap-type: y mandatory;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        scroll-snap-align: start;
      }
    }
    .indicator,
    .icon-down,
    .icon-up {
      display: none;
    }
  }
}
</style>
<script>
import { mapState } from "vuex";
import CarouselItem from "./CarouselItem";
import { Icon } from "@/components";
export default {
  name: "Home",
  data() {
    return {
      index: 0, // 当前显示的是第几张轮播图
      containerHeight: 0, // 容器高度
      clientWidth: 0, // 视口宽度
      switching: false,
    };
  },
  async created() {
    await this.$store.dispatch("banner/fetchBanner");
  },
  components: {
    CarouselItem,
    Icon,
  },
  mounted() {
    this.setTing();
    window.addEventListener("resize", this.setTing);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setTing);
  },
  computed: {
    moveTo() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["isLoading", "data"]),
  },
  methods: {
    async fetchData() {
      return await banner.getBanners();
    },
    changeIndex(type) {
      this.index = type ? this.index + 1 : this.index - 1;
    },
    switchTo(i) {
      this.index = i;
    },
    wheelDoing(e) {
      if (this.clientWidth < 1281) return;
      if (this.switching) return;
      if (e.deltaY < 90 && this.index !== 0) {
        this.switching = true;
        this.index--;
      } else if (e.deltaY >= 90 && this.index !== this.data.length - 1) {
        this.switching = true;
        this.index++;
      }
    },
    setTing() {
      this.containerHeight = this.$refs.home.clientHeight;
      this.clientWidth = document.documentElement.clientWidth;
    },
    transitionEndDoing() {
      this.switching = false;
    },
  },
};
</script>
