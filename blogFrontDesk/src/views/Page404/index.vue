<template>
  <div class="Page404">
    <div class="text">
      <h2>404</h2>
      <h3>对不起! 页面没有找到</h3>
    </div>
    <div class="container">
      <div class="sand"></div>
      <div class="tower">
        <div class="pole"></div>
        <div class="door"></div>
        <div class="light-base"></div>
        <div class="dome"></div>
        <div class="light"></div>
      </div>
      <div class="sand-extra"></div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.Page404{
  position: relative;
  overflow: hidden;
  height: 100%;
  background: linear-gradient(#100f0f 80%, @primary 80%);
  .container{
    height: 32.87em;
    width: 21.87em;
    position: absolute;
    transform: translateX(-50%);
    left:50%;
    bottom: 0;
    .sand{
      background-color: #fecd64;
      height: 6.25em;
      width: 100%;
      border-radius: 10.93em 10.93em 0 0;
      position: absolute;
      top: 26.62em;
    }
    .tower {
      height: 0;
      width: 7.5em;
      border-bottom: 18.75em solid #deeefa;
      border-left: 1.25em solid transparent;
      border-right: 1.25em solid transparent;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 11.31em;
      &::before {
        position: absolute;
        content: "";
        left:50%;
        transform: translateX(-50%);
        top: 11.87em;
        width: 7em;
        height: 0;
        border-bottom: 1.56em solid #f94862;
        border-left: 0.12em solid transparent;
        border-right: 0.12em solid transparent;
      }
      &::after {
        position: absolute;
        content: "";
        top: 0.93em;
        left:50%;
        transform: translateX(-50%);
        height: 0;
        width: 6em;
        border-bottom: 1.56em solid #f94862;
        border-left: 0.12em solid transparent;
        border-right: 0.12em solid transparent;
      }
      .pole {
        height: 3em;
        width: 0.8em;
        background-color: #f94862;
        border-radius: 0.5em 0.5em 0 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 6em;
      }
      .door {
        width: 3.75em;
        height: 4.37em;
        background-color: #1d3260;
        border-radius: 2.18em 2.18em 0 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 14.37em;
        box-shadow: 0 -9.37em #1d3260;
      }
      .light-base {
        background-color: #f7859a;
        height: 1em;
        width: 8em;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        &::before {
          position: absolute;
          content: "";
          background-color: #f94862;
          height: 1.25em;
          width: 5em;
          left: 50%;
        transform: translateX(-50%);
          bottom: 1em;
        }
      }
      .dome {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 5em;
        width: 5em;
        background: linear-gradient(
          to bottom,
          #f94862 3.43em,
          #5ab7ff 3.43em,
          #5ab7ff 5.31em,
          #f94862 5.31em
        );
        bottom: 2em;
        border-radius: 3.75em 3.73em 0 0;
      }
      .light {
        width: 7em;
        border-right: 14em solid #fecf2b;
        border-top: 2.5em solid transparent;
        border-bottom: 2.5em solid transparent;
        position: absolute;
        bottom: .25em;
        left: 2.5em;
        transform-origin: left center;
        animation: search 4s infinite;
        z-index:99;
      }
      @keyframes search {
      0% {
        transform: rotateX(180deg);
      }
      50% {
        transform: rotateY(180deg);
      }
}
@media screen and (min-width: 800px) {
  .container {
    font-size: 18px;
  }
  .text {
    font-size: 12px;
    top: 3em;
  }
}
@media screen and (max-width: 550px) {
  .text,
  .container {
    font-size: 12px;
  }
}

    }
    .sand-extra {
      height: 3.12em;
      width: 4.37em;
      background-color: #fecd64;
      border-radius: 50%;
      position: absolute;
      bottom: 1.87em;
      left: 4.06em;
      box-shadow: 2.5em 0.62em 0 -0.62em #fecd64;
    }
  }
  .text {
    width: 90%;
    position: absolute;
    font-family: "Poppins", sans-serif;
    text-align: center;
    top: 5em;
    margin: auto;
    left: 0;
    right: 0;
    line-height: 1;
    h2 {
      font-size: 3.8em;
      color: @primary;
      letter-spacing: 0.4em;
      margin-bottom: 0;
    }
    h3 {
      font-size: 1.2em;
      font-weight: 500;
      color: @primary;
      letter-spacing: 0.2em;
    }
  }
}
</style>
