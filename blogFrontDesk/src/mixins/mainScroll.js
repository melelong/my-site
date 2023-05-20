/**
 * 返回顶部
 * @param {*} ref 有滚动条的dom元素
 */
export default function (ref) {
  return {
    mounted() {
      this.$bus.$on("setMainScroll", this.handleSetMainScroll);
      this.$refs[ref].addEventListener("scroll", this.handleMainScroll);
    },
    beforeDestroy() {
      this.$bus.$emit("mainScroll");
      this.$bus.$off("setMainScroll", this.handleSetMainScroll);
      this.$refs[ref].removeEventListener("scroll", this.handleMainScroll);
    },
    methods: {
      handleMainScroll() {
        this.$bus.$emit("mainScroll", this.$refs[ref]);
      },
      handleSetMainScroll(scrollTop) {
        this.$refs[ref].scrollTop = scrollTop;
      },
    },
  };
}
