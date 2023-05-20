<template>
  <div>
    <h1>test</h1>
    <div class="test-container">
      <RightList :list="list" @select="handleSelect" />
    </div>
  </div>
</template>

<script>
import "@/styles/global.less";
import RightList from "./index";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "a", isSelect: true },
        { name: "b", isSelect: false },
        {
          name: "c",
          isSelect: false,
          children: [
            { name: "c1", isSelect: false },
            { name: "c2", isSelect: false },
            { name: "c3", isSelect: false },
          ],
        },
        {
          name: "d",
          isSelect: false,
          children: [
            { name: "d1", isSelect: false },
            { name: "d2", isSelect: false },
            { name: "d3", isSelect: false },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
.test-container {
  width: 300px;
  margin: 10px auto;
}
</style>
