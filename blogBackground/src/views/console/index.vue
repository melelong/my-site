<template>
  <div class="app-container">
    <template v-if="user !== null">
      <div class="console-text" v-if="user.tongJi !== '开启'">
        <p>{{ user.name }}欢迎使用个人博客后台</p>
        <p class="tongJi">
          <RouterLink to="/tongJi">配置统计</RouterLink>
        </p>
      </div>
      <div class="container" v-else>
        <!-- 折线图 -->
        <div class="data1-container" ref="data1">
          <Echarts
            ref="Edata1"
            @getSize="getSize('data1')"
            @option="option('data1')"
          />
        </div>
        <!-- 地图 -->
        <div class="data2-container" ref="data2">
          <Bmap
            ref="Edata2"
            @getSize="getSize('data2')"
            @option="option('data2')"
          />
        </div>
        <!-- 饼图 -->
        <div class="data3-container" ref="data3">
          <Echarts
            ref="Edata3"
            @getSize="getSize('data3')"
            @option="option('data3')"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getSiteList,
  getTimeA,
  getTimeTrendRpt,
  getLatest,
} from "@/api/tongji";
import { getTongJi, updateRefreshToken, setTongJi } from "@/api/user";
import { formatDate, getOption } from "@/utils/tools";
import { getRefresh, getAccess, setRefresh, setAccess } from "@/utils/auth";
import Echarts from "@/components/Echarts";
import Bmap from "@/components/Bmap";
export default {
  name: "Console",
  data() {
    return {
      // 参数
      args: {
        domain: "",
        site_id: "",
        create_time: "",
      },
      // 数据标签名映射映射
      map: Object.freeze({
        pv_count: "浏览量PV",
        visitor_count: "访客数UV",
        ip_count: "IP 数",
        visit_count: "访问次数",
        bounce_ratio: "跳出率，%",
        avg_visit_time: "平均访问时长，秒",
        simple_date_title: "",
      }),
      // 图表配置
      EOptions: {
        data1: {},
        data2: {},
        data3: {},
      },
      // 定时器id
      timerId: "",
      token: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
    // 开始时间
    start_date() {
      const start1 = +this.args.create_time.split(" ")[0].replace(/\-/g, "");
      const start2 =
        +formatDate(Date.now(), false).split(" ")[0].replace(/\-/g, "") - 101;
      return start1 > start2 ? start1 : start2;
    },
    // 结束时间
    end_date() {
      return (
        +formatDate(Date.now(), false).split(" ")[0].replace(/\-/g, "") - 1
      );
    },
  },
  components: { Echarts, Bmap },
  async mounted() {
    if (this.user === null) return;
    if (this.user.tongJi === "开启") {
      // 获取数据
      await this.fetchData();
      // 一分钟更新数据
      this.timerId = setInterval(async () => {
        try {
          const resAll = await Promise.all([
            this.getData1(),
            this.getData2(),
            this.getData3(),
          ]);
          for (let i = 0; i < resAll.length; i++) {
            try {
              if (i === 1) continue;
              this.EOptions[`data${i + 1}`] = resAll[i];
              this.$refs[`Edata${i + 1}`].screenAdapter();
            } catch (err) {
              this.$message.error(err);
              continue;
            }
          }
        } catch (err) {
          this.$message.error(err);
        }
      }, 60000);
    } else {
      this.$message.success(`${this.user.name}欢迎使用个人博客后台`);
    }
  },
  beforeDestroy() {
    // 清空计时器和监听事件
    clearInterval(this.timerId);
  },
  methods: {
    // 获取数据
    async fetchData() {
      this.token = getAccess();
      let res = await getSiteList(this.token);
      // token失效
      if (res.error_code) {
        try {
          // 尝试更新access_token
          const args = await getTongJi();
          const { APIKey, SecretKey } = args.data;
          const { access_token, refresh_token } = await updateRefreshToken({
            refresh_token: getRefresh(),
            APIKey,
            SecretKey,
          });
          await setTongJi({
            access_token,
            refresh_token,
          });
          setRefresh(refresh_token);
          setAccess(access_token);
          // 重试
          this.fetchData();
          return;
        } catch (err) {
          // refresh_token失效
          this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          this.$message.error("token失效，请重新登录");
          return;
        }
      }
      const { domain, site_id, create_time } = res.list[0];
      this.args = {
        domain,
        site_id,
        create_time,
      };
      try {
        const resAll = await Promise.all([
          this.getData1(),
          this.getData2(),
          this.getData3(),
        ]);
        for (let i = 0; i < resAll.length; i++) {
          try {
            this.EOptions[`data${i + 1}`] = resAll[i];
            this.$refs[`Edata${i + 1}`].screenAdapter(i === 1 ? "1" : "");
          } catch (err) {
            this.$message.error(err);
            continue;
          }
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 获取折线图配置数据并生成配置
    async getData1() {
      try {
        const res = await getTimeTrendRpt({
          access_token: this.token,
          site_id: this.args.site_id,
          start_date: this.start_date,
          end_date: this.end_date,
        });
        return await getOption(
          { title: `趋势分析(域名:${this.args.domain})`, ...res.result },
          this.map
        );
      } catch (err) {
        this.$message.error("获取趋势分析失败");
        return {};
      }
    },
    // 获取访问人员信息
    async getData2() {
      try {
        const res = await getLatest(this.token, this.args.site_id);
        return await getOption(
          { title: "最近访问Ip分布", ...res.result },
          this.map,
          "map"
        );
      } catch (err) {
        this.$$message.error("获取最近访问Ip分布失败");
        return {};
      }
    },
    // 获取饼图数据并生成配置
    async getData3() {
      try {
        const res = await getTimeA({
          access_token: this.token,
          site_id: this.args.site_id,
          start_date: this.start_date,
          end_date: this.end_date,
        });
        return await getOption(
          { title: "各个时间段访问数", ...res.result },
          this.map,
          "pie"
        );
      } catch (err) {
        this.$message.error("获取各个时间段访问数失败");
        return {};
      }
    },
    // 传给子组件的配置
    option(dom) {
      return this.EOptions[dom];
    },
    // 传给子组件的尺寸
    getSize(dom) {
      return {
        width: this.$refs[dom].offsetWidth,
        height: this.$refs[dom].offsetHeight,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  &-container {
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;
    background: #eee;
    padding: 0.6rem;
    .console-text {
      position: absolute;
      font-size: 30px;
      line-height: 46px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .tongJi {
        color: #409eff;
        text-decoration: underline;
      }
    }
    .container {
      width: 100%;
      height: 100%;
      display: grid;
      grid: "data1 data1" "data2  data3";
      gap: 0.2rem;
      .data1,
      .data2,
      .data3 {
        &-container {
          min-height: 40vh;
          box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.5);
        }
      }
      .data1-container {
        grid-area: data1;
        min-width: 80vw;
      }
      .data2-container {
        grid-area: data2;
        min-width: 50vw;
      }
      .data3-container {
        grid-area: data3;
        min-width: 40vw;
      }
    }
  }
}
</style>
