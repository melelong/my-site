<template>
  <div
    class="loading-container"
    :style="{
      '--color1': color1,
      '--color2': color2,
      '--size': size,
    }"
  >
    <div class="dot" v-for="(item, i) in 36" :key="i"></div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    color1: {
      type: String,
      default: "#000",
    },
    color2: {
      type: String,
      default: "#fff",
    },
    size: {
      type: String,
      default: "100%",
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/mixin.less";
.loading-container {
  @color1: var(--color1);
  @color2: var(--color2);
  @size: var(--size);
  @ballSize: 10px;
  @containerSize: 150px;
  @n: 36;
  @deg:360deg / @n;
  @time: 2000ms;
  width: @containerSize;
  height: @containerSize;
  .self-center(@size);
  border-radius: 50%;
  animation: ro 5000ms infinite;
  .dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: @ballSize;
    height: @ballSize;
    margin-left: -@ballSize / 2;
    margin-top: -@ballSize / 2;
    perspective: 70px;
    transform-style: preserve-3d;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    // 黑
    &::before {
      background: @color1;
      top: -100%;
      animation: go1 @time infinite;
    }
    // 白
    &::after {
      background: @color2;
      top: 100%;
      animation: go2 @time infinite;
    }
  }
  // 黑
  @keyframes go1 {
    0% {
      animation-timing-function: ease-in;
    }
    25% {
      transform: translate3d(0, 100%, @ballSize);
      animation-timing-function: ease-out;
    }
    50% {
      transform: translate3d(0, 200%, 0);
      animation-timing-function: ease-in;
    }
    75% {
      transform: translate3d(0, 100%, -@ballSize);
      animation-timing-function: ease-out;
    }
  }
  // 白
  @keyframes go2 {
    0% {
      animation-timing-function: ease-in;
    }
    25% {
      transform: translate3d(0, -100%, -@ballSize);
      animation-timing-function: ease-out;
    }
    50% {
      transform: translate3d(0, -200%, 0);
      animation-timing-function: ease-in;
    }
    75% {
      transform: translate3d(0, -100%, @ballSize);
      animation-timing-function: ease-out;
    }
  }
  // 旋转
  @keyframes ro {
    0% {
      transform: translate(-50%, -50%) scale(var(--size)) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(var(--size)) rotate(360deg);
    }
  }
  .loop(@i) when(@i <= @n) {
    .dot:nth-child(@{i}) {
      transform: rotate(@deg * @i) translateY(-@containerSize / 2);
      &::before,
      &::after {
        animation-delay: -@time / @n * 6 * @i;
      }
    }
    .loop(@i + 1);
  }
  .loop(1);
}
</style>
