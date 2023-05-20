<template>
  <div class="map" ref="map" style="height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { getMapJson } from "@/api/tongji";
import { throttle } from "@/utils/tools";
export default {
  name: "Bmap",
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
      mapCode: "100000",
    };
  },
  async created() {
    const mapData = await this.getMap();

    echarts.registerMap("China", mapData);
  },
  async mounted() {
    this.initMap(this.$refs.map);
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
    // 初始化地图
    async initMap(dom) {
      const map = new BMap.Map(dom);
      // 默认北京为中心点
      map.centerAndZoom(new BMap.Point(39.90469, 116.40717), 12);
      // 滚动缩放
      map.enableScrollWheelZoom(true);
    },
    // 获取地图数据
    async getMap() {
      try {
        const res = await getMapJson(this.mapCode);
        return res;
      } catch (err) {
        this.$$message.error("获取地图数据失败");
        return {};
      }
    },
    // 初始化图表
    initChart() {
      this.initDom = echarts.init(this.$refs.map);
      this.initDom.setOption(this.option);
      this.initDom.resize(this.size);
    },
    // 防抖适配
    fdScreenAdapter() {
      throttle(this.screenAdapter, 500)();
    },
    // 适配
    screenAdapter(isMy) {
      const size = this.$listeners.getSize();
      const option = this.$listeners.option();
      // 传值就定位
      // 用户定位
      if (isMy === "1") {
        const myCity = new BMap.LocalCity();
        myCity.get(async ({ name }) => {
          // 创建地址解析器实例
          const geoc = new BMap.Geocoder();
          await geoc.getPoint(
            name,
            (point) => {
              point && (option.bmap.center = [point.lng, point.lat]);
              this.initDom.setOption(option);
              this.initDom.resize(size);
              this.initDom.hideLoading();
              this.isMy = false;
            },
            "中国"
          );
        });
      }
      this.initDom.setOption(option);
      this.initDom.resize(size);
      this.initDom.hideLoading();
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: rgba(255, 255, 255, 1);
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
