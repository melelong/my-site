<template>
  <div class="echart" ref="echart"></div>
</template>

<script>
// 图表
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
  LabelLayout,
]);
import { throttle } from "@/utils/tools";
export default {
  name: "Echarts",
  data() {
    return {
      // 存储初始化后的dom
      initDom: {},
      // 容器初始化大小
      size: {
        width: "100%",
        height: "100%",
      },
      // 默认配置
      option: {},
    };
  },
  mounted() {
    // 初始化
    this.initChart();
    this.initDom.showLoading();
    window.addEventListener("resize", this.fdScreenAdapter);
  },
  beforeDestroy() {
    this.initDom.dispose();
    this.initDom = null;
    window.removeEventListener("resize", this.fdScreenAdapter);
  },
  methods: {
    // 初始化图表
    initChart() {
      this.initDom = echarts.init(this.$refs.echart);
      this.initDom.setOption(this.option);
      this.initDom.resize(this.size);
    },
    // 防抖适配
    fdScreenAdapter() {
      throttle(this.screenAdapter, 500)();
    },
    // 适配
    screenAdapter() {
      const size = this.$listeners.getSize();
      const option = this.$listeners.option();
      this.initDom.setOption(option);
      this.initDom.resize(size);
      this.initDom.hideLoading();
    },
  },
};
</script>
<style lang="scss" scoped>
.echart {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  // overflow: hidden;
  border-radius: 5px;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
}
</style>
