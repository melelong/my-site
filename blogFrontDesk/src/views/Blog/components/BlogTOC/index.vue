<template>
  <div class="blogTOC-container">
    <h2>
      <span>{{ catalogue }}</span>
    </h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
    <Empty v-if="tocWithSelect.length === 0 && !isLoading" />
  </div>
</template>

<script>
import RightList from "../RightList";

import { debounce } from "@/utils";
export default {
  name: "BlogTOC",
  components: {
    RightList,
  },
  data() {
    return {
      selectAnchor: "",
      catalogue: "",
    };
  },
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // 根据toc属性得到带有isSelect数组的toc数组
    tocWithSelect() {
      const getTOC = (toc = []) =>
        toc.map((t) => {
          t.name = t.name.replace(/\*/g, "");
          return {
            ...t,
            isSelect: this.selectAnchor === t.anchor,
            children: getTOC(t.children),
          };
        });
      return getTOC(this.toc);
    },
    // 根据toc得到它们对应的元素数组
    doms() {
      const doms = [];
      const getDom = (toc) => {
        for (const t of toc) {
          t.anchor = "h" + t.anchor;
          doms.push(document.querySelector(`#${t.anchor}`));
          t.children && t.children.length && getDom(t.children);
        }
      };
      getDom(this.toc);
      return doms;
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  mounted() {
    this.catalogue = document.querySelector(
      ".blogDetail-container h1"
    ).innerText;
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  methods: {
    handleSelect(item) {
      location.hash = "";
      location.hash = item.anchor;
      this.selectAnchor = item.anchor;
    },
    // 设置selectAnchor的值
    setSelect(scrollDom) {
      if (!scrollDom) return;
      this.selectAnchor = ""; // 后续要重新设置,先清空之前的状态
      const vH = window.innerHeight / 2;
      // const vH = 200;
      for (const dom of this.doms) {
        // 看一下当前这个dom元素是不是应该被选中
        if (!dom) continue;
        // 得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= vH) {
          this.selectAnchor = dom.id;
          return;
        } else if (top > vH) {
          return;
        } else {
          this.selectAnchor = dom.id;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.blogTOC-container {
  width: 14rem;
  padding: 0 1.2rem 1.2rem;
  height: calc(100vh - 3.125rem);
  background: #fff;
  border-left: 1px solid lighten(@gray, 20%);
  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  h2 {
    span {
      .goBeyond();
    }
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    position: sticky;
    top: 0;
    padding: 20px 0 1em;
    background: #fff;
    border-bottom: 1px solid lighten(@gray, 20%);
  }
}
</style>
