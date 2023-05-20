<template>
  <div class="testIcon">
    <h1>{{ testName }}</h1>
    <div class="testContainer">
      <div class="testIcon" v-for="(type, i) in types" :key="i">
        <Icon :type="type" />
        <p>{{ type }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "./index";
import { config } from "./config"; // 导入配置
export default {
  name: "testIcon",
  data() {
    return {
      testName: "testIcon",
      types: Object.keys(config.classMap), // 所有类型
    };
  },
  components: {
    Icon,
  },
};
</script>
<style scoped lang="less">
.testContainer {
  width: 50vw;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  flex-wrap: wrap;
  .testIcon {
    padding: 2px;
    @size: 100px;
    width: @size;
    text-align: center;
  }
}
</style>
